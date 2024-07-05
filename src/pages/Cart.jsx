import React, { useState } from 'react';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { setShipping } from '../features/cart/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);
  const [deliveryOption, setDeliveryOption] = useState('');
  const dispatch = useDispatch();

  const handleDeliveryOptionChange = (e) => {
    const selectedOption = e.target.value;
    setDeliveryOption(selectedOption);

    if (selectedOption === 'pickup') {
      dispatch(setShipping(0));
    } else if (selectedOption === 'other_area') {
      dispatch(setShipping(40));
    } else {
      dispatch(setShipping(50));
    }
  };

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else if (!deliveryOption) {
      toast.error("Please select a delivery option");
    } else {
      navigate("/check-out");
    }
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />

          <div className='card cart-totals-card'>
            <div className='card-body'>
              <h2 className="text-lg font-semibold">Delivery Options</h2>

              <div className="mb-4">
                <input
                  type="radio"
                  id="pickup"
                  name="deliveryOption"
                  value="pickup"
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="pickup" className="ml-2">Pick up from store</label>
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="other_area"
                  name="deliveryOption"
                  value="other_area"
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="other_area" className="ml-2">Shipping to all the country areas +40</label>
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="jerusalem"
                  name="deliveryOption"
                  value="jerusalem"
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="jerusalem" className="ml-2">Shipping to Jerusalem and west bank +50</label>
              </div>
            </div>
          </div>
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'>
              Order Now
            </button>
          ) : (
            <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
