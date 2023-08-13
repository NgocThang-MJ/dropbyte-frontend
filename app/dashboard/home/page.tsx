import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FileTable from "./components/FileTable";

import Header from "./components/header";

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  if (!accessToken) return redirect("/login");

  return (
    <div className="pt-4">
      <Header accessToken={accessToken.value} />
      <FileTable accessToken={accessToken.value} />
    </div>
  );
}
