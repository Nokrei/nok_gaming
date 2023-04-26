import { useState } from "react";
import Image from "next/image";
import { useDeals } from "../../hooks/useDeals";
import RelatedDeal from "../RelatedDeal/RelatedDeal";
import { useDealsForTitle } from "../../hooks/useDealsForTitle";
import { useStoresInfo } from "../../hooks/useStoresInfo";
import ReusableModal from "../ReusableModal/ReusableModal";

type Props = {
  gameTitle: string;
};
type StoresById = {
  [key: string]: any;
};

export default function AllRelatedDeals({ gameTitle }: Props) {
  const [specificDealId, setSpecificDealId] = useState("");
  const [dealModalIsOpen, setDealModalIsOpen] = useState(false);

  const { data: allStoresInfoData } = useStoresInfo();
  const { data: allDealsData, isFetching: isFetchingAllDealsData } =
    useDeals(gameTitle);
  const { data: dealsForTitleData, refetch: fetchTitleDataOnClick } =
    useDealsForTitle(specificDealId);

  const storesById: StoresById = allStoresInfoData!?.reduce((next, store) => {
    const { storeID } = store;
    return { ...next, [storeID]: store };
  }, {});

  const HandleRelatedDealClick = async (id: string) => {
    await setSpecificDealId(id);
    openDealModal();
    fetchTitleDataOnClick();
  };

  const openDealModal = () => {
    setDealModalIsOpen(true);
  };
  const closeDealModal = () => {
    setDealModalIsOpen(false);
  };

  if (isFetchingAllDealsData) {
    return <p className="text-white">Fetching deals...</p>;
  }

  return (
    <div className="rounded bg-gray-800 p-5 text-gray-400">
      <h2 className="pb-5 text-center text-3xl ">Deals:</h2>
      {allDealsData!.length < 1 && (
        <p className="text-center text-gray-400">
          No deals found for {gameTitle}
        </p>
      )}
      <div className="flex flex-wrap gap-3 ">
        {allDealsData!.map((deal) => (
          <RelatedDeal
            key={deal.gameID}
            gameTitle={deal.external}
            lowestPrice={deal.cheapest}
            onRelatedDealClick={() => HandleRelatedDealClick(deal.gameID)}
          />
        ))}
      </div>
      <div></div>
      <ReusableModal
        modalTitle={dealsForTitleData?.info.title as string}
        isModalOpen={dealModalIsOpen}
        closeModal={closeDealModal}
      >
        {storesById && (
          <>
            {dealsForTitleData?.deals.map((deal) => (
              <a
                key={deal.dealID}
                href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="rounded bg-gray-900 p-5 text-center">
                  <Image
                    src={`https://www.cheapshark.com/${
                      storesById[deal.storeID].images.logo
                    }`}
                    alt="dsa"
                    width={100}
                    height={100}
                  />
                  <p>{storesById[deal.storeID].storeName}</p>
                  <p>{deal.price}</p>
                </div>
              </a>
            ))}
          </>
        )}
      </ReusableModal>
    </div>
  );
}
