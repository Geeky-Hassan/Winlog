import { Link } from "react-router-dom";
import {sidebarPrimaryLinks} from "./sidebarLinks";
const BottomBar = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-600">
        <div className={`grid h-full max-w-lg grid-cols-4 mx-auto font-medium`}>
          {sidebarPrimaryLinks.map((link, index) => (
            <Link
              key={index}
                href={`/${link.path}`}             
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              {/* {link.icon} */}
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default BottomBar;
