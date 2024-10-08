import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import { FaRegUser } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import axios from "axios";

const Header = () => {
  // const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);

  const loginState = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    setIsLoggedIn(loginState);

    // fetchWishlist();
    setIsChecked(false); // Close the drawer when login state changes

  }, [loginState]);

  const handleLogout = () => {
    // Clear local storage or any other logout operations
    localStorage.removeItem("id");
    localStorage.removeItem("user_Data");
    dispatch(logout());
  };

  return (
    <>
      <div className="navbar bg-base-5000  text-white">
        <div className="flex-1 ">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black"
          >
            <AiFillShopping />
            UrbanGents
          </Link>
        </div>
        <div className="flex-none">
          {isLoggedIn && (
            <Link
              to="/wishlist"
              className="btn btn-ghost btn-circle text-accent-content "
            >
              <label className="btn btn-ghost btn-circle avatar">
                <div>
                  <FaHeart className="h-6 w-7 text-white" />
                </div>
              </label>
            </Link>
          )}
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-info text-accent-content">
                  סכום: ₪{total.toFixed(2)}
                </span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-blue-900 btn-block text-white hover:bg-blue-700 text-base-content"
                  >
                    צפה בסל הקניות
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div>
                  <FaRegUser className="text-2xl max-sm:text-lg text-accent-content text-white" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    פרופיל
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    היסטוריית הזמנות
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout} className="text-accent-content">התנתקות</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>





      <div className="navbar-bottom-menu border-y border-gray-800">
        <div className="drawer">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMiniBars3BottomLeft className="text-4xl" />
            </label>

          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className={`drawer-overlay ${isChecked ? "block" : "hidden"}`}
              onClick={() => setIsChecked(false)} // Close the drawer on click
            >
            </label>

            <ul
              className={`menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4 ${isChecked ? "block" : "hidden"
                }`}
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="flex justify-start">
                <FaWindowClose className="text-3xl cursor-pointer" onClick={() => setIsChecked(false)} />
              </div>
              {/* Sidebar content here */}
              <li className="text-xl">
                <NavLink
                  className="text-accent-content"
                  to="/"
                  onClick={() => setIsChecked(false)} // Close the drawer on click
                >
                  בית
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink
                  className="text-accent-content"
                  to="/shop?stock=true"
                  onClick={() => setIsChecked(false)} // Close the drawer on click
                >
                  חנות
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink
                  className="text-accent-content"
                  to="/about-us"
                  onClick={() => setIsChecked(false)} // Close the drawer on click
                >
                  אודות
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink
                  className="text-accent-content"
                  to="/policy"
                  onClick={() => setIsChecked(false)} // Close the drawer on click
                >
                  תקנון
                </NavLink>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="text-xl">
                    <NavLink
                      className="text-accent-content"
                      to="/register"
                      onClick={() => setIsChecked(false)} // Close the drawer on click
                    >
                      הרשמה
                    </NavLink>
                  </li>
                  <li className="text-xl">
                    <NavLink
                      className="text-accent-content"
                      to="/login"
                      onClick={() => setIsChecked(false)} // Close the drawer on click
                    >
                      כניסה
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="container text-2xl navlinks-container">

          {!isLoggedIn && (
            <>
              <NavLink
                className="text-accent-content"
                to="/login"
                onClick={() => setIsChecked(false)} // Close the drawer on click
              >
                כניסה
              </NavLink>
              <NavLink
                className="text-accent-content"
                to="/register"
                onClick={() => setIsChecked(false)} // Close the drawer on click
              >
                הרשמה
              </NavLink>
            </>
          )}
          <NavLink
            className="text-accent-content"
            to="/policy"
            onClick={() => setIsChecked(false)} // Close the drawer on click
          >
            תקנון
          </NavLink>
          <NavLink
            className="text-accent-content"
            to="/about-us"
            onClick={() => setIsChecked(false)} // Close the drawer on click
          >
            אודות
          </NavLink>
          <NavLink
            className="text-accent-content"
            to="/shop?stock=true"
            onClick={() => setIsChecked(false)} // Close the drawer on click
          >
            חנות
          </NavLink>
          <NavLink
            className="text-accent-content"
            to="/"
            onClick={() => setIsChecked(false)} // Close the drawer on click
          >
            בית
          </NavLink>
        </div>
      </div>

    </>
  );
};

export default Header;
