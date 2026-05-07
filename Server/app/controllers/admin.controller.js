const vehicleModel = require("../models/vehicle.model")
const myusers = require("../models/user.model");
const myBookings = require("../models/booking.model");

class adminController {

    async vahicleApproval(req, res) {
        try {
            const vId = req.params.vid;
            const status = req?.params?.status;
            await vehicleModel.findOneAndUpdate(
                { _id: vId },
                { $set: { status: status } },
                { new: true }
            );
            res.json({
                message: "Vehicle Status Set Successfully!",
            });

        } catch (err) {
            res.json({
                message: "Vehicle's Unable to Status!",
            });
        }
    }

    async allUsers(req, res) {
        try {
            let users = await myusers.aggregate([
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        avtar: 1,
                        usertype: 1,
                    }
                }
            ])

            res.json({
                message: "All Users Fetch Successfully!",
                data: users
            });

        } catch (err) {
            res.json({
                message: "Unable to fetch Users for Admin!",
            });
        }
    }

    async searchUser(req, res) {
        try {
            let searchUserData = req.params.user
            let myFilterUser = await myusers.find({
                $or: [
                    { name: { $regex: searchUserData, $options: "i" } },
                    { email: { $regex: searchUserData, $options: "i" } }
                ]
            });
            res.json({
                message: "Search User Successfully!",
                data: myFilterUser
            });

        } catch (err) {
            res.json({
                message: "Unable to Search User!",
            });
        }
    }

    async deleteUser(req, res) {
        try {
            let myUserId = req.params.userid;
            await myusers.findOneAndDelete({ _id: myUserId })
            res.json({
                message: "Deelte User Successfully!",
                data: myFilterUser
            });
        } catch (err) {
            res.json({
                message: "Unable to Delete User!",
            });
        }
    }

    async showAllBooks(req, res) {
        try {
            let myBooking = await myBookings.aggregate([
                {
                    $lookup: {
                        from: "vehicles",
                        localField: "vehicel",
                        foreignField: "_id",
                        as: "myVehicledtls"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "renter",
                        foreignField: "_id",
                        as: "renterdtls"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerdtls"
                    }
                },

                { $unwind: "$myVehicledtls" },
                { $unwind: "$renterdtls" },
                { $unwind: "$ownerdtls" },

                {
                    $addFields: {
                        vehicleBrand: "$myVehicledtls.brand",
                        vehicleName: "$myVehicledtls.model",
                        renterName: "$renterdtls.name",
                        ownerName: "$ownerdtls.name"
                    }
                },

                {
                    $project: {
                        vehicleBrand: 1,
                        vehicleName: 1,
                        renterName: 1,
                        ownerName: 1,
                        status: 1,
                        startDate: 1,
                        endDate: 1,
                        total: 1,
                    }
                }
            ]);
            res.json({
                message: "Show all Booking Successfully!",
                data: myBooking
            });
        } catch (err) {
            res.json({
                message: "Unable to show all the booking!",
            });
        }
    }

    async adminDashboard(req, res) {
        try {

            let totlBookingsum = 0
            let totalRevenue = 0
            let myVehicle = await vehicleModel.find()
            let dashBoardData = await myBookings.find()
            let myAllUser = await myusers.find()

            dashBoardData.forEach((e, i) => {
                if (e.status === "accept") {
                    totlBookingsum += 1
                }
            })

            let myUserCollection = myAllUser.filter((e, i) => {
                return e.usertype !== "Owner"
            })

            let totalAdminRevenue = await myBookings.find()

            totalAdminRevenue.forEach((e) => {
                totalRevenue += e.cost
            })

            let acceptBookingDetails = await myBookings.aggregate([
                { $match: { status: "accept" } },
                {
                    $lookup: {
                        from: "users",
                        localField: "renter",
                        foreignField: "_id",
                        as: "rentername"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownername"
                    }
                },
                {
                    $lookup: {
                        from: "vehicles",
                        localField: "vehicel",
                        foreignField: "_id",
                        as: "myvehicle"
                    }
                },
                {
                    $unwind: "$rentername"
                },
                {
                    $unwind: "$ownername"
                },
                {
                    $unwind: "$myvehicle"
                },
                {
                    $project: {
                        status: 1,
                        rentername: {
                            name: 1,
                        },
                        ownername: {
                            name: 1,
                        },
                        myvehicle: {
                            brand: 1,
                            model: 1,
                            vehicletype: 1,
                        },

                    }
                },
            ])

            let pendingBookingDetails = await myBookings.aggregate([
                { $match: { status: "pending" } },
                {
                    $lookup: {
                        from: "users",
                        localField: "renter",
                        foreignField: "_id",
                        as: "rentername"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownername"
                    }
                },
                {
                    $lookup: {
                        from: "vehicles",
                        localField: "vehicel",
                        foreignField: "_id",
                        as: "myvehicle"
                    }
                },
                {
                    $unwind: "$rentername"
                },
                {
                    $unwind: "$ownername"
                },
                {
                    $unwind: "$myvehicle"
                },
                {
                    $project: {
                        status: 1,
                        rentername: {
                            name: 1,
                        },
                        ownername: {
                            name: 1,
                        },
                        myvehicle: {
                            brand: 1,
                            model: 1,
                            vehicletype: 1,
                        },

                    }
                },
            ])

            let dashboardData = [{
                "totalVehicle": myVehicle.length,
                "activeBooking": totlBookingsum,
                "totalUsers": myUserCollection.length,
                "totalRevenue": totalRevenue,
                "acceptBooking": acceptBookingDetails,
                "pendingBooking": pendingBookingDetails,
            }]


            res.json({
                message: "Admin dashboard data Fetched Successfully!",
                data: dashboardData
            });

        } catch (err) {
            res.json({
                message: "Unable to fetch admin data!",
            });
        }
    }

    async allVehicles(req, res) {
        try {
            const {
                search,
                vehicletype,
                fueltype,
                transmission,
            } = req.query;

            let filter = {
                status: "Confirmed"
            };

            if (search && search.trim() !== "") {
                filter.$or = [
                    { location: { $regex: search.trim(), $options: "i" } },
                    { brand: { $regex: search.trim(), $options: "i" } },
                    { model: { $regex: search.trim(), $options: "i" } },
                ];
            }

            if (vehicletype && vehicletype.trim() !== "") {
                const vehicleArray = vehicletype.split(",").map(v => v.trim());
                filter.vehicletype = { $in: vehicleArray };
            }

            if (fueltype && fueltype.trim() !== "") {
                const fuelArray = fueltype.split(",").map(f => f.trim());
                filter.fueltype = { $in: fuelArray };
            }

            if (transmission && transmission.trim() !== "") {
                const transmissionArray = transmission.split(",").map(t => t.trim());
                filter.transmission = { $in: transmissionArray };
            }

            const vehicles = await vehicleModel.find(filter);

            res.status(200).json({
                success: true,
                message: "All Confirmed Vehicles Fetch Successfully!",
                data: vehicles,
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Unable to fetch Vehicles!",
            });
        }
    }

    async allhomeVehicles(req, res) {
        try {

            const vehicles = await vehicleModel.find({ status: "Confirmed" });

            res.status(200).json({
                success: true,
                message: "All Vehicles Fetch Successfully!",
                data: vehicles,
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Unable to fetch Vehicles!",
            });
        }
    }

    async alladminVehicles(req, res) {
        try {

            const vehicles = await vehicleModel.find();

            res.status(200).json({
                success: true,
                message: "All Vehicles Fetch Successfully!",
                data: vehicles,
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Unable to fetch Vehicles!",
            });
        }
    }

}

module.exports = new adminController()