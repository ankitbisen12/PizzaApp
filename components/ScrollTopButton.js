"use client";
import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import classes from "./ScrollTopButton.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  // console.log("Inside ScrollTopButton component", window);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleTrue = `${classes.visible}`;
  const hidden = `${classes.hidden}`;

  return (
    <button
      onClick={scrollToTop}
      className={`${
        classes.container
      } ${`${visible} ? ${visibleTrue} : ${hidden}`}`}
    >
      <AiOutlineArrowUp className={classes.icon} />
    </button>
  );
}
