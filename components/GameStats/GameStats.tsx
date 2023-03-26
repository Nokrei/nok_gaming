import { useQuery } from "@tanstack/react-query";
import { fetchScrapingData } from "../../fetchers/scrapingData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GameStats = {
  gameTitle: string;
};

export default function GameStats({ gameTitle }: GameStats) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["GameStats"],
    queryFn: () => fetchScrapingData(gameTitle),
    keepPreviousData: false,
    retry: false,
    cacheTime: 0,
  });

  if (isLoading || isFetching) {
    return (
      <div className=" rounded bg-gray-800 p-5 text-center text-white shadow-md">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" rounded bg-gray-800 p-5 text-center text-white shadow-md">
        <span>Data not found</span>
      </div>
    );
  }
  console.log(data);

  return (
    <div className="rounded bg-gray-800 p-5 text-center text-black shadow-md">
      <ResponsiveContainer height={500} width="100%">
        <LineChart data={data.monthlyAverageData} className="bg-gray-900 ">
          <Line type="monotone" dataKey="average_players" stroke="#8884d8" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-between">
        <p className="pt-5 text-xl text-gray-400">
          Playing now:{" "}
          <span className="font-bold text-blue-500">
            {data.recentAndPeakData[0]}
          </span>{" "}
        </p>
        <p className="pt-5 text-xl text-gray-400">
          Top played today:{" "}
          <span className="font-bold text-blue-500">
            {data.recentAndPeakData[1]}
          </span>
        </p>
        <p className="pt-5 text-xl text-gray-400">
          Top played all time:{" "}
          <span className="font-bold text-blue-500">
            {data.recentAndPeakData[2]}
          </span>
        </p>
      </div>
    </div>
  );
}
