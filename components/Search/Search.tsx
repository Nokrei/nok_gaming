import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    router.push(`/search/${searchQuery}`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a game"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
