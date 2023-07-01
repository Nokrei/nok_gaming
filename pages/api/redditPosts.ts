import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const baseURL = "https://api.rawg.io/api/games";
const API_KEY = process.env.RAWG_API_KEY;

const redditPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { gameId } = req.query;
    const { data } = await axios.get(
      `${baseURL}/${gameId}/reddit?key=${API_KEY}`
    );
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default redditPosts;
