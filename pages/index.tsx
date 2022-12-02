import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import { auth } from "../config/firebaseApp.config";

// Needs to be a dynamic import, else will throw "ReferenceError: window is not defined".
// Firebaseui expects a window object to be loaded, which it won't find due to SSR.

const AuthFirebase = dynamic(() => import("../utils/AuthFirebase"), {
  ssr: false,
});

export default function Home() {
  return (
    <Layout>
      <AuthFirebase auth={auth} />
    </Layout>
  );
}
