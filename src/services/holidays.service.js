const mongoose = require("mongoose");
const Holiday = mongoose.model("Holiday");


const addHoliday = async (holiday) => {
    try {
        const insertedHoliday = await Holiday.create(holiday);

        return insertedHoliday;
    } catch (error) {
        console.log(error.message)
    }
}


const getHoliday = async () => {
    const query = Holiday.find();
    const holiday = await query.exec();
    return holiday

}


const deleteHoliday = async (description) => {
    const removeHoliday = await Holiday.deleteOne({ title: `${description}` });

    if ((removeHoliday === null) || (removeHoliday.deletedCount === 0)) {
        const error = new Error("No such Holiday");
        error.type = "NotFound";
        throw error;
    }
    return removeHoliday
}

module.exports = {
    addHoliday,
    getHoliday,
    deleteHoliday
}