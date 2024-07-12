import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { TbBrandGoogleMaps } from "react-icons/tb";
import { useSelector } from "react-redux";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import "../styles/Footer.css";
const Footer = () => {

  const handleClickInsta = () => {
    window.open('https://www.instagram.com/siwarafashion?igsh=bnpvOGo0aWkybHly', '_blank');
  };

  const handleClickMap = () => {
    window.open('https://www.google.com/maps?q=32.699356,35.300732', '_blank');
  };

  const loginState = useSelector((state) => state.auth.isLoggedIn);

  return (
    <footer className="footer footer-center p-10 bg-base-00 text-base-content rounded mt-10 max-md:px-0 ">

      <nav className="grid grid-flow-col max-sm:grid-flow-row gap-4">
        <Link to="/" className="text-white link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          בית
        </Link>
        <Link to="/shop?stock=true" className="text-white link link-hover text-2xl max-md:text-xl text-accent-content">
          חנות
        </Link>
        <Link to="/about" className="text-white link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          אודות
        </Link>
        {!loginState && (
          <>
            <Link
              to="/login"
              className="text-white link link-hover text-2xl max-md:text-xl text-accent-content"
              onClick={() => window.scrollTo(0, 0)}
            >
              כניסה
            </Link>
            <Link
              to="/register"
              className="text-white link link-hover text-2xl max-md:text-xl text-accent-content"
              onClick={() => window.scrollTo(0, 0)}
            >
              הרשמה
            </Link>
          </>
        )}
      </nav>

      {/* <nav>
        <div className="grid grid-flow-col gap-4">
          <FaInstagram
            className="text-6xl max-sm:text-4xl text-accent-content cursor-pointer hover:text-blue-500"
            onClick={handleClickInsta}
          />
          <TbBrandGoogleMaps
            className="text-6xl max-sm:text-4xl text-accent-content cursor-pointer hover:text-red-500"
            onClick={handleClickMap}
          />
        </div>
      </nav> */}

      <div className="topbar border-b border-gray-800">
        <ul>
          <li>
            <FaHeadphones className="text-white text-2xl max-sm:text-lg text-accent-content" />
            <span className="text-white text-2xl max-sm:text-lg text-accent-content">
              +972 504368748
            </span>
          </li>
          <li>
            <FaRegEnvelope className="text-white text-2xl max-sm:text-lg text-accent-content" />{" "}
            <span className="text-white text-2xl max-sm:text-lg text-accent-content">
              urbangents.fashion@gmail.com
            </span>
          </li>
        </ul>
      </div>
      <aside>
        <p className="text-white text-2xl max-sm:text-sm text-accent-content">
          Copyright © 2024 - All right reserved by UrbanGents<br />Created by Saher Saadi
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
