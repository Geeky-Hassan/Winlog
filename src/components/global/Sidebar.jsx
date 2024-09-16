import {sidebarPrimaryLinks} from "./sidebarLinks";
import {useState} from "react";
import { Link } from "react-router-dom";
import {Squeeze as Hamburger} from "hamburger-react";
import BottomBar from "./BottomBar";
import {useWindowSize} from "./ScreenSize";

const Sidebar = () => {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(true); // State for sidebar toggle
  const width = useWindowSize();
  
  return (
    <>
      <div className={`hidden md:relative md:flex h-full min-h-full float-left`}>
        {/* Hamburger icon always visible */}
        <div className="fixed top-4 left-4 z-50">
          <Hamburger easing="ease-in" toggled={isOpen} toggle={setIsOpen} color="white" size={25} />
        </div>

        {/* Sidebar content */}
        <div
          className={`transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } border-r border-gray-300 bg-gray-900 z-10 text-white min-h-screen h-full w-64 lg:w-72 p-4 flex flex-col`}
        >
          <div className="flex flex-col w-full flex-1 mr-20 mt-20">
            <h1 className="text-3xl ml-6 mt-2 mb-8 font-semibold">Brag doc</h1>
            {sidebarPrimaryLinks.map((link, index) => (
              <Link
                key={index}
                className={`${
                  active == link.path ? "border-l-[5px] border-l-primary bg-primary-light" : ""
                } py-3`}
                to={`http://localhost:3000${link.path}`}
                onClick={() => setActive(link.path)}
              >
                <div className="flex flex-row text-secondary pl-5 items-center gap-3">
                  {/* {link.icon} */}
                  <p className="font-light">{link.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {width>= 320 && width < 768 ?
      <BottomBar />
      :
      ''
      }
    </>
  );
};

export default Sidebar;
