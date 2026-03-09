import React, { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(user){
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {

    try{
      let result = await fetch(
        `https://intern-e-comm1.onrender.com/orders/${user._id}`
      );

      result = await result.json();

      setOrders(result || []);
    }catch(err){
      console.log("Orders fetch error:",err);
    }

  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>My Orders</h1>

      {orders.length > 0 ?

        orders.map(order => (
          <div key={order._id} style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "10px"
          }}>
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹ {order.totalAmount}</p>
          </div>
        ))

        :

        <h3>No Orders Found</h3>
      }

    </div>
  );
}

export default Orders;