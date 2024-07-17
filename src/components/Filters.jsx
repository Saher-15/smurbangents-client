import React, { useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([
    "all",
    "Jeans",
    "Jackets",
    "Pants",
    "Shorts",
    "Shirts",
    "Scirts",
    "T-Shirts",
  ]);

  return (
    <Form className="bg-base-500 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["none", "price : high to low", "price : low to high"]}
        size="select-sm"
        defaultValue="a-z"
      />

      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={1000}
      />

      {/* In stock */}
      <FormCheckbox
        label="Only products in stock"
        name="stock"
        defaultValue="true"
      />

      {/* BUTTONS */}

      <button
        type="submit"
        className="btn bg-blue-900 hover:bg-blue-700 text-white btn-sm"
      >
        search
      </button>
      <Link to="/shop?stock=true" className="btn bg-blue-900 hover:bg-blue-700 text-white btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
