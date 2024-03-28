import Card from "@/components/UI/Card";
// import Orders from "@/models/Orders";
// import { getOrder } from "@/utils/getOrder";
import React, { useEffect, useState } from "react";
import classes from "../styles/login.module.css";
var jwt = require("jsonwebtoken");

const Order = () => {
  // const[tokenn,setTokenn]=useState();
  // const[orders,setOrders] = useState();

  // useEffect(() => {
  //     const fetchOrders = async () => {
  //         try {
  //           // Retrieve token from localStorage
  //           const token = localStorage.getItem('token');
  //           // Decode the token
  //           const decodedToken = jwt.decode(token);
  //           // Set the token state
  //           setTokenn(decodedToken);
  //           // Extract user ID from the token
  //           const id = decodedToken.userId;
  //           // Fetch orders for the user from the database
  //           const fetchedOrders = await Orders.find({});
  //           // Set the orders state with the fetched data
  //           setOrders(fetchedOrders);
  //         } catch (error) {
  //           console.error('Error fetching orders:', error);
  //         }
  //       };

  //       // Call the fetchOrders function when the component mounts
  //       fetchOrders();
  // }, [])

  return (
    <div className={classes.outer_div}>
      <div className={classes.container}>
        <div className={classes.inner_container}>
          <div style={{ padding: "20px 0px" }}>
            <Card>
              <p>Work in Progress</p>
              <p>Orders will be displayed soon.</p>
              <p>Please check after some time</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
