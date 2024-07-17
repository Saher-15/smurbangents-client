/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // /posts?title=json-server&author=typicode
  // GET /posts?_sort=views&_order=asc
  // GET /posts/1/comments?_sort=votes&_order=asc

  const filterObj = {
    category: params.category ?? "all",
    order: params.order ?? "",
    price: params.price ?? "all",
    search: params.search ?? "",
    in_stock: params.stock === undefined ? false : true,
    current_page: Number(params.page) || 1
  };
  const itemsPerPage = 20;

  function buildUrl(category, sort_by, max_price, is_in_stock) {
    let string;
    let updatedSortBy = sort_by; // Create a new variable to store the updated sort_by value
    if (sort_by === 'price : high to low') {
      updatedSortBy = 'desc'; // Update the local variable
    }
    else if (sort_by === 'price : low to high') {
      updatedSortBy = 'asc'; // Update the local variable
    }
    else if (sort_by === 'none') {
      updatedSortBy = ''; // Update the local variable
    }
    if (max_price === 'all') {
      max_price = 10000;
    }

    if (category === 'all' && updatedSortBy === '') {
      string = `&max_price=${max_price}&is_in_stock=${is_in_stock}`;
    }
    else if (category === 'all' && updatedSortBy !== '') {
      string = `&max_price=${max_price}&is_in_stock=${is_in_stock}&sort_by=${updatedSortBy}`;
    }
    else if (category !== 'all' && updatedSortBy === '') {
      string = `&max_price=${max_price}&is_in_stock=${is_in_stock}&category=${category}`;
    }
    else if (category !== 'all' && updatedSortBy !== '') {
      string = `&max_price=${max_price}&is_in_stock=${is_in_stock}&category=${category}&sort_by=${updatedSortBy}`;
    }
    return string;
  }

  try {
    const url = buildUrl(filterObj.category, filterObj.order, filterObj.price, filterObj.in_stock)
    const response = await axios.get(
      `https://urbangents-1ee96bbd7b88.herokuapp.com/product/getNProducts?page=${filterObj.current_page}&size=${itemsPerPage}${url}`

    );
    let data = response.data.data;
    // sorting in descending order
    // if (filterObj.order && !(filterObj.order === "none" || filterObj.order === "price low")) data.sort((a, b) => b.price - a.price)
    return { productsData: data, productsLength: data.length, page: filterObj.current_page };
  } catch (error) {
    console.log(error.response);
  }
  // /posts?views_gte=10

  return null;
};

const Shop = () => {

  const productLoaderData = useLoaderData();


  return (
    <>
      <SectionTitle title="חנות" path="בית | חנות" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters />
        {productLoaderData.productsData.length === 0 && <h2 className="text-accent-content text-center text-4xl my-10">No products found for this filter</h2>}
        <div className="selected-products-grid max-w-7xl mx-auto">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={product._id}
                id={product._id}
                title={product.name}
                image={product.imageUrl}
                price={
                  product.discount < 1 ? (
                    <>
                      <span style={{ textDecoration: 'line-through' }} >
                        {product.price}
                      </span>
                      &nbsp;
                      <span className="text-3xl text-error">₪{(product.price * product.discount).toFixed(2)}</span>
                    </>
                  ) : (
                    `${product.price}`
                  )
                }
              />

            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
