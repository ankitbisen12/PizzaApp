import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.column}>
            <p className={classes.heading}>About Us</p>
            <Link className={classes.link} href={"/"}>
              {" "}
              Disclamer
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Terms & Conditions
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Privacy Policy
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Know More
            </Link>
          </div>
          <div className={classes.column}>
            <p className={classes.heading}>Services</p>
            <Link className={classes.link} href={"/"}>
              {" "}
              Food Near Me
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Pizza Crust
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Pizza Mania
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Pizza fuel
            </Link>
          </div>
          <div className={classes.column}>
            <p className={classes.heading}>Branches</p>
            <Link className={classes.link} href={"/"}>
              {" "}
              Delhi
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Gwalior
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Indore
            </Link>
            <Link className={classes.link} href={"/"}>
              {" "}
              Bangalore
            </Link>
          </div>
          <div className={classes.column}>
            <p className={classes.heading}>Social Media</p>
            <Link className={classes.link} href={"/"} target="_blank">
              {" "}
              <FaFacebookF className={classes.i} /> Facebook
            </Link>
            <Link className={classes.link} href={"https://www.instagram.com/ankit_bisen18/"} target="_blank">
              {" "}
              <FaInstagram className={classes.i} /> Instagram
            </Link>
            <Link className={classes.link} href={"https://twitter.com/ankit_bisen18"} target="_blank">
              {" "}
              <FaXTwitter className={classes.i} /> Twitter
            </Link>
            <Link className={classes.link} href={"https://www.linkedin.com/in/ankit-bisen-13a55a1a7/"}  target="_blank">
              {" "}
              <FaLinkedin className={classes.i} /> Linkedin
            </Link>
          </div>
        </div>
      </div>
      {/* <div className={classes.container}>
        <div className={classes.info}>
          <p className={classes.p}>
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2008-2024 © Pizza
            Gilleria™ Ltd. All rights reserved.
          </p>
        </div>
      </div> */}
      <p className={classes.footer__copyright}>
        &copy; Copyright by{" "}
        <Link
          className={classes.footer__link}
          target="_blank"
          href="https://www.linkedin.com/in/ankit-bisen-13a55a1a7/">
          Ankit Bisen{" "}
        </Link>
        Use for learning or your portfolio.
      </p>
    </footer>
  );
};

export default Footer;
