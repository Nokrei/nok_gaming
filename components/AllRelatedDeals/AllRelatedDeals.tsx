import { useDeals } from "../../hooks/useDeals";
import { useQuery } from "@tanstack/react-query";
import RelatedDeal from "../RelatedDeal/RelatedDeal";

type Props = {
  gameTitle: string;
};

export default function AllRelatedDeals({ gameTitle }: Props) {
  const { data } = useDeals(gameTitle);
  if (!gameTitle) {
    return <p className="text-white">Loading...</p>;
  }
  console.log(data);

  return (
    <div className="rounded bg-gray-800 p-5 text-gray-400">
      <h2 className="pb-5 text-center text-3xl ">Deals:</h2>
      <div className="flex flex-wrap gap-3 ">
        {data &&
          data.map((deal) => (
            <RelatedDeal
              key={deal.gameID}
              gameTitle={deal.external}
              lowestPrice={deal.cheapest}
            />
          ))}
      </div>
    </div>
  );
}
