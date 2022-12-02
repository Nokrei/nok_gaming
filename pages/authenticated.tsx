import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebaseApp.config";
import Layout from "../components/Layout/Layout";

export default function Authenticated() {
  const [genres, setGenres] = useState<any[]>([]);

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      router.push("/");
    }
  });

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "https://api.rawg.io/api/genres?key=567d69a8bf924ba1bebbf68419d9cd46",
        });
        setGenres(res.data.results);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGenres();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center">You are logged in</h1>
      <div className="text-center">
        {genres.map((genre) => {
          return <p key={genre.id}>{genre.name}</p>;
        })}
      </div>
    </Layout>
  );
}
