"use client";
import React, { useState, useRef, useEffect } from "react";
import classes from "../styles/Checkout.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { calcTotalItems } from "@/utils/common";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetCart } from "../redux/reducers/cartSlice";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;
const isTenChars = (value) => value.trim().length !== 10;
const options = ["Card", "Cash"];

const checkout = () => {
  const [formInputsValidity, setFormInputsValidiity] = useState({
    name: true,
    mobileNo: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();
  let nameInputRef = useRef();
  let streetInputRef = useRef();
  let mobileInputRef = useRef();
  let postalCodeInputRef = useRef();
  let cityInputRef = useRef();
  const cart = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.totalAmount);
  const totalItems = calcTotalItems(cart);

  //redirect to home page
  const cancelSubmit = () => {
    router.push("/");
  };

  const resetInputFields = () => {
    // console.log("running");
    nameInputRef.current.value =
      streetInputRef.current.value =
      mobileInputRef.current.value =
      postalCodeInputRef.current.value =
      cityInputRef.current.value =
        "";
    setPaymentMethod("");
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const mobileNoClasses = `${classes.control} ${
    formInputsValidity.mobileNo ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const initiatePayment = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredMobileNumber = mobileInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredMobileNoIsValid = !isTenChars(enteredMobileNumber);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidiity({
      name: enteredNameIsValid,
      mobileNo: enteredMobileNoIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    if (cart.length === 0) {
      toast.warn("🦄Please add at least one item to begin the order!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      resetInputFields();
      return;
    }

    const address = {
      name: enteredName,
      mobileNo: +enteredMobileNumber,
      street: enteredStreet,
      pinCode: +enteredPostalCode,
      city: enteredCity,
    };

    let token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please logged in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      router.push("/login");
      return;
    }

    const totalItems = cart.length;
    // console.log(totalItems);
    const data = {
      items: cart,
      totalAmount: subTotal,
      totalItems,
      token,
      paymentMethod,
      selectedAddress: address,
    };
    //payment method integartion
    // const res = await fetch(`http://localhost:3000/api/initiateTransaction`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // const response = await res.json();
    // console.log(response);

    const createOrderResponse = await fetch(
      `/api/createOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Handle the response
    const createOrderData = await createOrderResponse.json();
    // console.log("createOrder", createOrderData);
    toast.success("Order Placed Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    resetInputFields("");
    dispatch(resetCart());
    router.push("/order");
  };

  return (
    <div className={classes.outer_div}>
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.inner_container}>
          <div className={classes.title}>
            <label htmlFor="login">Enter Details</label>
            <hr className={classes.hr} />
          </div>
          <form className={classes.form} onSubmit={initiatePayment}>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" ref={nameInputRef} />
              {!formInputsValidity.name && <p>Please enter a Valid name.</p>}
            </div>
            <div className={classes.control}>
              <label htmlFor="mobileNo">Mobile No(10 characters)</label>
              <input type="tel" id="mobileNo" ref={mobileInputRef} />
              {!formInputsValidity.mobileNo && (
                <p>Please enter a Valid Mobile No(10 characters long)</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" ref={streetInputRef} />
              {!formInputsValidity.street && (
                <p>Please enter a Valid street!</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="city">City</label>
              <input type="text" id="city" ref={cityInputRef} />
              {!formInputsValidity.city && <p>Please enter a Valid city.</p>}
            </div>
            <div className={classes.control}>
              <label htmlFor="postal">Postal Code</label>
              <input type="text" id="postal" ref={postalCodeInputRef} />
              {!formInputsValidity.postalCode && (
                <p>Please enter a Valid postal code(5 characters long)</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="city">Select Payment Method</label>
              <div className={classes.payment}>
                {options.map((el) => (
                  <div key={el} className={classes.options}>
                    <input
                      type="radio"
                      id={el}
                      name="options"
                      value={el}
                      onChange={(e) => handleChange(e)}
                    />
                    <label>{el}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.actions}>
              <button type="button" onClick={cancelSubmit}>
                Cancel
              </button>
              <button className={classes.submit} onClick={initiatePayment}>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default checkout;
