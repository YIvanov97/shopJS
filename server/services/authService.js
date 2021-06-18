const jwt = require('jsonwebtoken')
const User = require('../models/User');
const bcrypt = require('bcrypt')

const { SALT_ROUNDS, SECRET } = require('../config/config');

const register =  async ({name, username, email, password, cart})  => {

    const exist = 'exist'
    const newUser = await User.findOne({email, username})

    if(newUser) {
        return exist;
    }

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        username,
        email,
        password: hash,
        cart
    });
    return await user.save()
}

const login = async ({email, password}) => {
    
        let user = await User.findOne({email})
        if (!user) {
            throw {message: 'User not found!'}
        }

        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw {message: 'Password does not match!'}
        }

        let token = jwt.sign({user}, SECRET)
        
        return token;
}

async function update (data) {
    let updatedUser = await User.updateOne({_id: data._id}, {$set: {
        name: data.name,
        username: data.username,
    }})
    return User.findById(data._id);
}

module.exports = {
    register,
    login,
    update
}