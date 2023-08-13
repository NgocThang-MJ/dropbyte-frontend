import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineExternalLink, HiDownload } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { mutate } from "swr";

import { deleteFile, downloadFile } from "../api/fetcher";

interface Props {
  fileName: string;
  fileId: string;
  accessToken: string;
}

export default function MenuItem({ fileName, fileId, accessToken }: Props) {
  async function handleDeleteFile() {
    if (!accessToken) return;
    await deleteFile(fileName, fileId, accessToken);
    mutate(["/api/user/files", accessToken]);
  }
  async function handleDownloadFile() {
    if (!accessToken) return;
    await downloadFile(fileId, fileName, accessToken);
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="p-2 hover:bg-slate-700 hover:bg-opacity-80 rounded-full">
          <HiEllipsisVertical
            className="h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
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
              <a
                href={`https://f005.backblazeb2.com/file/liquiddev99/${fileName}`}
                target="_blank"
                className="text-slate-200 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                <HiOutlineExternalLink
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Open
              </a>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={handleDownloadFile}
                className="text-slate-200 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                <HiDownload className="mr-2 h-5 w-5" aria-hidden="true" />
                Download
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={handleDeleteFile}
                className="text-slate-200 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                <AiOutlineStar className="mr-2 h-5 w-5" aria-hidden="true" />
                Add to Favourite
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={handleDeleteFile}
                className="text-red-400 hover:bg-slate-500 group flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                <BiTrash className="mr-2 h-5 w-5" aria-hidden="true" />
                Delete
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
