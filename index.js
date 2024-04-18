const express = require('express')
const config = require("./config/config");
const mongoose = require('mongoose')
const userRoute = require('./Routes/user.routes')
const discussionsRoute = require('./Routes/discussions.routes')
const auth_middleware = require('./Middleware/auth_middleware')


const app = express();

app.use(express.json());

// Middleware defined on global file
// app.use(auth_middleware);

app.use('/user', userRoute);
app.use('/discussions', discussionsRoute);

mongoose.connect(config.mongoose.url).then(() => {
    console.log("DB connected successfully")
    app.listen(config.port, () => {
        console.log(`Listening at port ${config.port}`);
    })
}).catch((error) => {
    console.log("DB not connected::", error);
})