import { AiOutlineInfoCircle } from "react-icons/ai";

type Props = {
  text: string;
};

export default function InfoText({ text }: Props) {
  return (
    <div className="mx-auto flex justify-center gap-1 py-1 text-gray-400">
      <div>
        <AiOutlineInfoCircle size={20} />
      </div>

      <p className="max-w-lg text-sm ">{text}</p>
    </div>
  );
}
