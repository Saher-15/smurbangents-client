import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { store } from "../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const proceedLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://urbangents-1ee96bbd7b88.herokuapp.com/auth/login", {
        email,
        password
      });
      const data = response.data.user;
      if (data.email === email) {
        toast.success("Login successful");
        localStorage.setItem("id", data._id);
        const userdata = JSON.stringify(data);
        localStorage.setItem("user_Data", userdata);
        store.dispatch(loginUser());
        // console.log(data);
        navigate("/");
      } else {
        toast.warn("Email or password is incorrect");
      }
    } catch (error) {
      toast.error("Login failed due to: " + error.message);
    }
  };

  return (
    <>
      <SectionTitle title="כניסה" path="בית | כניסה" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={proceedLogin}>
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  מייל
                </label>
              </div>
              <input
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  סיסמה
                </label>
              </div>
              <input
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">כניסה</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/register"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              הרשמה
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
