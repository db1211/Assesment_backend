const mongoose = require('mongoose');



const productSchema = mongoose.Schema(
  {

 
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
        // required: true,
        default: 0,
      },
      count: {
        type: Number,
        // required: true,
        default: 0,
      },
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
