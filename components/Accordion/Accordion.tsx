import Image from "next/image";
import AccordionItem from "../AccordionItem/AccordionItem";

type Title = {
  id: string;
  title: string;
};

type Props = {
  titles: Title[];
  content: any[];
  onTitleClick: (title: string) => void;
};

type Deal = {
  dealID: string;
  price: string;
  storeID: string;
  storeLogo: string;
};

export default function Accordion({ titles, content, onTitleClick }: Props) {
  console.log(content);

  return (
    <div>
      {titles.map((title) => (
        <AccordionItem
          key={title.id}
          title={title.title}
          content={
            content
              .filter((item) => item.title === title.title)[0]
              ?.deals.map((deal: Deal) => (
                <a
                  key={deal.dealID}
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div>
                    <div className="relative h-20 w-20 ">
                      <Image
                        src={`https://www.cheapshark.com/${deal.storeLogo}`}
                        alt="store logo"
                        fill
                      />
                    </div>
                    <p>{deal.price}</p>
                  </div>
                </a>
              )) || "Loading..."
          }
          handleTitleClick={() => onTitleClick(title.id)}
        />
      ))}
    </div>
  );
}
