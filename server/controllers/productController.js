import Product from '../models/productModel.js';

const getProducts=async(req,res)=>{
    try {
        const products=await Product.find({}); // Finds ALL products in MongoDB
        res.json(products);
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
};


const getProductById=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(product){
            return res.json(product);
        }else{
            res.status(404).json({message:'Product Not Found'});
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

export {getProducts,getProductById}