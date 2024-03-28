import React from "react";
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;
  // console.log("Inside CartItem ", props);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
        <div className={classes.img}>
          <img src={props.img} alt="" />
        </div>
        <div className={classes.amnt_summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
