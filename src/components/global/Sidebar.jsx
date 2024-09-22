import { sidebarPrimaryLinks } from "./sidebarLinks";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Squeeze as Hamburger } from "hamburger-react";
import logo from "../../assets/logo.png";


const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const [active, setActive] = useState(location.pathname); // Set initial active state based on current path
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <nav className="bg-dark-400 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="logo" className="h-auto w-20 logo" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {sidebarPrimaryLinks.map((link, index) => (
                  <Link
                    key={index}
                    className={`${
                      active === link.path
                        ? "bg-red_violet-400 text-white"
                        : "text-red_violet-400 hover:bg-red_violet-400 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                    to={`http://localhost:3000${link.path}`}
                    onClick={() => setActive(link.path)} // Update active state on click
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Hamburger
                toggled={isOpen}
                toggle={setIsOpen}
                color="black"
                size={25}
              />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sidebarPrimaryLinks.map((link, index) => (
              <Link
                key={index}
                className={`${
                  active === link.path
                    ? "bg-tyrian_purple-500 text-white"
                    : "text-tyrian_purple-600 hover:bg-mulberry-700 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
                to={`http://localhost:3000${link.path}`}
                onClick={() => {
                  setActive(link.path); // Update active state on click
                  setIsOpen(false);
                }}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* {width >= 320 && width < 768 ? <BottomBar /> : ""} */}
    </>
  );
};

export default Sidebar;
