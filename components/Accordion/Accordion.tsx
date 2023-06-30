import Image from "next/image";
import { useStoresInfo } from "../../hooks/useStoresInfo";
import AccordionItem from "../AccordionItem/AccordionItem";

type Data = {
  gameID: string;
  steamAppID: string | null;
  cheapest: string;
  cheapestDealId: string;
  external: string;
  thumb: string;
};

type Props = {
  titles: Data[] | undefined;
  content: any[];
  onTitleClick: (title: string) => void;
};

type Deal = {
  dealID: string;
  price: string;
  storeID: string;
};

export default function Accordion({ titles, content, onTitleClick }: Props) {
  const { data: allStoresInfoData } = useStoresInfo();
  console.log(allStoresInfoData);

  return (
    <div>
      {titles?.map((title) => (
        <AccordionItem
          key={title.gameID}
          title={title.external}
          content={
            content
              .filter((item) => item?.info?.title === title.external)[0]
              ?.deals.map((deal: Deal) => (
                <a
                  key={deal.dealID}
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div>
                    <div className="relative   h-20 w-20 ">
                      <Image
                        src={`https://www.cheapshark.com/${
                          allStoresInfoData?.filter(
                            (item) => item.storeID === deal.storeID
                          )[0].images.logo
                        }`}
                        alt="store logo"
                        fill
                      />
                    </div>
                    <p>{deal.price}</p>
                  </div>
                </a>
              )) || "Loading..."
          }
          handleTitleClick={() => onTitleClick(title.gameID)}
        />
      ))}
    </div>
  );
}
