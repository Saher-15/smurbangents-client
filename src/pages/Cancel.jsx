import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";
import { store } from "../store";
import { useLocation } from 'react-router-dom';

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total, shipping } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);


  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    } else {
      // Check if there are items in the cart and create order
      if (cartItems.length > 0) {
        createNewOrder();
      }
    }
  }, []);

  return (
    <>
      <SectionTitle title="Thank You" path="Home | Cart | Thank you" />
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          תודה על הרכישה! -----ביטל
        </h2>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          הנה כמה פעולות שבאפשרותך לבצע כעת: --------- לבטל
        </h3>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/order-history">&rarr; ראה היסטוריית הזמנות &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/">&rarr; עיין במוצרים נוספים וקנה עוד &larr;</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ThankYou;
