const express = require('express');

const config = require('./config/config')
const mongooseConfig = require('./config/mongoose');
const expressConfig = require('./config/express');
const routes = require('./routes');
const OrderData = require('./models/Data');

const app = express();

const api = express.Router();

api.get("/shopJS", (req, res) => {
    OrderData.find()
        .populate("products")
        .populate("users")
        .exec(function (err, order) {
            if (err) return handleError(err);

            res.status(200).send(order);
        });
});

app.use(`/`, api);

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.setHeader('Access-Control-Allow-Credentials', true)
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

expressConfig(app);
mongooseConfig(app);

app.use(express.json())
app.use(routes)

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`))