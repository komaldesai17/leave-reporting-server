require( 'dotenv' ).config();
require('./init');

const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();

const cors = require('cors')


app.use(cors({
    origin: `http://localhost:8081`,
    optionsSuccessStatus: 200,
    credentials: true,
}))
const { connect } = require('./data/db');
connect();


const holidayApiRouter = require('./routes/api/holidays.routes')
const userApiRouter = require('./routes/api/users.routes')
const leaveApiRouter = require('./routes/api/leave.routes')

//app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use(cookieParser());
app.use('/api/holidays', holidayApiRouter);
app.use('/api/user', userApiRouter);

app.use('/api/leave', leaveApiRouter)

const PORT = process.env.PORT || 3000;

app
    .listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }) // listen() returns server
    .on('error', error => { // server.on( ... )
        console.error(error.message);
    });