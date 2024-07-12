import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "../styles/SubTotal.css";
import { setShipping } from '../features/cart/cartSlice';

const CartTotals = () => {
  const dispatch = useDispatch();
  const { total, shipping } = useSelector((state) => state.cart);
  // const { shipping } = useSelector((state) => state.cart);

  // const [shipping, setShipping] = useState(0);

  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'pickUpFromStore') {
      dispatch(setShipping(0));
    } else if (selectedOption === 'nazareth') {
      dispatch(setShipping(30));
    }
    else dispatch(setShipping(50));;
  };

  return (
    <div className='card cart-totals-card'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='subtotal-text'>
          <span className='font-medium'>₪{Math.round(total)}</span>
          <span>סכום</span>

        </p>
        <p className='subtotal-text'>
          <span className='font-medium'>₪{shipping}</span>
          <span>משלוח</span>

        </p>
        {/* Order Total */}
        <p className='order-total-text flex justify-between'>
          <span className='font-medium'>₪{Math.round(total) + shipping}</span>
          <span>סה"כ הזמנה</span>
        </p>

      </div>
    </div>
  );
};

export default CartTotals;
