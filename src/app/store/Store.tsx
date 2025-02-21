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
    <div className="bg-custom-gradient dark:bg-custom-gradient dark:border dark:border-white shadow-lg rounded-lg p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-40 p-2 object-cover rounded"
      />
      <div className="mt-2">
        <p className="text-white font-bold text-md dark:text-white">
          AED {price}
        </p>
        <h3 className="text-white dark:text-white font-semibold text-sm truncate">
          {title}
        </h3>
        <p className="text-white text-xs dark:text-white">{time}</p>
        <p className="text-white text-xs font-semibold dark:text-white">
          Sold: {sold}
        </p>
      </div>
    </div>
  );
};

const StorePage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 dark:bg-[#1e1e2f] ">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default StorePage;
