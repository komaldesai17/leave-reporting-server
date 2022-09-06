require('dotenv').config();
require('./init');

require('./data/init');

const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

const env = process.env.NODE_ENV;
let origin = 'http://localhost:3001'


if( env === 'production' ) {
    origin = [
        'https://leave-reporting-demo.herokuapp.com/'
    ];
}

app.use(cors(
    {
        origin,
        optionsSuccessStatus: 200
    }
));

app.use(express.static(path.join(process.cwd(), 'public')))

//const { connect } = require('./data/db');
//connect();


const holidayApiRouter = require('./routes/api/holidays.routes')
const userApiRouter = require('./routes/api/users.routes')
const leaveApiRouter = require('./routes/api/leave.routes')
const DashRouter = require('./routes/api/dashboard.routes')
//app.get('/', (req, res) => res.send('Hello World!'));


//const logger = require( './middleware/logger' );
const {
    apiNotFound,
    pageNotFound,
    errorHandler
} = require('./middleware/error');


app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/holidays', holidayApiRouter);
app.use('/api/user', userApiRouter);

app.use('/api/leave', leaveApiRouter)
app.use('/api/dashbord', DashRouter)


app.use('/api', apiNotFound);
app.use(pageNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app
    .listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }) // listen() returns server
    .on('error', error => { // server.on( ... )
        console.error(error.message);
    });

module.exports = app