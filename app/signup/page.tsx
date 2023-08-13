import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignupForm from "./components/SignupForm";

export default function Signup() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  if (accessToken) return redirect("/dashboard/home");

  return (
    <div className="max-w-sm mx-auto mt-40">
      <h1 className="text-4xl text-slate-200 mb-6">Signup</h1>
      <SignupForm />
    </div>
  );
}
