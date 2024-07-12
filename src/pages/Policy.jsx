// src/PrivacyPolicy.js
import React from 'react';
import { Link } from "react-router-dom";

import '../styles/PrivatePolicy.css'; // Optional: Create a CSS file for styling

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">

      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-4xl font-bold text-center mb-8">Welcome to Siwarafashion</h2>

        <p className="text-lg  leading-relaxed">
          Siwarafashion is not just a store; it's a celebration of individuality, confidence, and style. Founded by a team of passionate fashion enthusiasts, we aim to provide a curated selection of apparel that empowers women to embrace their uniqueness.
        </p>
        <br />
        <p className="text-lg  leading-relaxed">
          From trendy streetwear to timeless classics, our collection caters to diverse tastes, ensuring there's something for everyone. We prioritize quality, partnering with trusted suppliers and designers to deliver garments crafted with care and attention to detail.
        </p>
        <br />
        <p className="text-lg  leading-relaxed">
          At Siwarafashion, customer satisfaction is paramount. Our knowledgeable staff is dedicated to assisting you at every step, whether you need styling advice or help finding the perfect outfit.
        </p>
        <br />
        <p className="text-lg  leading-relaxed">
          We're committed to sustainability and ethical practices, striving to minimize our environmental impact and support fair labor conditions. With every purchase, you're not just buying clothes; you're contributing to positive change.
        </p>
        <br />
        <p className="text-lg  leading-relaxed">
          Thank you for choosing Siwarafashion. Join us in celebrating your unique style journey!
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
