const errorHelper = require("../helpers/error.helper");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const addToCart = async (req, res) => {
    try{
        const data = {
            ownerID : req.params.ownerID,
            productID: req.body.productID,
            quantity: req.body.quantity
        }

        console.log(data);

        const findCard = await cartModel.findCartOwner(data);
        if(!findCard){
            await cartModel(data).save().then(data => {
                return errorHelper.handleRes(res, 200, "success");
            })
        }
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const getListCart = async (req, res) => {
    try{
        const ownerID = req.params.ownerID;

        const findCard = await cartModel.getListCart(ownerID);
        const arr = []
        for(let item of findCard){
            console.log(item);
            let getProduct = await productModel.getDetailsProduct(item.productID);
            if(getProduct){
                arr.push({cart: item, product: getProduct});
            }
        }

        return errorHelper.handleRes(res, 200, arr);
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const deleteCart = async (req, res) => {
    try{
        const cartID = req.params.cartID;
        await cartModel.deleteCart(cartID).then(() => {
            return errorHelper.handleRes(res, 200, "success");
        });
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const addOrder = async (req, res) => {
    try{
        const data = {
            ownerID: req.params.ownerID,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            listsProduct: req.body.listsProduct,
            totalPrice: req.body.totalPrice,
            paypalID: req.body.paypalID,
        }
        await orderModel(data).save().then(async data => {
            await cartModel.deleteManyCart(data.ownerID).then(() => {
                return errorHelper.handleRes(res, 200, "success");
            })
        })
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const listOrder = async (req, res) => {
    try{
        const ownerID = req.params.ownerID;
        await orderModel.getListOrderOwner(ownerID).then(data => {
            return errorHelper.handleRes(res, 200, data);
        })
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const getDetailOrder = async (req, res) => {
    try{
        const orderID = req.params.orderID;
        const getOrder = orderModel.getDetailsOrder(orderID);
        const arr = [];
        if(getOrder){
            for(let item of getOrder.listsProduct){
                const getProduct = await productModel.getDetailsProduct(item.productID);
                if(getProduct){
                    arr.push({order: item, product: getProduct })
                }else{
                    arr.push({order: item, product: null});
                }
            }
            return errorHelper.handleRes(res, 200, {order: getOrder, detail: arr});
        }
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

module.exports = {
    addToCart: addToCart,
    getListCart: getListCart,
    deleteCart: deleteCart,
    addOrder: addOrder,
    listOrder: listOrder,
    getDetailOrder: getDetailOrder
}