const vahicleModel = require("../models/vehicle.model");
const bookingModel = require('../models/booking.model');
const userModel = require('../models/user.model');
const mongoose = require("mongoose");
const { uploadFile, deleteFile } = require("../config/cloudUpload");
const fs = require('fs');
const extractPublicId = require("../helper/cloudinaryImghelper");


class ownerController {

    async addVehicel(req, res) {
        try {
            const {
                vehicletype,
                brand,
                model,
                year,
                fueltype,
                transmission,
                seats,
                location,
                priceperday,
                priceperweek,
                pricepermonth,
                features
            } = req.body;


            if (!vehicletype || !brand || !model || !year || !fueltype || !transmission ||
                !seats || !location || !priceperday || !priceperweek || !pricepermonth || !features) {

                return res.json({
                    message: "Please fill all fields!"
                });
            }

            if (!req.files || !req.files.length) {
                return res.status(500).json({ message: "Cover image file is required" });
            }

            const imageUrls = req.files.map(file => file.path);

            console.log(imageUrls)

            const myCloudUrl = await uploadFile(imageUrls);

            console.log("Cloud URL:", myCloudUrl);


            if (!myCloudUrl) {
                return res.status(500).json({ message: "Cloud upload failed" });
            }

            if (!req.loginUser) {
                return res.json({
                    message: "Unauthorized user!"
                });
            }

            let myUserId = req.loginUser._id;

            let vehicleData = {
                vehicletype,
                brand,
                model,
                year,
                fueltype,
                transmission,
                seats,
                location,
                priceperday,
                priceperweek,
                pricepermonth,
                features,
                userId: myUserId,
                image: myCloudUrl
            };

            const vehicleCreated = new vahicleModel(vehicleData);
            let mySavedData = await vehicleCreated.save();

            req.files.forEach((file) => {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Failed to delete local file:", err);
                    } else {
                        console.log("Local file deleted successfully!");
                    }
                });
            });

            res.json({
                message: "Vehicle Created Successfully",
                data: mySavedData
            });

        } catch (err) {
            console.log("SAVE ERROR:", err);

            res.json({
                message: "Vehicle Creation Failed",
                error: err.message
            });
        }
    }

    async editVehicle(req, res) {
        try {
            const vId = req.params.vid;

            const vehicle = await vahicleModel.findById(vId);

            if (!vehicle) {
                return res.json({ message: "Vehicle not found" });
            }

            if (req.files && req.files.length > 0) {

                if (vehicle.image && vehicle.image.length > 0) {
                    for (let imgUrl of vehicle.image) {

                        if (!imgUrl.includes("res.cloudinary.com")) continue;

                        const publicId = extractPublicId(imgUrl);
                        if (publicId) {
                            await deleteFile(publicId);
                        }
                    }
                }

                const imagePaths = req.files.map(file => file.path);
                const newImages = await uploadFile(imagePaths);

                vehicle.image = newImages;

                req.files.forEach(file => {
                    fs.unlink(file.path, () => { });
                });
            }

            vehicle.vehicletype = req.body.vehicletype;
            vehicle.brand = req.body.brand;
            vehicle.model = req.body.model;
            vehicle.year = req.body.year;
            vehicle.fueltype = req.body.fueltype;
            vehicle.transmission = req.body.transmission;
            vehicle.seats = req.body.seats;
            vehicle.location = req.body.location;
            vehicle.priceperday = req.body.priceperday;
            vehicle.priceperweek = req.body.priceperweek;
            vehicle.pricepermonth = req.body.pricepermonth;
            vehicle.features = req.body.features;

            await vehicle.save();

            res.json({
                message: "Vehicle Updated Successfully",
                data: vehicle
            });

        } catch (err) {
            console.log("EDIT ERROR:", err);
            res.json({
                message: "Failed to update vehicle",
                error: err.message
            });
        }
    }

    async deleteVehicel(req, res) {
        try {
            const vId = req.params.vid;
            let deleteVehicle = await vahicleModel.findById({ _id: vId });

            if (!deleteVehicle) {
                res.status(statusCode.forbidden).json({
                    message: "This Vehicle doesn't Exists",
                })
            }

            deleteVehicle.image.forEach(async (imageUrl) => {
                const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
                await deleteFile(publicId);
            }
            );
            await vahicleModel.deleteOne({ _id: vId });

            res.json({
                message: "Vehicle Deleted Successfully",
            });

        } catch (err) {
            console.log(err);
            res.json({
                message: "Failed to Delete vehicle!"
            });
        }
    }

    async ownerVehicel(req, res) {
        try {
            let myVahicleModel = await vahicleModel.find({
                userId: req.loginUser._id
            })

            res.json({
                message: "Fetch Your Successfully!",
                data: myVahicleModel
            });

        } catch (err) {
            console.log(err);
            res.json({
                message: "Failed to fetch vehicle!"
            });
        }
    }

    async showVehicelDtls(req, res) {
        try {
            const vId = req.params.vid;
            let vehicleDetails = await vahicleModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(vId)
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "ownerDetails"
                    }
                },

                {
                    $unwind: {
                        path: "$ownerDetails",
                        preserveNullAndEmptyArrays: true
                    }
                },

                {
                    $project: {

                        _id: 1,
                        vehicletype: 1,
                        brand: 1,
                        features: 1,
                        model: 1,
                        year: 1,
                        fueltype: 1,
                        transmission: 1,
                        seats: 1,
                        location: 1,
                        priceperday: 1,
                        priceperweek: 1,
                        pricepermonth: 1,
                        image: 1,
                        status: 1,

                        ownerDetails: {
                            _id: "$ownerDetails._id",
                            avtar: "$ownerDetails.avtar",
                            name: "$ownerDetails.name",
                            email: "$ownerDetails.email",
                            phone: "$ownerDetails.phone"
                        }
                    }
                }
            ]);

            res.json({

                message: "Show vehicle more details!",
                data: vehicleDetails[0]   // return single object

            });

        }
        catch (err) {

            console.log(err);

            res.status(500).json({

                message: "Failed to fetch vehicle!"

            });

        }

    }

    async showVehicels(req, res) {
        try {

            let vehicles = await vahicleModel.aggregate([
                { $match: { status: "Confirmed" } }
            ])
            res.json({
                message: "Show All vehicles!",
                data: vehicles
            });

        } catch (err) {
            res.json({
                message: "Failed to fetch vehicle!"
            });
        }
    }

    async showRequestedVehicels(req, res) {

        try {
            let loginUser = req.loginUser;
            let allOwnerBooking = await bookingModel.aggregate([
                { $match: { owner: loginUser?._id } },
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
                        status: 1,
                        startDate: 1,
                        endDate: 1,
                        total: 1,
                        renterVehicle: {
                            image: 1,
                            brand: 1,
                            model: 1,
                            _id: 1,
                        },
                        renter: {
                            name: 1,
                            usertype: 1,
                            avtar: 1,
                            phone: 1
                        },

                    }
                },
            ]);

            res.json({
                message: "Successfully show requested vehicles!",
                data: allOwnerBooking
            });
        } catch (err) {
            res.json({
                message: "Failed to show requested vehicles!"
            });
        }
    }

    async acceptOrRejectVehicels(req, res) {

        try {
            const bookigId = req?.params?.bid;
            const status = req?.params?.status;
            const findMyBooking = await bookingModel.findOne({ _id: bookigId });

            if (findMyBooking) {
                if (findMyBooking.isBookingCancel === false) {
                    if (status === "accept") {
                        await bookingModel.findOneAndUpdate({ _id: bookigId }, { $set: { status: "accept" } })
                    } else if (status === "decline") {
                        await bookingModel.findOneAndUpdate({ _id: bookigId }, { $set: { status: "decline" } })
                    } else if (status === "completed") {
                        await bookingModel.findOneAndUpdate({ _id: bookigId }, { $set: { status: "completed" } })
                    } else {
                        res.json({
                            message: "Please do Accept / Reject / complite your requested vehicle!",
                        });
                    }
                    res.json({
                        message: `Successfully ${status} requested vehicles!`,
                    });
                }
            }

        } catch (err) {
            res.json({
                message: "Failed to show requested vehicles!"
            });
        }
    }

    async ownerDashboard(req, res) {

        try {

            let loginUser = req.loginUser;
            let myBooking = await bookingModel.aggregate([
                {
                    $match: { owner: loginUser?._id }
                },
                {
                    $group: {
                        _id: 1,
                        totalBooking: { $sum: 1 },
                        totalRevenue: { $sum: "$cost" },
                        activeBooking: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "accept"] }, 1, 0]
                            }
                        },
                        pendingBooking: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                            }
                        }
                    }
                }
            ])

            let chartData = await bookingModel.aggregate([
                {
                    $match: {
                        owner: loginUser?._id
                    }
                },
                {
                    $group: {
                        _id: { $month: "$createdAt" },
                        total: {
                            $sum: {
                                $cond: [
                                    { $eq: ["$status", "accept"] },
                                    "$cost",
                                    0
                                ]
                            }
                        }
                    }
                },
                {
                    $sort: { _id: 1 }
                },
                {
                    $project: {
                        _id: 0,
                        month: {
                            $arrayElemAt: [
                                [
                                    "",
                                    "January", "February", "March", "April",
                                    "May", "June", "July", "August",
                                    "September", "October", "November", "December"
                                ],
                                "$_id"
                            ]
                        },
                        total: 1
                    }
                }
            ])

            res.json({
                message: "Oner Dashboard !",
                data: {
                    booking: myBooking,
                    chart: chartData
                }
            });


        } catch (err) {
            res.json({
                message: "Failed to show Owner Dashboard!"
            });
        }
    }

    async viewVehicle(req, res) {

        try {
            const vId = req.params.bid;
            let viewVehicle = await vahicleModel.findById({ _id: vId });
            res.json({
                message: "View Vehicle !",
                data: viewVehicle
            });

        } catch (err) {
            res.json({
                message: "Failed to show Owner Dashboard!"
            });
        }
    }

}

module.exports = new ownerController()