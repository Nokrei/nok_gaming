import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Ratings = {
  id: number;
  title: string;
  count: number;
};

type Props = {
  gameData:
    | {
        ratings: Ratings[];
      }
    | undefined;
};

export default function GameStats({ gameData }: Props) {
  if (!gameData) {
    return <p className="text-white">Loading...</p>;
  }
  return (
    <div className="rounded bg-gray-800 p-5 text-center  shadow-md">
      <ResponsiveContainer height={500} width="100%">
        <BarChart data={gameData.ratings} className="bg-gray-900 ">
          <Bar type="monotone" dataKey="count" fill="#8884d8" />
          <XAxis dataKey="title" />
          <YAxis />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
