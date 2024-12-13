import Image from "next/image";
import React from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

interface SectionProps {
    title: string;
    subtitle: string;
    products: Product[];
    onExplore: () => void;
}

const PopularItemSection: React.FC<SectionProps> = ({ title, subtitle, products, onExplore }) => {
    return (
        <div className="my-8 px-4 py-5">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <p className="text-gray-500 text-sm">{subtitle}</p>
                </div>

                <button
                    onClick={onExplore}
                    className="bg-custom-gradient  text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600"
                >
                    Explore More
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {product.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                {product.description}
                            </p>
                            <p className="text-purple-500 font-bold mt-2">{product.price}</p>
                            <div className="flex justify-end">
                                <button className="rounded-full w-3">
                                    <Image
                                        src="/images/arrowLeft.png"
                                        alt="Left Arrow"
                                        width={35}
                                        height={45}
                                    // className='w-[1.6rem] h-[1.1rem]'

                                    />
                                </button>
                                <button>
                                    <Image
                                        src="/images/arrowRight.png"
                                        alt="Right Arrow"
                                        width={35}
                                        height={45}
                                    // className='w-[1.6rem] h-[1.1rem]'

                                    />
                                </button>

                            </div>

                            <button
                                className="bg-btnGray flex justify-center items-center mx-auto text-white mt-2 w-[4rem] py-1 rounded-md text-sm hover:bg-purple-600"
                            >
                                Buy
                            </button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PopularItemSection;
