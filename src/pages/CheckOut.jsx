import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { SectionTitle } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CheckOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { total, shipping } = useSelector((state) => state.cart);
    const [paymentWindow, setPaymentWindow] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phoneNumber: '',
        city: '',
        street: ''
    });

    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (paymentWindow && paymentWindow.closed) {
            clearInterval(windowCheckInterval);
        }
    }, [paymentWindow]);

    const createPaymentGrowApi = async () => {
        try {
            const response = await axios.post(`https://urbangents-1ee96bbd7b88.herokuapp.com/payment/createPayment`, {
                fullName: formData.firstName + " " + formData.lastName,
                phone: formData.phoneNumber,
                email: formData.email,
                sum: total * 0.9 + shipping
            });

            if (response.data.err) {
                toast.error(response.data.err.message);
                return;
            }

            const paymentUrl = response.data.data.url;
            const processId = response.data.data.processId;
            const processToken = response.data.data.processToken;

            const newWindow = window.open(paymentUrl);
            setPaymentWindow(newWindow);

            const windowCheckInterval = setInterval(() => {
                if (newWindow.closed) {
                    clearInterval(windowCheckInterval);
                    handlePaymentWindowClosed(processId, processToken);
                }
            }, 1000);
        } catch (error) {
            toast.error('Error creating payment. Please try again.');
        }
    };

    const handlePaymentWindowClosed = async (processId, processToken) => {
        try {
            const response = await axios.get(`https://urbangents-1ee96bbd7b88.herokuapp.com/payment/status`, {
                params: {
                    processId,
                    processToken
                }
            });

            if (response.data === true) {
                navigate(`/thank-you?firstName=${formData.firstName}&lastName=${formData.lastName}&email=${formData.email}&phoneNumber=${formData.phoneNumber}&city=${formData.city}&street=${formData.street}`);
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            toast.error('Error checking payment status. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, confirmEmail, phoneNumber, city, street } = formData;

        if (!firstName || !lastName || !email || !confirmEmail || !phoneNumber || !city || !street) {
            toast.error("Please fill in all fields");
            return;
        }

        if (email !== confirmEmail) {
            toast.error("Emails do not match");
            return;
        }

        if (!agreedToPolicy) {
            toast.error("You must agree to the privacy policy");
            return;
        }

        createPaymentGrowApi();
    };

    const isFormInvalid = !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.confirmEmail ||
        !formData.phoneNumber ||
        !formData.city ||
        !formData.street ||
        formData.email !== formData.confirmEmail ||
        !agreedToPolicy;

    const getButtonText = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.confirmEmail || !formData.phoneNumber || !formData.city || !formData.street) {
            return 'Please fill in all fields';
        } else if (formData.email !== formData.confirmEmail) {
            return 'Emails do not match';
        } else if (!agreedToPolicy) {
            return 'Accept the policy';
        } else {
            return 'Complete Purchase';
        }
    };

    return (
        <>
            <SectionTitle title="Check Out" path="Cart | Check Out" />
            <div className="isolate px-6 lg:px-8">
                <Form
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="mx-auto mt-16 max-w-xl sm:mt-20"
                >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="confirmEmail"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Confirmation email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="confirmEmail"
                                    id="confirmEmail"
                                    value={formData.confirmEmail}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.confirmEmail && (
                                    <p className="mt-2 text-sm text-red-600">{errors.confirmEmail}</p>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Phone number
                            </label>
                            <div className="relative mt-2.5">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    autoComplete="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="city"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                City
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="street"
                                className="block text-sm font-semibold leading-6 text-accent-content"
                            >
                                Street
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="street"
                                    id="street"
                                    autoComplete="address-line1"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="agree-to-policy"
                                className="mr-2"
                                checked={agreedToPolicy}
                                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                            />
                            <label htmlFor="agree-to-policy" className="text-sm">
                                I agree to the <button className="text-blue-600 underline" onClick={() => navigate('/policy')}>Privacy Policy</button>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
                                ${isFormInvalid ? 'bg-red-600 hover:bg-red-500 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            disabled={isFormInvalid}
                        >
                            {getButtonText()}
                        </button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default CheckOut;
