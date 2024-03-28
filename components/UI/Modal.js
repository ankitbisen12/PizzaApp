import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// console.log(typeof window);

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop onClose={props.onClose}/>
        <ModalOverlay>{props.children}</ModalOverlay>,
    </React.Fragment>
  );
};

export default Modal;