import Image from "next/image";
import { AiOutlineStar, AiOutlineHome, AiOutlineDelete } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";

import Logo from "../../public/logo.png";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-3 px-10 text-slate-200">
      <div className="flex">
        <div className="sideBar pr-5">
          <div className="flex items-center h-20 pb-2 relative pr-10">
            <Image src={Logo} alt="Logo" width={50} />
            <p className="ml-2 text-3xl text-slate-200">Dropbyte</p>
            <div className="absolute bottom-0 w-screen h-[1px] bg-slate-600 -left-10"></div>
            <div className="absolute right-0 h-screen w-[1px] bg-slate-600 -top-4"></div>
          </div>
          <div className="pt-4">
            <div>
              <p className="text-slate-300 mb-2">File Manager</p>
              <div className="flex items-center hover:bg-slate-600 px-3 py-1.5 rounded-md cursor-pointer my-0.5">
                <AiOutlineHome className="w-6 h-6 mr-2.5" />
                My Storage
              </div>
              <div className="flex items-center hover:bg-slate-600 px-3 py-1.5 rounded-md cursor-pointer my-0.5">
                <AiOutlineStar className="w-6 h-6 mr-2.5" />
                Favourites
              </div>
              <div className="flex items-center hover:bg-slate-600 px-3 py-1.5 rounded-md cursor-pointer my-0.5">
                <AiOutlineDelete className="w-6 h-6 mr-2.5" />
                Trash
              </div>
            </div>
          </div>
        </div>

        <div className="grow">
          <div className="flex justify-between items-center pl-14 h-20 pb-2">
            <div>
              <input
                className="px-4 py-1 rounded-md text-slate-200 border border-slate-500 bg-bgcolor w-[30rem] outline-none"
                placeholder="Search files"
              />
            </div>
            <div className="flex items-center">
              <IoNotificationsOutline className="h-7 w-7 cursor-pointer text-slate-300 mr-3.5" />
              <IoSettingsOutline className="h-7 w-7 cursor-pointer text-slate-300 mr-6" />
              <FaUserCircle className="h-10 w-10 cursor-pointer text-slate-300" />
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
