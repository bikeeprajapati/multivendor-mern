const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("../model/product");
const Shop = require("../model/shop");

// maps dummyjson category slugs -> your real categoriesData titles
const categoryMap = {
    beauty: "cosmetics and body care",
    fragrances: "cosmetics and body care",
    "skin-care": "cosmetics and body care",
    laptops: "Computers and Laptops",
    smartphones: "Mobile and Tablets",
    tablets: "Mobile and Tablets",
    "mens-shirts": "Cloths",
    tops: "Cloths",
    "womens-dresses": "Cloths",
    "mens-shoes": "Shoes",
    "womens-shoes": "Shoes",
    "mens-watches": "Accesories",
    "mobile-accessories": "Accesories",
    "sports-accessories": "Accesories",
    sunglasses: "Accesories",
    "womens-bags": "Accesories",
    "womens-jewellery": "Accesories",
    "womens-watches": "Accesories",
    furniture: "Others",
    groceries: "Others",
    "home-decoration": "Others",
    motorcycle: "Others",
    vehicle: "Others",
    "kitchen-accessories": "Others",
};

const run = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");

    const shop = await Shop.findOne();
    if (!shop) {
        console.log("No shop found. Create a seller account first.");
        return process.exit(1);
    }
    console.log(`Using shop: ${shop.name} (${shop._id})`);

    const allDummyProducts = [];

    for (const [slug, mappedCategory] of Object.entries(categoryMap)) {
        console.log(`Fetching "${slug}" -> "${mappedCategory}"...`);
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/products/category/${slug}?limit=2`
            );

            const mapped = data.products.map((p) => ({
                name: p.title,
                description: p.description,
                category: mappedCategory,
                tags: p.tags ? p.tags.join(",") : mappedCategory,
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

            allDummyProducts.push(...mapped);
        } catch (err) {
            console.log(`  Skipped "${slug}" (fetch failed)`);
        }
    }

    await Product.insertMany(allDummyProducts);
    console.log(`Inserted ${allDummyProducts.length} dummy products across ${Object.keys(categoryMap).length} source categories`);
    process.exit(0);
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});