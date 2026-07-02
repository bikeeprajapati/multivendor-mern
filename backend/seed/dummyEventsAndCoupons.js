const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const mongoose = require("mongoose");
const Event = require("../model/event");
const CoupounCode = require("../model/coupounCode");
const Shop = require("../model/shop");
const Product = require("../model/product");

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

    // ---------- Events ----------
    const now = Date.now();
    const days = (n) => n * 24 * 60 * 60 * 1000;

    const dummyEvents = [
        {
            name: "Summer Sale - Wireless Earbuds",
            description: "Limited-time summer discount on our best-selling wireless earbuds.",
            category: "Electronics",
            tags: "audio,sale,summer",
            originalPrice: 70,
            discountPrice: 49,
            stock: 20,
            start_Date: new Date(now),
            Finish_Date: new Date(now + days(7)),
            images: [
                { public_id: "dummy_event_earbuds_1", url: img("Earbuds+Sale", "b91c1c") },
                { public_id: "dummy_event_earbuds_2", url: img("Earbuds+Sale+2", "991b1b") },
            ],
        },
        {
            name: "Flash Deal - Fitness Bundle",
            description: "Yoga mat, water bottle, and resistance bands bundled at a flash-sale price.",
            category: "Sports",
            tags: "fitness,bundle,flashsale",
            originalPrice: 90,
            discountPrice: 60,
            stock: 15,
            start_Date: new Date(now + days(1)),
            Finish_Date: new Date(now + days(5)),
            images: [
                { public_id: "dummy_event_fitness_1", url: img("Fitness+Bundle", "15803d") },
            ],
        },
        {
            name: "Back to School - Backpack Special",
            description: "Discounted backpacks for the back-to-school season, while supplies last.",
            category: "Bags",
            tags: "backpack,school,sale",
            originalPrice: 55,
            discountPrice: 35,
            stock: 25,
            start_Date: new Date(now + days(2)),
            Finish_Date: new Date(now + days(10)),
            images: [
                { public_id: "dummy_event_backpack_1", url: img("Backpack+Deal", "1d4ed8") },
                { public_id: "dummy_event_backpack_2", url: img("Backpack+Deal+2", "1e40af") },
            ],
        },
    ].map((e) => ({ ...e, shopId: shop._id, shop: shop }));

    await Event.insertMany(dummyEvents);
    console.log(`Inserted ${dummyEvents.length} dummy events`);

    // ---------- Coupons ----------
    // grab a couple of existing product names to attach to coupons (optional field)
    const products = await Product.find({ shopId: shop._id }).limit(3);
    const productName = (i) => (products[i] ? products[i].name : undefined);

    const dummyCoupons = [
        {
            name: "WELCOME10",
            value: 10,
            minAmount: 20,
            maxAmount: 200,
            shopId: shop._id,
            selectedProduct: productName(0),
        },
        {
            name: "SAVE20",
            value: 20,
            minAmount: 50,
            maxAmount: 500,
            shopId: shop._id,
            selectedProduct: productName(1),
        },
        {
            name: "FLASH15",
            value: 15,
            minAmount: undefined,
            maxAmount: undefined,
            shopId: shop._id,
            selectedProduct: productName(2),
        },
    ];

    // avoid duplicate-key errors on re-run since `name` is unique
    for (const coupon of dummyCoupons) {
        const exists = await CoupounCode.findOne({ name: coupon.name });
        if (exists) {
            console.log(`Skipping ${coupon.name} — already exists`);
            continue;
        }
        await CoupounCode.create(coupon);
        console.log(`Inserted coupon: ${coupon.name}`);
    }

    console.log("Done.");
    process.exit(0);
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});