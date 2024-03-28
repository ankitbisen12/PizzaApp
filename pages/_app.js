import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import store from "../redux/store";
import Cart from "@/components/Cart/Cart";
import LoadingBar from "react-top-loading-bar";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [cartIsShown, setCartIsShown] = useState(false);
  const router = useRouter();

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

  }, [router.query]);


  return (
    <React.Fragment>
      <LoadingBar
        style={{ color: "#fdbf" }}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Provider store={store}>
        <Header onShowCart={showCartHandler}  />
        <Component {...pageProps} />;
        {cartIsShown && <Cart onClose={hideCartHandler} />}
      </Provider>
      <Footer />
    </React.Fragment>
  );
}
