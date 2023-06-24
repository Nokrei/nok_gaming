import React from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "../Header/Header";

type LayoutType = {
  title: string;
  description: string;
  children: any;
};

export default function Layout({ title, description, children }: LayoutType) {
  return (
    <div className="bg-slate-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <Link href="/favourites">
        <button className="bg-slate-900 py-1 px-2 font-sans font-semibold">
          Favourites
        </button>
      </Link>
      <div className="bg-slate-900">{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Nok Gaming",
  description: "Your personal game catalogue",
};
