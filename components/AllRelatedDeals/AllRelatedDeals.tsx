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

export default function AllRelatedDeals({ gameTitle }: Props) {
  const [specificDealId, setSpecificDealId] = useState("");
  const [dealModalIsOpen, setDealModalIsOpen] = useState(false);

  const { data: allStoresInfoData } = useStoresInfo();
  const { data: allDealsData } = useDeals(gameTitle);
  const { data: dealsForTitleData, refetch: fetchTitleDataOnClick } =
    useDealsForTitle(specificDealId);

  if (!allDealsData) {
    return <p className="text-white">Loading...</p>;
  }

  const openDealModal = () => {
    setDealModalIsOpen(true);
  };
  const closeDealModal = () => {
    setDealModalIsOpen(false);
  };

  const storesById = allStoresInfoData?.reduce((next, store) => {
    const { storeID } = store;
    return { ...next, [storeID]: store };
  }, {});
  console.log(storesById);

  const HandleRelatedDealClick = async (id: string) => {
    await setSpecificDealId(id);

    console.log(dealsForTitleData);

    openDealModal();
    fetchTitleDataOnClick();
  };

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
      <div></div>
      <ReusableModal
        modalTitle={dealsForTitleData?.info.title}
        isModalOpen={dealModalIsOpen}
        closeModal={closeDealModal}
      >
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
      </ReusableModal>
    </div>
  );
}
