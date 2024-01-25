import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NewAccountCreator from "@/components/NewAccountCreator";
import { db } from "@/lib/db";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time CRUD App",
  description: "App for handling time tracking",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const accounts = db.account.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>
        <div className="flex flex-col gap-4 bg-slate-800 text-slate-100 w-[240px] p-4">
          {(await accounts).map((account) => (
            <Link
              key={account.id}
              href={`/accounts/${account.id}`}>
                {account.name}
              </Link>))}
          <NewAccountCreator />
        </div>

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
