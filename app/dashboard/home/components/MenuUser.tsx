"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

import { logout } from "../api/fetcher";
import { useRouter } from "next/navigation";

interface Props {
  accessToken: string;
}

export default function MenuUser({ accessToken }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await logout(accessToken);
    router.push("/login");
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="p-2 rounded-full">
          <FaUserCircle className="h-10 w-10 cursor-pointer text-slate-300" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button className="text-slate-200 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                <RiProfileLine className="mr-2 h-5 w-5" aria-hidden="true" />
                My Profile
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="text-slate-200 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                <IoSettingsOutline
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Settings
              </button>
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                <BiLogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
