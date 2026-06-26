import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { wishlistReducer } from "./reducers/wishlist";
import { cartReducer } from "./reducers/cart";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        products: productReducer,
        events: eventReducer,
    },
});

export default Store;