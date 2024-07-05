import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartCrack } from "react-icons/fa6";
import { toast } from 'react-toastify';
const WishItem = ({ item, counter, removeFromWishlist }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/shop/product/${item.id}`);
  };

  const handleRemoveClick = async (event) => {
    event.stopPropagation(); // Prevent the row click event from triggering
    try {
      await removeFromWishlist(item);
      toast.success("Product removed from the wishlist!");
    } catch {
      toast.error("Failed to remove product from the wishlist!");
    }
  };

  return (
    <tr onClick={handleRowClick} style={{ cursor: 'pointer' }}>
      <td>{counter + 1}</td>
      <td className="text-accent-content">{item.name}</td>
      <td className="text-accent-content">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
        />
      </td>
      <td className="text-accent-content">
        <button className="btn btn-xs btn-error text-sm" onClick={handleRemoveClick}>
          <FaHeartCrack />
          Remove
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
