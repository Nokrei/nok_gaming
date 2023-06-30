import { useRouter } from "next/router";
import { useState } from "react";
import InfoText from "../InfoText/InfoText";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) {
      return;
    } else {
      searchQuery && router.push(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch} className="flex justify-center p-2">
        <input
          type="text"
          placeholder="Search for a game"
          required
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 border-gray-800 bg-slate-900 p-2 focus:border-gray-600 focus:outline-none"
        ></input>
        <button
          type="submit"
          className="bg-gray-800 px-2 duration-100 hover:bg-gray-600"
        >
          Search
        </button>
      </form>
      <InfoText text="Searching for a game will trigger a RAWG API call and bring you to the /search route containing the results." />
    </div>
  );
}
