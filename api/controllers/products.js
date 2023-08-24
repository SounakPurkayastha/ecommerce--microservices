const Product = require('../models/Product');

exports.createProduct = (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        colours: req.body.colours
    })
    newProduct.save();
    res.send(newProduct);
}

exports.getAllProducts = (req, res) => {
    const query = req.query.search;
    let page = req.query.page;
    let totalProducts;
    let products;
    const itemsPerPage = 10;
    if (!page)
        page = 1;
    if (!query)
        products = Product.find().countDocuments().then(numProducts => {
            totalProducts = numProducts;
            return Product.find().skip((page - 1) * itemsPerPage).limit(itemsPerPage)
        })
    else
        products = Product.find({ "title": { "$regex": query, "$options": "i" } }).countDocuments().then(numProducts => {
            totalProducts = numProducts;
            return Product.find({ "title": { "$regex": query, "$options": "i" } }).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
        })
    products.then(products => res.send({
        products: products,
        totalProducts: totalProducts,
        hasNextPage: page * itemsPerPage < totalProducts,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProducts / itemsPerPage)
    }));
}

exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId).then(data => res.send(data));
}