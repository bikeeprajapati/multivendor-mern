const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("../model/product");
const Shop = require("../model/shop");

const run = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");

    const shop = await Shop.findOne();
    if (!shop) {
        console.log("No shop found. Create a seller account first.");
        return process.exit(1);
    }
    console.log(`Using shop: ${shop.name} (${shop._id})`);

    console.log("Fetching real product data from dummyjson.com...");
    const { data } = await axios.get("https://dummyjson.com/products?limit=10");

    const dummyProducts = data.products.map((p) => ({
        name: p.title,
        description: p.description,
        category: p.category,
        tags: p.tags ? p.tags.join(",") : p.category,
        originalPrice: Math.round(p.price * 1.3),
        discountPrice: Math.round(p.price),
        stock: p.stock,
        images: p.images.slice(0, 3).map((url, i) => ({
            public_id: `dummy_${p.id}_${i}`,
            url,
        })),
        shopId: shop._id,
        shop: shop,
    }));

    await Product.insertMany(dummyProducts);
    console.log(`Inserted ${dummyProducts.length} dummy products with real images`);
    process.exit(0);
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});