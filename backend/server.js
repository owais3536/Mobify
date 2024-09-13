const { connectDB } = require("./utils/data.utils");
const authRouter = require('./routes/authRoutes');
const postRouter = require("./routes/postRoutes");

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

// middleware
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', authRouter);
app.use('/api', postRouter);

connectDB().then(() => {
    app.listen(port, host, () =>
        console.log(`Server is connected to ${host}:${port}`));
});