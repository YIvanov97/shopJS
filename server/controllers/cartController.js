const { Router } = require('express');
const cartService = require('../services/cartService');

const router = Router();

router.post('/usercart', async (req, res) => {
    const [userId, cart] = req.body
    try {
        let userCart = await cartService.cart([userId, cart])
        res.status(200).json(userCart)
    } catch (error) {
        res.status(401).json({ error: error })
    }
})

router.post('/remove', async (req, res) => {
    const [userId, product] = req.body
    try {
        let removeProduct = await cartService.remove([userId, product])
        res.status(200).json({removeProduct})
    } catch (error) {
        res.status(401).json({error: error})
    }
})

module.exports = router;