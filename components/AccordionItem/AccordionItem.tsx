import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

type Props = {
  title: string;
  content: any[];
  handleTitleClick: () => void;
};

export default function AccordionItem({
  title,
  content,
  handleTitleClick,
}: Props) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const showAccordionContent = () => {
    handleTitleClick();
    setAccordionOpen(!accordionOpen);
  };
  return (
    <div className="rounded bg-gray-900">
      <div className="flex justify-between p-5" onClick={showAccordionContent}>
        <h2>{title}</h2>
        <div>
          <BsChevronDown size={20} />
        </div>
      </div>
      <div
        style={{
          display: accordionOpen ? "flex" : "none",
        }}
        className="flex-wrap gap-5 border-t-2 border-gray-700 p-5 text-center "
      >
        {content}
      </div>
    </div>
  );
}
