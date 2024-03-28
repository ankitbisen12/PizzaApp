import React from "react";
import Link from 'next/link';
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  // console.log(props.user);
  return (
      <header className={classes.header}>
        <Link href={'/'}><h1 className={classes.h1}>Pizza Gilleria</h1></Link>
        <HeaderCartButton onClick={props.onShowCart}  />
      </header>
  );
};

export default Header;
