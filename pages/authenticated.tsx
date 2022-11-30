import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebaseApp.config";

export default function Authenticated() {
  const [genres, setGenres] = useState<any[]>([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("You are not signed in.");
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
    <div>
      <h1>You are logged in</h1>
      {genres.map((genre) => {
        return <p key={genre.id}>{genre.name}</p>;
      })}
    </div>
  );
}
