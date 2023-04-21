const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    ownerID: {type: String, required: true},
    productID: {type: String, required: true},
    quantity: {type: Number, default: 1},
    created: {type: Date, default: Date.now},
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  }
);

CartSchema.statics = {
    findCartOwner(data){
        return this.findOne({ownerID: data.ownerID, productID: data.productID}).exec();
    },
    updateQuantityCart(cartID, quantity){
        return this.findOneAndUpdate({_id: cartID},  {
            $set: {
                quantity: quantity
            }
        },
        { safe: true, upsert: true, new: true }
        ).exec();
    },
    deleteCart(id){
        return this.findOneAndDelete({_id: id}).exec();
    },
    getListCart(id){
        return this.find({ownerID: id}).sort({_id: -1}).exec();
    },
    deleteManyCart(id){
      return this.deleteMany({ownerID: id}).exec();
    }
}


module.exports = mongoose.model('Cart', CartSchema);
