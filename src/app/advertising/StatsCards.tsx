

import Wrapper from "@/components/Common/Wrapper/Wrapper";

const StatsCards = () => {
  const stats = [
    {
      value: "4.1M",
      title: "Monthly active users",
      description:
        "People from the UAE and beyond come to buy and sell anything.",
    },
    {
      value: "163M",
      title: "Monthly page views",
      description:
        "The sheer volume of content on GamerGizmo means endless opportunities.",
    },
    {
      value: "640K+",
      title: "Monthly unique buyers",
      description:
        "Buyers are attracted to high selection, and GamerGizmo offers just that.",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-[#151520] w-full h-auto py-4">
      <Wrapper className="max-sm:m-0  max-sm:px-0">
        <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-black dark:text-white">
          We are the UAE’s Favorite Classifieds
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 px-4 max-sm:px-0 sm:gap-4 lg:gap-0 max-sm:gap-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center dark:bg-black p-4 max-md:p-0 rounded-lg shadow-md w-full max-w-[19rem] h-[12rem] mx-auto border max-sm:h-[8rem] border-[#DC39FC] flex flex-col items-center justify-center"
            >
              <h3 className="text-secondaryColorLight text-sm md:text-xl font-extrabold">
                {stat.value}
              </h3>
              <p className="text-secondaryColorLight font-bold text-xs md:text-lg max-sm:text-xs">
                {stat.title}
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs max-md:text-[0.6rem]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default StatsCards;
