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
    <div className="bg-gray-100 dark:bg-[#151520]  w-full h-auto  py-4">
      <Wrapper>
        <h2 className="text-center max-md:text-lg md:text-2xl lg:text-3xl font-bold mb-4 text-black dark:text-white">
          We are the UAE’s Favorite Classifieds
        </h2>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 px-8 sm:grid-cols-3 ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center dark:bg-black p-6   rounded-lg shadow-md  w-full  max-w-md h-[22rem] mx-auto border border-[#DC39FC] flex flex-col items-center justify-center gap-4"
            >
              <h3 className="text-secondaryColorLight text-3xl lg:text-7xl font-extrabold mb-2">
                {stat.value}
              </h3>
              <p className="text-secondaryColorLight font-bold  text-base mb-2">
                {stat.title}
              </p>
              <p className="text-gray-500 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default StatsCards;
