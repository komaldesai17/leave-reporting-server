const mongoose = require("mongoose");
const Leave = mongoose.model("Leave");


const addLeave = async (leave) => {
    try {
        const insertedHoliday = await Leave.create(leave);

        return insertedHoliday;
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    addLeave
}