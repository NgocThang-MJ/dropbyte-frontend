"use client";
import useSWR from "swr";

import { getFiles } from "../api/fetcher";
import FileIcon from "./FileIcon";
import MenuItem from "./MenuItem";
import { convertBytes } from "@/app/util/converter";

interface Props {
  accessToken: string;
}

export default function FileTable({ accessToken }: Props) {
  const {
    data: files,
    isLoading,
    error,
  } = useSWR(
    accessToken ? ["/api/user/files", accessToken] : null,
    ([_, token]) => getFiles(token)
  );
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}

      {!isLoading && files && (
        <table className="w-full mt-3">
          <thead>
            <tr className="text-left border-b border-slate-500">
              <th className="pb-3 w-full truncate px-3 rounded-sm">Name</th>
              <th className="px-10 truncate">Size</th>
              <th className="px-10 truncate">Type</th>
              <th className="truncate px-2">Last modified</th>
              <th className="truncate px-2"></th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => (
              <tr
                key={file.id}
                className="hover:bg-slate-700 hover:bg-opacity-50 rounded-sm"
              >
                <td className="py-2.5 w-full rounded-sm px-3 flex items-center h-full">
                  <FileIcon fileName={file.name} />
                  <div className="max-w-[30rem] truncate">{file.name}</div>
                </td>
                <td className="px-10 truncate">
                  {convertBytes(parseInt(file.size))}
                </td>
                <td className="px-10">
                  <div className="truncate max-w-[10rem]">{file.file_type}</div>
                </td>

                <td className="px-2 truncate">
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(file.last_modified)
                  )}
                </td>
                <td className="px-3">
                  <div className="cursor-pointer">
                    <MenuItem
                      fileName={file.name}
                      fileId={file.file_id}
                      accessToken={accessToken}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
