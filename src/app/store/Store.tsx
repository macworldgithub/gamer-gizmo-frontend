import React from "react";

const products = [
  {
    image: "/images/gpu2.png",
    price: "5,499",
    title: "LG InstaView Door in Door French...",
    time: "5 hours ago",
    sold: 12,
  },
  {
    image: "/images/gpu2.png",
    price: "6,899",
    title: "Samsung 85 Inch Neo QLED 4K...",
    time: "8 hours ago",
    sold: 8,
  },
  {
    image: "/images/gpu2.png",
    price: "2,999",
    title: "Samsung 50 Inch Neo QLED 4K...",
    time: "8 hours ago",
    sold: 15,
  },
  {
    image: "/images/gpu2.png",
    price: "12,999",
    title: "Samsung 98 Inch Q80C 4K QLED...",
    time: "8 hours ago",
    sold: 5,
  },
  {
    image: "/images/gpu2.png",
    price: "12,999",
    title: "Samsung 77 Inch OLED S95D 4K...",
    time: "8 hours ago",
    sold: 7,
  },
  {
    image: "/images/gpu2.png",
    price: "12,999",
    title: "Samsung 77 Inch OLED S95D 4K...",
    time: "8 hours ago",
    sold: 7,
  },
  {
    image: "/images/gpu2.png",
    price: "12,999",
    title: "Samsung 77 Inch OLED S95D 4K...",
    time: "8 hours ago",
    sold: 7,
  },
  {
    image: "/images/gpu2.png",
    price: "12,999",
    title: "Samsung 77 Inch OLED S95D 4K...",
    time: "8 hours ago",
    sold: 7,
  },
  
];

//@ts-ignore
const ProductCard = ({ image, price, title, time, sold }) => {
  return (
    <div className="bg-white dark:bg-black dark:border dark:border-white shadow-lg rounded-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
      <img src={image} alt={title} className="w-full h-40 p-2 object-cover rounded" />
      <div className="mt-2">
        <p className="text-[#6345ED] font-bold text-md">AED {price}</p>
        <h3 className="text-gray-800 dark:text-white font-semibold text-sm truncate">{title}</h3>
        <p className="text-gray-500 text-xs">{time}</p>
        <p className="text-green-600 text-xs font-semibold">Sold: {sold}</p>
      </div>
    </div>
  );
};

const StorePage = () => {
  return (
    <div className="flex flex-wrap gap-4 p-6 justify-center dark:bg-black">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default StorePage;
