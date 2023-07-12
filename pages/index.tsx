import Layout from "@/components/Layout/Layout";
import LoginChoice from "@/components/LoginChoice/LoginChoice";

export default function Home() {
  return (
    <Layout title="Nok Gaming | Login" description="Login to Nok Gaming">
      <LoginChoice />
    </Layout>
  );
}
