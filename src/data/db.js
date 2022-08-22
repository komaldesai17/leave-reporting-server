const mongoose = require('mongoose');

mongoose.set('returnOriginal', false);
mongoose.set('runValidators', true);

require('../models/Holidays');
require('../models/Leave');
require('../models/User');

const connect = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/leavesreportDB`)
        console.log('connected to db')
        
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = {
    connect
}