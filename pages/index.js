import React from "react";
import Head from "next/head";
import Meals from "@/components/Meals/Meals";
import Pizza from "@/models/Pizza";
import HeaderImg from "@/components/Layout/HeaderImg";
import ScrollTopButton from "../components/ScrollTopButton";
import { ToastContainer } from "react-toastify";
import Description from "@/components/Layout/Description";

const mongoose = require("mongoose");

export default function Home(props) {
  // console.log(props);
  return (
    <React.Fragment>
      <Head>
        <title>Pizza Gilleria</title>
        <meta
          name="description"
          content="Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home."
        />
      </Head>
      <ToastContainer />
      <HeaderImg />
      <Meals pizza={props.pizza} />
      <Description />
      <ScrollTopButton />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    // console.log("Running");
    await mongoose.connect(process.env.MONGO_URI);
  }

  let pizzas = await Pizza.find({});

  return {
    props: {
      pizza: JSON.parse(JSON.stringify(pizzas)),
    },
  };
}
