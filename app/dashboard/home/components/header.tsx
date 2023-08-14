"use client";
import axios from "axios";
import { useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useSWRConfig } from "swr";
import UploadToast from "./UploadToast";

interface Props {
  accessToken: string;
}

export default function Header({ accessToken }: Props) {
  const { mutate } = useSWRConfig();
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      if (!e.target.files || !e.target.files[0]) return;
      setUploading(true);
      setShowToast(true);
      const file = e.target.files[0];
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user/upload`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      mutate(["/api/user/files", accessToken]);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setUploading(false);
    } catch (err) {
      console.log("err", err);
      setUploading(false);
    }
  }
  return (
    <div className="flex justify-between">
      <p className="text-2xl">Home</p>
      <div className="flex items-center">
        <button className="pr-4 pl-3 py-1 bg-gray-600 rounded-md flex items-center mr-3">
          <HiOutlineViewGrid className="w-5 h-5 mr-2" />
          View
        </button>
        <button
          className={`pr-4 pl-3 py-1 bg-orange-500 rounded-md flex items-center${
            uploading ? " opacity-80" : ""
          }`}
          onClick={handleClick}
          disabled={uploading}
        >
          <input
            type="file"
            onChange={handleChange}
            ref={inputRef}
            className="hidden"
          />
          {uploading ? (
            <AiOutlineLoading3Quarters className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <AiOutlinePlus className="w-5 h-5 mr-2" />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <UploadToast
        fileName={fileName}
        showToast={showToast}
        uploading={uploading}
      />
    </div>
  );
}
