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
      dispatch(setShipping(30));
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
      <SectionTitle title="עגלה" path="בית | עגלה" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />

          <div className='card cart-totals-card'>
            <div className='text-right card-body'>
              <h2 className="text-lg font-semibold">אפשרויות משלוח</h2>

              <div className="mb-4">
                <input
                  type="radio"
                  id="pickup"
                  name="deliveryOption"
                  value="pickup"
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="pickup" className="ml-2">איסוף מחנות +0</label>
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="other_area"
                  name="deliveryOption"
                  value="other_area"
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="other_area" className="ml-2">משלוח +30</label>
              </div>
            </div>
          </div>
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-blue-900 hover:bg-blue-700 text-white btn-block mt-8'>
              הזמן עכשיו
            </button>
          ) : (
            <Link to='/login' className='btn bg-blue-900 hover:bg-blue-700 btn-block text-white mt-8'>
              התחבר
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
