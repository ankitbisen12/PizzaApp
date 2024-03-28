import React from "react";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux/reducers/cartSlice";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import { userAgent } from "next/server";
import { useRouter } from "next/router";

const Cart = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const hasItems = items.length > 0;
  // console.log(hasItems);
  // console.log("items", items);

  const cartItemRemoveHandler = (id) => {
    // console.log("Inside cartItemRemoveHanadler", id);
    dispatch(removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    // console.log("Inside cartItemAddHanadler", item);
    dispatch(addItem({ ...item, amount: 1 }));
  };

  const orderSubmitHandler = () => {
    if (items.length !== 0) {
      router.push("/checkout");
      props.onClose();
    }
  };

  const cartitems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          img={item.img}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
      {items.length === 0 && <p>No items in the cart</p>}
    </ul>
  );

  return (
    <React.Fragment>
      <Modal onClose={props.onClose}>
        {cartitems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderSubmitHandler}>
              Order
            </button>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Cart;
