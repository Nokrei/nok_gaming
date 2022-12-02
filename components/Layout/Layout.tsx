import React from "react";
import Head from "next/head";
import Header from "../Header/Header";

type LayoutType = {
  title: string;
  description: string;
  children: any;
};

export default function Layout({ title, description, children }: LayoutType) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Nok Gaming",
  description: "Your personal game catalogue",
};
