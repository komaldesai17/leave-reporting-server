const LeaveService = require('../../services/leave.service')


const postLeave = async ( req, res, next) => {
    const leave = req.body;
    leave.user = req.cookies.userId;
    try {
        let updatedLeave = await LeaveService.addLeave(leave);
        res.status(201).json({
            status: 'success',
            data: updatedLeave
        });
        
    }
    catch (error) {
        const httpError = new HttpError( error.message, 400 );

        next( httpError );        
    }
}


module.exports={
    postLeave
}