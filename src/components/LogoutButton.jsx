// src/components/LogoutButton.jsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

async function logoutAction() {
  "use server";

  const cookieStore = await cookies(); // await
  cookieStore.set("jwt", "", { ...cookieConfig, maxAge: 0 });

  redirect("/");
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
}
