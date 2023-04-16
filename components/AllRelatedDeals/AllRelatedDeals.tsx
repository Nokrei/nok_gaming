import { useState } from "react";
import { useDeals } from "../../hooks/useDeals";
import RelatedDeal from "../RelatedDeal/RelatedDeal";
import { useDealsForTitle } from "../../hooks/useDealsForTitle";
import { useStoresInfo } from "../../hooks/useStoresInfo";

type Props = {
  gameTitle: string;
};

export default function AllRelatedDeals({ gameTitle }: Props) {
  //
  const [specificDealId, setSpecificDealId] = useState("");

  const { data: allStoresInfoData } = useStoresInfo();
  const { data: allDealsData } = useDeals(gameTitle);
  const { data: dealsForTitleData, refetch: fetchTitleDataOnClick } =
    useDealsForTitle(specificDealId);

  if (!gameTitle || !allDealsData || !dealsForTitleData) {
    return <p className="text-white">Loading...</p>;
  }

  const HandleRelatedDealClick = async (id: string) => {
    await setSpecificDealId(id);
    console.log(dealsForTitleData);
    fetchTitleDataOnClick();
  };

  console.log(allStoresInfoData);

  return (
    <div className="rounded bg-gray-800 p-5 text-gray-400">
      <h2 className="pb-5 text-center text-3xl ">Deals:</h2>
      <div className="flex flex-wrap gap-3 ">
        {allDealsData.map((deal) => (
          <RelatedDeal
            key={deal.gameID}
            gameTitle={deal.external}
            lowestPrice={deal.cheapest}
            onRelatedDealClick={() => HandleRelatedDealClick(deal.gameID)}
          />
        ))}
      </div>
      <p className="text-white">{dealsForTitleData.info.title}</p>
    </div>
  );
}
