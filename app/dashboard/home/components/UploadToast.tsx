import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Lottie from "lottie-react";

import SuccessLottie from "@/public/success.json";
import FileIcon from "./FileIcon";

interface Props {
  fileName: string;
  showToast: boolean;
  uploading: boolean;
}

export default function UploadToast({ fileName, showToast, uploading }: Props) {
  return (
    <div
      className={`fixed bottom-6 right-6 bg-gray-600 py-4 px-6 rounded-t-lg transition min-w-[20rem]${
        showToast ? "" : " hidden"
      }`}
    >
      <div className="mb-3">Uploading</div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <FileIcon fileName={fileName} />
          <div className="max-w-[10rem] truncate">{fileName}</div>
        </div>
        <div className="h-7 flex items-center">
          {uploading ? (
            <div className="p-1">
              <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <>
              <Lottie
                animationData={SuccessLottie}
                loop={false}
                className="w-10"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
