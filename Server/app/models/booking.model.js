const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    vehicel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicle",
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    cost: {
        type: Number,
    },
    serviceFee: {
        type: Number,
        default: 30,
    },
    tax: {
        type: Number,
    },
    total: {
        type: Number,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'decline', 'completed'],
        default: 'pending',
    },
    isBookingCancel: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking
