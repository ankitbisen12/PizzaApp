import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import classes from "./MealItemForm.module.css";
import "react-toastify/dist/ReactToastify.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    // console.log(enteredAmountNumber);
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      toast.error(`You cann't order more than 5 pizzas or not less than 0`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor="123">{props.label}</label>
        <input type="number" step="1" defaultValue="1" ref={amountInputRef} />
      </div>
      <button>
        <FaPlus style={{ color: "white" }} />
        <span className={classes.span}>Add</span>
      </button>
      {/* {!amountIsValid && <p>Please enter a valid amount (1-5).</p>} */}
      {/* <p>Please enter a valid amount (1-5).</p> */}
    </form>
  );
};

export default MealItemForm;
