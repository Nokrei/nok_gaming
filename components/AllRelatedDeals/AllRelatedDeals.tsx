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
    <div>
      {data &&
        data.map((deal) => (
          <RelatedDeal
            key={deal.gameID}
            gameTitle={deal.external}
            lowestPrice={deal.cheapest}
          />
        ))}
    </div>
  );
}
