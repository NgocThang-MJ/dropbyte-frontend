import Image from "next/image";

import Upload from "../public/upload.png";
import Drop from "../public/drop.png";
import Share from "../public/share.png";
import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto text-slate-300">
      <div className="max-w-screen-lg mx-auto mt-48">
        <div className="flex justify-between gap-2">
          <div className="w-1/2">
            <h1 className="text-5xl text-slate-200 mb-5">Dropbyte</h1>
            <div className="text-2xl mb-4">Ease-to-use file sharing app</div>
            <p className="text-slate-400">
              The ultimate solution for seamless and secure file sharing.
              Whether you&apos;re collaborating on a project, sending important
              documents, or sharing memories with loved ones, our app is
              designed to make file sharing a breeze.
            </p>
            <div className="flex items-center mt-8">
              <div className="flex flex-col items-center">
                <Image src={Drop} alt="Drop Image" width={90} />
                <p className="mt-2 text-lg font-bold text-rose-400">Drop</p>
              </div>
              <div className="flex flex-col items-center mx-14">
                <Image src={Upload} alt="Upload Image" width={90} />
                <p className="mt-2 text-lg font-bold text-sky-500">Upload</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src={Share} alt="Share Image" width={90} />
                <p className="mt-2 text-lg font-bold text-teal-400">Share!</p>
              </div>
            </div>
          </div>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
