const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const mongoose = require("mongoose");
const axios = require("axios");
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

    // ---------- Events ----------
    console.log("Fetching real product data from dummyjson.com for events...");
    const { data } = await axios.get(
        "https://dummyjson.com/products?limit=3&skip=20"
    );

    const now = Date.now();
    const days = (n) => n * 24 * 60 * 60 * 1000;

    const eventMeta = [
        {
            label: "Summer Sale",
            tags: "sale,summer",
            start: now,
            end: now + days(7),
        },
        {
            label: "Flash Deal",
            tags: "flashsale,limited",
            start: now + days(1),
            end: now + days(5),
        },
        {
            label: "Weekend Special",
            tags: "weekend,special",
            start: now + days(2),
            end: now + days(10),
        },
    ];

    const dummyEvents = data.products.map((p, idx) => {
        const meta = eventMeta[idx] || eventMeta[0];
        return {
            name: `${meta.label} - ${p.title}`,
            description: p.description,
            category: p.category,
            tags: meta.tags,
            originalPrice: Math.round(p.price * 1.3),
            discountPrice: Math.round(p.price),
            stock: p.stock,
            start_Date: new Date(meta.start),
            Finish_Date: new Date(meta.end),
            images: p.images.slice(0, 3).map((url, i) => ({
                public_id: `dummy_event_${p.id}_${i}`,
                url,
            })),
            shopId: shop._id,
            shop: shop,
        };
    });

    await Event.insertMany(dummyEvents);
    console.log(`Inserted ${dummyEvents.length} dummy events with real images`);

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