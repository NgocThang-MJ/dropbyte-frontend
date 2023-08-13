import {
  AiFillFilePdf,
  AiFillFile,
  AiFillFileImage,
  AiFillFileExcel,
  AiFillFileWord,
} from "react-icons/ai";
import { FaFileAudio } from "react-icons/fa";

interface Props {
  fileName: string;
}
export default function FileIcon({ fileName }: Props) {
  const fileExtension = fileName.split(".").at(-1);
  if (!fileExtension) return <AiFillFile className="w-5 h-5 mr1" />;
  if (fileExtension === "pdf")
    return <AiFillFilePdf className="w-5 h-5 mr-1 text-rose-400" />;
  if (fileExtension === "xlsx")
    return <AiFillFileExcel className="w-5 h-5 mr-1 text-green-500" />;
  if (fileExtension === "docx")
    return <AiFillFileWord className="w-5 h-5 mr-1 text-rose-400" />;
  if (fileExtension === "mpga")
    return <FaFileAudio className="w-5 h-5 mr-1 text-blue-400" />;
  if (["png", "jpg", "jpeg"].includes(fileExtension))
    return <AiFillFileImage className="w-5 h-5 mr-1 text-red-400" />;
  return <AiFillFile className="w-5 h-5 mr-1" />;
}
