import React, { useState } from "react";
import { SectionTitle, WishItem } from "../components";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const wishListLoader = async () => {
  const response = await axios.get(`https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/get_wishlist/${localStorage.getItem("id")}`);
  return { wishItems: response.data };
};

const Wishlist = () => {
  const { wishItems } = useLoaderData();
  const [wishList, setWishList] = useState(wishItems); // State to track wishlist items

  const removeFromWishlistHandler = async (product) => {
    try {
      await axios.delete(
        `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/remove_item_from_wishlist/${localStorage.getItem("id")}/${product.id}`
      );
      setWishList(wishList.filter(item => item.id !== product.id)); // Remove the item from the wishlist
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product from the wishlist");
    }
  };

  return (
    <>
      <SectionTitle title="סל העדיפויות" path="בית | סל העדיפויות" />
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-accent-content">שם</th>
                <th className="text-accent-content">תמונה</th>
                <th className="text-accent-content">פעולה</th>
              </tr>
            </thead>
            <tbody>
              {wishList.map((item, index) => (
                <WishItem item={item} key={index} counter={index} removeFromWishlist={removeFromWishlistHandler} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
