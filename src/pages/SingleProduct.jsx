import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SectionTitle,
  SelectSize,
  Heroo,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../features/cart/cartSlice";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;
  const response = await axios(`https://siwarafashion-server-59dda37c29fa.herokuapp.com/product/getProduct/${id}`);
  return { productData: response.data };
};

const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { productData } = useLoaderData();
  const [size, setSize] = useState("");

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    isProductInWishlist();
  }, []);

  async function isProductInWishlist() {
    try {
      const getResponse = await axios.get(
        `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/get_wishlist/${localStorage.getItem("id")}`
      );
      const data = getResponse.data;

      // Check if the product is in the wishlist
      const isInWishlist = data.findIndex((item) => item.id === productData?._id) !== -1;
      setProduct({
        ...product,
        isInWishList: isInWishlist
      });
    } catch (error) {
      console.error(error);
    }
  }

  const [product, setProduct] = useState({
    id: productData?._id,
    name: productData?.name,
    imageUrl: productData?.imageUrl,
    price: productData?.price,
    discount: productData?.discount,
    selectedSize: size,
    isInWishList: false
  });

  useEffect(() => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      selectedSize: size
    }));
  }, [size]);

  const addToWishlistHandler = async () => {
    try {
      // If product is not in wishlist, add it
      if (!product.isInWishList) {
        await axios.patch(
          `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/add_to_wishlist/${localStorage.getItem("id")}`,
          product
        );
        toast.success("Product added to the wishlist!");
        setProduct({
          ...product,
          isInWishList: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlistHandler = async () => {
    try {
      // If product is in wishlist, remove it
      if (product.isInWishList) {
        await axios.delete(
          `https://siwarafashion-server-59dda37c29fa.herokuapp.com/user/remove_item_from_wishlist/${localStorage.getItem("id")}/${product.id}`,
        );
        toast.success("Product removed from the wishlist!");
        setProduct({
          ...product,
          isInWishList: false
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleButtonClick = () => {

    if (loginState) {
      if (isInCart) {
        dispatch(removeItem(product.id));
      }
      else if (!size || size === "Pick your size") {
        toast.error("Please select a valid size before adding to the cart");
      }
      else {
        const productWithDiscount = { ...product, price: product.price * product.discount };
        dispatch(addToCart(productWithDiscount));
      }
    } else {
      toast.error("You must be logged in to add products to the cart");
    }
  };

  return (
    <>
      <SectionTitle title="דף מוצר" path="בית | חנות | דף מוצר" />
      <div className="topbar border-b border-gray-800 grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
        <div className="product-images flex flex-col justify-center max-lg:justify-start">
          <img
            src={`${productData?.additionalImageUrls[currentImage]}`}
            className="w-96 text-center border border-gray-600 cursor-pointer"
            alt={productData.name}
          />
          <div className="other-product-images mt-1 grid grid-cols-3 w-96 gap-y-1 gap-x-2 max-sm:grid-cols-2 max-sm:w-64">
            {productData?.additionalImageUrls.map((imageObj, index) => (
              <img
                src={`${imageObj}`}
                key={nanoid()}
                onClick={() => setCurrentImage(index)}
                alt={productData.name}
                className="w-32 border border-gray-600 cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {productData?.name}
          </h2>
          <p
            className={`text-3xl ${productData?.discount < 1 ? 'line-through' : ''} `}
          >
            ₪{productData?.price}
          </p>
          {productData?.discount < 1 && (
            <p className="text-3xl text-error">
              ₪{(productData?.discount * productData?.price)?.toFixed(2) || '0.00'}
            </p>
          )}
          <div className="text-xl max-sm:text-lg text-accent-content">
            {parse(productData?.description)}
          </div>
          <div className="text-2xl">
            <SelectSize
              sizeList={["בחר את המידה שלך", ...productData?.availableSizes]}
              size={size}
              setSize={setSize}
            />
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className={`btn bg-blue-600 hover:bg-blue-500 text-white ${!productData?.isInStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleButtonClick}
              disabled={!productData?.isInStock}
            >
              <FaCartShopping className="text-xl mr-1" />
              {!productData?.isInStock ? (
                'אזל מהמלאי'
              ) : (
                isInCart ? 'הסרה מעגלה' : 'הוסף לעגלה'
              )}
            </button>

            {product?.isInWishList ? (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    removeFromWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to remove products from the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                הסרה מסל העדיפויות
              </button>
            ) : (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    addToWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to add products to the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                הוסף לסל העדיפויות

              </button>
            )}
          </div>
          <div className="other-product-info flex flex-col gap-x-2">
            <div
              className={
                productData?.isInStock
                  ? "badge bg-gray-500 badge-lg font-bold text-white p-5 mt-2"
                  : "badge bg-gray-500 badge-lg font-bold text-white p-5 mt-2"
              }
            >
              במלאי : {productData?.isInStock ? "כן" : "לא"}
            </div>

            <div className="badge bg-gray-500 badge-lg font-bold text-white p-5 mt-2">
              קטגוריה : {productData?.category}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
