import React from "react";
import MealItemForm from "./MealItemForm";
import { FaStar } from "react-icons/fa";
import classes from "./MealItem.module.css";
import { addItem } from "@/redux/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const MealItem = (props) => {
  const dispatch = useDispatch();
  // console.log("MealItem",props);
  const mode = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state)=>state.cart.items);
  // console.log(mode);
  // console.log(items);
  const price = `${props.price.toFixed(2)}`;
  const vegOrNot = props.isVeg ? "Veg" : "Non Veg";

  const addToCart = (amount) => {
    dispatch(
      addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
        img:props.img
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>
          {props.name}(<strong>{vegOrNot}</strong>)
        </h3>
        <div className={classes.price}>
          <FaStar className={classes.icon} />
          {props.rating}
        </div>
        <div className={classes.price}>₹{price}</div>
        <div className={classes.description}>{props.description}</div>
      </div>
      <div>
        <div className={classes.img}>
          <img src={props.img} alt="" />
        </div>
        <MealItemForm label="Amount" onAddToCart={addToCart} />
      </div>
    </li>
  );
};

export default MealItem;
