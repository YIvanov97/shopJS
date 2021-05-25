const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost/shopJS', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    
    const db = mongoose.connection;
    
    db.on('error', (err) => console.log(err))
    db.once('open', () => console.log('Db connected'))
}

