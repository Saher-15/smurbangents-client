import React, { useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([
    "הכל",
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
        label="בחר קטיגוריה"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />

      {/* ORDER */}
      <FormSelect
        label="סינון לפי"
        name="order"
        list={["רגיל", "מחיר : מגבוה לנמוך", "מחיר : מנמוך לגבוה"]}
        size="select-sm"
        defaultValue="a-z"
      />

      {/* PRICE */}
      <FormRange
        name="price"
        label="בחר מחיר"
        size="range-sm"
        price={1000}
      />

      {/* In stock */}
      <FormCheckbox
        label="רק מוצרים במלאי"
        name="stock"
        defaultValue="true"
      />

      {/* BUTTONS */}

      <button
        type="submit"
        className="btn bg-blue-900 hover:bg-blue-700 text-white btn-sm"
      >
        חיפוש
      </button>
      <Link to="/shop?stock=true" className="btn bg-blue-900 hover:bg-blue-700 text-white btn-sm">
      איפוס
      </Link>
    </Form>
  );
};

export default Filters;
