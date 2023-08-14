import axios from "axios";
import { IFile } from "../types/types";

export async function getFiles(accessToken: string): Promise<IFile[]> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user/files`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return res.data;
}

export async function deleteFile(
  fileName: string,
  fileId: string,
  accessToken: string
) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user/file/delete`,
    {
      file_name: fileName,
      file_id: fileId,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return res.data;
}

export async function downloadFile(
  fileId: string,
  fileName: string,
  accessToken: string
) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user/file/download?file_id=${fileId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: "blob",
    }
  );
  const blob = new Blob([res.data], { type: res.headers["content-type"] });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName; // Set the desired filename
  a.click();

  URL.revokeObjectURL(a.href);
  return res.data;
}
