import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 text-center shadow-lg">
      <img src={process.env.PUBLIC_URL + product.image} alt={product.name} className="w-full h-48 object-cover"/>
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`} className="block mt-2 text-blue-500">View Details</Link>
    </div>
  );
};

export default ProductCard;
