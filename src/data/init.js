const mongoose = require('mongoose');

mongoose.set('returnOriginal', false)

const { NODE_ENV, DB_USER, DB_NAME,DB_PASSWORD, DB_HOST,  } = process.env;
const connectionStr = NODE_ENV === `development` ? `mongodb://${DB_HOST}/${DB_NAME}` :`mongodb://demoadmin:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true&replicaSet=atlas-ilmsjo-shard-0&authSource=admin&retryWrites=true&w=majority`
    //`mongodb://${DB_HOST}/${DB_NAME}` : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&ssl=true&authSource=admin`;

console.log(connectionStr);



console.log(`Connecting to database ${DB_NAME}`);

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

mongoose.connection.on('error', error => {
    console.log(`Could not connect to database ${DB_NAME}, error =`, error.message);
    process.exit(1);

});

mongoose.connection.on('open', function () {
    console.log(`Connected to database ${DB_NAME}`)
})

