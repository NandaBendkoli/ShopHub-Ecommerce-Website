import ProductModel from '../Model/product.model.js';
import { successResponse, errorResponse } from './../Utils/response.js';
import { getNextSequence } from '../Utils/index.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, rating, stock, image } = req.body;

        const productId = "Product_" + await getNextSequence("product", 100000);

        const newProduct = new ProductModel({
            productId,
            name,
            description,
            category,
            price,
            rating,
            stock,
            image,

        });

        await newProduct.save();

        return successResponse(res, 'Product created successfully', newProduct);
    } catch (error) {
        return errorResponse(res, 'Failed to create product', error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId, name, description, category, price, rating, stock, image } = req.body;
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { productId },
            {
                name,
                description,
                category,
                price,
                rating,
                stock,
                image,
            },
            { new: true }
        );
        if (!updatedProduct) return errorResponse(res, 'Product not found', null, 404);
        return successResponse(res, 'Product updated successfully', updatedProduct);
    } catch (error) {
        return errorResponse(res, 'Failed to update product', error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const deleted = await ProductModel.findByIdAndDelete(productId);
        if (!deleted) return errorResponse(res, 'Product not found', null, 404);
        return successResponse(res, 'Product deleted successfully', deleted);
    } catch (error) {
        return errorResponse(res, 'Failed to delete product', error);
    }
};

// get products with pagination and search
export const getProducts = async (req, res) => {

    const { page = 1, limit = 10, searchTitle = "" } = req.body;

    // convert into number
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // skip
    const skip = (pageNumber - 1) * limitNumber;

    // query
    let query = {
        isDeleted: false
    };

    // search
    if (searchTitle) {
        query.$or = [
            { name: { $regex: searchTitle, $options: 'i' } },
            { description: { $regex: searchTitle, $options: 'i' } },
            { category: { $regex: searchTitle, $options: 'i' } }
        ]
    }

    const [products, total] = await Promise.all([

        ProductModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber),
        ProductModel.countDocuments(query)
    ]);

    return successResponse(res, 'Products fetched successfully', { products, total });
}

export const getProductById = async (req, res) => {

    try {
        const { productId } = req.body;

        const product = await ProductModel.findOne({ productId, isDeleted: false });
        if (!product) return errorResponse(res, 'Product not found', null, 404);
        return successResponse(res, 'Product fetched successfully', product);
    } catch (error) {
        return errorResponse(res, 'Failed to get product', error);
    }

}
