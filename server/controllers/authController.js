const { Router } = require('express');
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

const router = Router();

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        let token = await authService.login({email, password})
        res.cookie(COOKIE_NAME, token)
        res.status(200).json(token)
        } catch (error) {
        res.status(401).json({ error: error })
    }
})

router.post('/register', async (req, res) => {
    const {name, username, email, password} = req.body;
    
    try {
        let user = await authService.register({name, username, email, password})
        res.status(201).json(user)
    } catch (error) {
        res.status(401).json({ error: error })
    }
})

router.get('/user', async (req, res) => {
    if(req.user) {
        return res.status(200).json(req.user) 
    }
})

router.put('/user', async (req, res) => {
    try{
        let updatedUser = await authService.update(req.body)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).send({ message: 'Logout successful' });
})

module.exports = router;