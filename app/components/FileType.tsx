"use client";
import Image from "next/image";
import PDF from "../../public/pdf.png";
import Doc from "../../public/doc.png";
import Zip from "../../public/zip.png";
import CSV from "../../public/sheets.png";
import Audio from "../../public/audio-file.png";
import Video from "../../public/video.png";
import Photo from "../../public/photo.png";
import { PiFileTextLight } from "react-icons/pi";

interface Props {
  fileType: string;
}
export default function FileType({ fileType }: Props) {
  if (fileType.includes("pdf"))
    return <Image src={PDF} alt="PDF Icon" className="w-28" />;
  if (fileType.includes("image"))
    return <Image src={Photo} alt="Image Icon" className="w-28" />;
  if (fileType.includes("sheet") || fileType.includes("csv"))
    return <Image src={CSV} alt="CSV Icon" className="w-28" />;
  if (fileType.includes("document"))
    return <Image src={Doc} alt="Doc Icon" className="w-28" />;
  if (fileType.includes("zip") || fileType.includes("rar"))
    return <Image src={Zip} alt="ZIP Icon" className="w-28" />;
  if (fileType.includes("audio"))
    return <Image src={Audio} alt="Audio Icon" className="w-28" />;
  if (fileType.includes("video"))
    return <Image src={Video} alt="Video Icon" className="w-28" />;
  return <PiFileTextLight className="w-28 h-28" />;
}
