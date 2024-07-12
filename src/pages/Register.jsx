import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [firstName, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (firstName.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in the username field";
    } else if (lastName.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in the lastname field";
    } else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in the email field";
    } else if (phone.length !== 10) {
      isProceed = false;
      errorMessage = "Phone number must be exactly 10 digits";
    } else if (city.length < 3) {
      isProceed = false;
      errorMessage = "City must be longer than 2 characters";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a confirm password longer than 5 characters";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let regObj = {
      firstName,
      lastName,
      email,
      phone,
      city,
      street,
      password,
    };

    if (isValidate()) {
      try {
        const registrationResponse = await axios.post(
          "https://siwarafashion-server-59dda37c29fa.herokuapp.com/auth/register",
          regObj
        );

        console.log(registrationResponse.data);
        // Handle different response scenarios
        if (registrationResponse.data.error === "Email is taken") {
          // If email is already taken, show error message
          toast.error("Email is already taken");
        } else {
          // If registration is successful, show success message and navigate
          toast.success("Registration Successful");
          navigate("/login");
        }
      } catch (error) {
        // Handle any errors
        toast.error("Failed: " + error.message);
      }
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  return (
    <>
      <SectionTitle title="הרשמה" path="בית | הרשמה" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  שם
                </label>
              </div>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-right"
                value={firstName}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />

              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  משפחה
                </label>
              </div>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-right"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                required={true}
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  מייל
                </label>
              </div>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required={true}
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  טלפון
                </label>
              </div>
              <input
                type="tel"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={phone}
                onChange={handlePhoneChange}
                required={true}
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  עיר
                </label>
              </div>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-right"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required={true}
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  רחוב
                </label>
              </div>

              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-right"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required={true}
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  סיסמה
                </label>
              </div>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <div className="flex justify-end">
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  וודא הסיסמה
                </label>
              </div>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">הרשמה</span>
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
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              כבר יש לך חשבון? נא להתחבר
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
