import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseApp.config";
import Layout from "@/components/Layout/Layout";
import LoginChoice from "@/components/LoginChoice/LoginChoice";

export default function Home() {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/authenticated");
    }
  });

  return (
    <Layout>
      <LoginChoice />
    </Layout>
  );
}
