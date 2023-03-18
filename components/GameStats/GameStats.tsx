type GameStats = {
  playingCurrently: string;
  topPlayedInPastDay: string;
  topPlayedAllTime: string;
  error: any;
  children: any;
};

export default function GameStats({
  playingCurrently,
  topPlayedInPastDay,
  topPlayedAllTime,
  error,
  children,
}: GameStats) {
  return (
    <div className="rounded bg-white p-5 text-center text-black shadow-md">
      {children}
      <div className="flex ">
        {playingCurrently && <p>Playing now: {playingCurrently}</p>}
        {topPlayedInPastDay && <p>Top played today: {topPlayedInPastDay}</p>}
        {topPlayedAllTime && <p>Top played all time: {topPlayedAllTime}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
