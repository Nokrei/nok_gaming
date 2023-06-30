import { useEffect, useState } from "react";
import { useDeals } from "../../hooks/useDeals";
import RelatedDeal from "../RelatedDeal/RelatedDeal";
import { useDealsForTitle } from "../../hooks/useDealsForTitle";
import InfoText from "../InfoText/InfoText";
import Accordion from "../Accordion/Accordion";

type Props = {
  gameTitle: string;
};
type StoresById = {
  [key: string]: any;
};
type LowestPrice = {
  price: string;
  date: Date;
};

type Deal = {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
};

type Info = {
  steamAppId: string;
  title: string;
};
type Data = {
  cheapestPriceEver: LowestPrice;
  deals: Deal[];
  info: Info;
};

export default function AllRelatedDeals({ gameTitle }: Props) {
  const [specificDealId, setSpecificDealId] = useState("");
  const [contentForAccordion, setContentForAccordion] = useState<Data[]>([]);

  const { data: allDealsData, isFetching: isFetchingAllDealsData } =
    useDeals(gameTitle);
  const { data: dealsForTitleData, refetch: fetchTitleDataOnClick } =
    useDealsForTitle(specificDealId);

  // const storesById: StoresById = allStoresInfoData!?.reduce((next, store) => {
  //   const { storeID } = store;
  //   return { ...next, [storeID]: store };
  // }, {});

  const HandleRelatedDealClick = async (id: string) => {
    await setSpecificDealId(id);
    await fetchTitleDataOnClick();
    console.log(dealsForTitleData);
  };

  useEffect(() => {
    dealsForTitleData &&
      setContentForAccordion((prev) => [...prev, dealsForTitleData]);
  }, [dealsForTitleData]);

  if (isFetchingAllDealsData) {
    return <p className="text-white">Fetching deals...</p>;
  }

  return (
    <div className="rounded bg-gray-800 p-5 text-gray-400">
      <InfoText
        text="This is a deals card. Initial data obtained by calling the Cheapshark API title endpoint. 
      Upon clicking on a title in the accordion a Cheapshark API call is made to
      the id endpoint. Only the prices, deal id and store id are returned in the response.
      In order to match the store id to a store name another API call is being made
      from the Accordion level - this time to the stores endpoint. The list of stores is
      being filtered using the store id obtained from the id endpoint, and all data
      is displayed correctly. Cheapshark API design leaves some to be desired - this process is
      far more complex than it should be. Upon clicking on a particular deal (deal id appened to 
      the link href attribute), you will be taken to a relevant store page in a new browser tab.
      "
      />
      <h2 className="pb-5 text-center text-3xl ">Deals:</h2>
      {allDealsData!.length < 1 && (
        <p className="text-center text-gray-400">
          No deals found for {gameTitle}
        </p>
      )}
      <Accordion
        titles={allDealsData}
        content={contentForAccordion}
        onTitleClick={(gameID) => HandleRelatedDealClick(gameID)}
      />
    </div>
  );
}
