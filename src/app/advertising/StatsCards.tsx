

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
      <Wrapper>
        <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-black dark:text-white">
          We are the UAE’s Favorite Classifieds
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 px-4 sm:gap-4 lg:gap-0 max-sm:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center dark:bg-black p-4 rounded-lg shadow-md w-full max-w-[12rem] h-[12rem] mx-auto border border-[#DC39FC] flex flex-col items-center justify-center"
            >
              <h3 className="text-secondaryColorLight text-sm md:text-xl font-extrabold">
                {stat.value}
              </h3>
              <p className="text-secondaryColorLight font-bold text-xs md:text-sm">
                {stat.title}
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs">
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
