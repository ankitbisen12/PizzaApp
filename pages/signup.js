import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "../styles/login.module.css";
import { RiUserAddFill } from "react-icons/ri";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  let token;

  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      toast.info("You are already logged in ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password, name };
    // console.log(email, password, name);

    let res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(res);
    let response = await res.json();
    // console.log("Response from signup page",response);
    setEmail("");
    setPassword("");
    setName("");

    if (response.success) {
      router.push("/login");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className={classes.outer_div}>
        <div className={classes.container}>
          <div className={classes.inner_container}>
            <div className={classes.icon_div}>
              <RiUserAddFill className={classes.user_div} />
            </div>
            <div className={classes.title}>
              <label htmlFor="login">SIGNUP</label>
              <hr className={classes.hr2} />
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="Password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={classes.actions}>
                <button className={classes.submit} type="submit">
                  Signup
                </button>
              </div>
              <div className={classes.actions}>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Already have Account?{""}
                  <Link href={"/login"} className={classes.link}>
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
