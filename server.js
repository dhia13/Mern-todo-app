require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
// Routes
const AuthRoute = require('./routes/AuthRoute')
const TaskRoute = require('./routes/TasksRoute')
const cookieParser = require("cookie-parser");

//experss
const app = express();
//cors
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser())
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
//Routes

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/tasks', TaskRoute)

if (process.env.NODE_ENV === 'production') {
    console.log('production')
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.htm;'))
    })
}
//Conection

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));