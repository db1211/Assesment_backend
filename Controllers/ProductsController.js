const Product = require('../models/productModel.js')

const getAllProducts =async(req,res)=>{
  
    console.log("________getProducts________")
    try {
        const user = req.user;
        console.log(user);
    
        
          const products = await Product.find({});
          res.status(200).json(products);
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
 
     
}

const addProduct = async (req, res) => {
  try {
    const { title, image, price, quantity, description, category } = req.body;

  
    const newProduct = new Product({
      title,
      image,
      price,
      quantity,
      description,
      category,
    });

   
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllProducts, addProduct };

