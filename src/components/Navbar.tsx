import TopNav from "./TopNav";

import BottomNavigationBar from "./BottomNavigationBar";
const Navbar = () => {
  // const currentTheme = useSelector((state: any) => state.theme.theme);

  return (
    <div className="bg-white w-screen">
      {/* Top Bar */}

      <TopNav />
      {/* Bottom Navigation Bar */}
      <BottomNavigationBar />
    </div>
  );
};

export default Navbar;
