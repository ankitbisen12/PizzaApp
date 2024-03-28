import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "@/components/Cart/CartIcon";
import { resetCart } from "../../redux/reducers/cartSlice";
import classes from "./HeaderCartButton.module.css";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState({ value: null });
  const dispatch = useDispatch();

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  // console.log("headerCartButton", props.user);

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    dispatch(resetCart());
    alert('You Logged Out');
  };

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
    }
  }, []);

  return (
    <div className={classes.outer_div}>
      <ToastContainer />
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span className={classes.txt}>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
      <div className={classes.dropdown}>
        <span
          onMouseOver={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          {dropdown && (
            <div
              className={classes.custom_dropdown}
              onMouseOver={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <ul className={classes.ul}>
                {/* <Link href={"/profile"}>
                  <li className={classes.custom_link}>Profile</li>
                </Link> */}
                <Link href={"/order"}>
                  <li className={classes.custom_link}>Orders</li>
                </Link>
                <li onClick={logout} className={classes.custom_link}>
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && <FaRegUserCircle className={classes.login_icon} />}
        </span>

        {!user.value && (
          <Link href={"/login"}>
            <IoMdLogIn className={classes.login_icon} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderCartButton;
