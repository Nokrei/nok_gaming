import Image from "next/image";

type Props = {
  gameTitle: string;
  lowestPrice: string;
};

export default function RelatedDeal({ gameTitle, lowestPrice }: Props) {
  return (
    <div>
      <h3>{gameTitle}</h3>
      <p>Lowest price found: {lowestPrice}</p>
    </div>
  );
}
