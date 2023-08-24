import React, { useState, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { useContext } from "react";

export const CartContext = React.createContext({
    items: [],
    itemsCount: 0,
    onAddToCart: () => {}
});

export const CartContextProvider = (props) => {

    const authCtx = useContext(AuthContext);
    const [items, setItems] = useState(JSON.parse(localStorage.getItem(`items${authCtx.userid}`)) || []);
    const [itemsCount, setItemsCount] = useState(JSON.parse(localStorage.getItem(`itemsCount${authCtx.userid}`)) || 0);
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem(`total${authCtx.userid}`)) || 0);

    useEffect(() => {
        saveCartContext();
    },[items, itemsCount, total])

    const resetCart = () => {
        setItems([]);
        setItemsCount(0);
        setTotal(0);
    }

    const emptyCartItems = () => {
        localStorage.setItem("clearCart", "true");
    }

    const saveCartContext = () => {
        localStorage.setItem(`items${authCtx.userid}`, JSON.stringify(items));
        localStorage.setItem(`itemsCount${authCtx.userid}`, itemsCount);
        localStorage.setItem(`total${authCtx.userid}`, total);
    }

    const addToCartHandler = (product, quantity) => {
        const existingProduct = items.filter(item => item.product.title === product.title);
        if (existingProduct.length > 0) {
            existingProduct[0].count += quantity;
        }
        else {
            items.push({ product: product, count: quantity });
            setItems(items);
        }
        setItemsCount(count => count + quantity);
        setTotal(total => total + product.price * quantity);
    }

    const decermentHandler = (product) => {
        const existingProduct = items.filter(item => item.product.title === product.title);
        if (existingProduct[0].count == 1) {
            removeFromCartHandler(product);
            return;
        }
        else {
            existingProduct[0].count -= 1;
        }
        setItemsCount(count => count - 1);
        setTotal(total => total - product.price);
    }

    const removeFromCartHandler = (product) => {
        const item = items.find(item => item.product.title === product.title);
        const filteredItems = items.filter((e) => e.product.title != product.title);
        setItems(filteredItems);
        setItemsCount(count => count - item.count);
        setTotal(total => total - (item.product.price * item.count));
    }

    return <CartContext.Provider
        value={{
            total:total,
            items: items,
            itemsCount: itemsCount,
            onRemove: removeFromCartHandler,
            onDecrement:decermentHandler,
            onAddToCart: addToCartHandler,
            onReset: resetCart,
            onCartClear: emptyCartItems,
        }}>
        {props.children}
    </CartContext.Provider>
}