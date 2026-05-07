const bookingModel = require("../models/booking.model");
const vehicleModel = require("../models/vehicle.model");
const razorpayInstance = require("../config/razorpayInstance")

class renterController {

    async bookVahicle(req, res) {
        try {
            const vehicel = req.params.vid;
            const renter = req.loginUser;
            const { startDate, endDate, cost, serviceFee, tax, total, payment } = req.body;

            if (!startDate || !endDate || !cost || !serviceFee || !tax || !total) {
                return res.json({
                    message: "Please fill all required fields",
                });
            }

            let findVehicel = await bookingModel.find({ $and: [{ renter }, { vehicel }] })

            if (findVehicel.length === 0) {

                let extractOwnerId = await vehicleModel.find({ _id: vehicel })

                const bookingData = {
                    vehicel,
                    renter,
                    owner: extractOwnerId[0]?.userId,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    cost,
                    serviceFee,
                    tax,
                    total,
                    payment
                };

                const bookingSave = new bookingModel(bookingData);
                const result = await bookingSave.save();
                res.json({
                    message: "Vehicle booked successfully",
                    data: result
                });

            } else {
                return res.json({
                    message: "You already book your vehicle",
                });
            }

        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Unable to book vehicle!",
                error: err.message
            });
        }
    }

    async cancelVahicle(req, res) {
        try {
            const bookingId = req.params.bid;
            const findMyBooking = await bookingModel.findOne({ _id: bookingId });
            if (findMyBooking) {
                await bookingModel.findOneAndUpdate({ _id: bookingId }, { $set: { isBookingCancel: true } })
                return res.json({
                    message: "Vehicle Booking Cancel Successfully!",
                });
            } else {
                return res.json({
                    message: "Without booking you can't cancel your booking!",
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "Unable to cancel booking!",
                error: err.message
            });
        }
    }

    async viewRenterBookingVehicle(req, res) {
        try {
            const renter = req.loginUser._id;
            let myResult = await bookingModel.aggregate([
                { $match: { renter } },
                {
                    $lookup: {
                        from: "vehicles",
                        localField: "vehicel",
                        foreignField: "_id",
                        as: "renterVehicle"
                    }
                },
                {
                    $unwind: "$renterVehicle"
                },
                {
                    $project: {
                        status: 1,
                        startDate: 1,
                        endDate: 1,
                        total: 1,
                        isBookingCancel: 1,
                        renterVehicle: {
                            image: 1,
                            _id: 1,
                            brand: 1,
                            model: 1
                        }
                    }
                },
            ])

            res.json({
                message: "Fetch Renter Vehicle Successfully!",
                data: myResult
            });

        } catch (err) {
            res.json({
                message: "Unable to fetch Renter Vehicle!",
            });
        }
    }

    async paymentVehicle(req, res) {
        try {
            const amount = req.params.amt;

            const options = {
                amount: Math.round(Number(amount)),
                currency: 'INR',
            };

            const order = await razorpayInstance.orders.create(options);
            res.status(200).json(order);

            res.json({
                message: "Amount Payment Successfully!",
                data: order,
            });

        } catch (err) {
            res.json({
                message: "Amount Payment Failed!",
                error: err.message
            });
        }
    }

    async renterDashboardData(req, res) {
        try {
            const renter = req.loginUser._id;
            let myResult = await bookingModel.aggregate([
                { $match: { renter } },
                {
                    $lookup: {
                        from: "vehicles",
                        localField: "vehicel",
                        foreignField: "_id",
                        as: "renterVehicle"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "renter",
                        foreignField: "_id",
                        as: "renter"
                    }
                },
                {
                    $unwind: "$renterVehicle"
                },
                {
                    $unwind: "$renter"
                },
                {
                    $project: {
                        _id:1,
                        status: 1,
                        renterVehicle: {
                            image: 1,
                            _id: 1,
                            brand: 1,
                            model: 1
                        },
                         renter: {
                            name: 1,
                            _id: 1,
                            brand: 1,
                            model: 1
                        },
                    }
                },
            ])

            res.json({
                message: "Fetch Renter Vehicle Successfully!",
                data: myResult
            });

        } catch (err) {
            res.json({
                message: "Unable to fetch Renter Vehicle!",
            });
        }
    }

}

module.exports = new renterController()