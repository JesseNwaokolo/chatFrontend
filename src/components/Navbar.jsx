import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import { IoIosChatboxes } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import Notification from "./Notification";

function Navbar() {
  const { user, logoutUser } = useContext(Context);
  return (
    <>
      <div className="bg-[#2b303a] text-white h-[3rem] px-4">
        <div className=" container mx-auto flex justify-between items-center h-full">
          <h2>
            <Link to="/" className="hover:text-[#92dce5] text-2xl font-bold flex items-center gap-x-2">
            <IoIosChatboxes /> Chat App
            </Link>
          </h2>
          {user && (
            <span className="text-yellow-400 text-[14px] hover:underline">
              Logged in as {user?.name}
            </span>
          )}

          <ul className="flex gap-x-5">
            {user && (
              <>
                <li>
                  {/* <Notification /> */}
                  <Link
                    onClick={() => {
                      logoutUser();
                    }}
                    to="/login"
                    className="hover:text-[#92dce5] flex gap-x-2 items-center"
                  >
                    <MdOutlinePowerSettingsNew /> Logout
                  </Link>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <Link to="/login" className="hover:text-[#92dce5]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#92dce5]">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
