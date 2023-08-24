const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const getItemsIds = (order) => {
    const itemIds = [];
    order.items.forEach(item => itemIds.push(item.item));
    return itemIds;
} 


// looking for a more efficient way to do this

exports.pay = async (req, res) => {
    let total = 0;
    const order = req.body;
    const itemIds = getItemsIds(order);
    const records = await Product.find({ "_id": { "$in": itemIds } });
    order.items.forEach(item => {
        const product = records.find(product => item.item === product._id.toString());
        item["price"] = product.price;
        item["title"] = product.title;
    })
    order.items.forEach(item => total += (item.price * item.count));
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: order.items.map(item => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: { name: item.title },
                        unit_amount:item.price
                    },
                    quantity: item.count,
                }
            }),
            success_url:`${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/cart`
        })
        res.send({ url: session.url });
    }
    catch (e) {
        console.log(e);
    }
}
