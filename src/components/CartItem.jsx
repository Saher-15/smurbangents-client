import { useDispatch } from "react-redux";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";
import { FaHeartCrack } from "react-icons/fa6";


const CartItem = ({ cartItem }) => {
  const { id, name, price, discount, imageUrl, amount, selectedSize } =
    cartItem;

  const dispatch = useDispatch();

  return (
    <article
      key={id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={`${imageUrl}`}
        alt={name}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium text-accent-content">{name}</h3>

        <h4 className="mt-2 capitalize text-sm text-accent-content">
          Size: {selectedSize}
        </h4>
      </div>
      <div className="sm:ml-12">
        {/* REMOVE */}
        <button
          className="btn btn-xs btn-error text-sm"
          onClick={() => dispatch(removeItem(id))}
        >
          <FaHeartCrack />
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto text-accent-content">₪{(price).toFixed(2)}</p>
    </article>
  );
};

export default CartItem;
