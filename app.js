const express = require('express');
const { PORT } = require('./config/config.js');
const app = express();
const ConnectBD = require('./config/config.js')
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json())

app.use('/api/auth', require('./routes/authRegistration.js'))
app.use('/api/blogs', require('./routes/BlogRoutes.js'))

app.listen(PORT, ()=>{
    console.log(`${PORT}`)
})
