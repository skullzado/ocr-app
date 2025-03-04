import { useState } from 'react';
import { removeComma, splitText } from './lib/util';
import Header from './components/Header';
import FileInput from './components/FileInput';
import { type PreviewType } from './lib/types';

const LIST_ITEM_TITLE: string[] = ['Reference No.', 'Amount PHP'];

const App = () => {
  const [preview, setPreview] = useState<PreviewType>(null);
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [copy, setCopy] = useState<string | null>(null);

  const handleClick = (text: string) => {
    setCopy(removeComma(text));
    navigator.clipboard.writeText(removeComma(text));
  };

  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <FileInput
        preview={preview}
        file={file}
        setPreview={setPreview}
        setText={setText}
        setFile={setFile}
      />

      {splitText(text).length ? (
        <ul className="w-full items-center flex flex-col">
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
      ) : (
        <p className="text-center">No applicable text found</p>
      )}
    </div>
  );
};

export default App;
