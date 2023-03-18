import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useInterval } from "usehooks-ts";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { fetchGameDetails } from "../../fetchers/rawgAPI";
import GameStats from "@/components/GameStats/GameStats";

type Genre = {
  id: number;
  name: string;
};

type Platform = {
  platform: {
    id: number;
    name: string;
  };
};

export default function GamePage() {
  const router = useRouter();
  const [gameStats, setGameStats] = useState({
    playingCurrently: "",
    topPlayedInPastDay: "",
    topPlayedAllTime: "",
    monthlyAveragePlayers: [],
    months: [],
    error: null,
  });
  const [fetchingStats, setFetchingStats] = useState(true);
  const [fetchingProgress, setFetchingProgress] = useState(0);

  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["Game"],
    queryFn: () => fetchGameDetails(parseInt(router.query.id as string)),
    keepPreviousData: true,
  });

  // The counter
  const [count, setCount] = useState<number>(0);
  // Dynamic delay
  const [delay, setDelay] = useState<number>(100);
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      // Your custom logic here
      if (fetchingProgress < 99) {
        setFetchingProgress(fetchingProgress + 1);
      }
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null
  );

  const fetchCharts = async (titleOfGame: any) => {
    setFetchingStats(true);
    setPlaying(!isPlaying);
    try {
      const res = await axios({
        method: "POST",
        url: "/api/scrapeCharts",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(titleOfGame),
      });
      console.log(res.data);

      const recentAndPeakData = res.data.recentAndPeakData;
      const monthlyAveragePlayers =
        res.data.monthlyAverageData.monthlyAveragePlayers;
      const months = res.data.monthlyAverageData.datesForAverageData;
      setGameStats({
        playingCurrently: recentAndPeakData[0],
        topPlayedInPastDay: recentAndPeakData[1],
        topPlayedAllTime: recentAndPeakData[2],
        monthlyAveragePlayers: monthlyAveragePlayers
          .map((datapoint) => {
            return {
              average_players: parseFloat(datapoint.split(",").join("")),
            };
          })
          .reverse(),
        months: months.map((datapoint) => {
          return {
            dates: datapoint,
          };
        }),
        error: null,
      });
      setFetchingStats(false);
      setFetchingProgress(100);
      setPlaying(!isPlaying);
    } catch (e: any) {
      console.log(e);
      setGameStats({
        ...gameStats,
        error: e.response.data.message,
      });
      setPlaying(!isPlaying);
      setFetchingStats(false);
      setFetchingProgress(100);
    }
    console.log(gameStats);
  };

  const titleOfGame = router.query.title;

  useEffect(() => {
    fetchCharts(titleOfGame);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p className="text-center text-white">Loading ...</p>
      ) : (
        <div className="relative py-5 md:static">
          <Image
            fill
            src={data.background_image}
            alt={data.name}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          <div className="relative grid grid-cols-4 gap-3 px-5">
            <div className=""></div>
            <div className="col-span-2 m-auto rounded bg-black bg-opacity-80 p-5 text-white ">
              <h1 className="text-center text-3xl font-bold">{data.name}</h1>
              <div className="flex flex-wrap justify-center gap-5 pt-5">
                {data.genres.map((genre: Genre) => {
                  return (
                    <button
                      className="rounded bg-yellow-600 px-2 py-1"
                      key={genre.id}
                    >
                      {genre.name}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-center gap-3 py-5">
                {data.platforms.map((platform: Platform) => {
                  return (
                    <button
                      className="rounded-lg bg-sky-600 px-2 "
                      key={platform.platform.id}
                    >
                      {platform.platform.name}
                    </button>
                  );
                })}
              </div>
              <div>
                <p>{data.description_raw}</p>
              </div>
            </div>
            <div className="col-span-4">
              <GameStats
                playingCurrently={gameStats.playingCurrently}
                topPlayedInPastDay={gameStats.topPlayedInPastDay}
                topPlayedAllTime={gameStats.topPlayedAllTime}
                error={gameStats.error}
              >
                {fetchingStats ? (
                  <div className="w-full bg-neutral-200 ">
                    <div
                      className="text-primary-100 bg-blue-400 p-0.5 text-center text-xs font-medium leading-none text-white"
                      style={{ width: `${fetchingProgress}%` }}
                    >
                      {fetchingProgress}%
                    </div>
                  </div>
                ) : (
                  !gameStats.error && (
                    <ResponsiveContainer height={500} width="100%">
                      <LineChart
                        // width={800}
                        // height={400}
                        data={gameStats.monthlyAveragePlayers}
                      >
                        <Line
                          type="monotone"
                          dataKey="average_players"
                          stroke="#8884d8"
                        />
                        <XAxis dataKey="dates" />
                        <YAxis />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  )
                )}
              </GameStats>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
