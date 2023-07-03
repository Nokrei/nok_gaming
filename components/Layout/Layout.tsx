import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "@/context/AuthContext";
import { auth, db } from "@/config/firebaseApp.config";

import Header from "../Header/Header";

type LayoutType = {
  title: string;
  description: string;
  children: any;
};

export default function Layout({ title, description, children }: LayoutType) {
  const router = useRouter();
  const { setLoggedInUser } = useContext(AuthContext);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(JSON.stringify(user));
    } else {
      router.push("/");
      setLoggedInUser("");
    }
  });
  return (
    <div className="bg-slate-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />

      <div className="bg-slate-900">{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Nok Gaming",
  description: "Your personal game catalogue",
};
