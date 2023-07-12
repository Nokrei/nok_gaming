import { useContext } from "react";
import Head from "next/head";
import Script from "next/script";
import Header from "../Header/Header";
import AuthContext from "../../context/AuthContext";

type LayoutType = {
  title: string;
  description: string;
  children: any;
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

/** When checking whether to redirect or not
 * 1) - We are checking, We don't know if this is signed in or not - so we dont know what to do? Redirect? Stay on current?
 * 2) - We have checked, you are NOT authed, so redirect
 * 3) - We have checked, you are authed, so you can stay
 */

// user -> true or false or undefined
// isCheckingAuth

// isCheckingAuth | user
// 1) true | undefined
// 2) false | undefined
// 3) true | User { name: 'Dan' }

// if (!isCheckingAuth && !user) redirect
// if (!isCheckingAuth && user) continue
// if (isCheckingAuth) LoadingSpinner

export default function Layout({ title, description, children }: LayoutType) {
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
