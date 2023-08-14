"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { AiFillFileAdd, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCloudUpload } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import Lottie from "lottie-react";
import { Tooltip } from "react-tooltip";

import FileType from "./FileType";
import SuccessLottie from "../../public/success.json";
import { convertBytes } from "../util/converter";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [link, setLink] = useState("");
  const [copyText, setCopyText] = useState("Copy to clipboard");
  const [controller, setController] = useState(new AbortController());

  const inputRef = useRef<HTMLInputElement>(null);

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleClick() {
    if (isLoading) return;
    if (!inputRef.current) return;
    inputRef.current.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    setFile(e.dataTransfer.files[0]);
  }

  async function handleUpload() {
    try {
      if (!file) return;
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/upload`,
        formData,
        {
          signal: controller.signal,
        }
      );
      setFile(null);
      setIsLoading(false);
      const escapedName = encodeURIComponent(res.data.fileName);
      setLink(`https://f005.backblazeb2.com/file/liquiddev99/${escapedName}`);
      setIsSuccess(true);
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
    }
  }

  function cancelUpload() {
    controller.abort();
    setController(new AbortController());
    setIsLoading(false);
  }

  return (
    <div className="w-1/2 h-96 border border-slate-900 rounded-lg shadow-2xl flex justify-center">
      {isSuccess ? (
        <div className="flex flex-col items-center w-5/6">
          <Lottie
            animationData={SuccessLottie}
            loop={false}
            className="w-[47%]"
          />
          <div className="text-center mb-3 text-slate-400">
            Thank you for using our service, you can copy the link below and
            share with others
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(link);
              setCopyText("Copied");
              setTimeout(() => {
                setCopyText("Copy to clipboard");
              }, 1000);
            }}
            className="max-w-sm truncate text-lg px-3 py-1 border border-slate-600 rounded-md cursor-pointer"
            data-tooltip-id="copy"
            data-tooltip-content={copyText}
          >
            {link}
          </div>
          <Tooltip id="copy" />
          <button
            onClick={() => {
              setIsSuccess(false);
              setLink("");
            }}
            className="px-4 py-1.5 pl-3.5 rounded-md bg-teal-600 mt-5 flex items-center text-slate-100 group"
          >
            <BiArrowBack className="h-6 w-6 mr-2 group-hover:animate-bounceleft" />
            Upload another file
          </button>
        </div>
      ) : (
        <div
          className={`w-full h-full border border-slate-500 border-dashed rounded-lg cursor-pointer transition${
            isDragOver ? " scale-90" : " scale-[0.85]"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleChange}
          />
          <div className="mt-16 text-center flex flex-col items-center">
            <div className="mb-4">
              {!file && (
                <AiFillFileAdd className="h-32 w-28 mx-auto text-slate-300" />
              )}
              {file && <FileType fileType={file.type} />}
            </div>
            {!file && (
              <div>
                <p className="text-xl">Drop file here</p>
                <p className="text-xl text-slate-500">or</p>
                <p className="text-xl">Click to browse</p>
              </div>
            )}
            {file && (
              <div className="mt-4 max-w-full flex flex-col items-center">
                <div className="text-lg">
                  <div className="truncate max-w-[18rem] mb-1">{file.name}</div>
                  <div className="truncate max-w-[15rem]">
                    {convertBytes(file.size)}
                  </div>
                </div>
                <div className="mt-6 flex">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLoading) {
                        cancelUpload();
                        return;
                      }
                      setFile(null);
                    }}
                    className="px-6 py-2 rounded-md bg-slate-400 text-2xl mr-3.5 text-slate-800 transition hover:scale-105"
                  >
                    Cancel {isLoading ? "upload" : ""}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload();
                    }}
                    className={`px-6 py-1.5 rounded-md bg-emerald-500 text-slate-100 text-2xl ml-3.5 flex items-center transition hover:scale-105${
                      isLoading ? " opacity-60" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <AiOutlineLoading3Quarters className="h-6 w-6 mr-2.5 animate-spin" />
                    ) : (
                      <IoMdCloudUpload className="h-8 w-8 mr-2.5" />
                    )}
                    {isLoading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
