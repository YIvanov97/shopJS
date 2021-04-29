const express = require('express');

const config = require('./config/config')
const mongooseConfig = require('./config/mongoose');
const expressConfig = require('./config/express');
const routes = require('./routes');

const app = express();

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