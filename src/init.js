class HttpError extends Error {
    constructor( message, status ) {
        super( message );

        this.status = status || 500;
    }
}

// DO NOT use global usually (usually best to export and import)
// HttpError can be used in any file once this file runs and creates this class
global.HttpError = HttpError;