import Image from 'next/image'
import React, { use } from 'react'
import Wrapper from './Common/Wrapper/Wrapper'
import { useRouter } from 'next/navigation';

const FreeAdSection = () => {
    const router = useRouter();
    return (
        <Wrapper>
            <div className="dark:bg-secondaryBlack dark:text-white text-gray-800  grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 items-center mb-4 p-1">
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <Image
                            src="/images/adds.png"
                            alt="Free Ad"
                            width={50}
                            height={50}
                        />
                    </div>
                    <h3 className="md:text-xl font-semibold max-md:text-lg">
                        Free Ad
                    </h3>
                    <p className=" md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                        Post your ads for free in 30 seconds at a better price.
                    </p>
                </div>
                {/* Genuine Buyer Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <Image
                            src="/images/handshake.png"
                            alt="Genuine Buyer"
                            width={50}
                            height={50}
                        />
                    </div>
                    <h3 className="md:text-xl font-semibold max-md:text-lg">
                        Genuine Buyer
                    </h3>
                    <p className="text-gray-600 dark:text-white md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                        Get authentic offers from verified buyers at a better price.
                    </p>
                </div>
                {/* Sell Faster Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <Image
                            src="/images/adds.png"
                            alt="Sell Faster"
                            width={50}
                            height={50}
                        />
                    </div>
                    <h3 className="md:text-xl font-semibold max-md:text-lg">
                        Sell Faster
                    </h3>
                    <p className="text-gray-600 dark:text-white md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                        Sell your product faster than others at a better price.
                    </p>
                </div>
                {/* Call-to-Action Button */}
                <button
                    onClick={() => router.push("/publish-ad")}
                    className="bg-custom-gradient  
    cursor-pointer text-white  w-36 h-12 rounded-full shadow-md text-sm max-md:mt-8 max-md:mx-auto max-md:col-span-full sm:col-span-full md:col-auto max-md:mb-2"
                >
                    Sell Your Product
                </button>
            </div>
        </Wrapper>
    )
}

export default FreeAdSection
