const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const mongoose = require("mongoose");
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

    const img = (label, color) =>
        `https://placehold.co/500x500/${color}/ffffff?text=${encodeURIComponent(label)}`;

    const dummyProducts = [
        {
            name: "Wireless Headphones",
            description: "Comfortable over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
            category: "Electronics",
            tags: "audio,wireless,electronics",
            originalPrice: 80,
            discountPrice: 59,
            stock: 25,
            images: [
                { public_id: "dummy_headphones_1", url: img("Headphones+1", "1f2937") },
                { public_id: "dummy_headphones_2", url: img("Headphones+2", "374151") },
            ],
        },
        {
            name: "Running Shoes",
            description: "Lightweight running shoes with breathable mesh upper and cushioned sole.",
            category: "Footwear",
            tags: "shoes,sports,running",
            originalPrice: 60,
            discountPrice: 45,
            stock: 40,
            images: [
                { public_id: "dummy_shoes_1", url: img("Shoes+1", "2563eb") },
                { public_id: "dummy_shoes_2", url: img("Shoes+2", "1d4ed8") },
                { public_id: "dummy_shoes_3", url: img("Shoes+3", "1e40af") },
            ],
        },
        {
            name: "Ceramic Coffee Mug",
            description: "12oz ceramic mug, microwave and dishwasher safe, with matte finish.",
            category: "Home & Kitchen",
            tags: "kitchen,mug,home",
            originalPrice: 15,
            discountPrice: 10,
            stock: 100,
            images: [
                { public_id: "dummy_mug_1", url: img("Mug+1", "b45309") },
            ],
        },
        {
            name: "Smart Watch",
            description: "Fitness tracking smart watch with heart rate monitor and sleep tracking.",
            category: "Electronics",
            tags: "watch,fitness,electronics",
            originalPrice: 150,
            discountPrice: 119,
            stock: 15,
            images: [
                { public_id: "dummy_watch_1", url: img("Watch+1", "111827") },
                { public_id: "dummy_watch_2", url: img("Watch+2", "1f2937") },
            ],
        },
        {
            name: "Backpack",
            description: "Water-resistant travel backpack with laptop compartment and USB charging port.",
            category: "Bags",
            tags: "bag,travel,backpack",
            originalPrice: 55,
            discountPrice: 39,
            stock: 30,
            images: [
                { public_id: "dummy_backpack_1", url: img("Backpack+1", "065f46") },
                { public_id: "dummy_backpack_2", url: img("Backpack+2", "047857") },
            ],
        },
        {
            name: "Desk Lamp",
            description: "LED desk lamp with adjustable brightness and USB charging port.",
            category: "Home & Kitchen",
            tags: "lamp,desk,home",
            originalPrice: 35,
            discountPrice: 25,
            stock: 50,
            images: [
                { public_id: "dummy_lamp_1", url: img("Lamp+1", "7c2d12") },
            ],
        },
        {
            name: "Bluetooth Speaker",
            description: "Portable waterproof Bluetooth speaker with 12-hour playtime.",
            category: "Electronics",
            tags: "speaker,audio,bluetooth",
            originalPrice: 45,
            discountPrice: 32,
            stock: 60,
            images: [
                { public_id: "dummy_speaker_1", url: img("Speaker+1", "581c87") },
                { public_id: "dummy_speaker_2", url: img("Speaker+2", "6b21a8") },
            ],
        },
        {
            name: "Yoga Mat",
            description: "Non-slip eco-friendly yoga mat, 6mm thick with carrying strap.",
            category: "Sports",
            tags: "yoga,fitness,sports",
            originalPrice: 30,
            discountPrice: 22,
            stock: 45,
            images: [
                { public_id: "dummy_yoga_1", url: img("Yoga+Mat+1", "be123c") },
            ],
        },
        {
            name: "Sunglasses",
            description: "Polarized UV400 sunglasses with lightweight aluminum frame.",
            category: "Accessories",
            tags: "sunglasses,accessories,fashion",
            originalPrice: 40,
            discountPrice: 28,
            stock: 35,
            images: [
                { public_id: "dummy_sunglasses_1", url: img("Sunglasses+1", "0f172a") },
                { public_id: "dummy_sunglasses_2", url: img("Sunglasses+2", "1e293b") },
            ],
        },
        {
            name: "Stainless Steel Water Bottle",
            description: "Insulated water bottle, keeps drinks cold for 24 hours or hot for 12.",
            category: "Home & Kitchen",
            tags: "bottle,kitchen,hydration",
            originalPrice: 25,
            discountPrice: 18,
            stock: 80,
            images: [
                { public_id: "dummy_bottle_1", url: img("Bottle+1", "0e7490") },
            ],
        },
    ].map((p) => ({ ...p, shopId: shop._id, shop: shop }));

    await Product.insertMany(dummyProducts);
    console.log(`Inserted ${dummyProducts.length} dummy products`);
    process.exit(0);
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});