const { Router } = require('express');
const productService = require('../services/productService');

const router = Router()

router.get('/', (req, res) => {
    productService.getAll(req.query).then(products =>{
        res.status(200).json(products)
    }).catch(() => res.status(500).end())
})

router.post('/create', async (req, res) => {
    try {
        let product = await productService.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/like', async (req, res) => {
    const [productId, userEmail] = req.body
    try {
        let productLike = await productService.like([productId, userEmail])
        res.status(200).json({productLike})
    } catch (error) {
        res.status(401).json({error: error})
    }
})

router.post('/dislike', async (req, res) => {
    const [productId, userEmail] = req.body
    try {
        let productDislike = await productService.dislike([productId, userEmail])
        res.status(200).json({productDislike})
    } catch (error) {
        res.status(401).json({error: error})
    }
})

router.get('/details/:id', async (req, res) => {
    let product = await productService.getOne(req.params.id)
    res.status(200).json(product)
})

router.post('/:id/delete', (req, res) => {
    try {
        productService.deleteOne(req.params.id)
        res.status(200)
    } catch (error) {
        res.status(400)
    }
})

module.exports = router;