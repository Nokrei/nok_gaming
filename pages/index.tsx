import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";
import LoginChoice from "@/components/LoginChoice/LoginChoice";

export default function Home() {
  const router = useRouter();
  const { loggedInUser } = useContext(AuthContext);
  loggedInUser && router.push("/authenticated?page=1");
  return (
    <Layout>
      <LoginChoice />
    </Layout>
  );
}
