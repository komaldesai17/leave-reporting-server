const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Annual', 'Sick']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    }

});


mongoose.model('Leave', leaveSchema)