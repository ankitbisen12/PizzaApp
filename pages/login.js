import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "../styles/login.module.css";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/reducers/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokken, setTokken] = useState();
  const [error,setError] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    setTokken(token);
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
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    // console.log(email, password);
    let res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(res);
    let response = await res.json();
    console.log(response);  

    if (response.success) {
      localStorage.setItem("token", response.token);
      toast.success("Successfully Logged In 🔓", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      });
      router.push("/");
    } else {
      // toast.error("Invalid credentials", {
      //   position: "top-center",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
      setError("Invalid credentials");

      // toast.error(response.error, {
      //   position: "top-center",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   theme: "dark",
      // });
      
    }

    setEmail("");
    setPassword("");
    dispatch(resetCart());
  };


  return (
    <React.Fragment>
      <div className={classes.outer_div}>
      <ToastContainer />
        <div className={classes.container}>
          <div className={classes.inner_container}>
            <div className={classes.icon_div}>
              <FaUserCircle className={classes.user_div} />
            </div>
            <div className={classes.title}>
              <label htmlFor="login">LOGIN</label>
              <hr className={classes.hr1} />
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.control}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={email}
                  required
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="Password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={password}
                  required
                />
                {error && <p>{error}</p>}
              </div>
              <div className={classes.actions}>
                <button className={classes.submit} type="submit">
                  Login
                </button>
              </div>
              <div className={classes.actions}>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a Member?{" "}
                  <Link href={"/signup"} className={classes.link}>
                    Signup
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
