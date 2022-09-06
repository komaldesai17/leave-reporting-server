const apiNotFound = ( req, res, next ) => {
    res.status( 404 ).json();
};

const pageNotFound = ( req, res, next ) => {
    res.render( 'page-not-found', {
        title: req.app.get( 'title' )
    });
};

const errorHandler = ( error, req, res, next ) => {
    res.status( error.status || 500 ).json({
        status: 'error',
        message: error.message
    });
};

module.exports = {
    apiNotFound,
    pageNotFound,
    errorHandler
};