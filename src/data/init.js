const mongoose = require('mongoose');

mongoose.set('returnOriginal', false)

const { NODE_ENV, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const connectionStr = NODE_ENV === `development` ? `mongodb://${DB_HOST}/${DB_NAME}` : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

console.log(connectionStr);

console.log(`Connecting to database ${DB_NAME}`);

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

mongoose.connection.on('error', error => {
    console.log(`Could not connect to database ${DB_NAME} , error =`, error.message);
    process.exit(1);

});

mongoose.connection.on('open', function () {
    console.log(`Connected to database ${DB_NAME}`)
})

