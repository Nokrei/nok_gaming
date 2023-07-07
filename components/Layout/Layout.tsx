import { useContext } from "react";
import Head from "next/head";
import Script from "next/script";
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
      </Script>
      <Header />

      <div className="bg-slate-900">{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Nok Gaming",
  description: "Your personal game catalogue",
};
