type Props = {
  gameTitle: string;
  lowestPrice: string;
  onRelatedDealClick: () => void;
};

export default function RelatedDeal({
  gameTitle,
  lowestPrice,
  onRelatedDealClick,
}: Props) {
  return (
    <div
      onClick={onRelatedDealClick}
      className="cursor-pointer bg-gray-900 p-5 duration-100 hover:bg-gray-700"
    >
      <h3 className="text-xl">{gameTitle}</h3>
      <p>
        Lowest price found:{" "}
        <span className="text-green-600">{lowestPrice}</span>{" "}
      </p>
    </div>
  );
}
