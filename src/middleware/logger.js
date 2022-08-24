
const logger = ( req, res, next ) => {
    const date = (new Date()).toString();
    const url = req.url;
    const method = req.method;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    // EXERCISE: How to get the IP address??
    // EXERCISE: How to get the user agent from the request header??

    const message = `Request received | ${method} ${url} | Time: ${date} | IP = ${ip} | UA = ${userAgent}`;
    console.log( message );

    next(); // control transfers to the next middleware

    // this part executes after some middleware sends a response
    const dateOfResponse = (new Date()).toString();
    const messageResponse = `Response sent | ${method} ${url} | Time: ${dateOfResponse} | IP = ${ip} | UA = ${userAgent}`;
    console.log( messageResponse );
};

module.exports = logger;