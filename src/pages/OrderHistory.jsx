import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";
import { useLoaderData } from "react-router-dom";


export const orderHistoryLoader = async () => {
  const response = await axios.get(`https://urbangents-1ee96bbd7b88.herokuapp.com/user/get_orders/${localStorage.getItem("id")}`);
  return { orderHistory: response.data };
};

const OrderHistory = () => {
  const { orderHistory } = useLoaderData();
  // cancelled, in progress, delivered
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [orders, setOrders] = useState(orderHistory);

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  return (
    <>
      <SectionTitle title="היסטוריית הזמנות" path="בית | היסטוריית הזמנות" />
      <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-10">
        {orders?.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl text-accent-content">
              אין הזמנות בהיסטוריית ההזמנות
            </h1>
            <Link
              to="/shop?stock=true"
              className="btn bg-blue-600 hover:bg-blue-500 text-white mt-10"
            >
              בצע את ההזמנה הראשונה שלך
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            return (
              <div
                key={nanoid()}
                className="collapse collapse-plus bg-base-200 mb-2"
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-accent-content">
                  {order._id} - {order.orderStatus}
                </div>
                <div className="collapse-content">
                  <div className="overflow-x-auto">
                    <table className="table max-sm:table-xs table-pin-rows table-pin-cols">
                      {/* head */}
                      <thead>
                        <tr className="text-accent-content">
                          <th>הזמנה</th>
                          <th>תמונה</th>
                          <th>שם</th>
                          <th>מידה</th>
                          <th>מחיר</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems.map((product, counter) => (
                          <tr className="text-accent-content" key={nanoid()}>
                            <th>{counter + 1}</th>
                            <th><img src={`${product.imageUrl}`} alt="" className="w-10" /></th>
                            <td>{product.name}</td>
                            <td>{product.selectedSize}</td>
                            <td>₪{(product.price).toFixed(2)}</td>                          </tr>
                        ))}
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h4 className="text-md text-accent-content">
                              סכום ₪{Math.round(order?.subtotal)}
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-md text-accent-content">
                              משלוח  ₪{order?.shippingCost}
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-xl text-accent-content">
                              - סה"כ הזמנה : ₪{Math.round(order?.subtotal + order?.shippingCost)} -
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default OrderHistory;
