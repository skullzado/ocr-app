import { splitText, removeComma } from '../lib/util';

type Props = {
  text: string;
  copy: string | null;
  handleClick: (t: string) => void;
};

const LIST_ITEM_TITLE: string[] = ['Reference No.', 'Amount PHP'];

const CopyTextList = ({ text, copy, handleClick }: Props) => {
  return (
    <ul className="m-auto w-2xl items-center flex flex-col gap-2 mt-5">
      {splitText(text).map((t, index) => (
        <li
          className="w-full flex justify-between px-2 py-4 shadow-sm cursor-pointer hover:outline-2 hover:outline-slate-950 rounded-sm"
          key={t}
          onClick={() => handleClick(t)}
        >
          <span>{LIST_ITEM_TITLE[index]}</span>
          <span> {removeComma(t) === copy ? '✔ Copied' : t}</span>
        </li>
      ))}
    </ul>
  );
};
export default CopyTextList;
