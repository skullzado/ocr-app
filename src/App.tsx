import { useState } from 'react';
import { removeComma, splitText } from './lib/util';
import Header from './components/Header';
import FileInput from './components/FileInput';
import { type PreviewType } from './lib/types';
import CopyTextList from './components/CopyTextList';

const App = () => {
  const [preview, setPreview] = useState<PreviewType>(null);
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [copy, setCopy] = useState<string | null>(null);

  const handleClick = (text: string) => {
    setCopy(removeComma(text));
    navigator.clipboard.writeText(removeComma(text));
  };

  const textArr: string[] = text ? splitText(text) : [];

  return (
    <div className="flex flex-col h-full gap-5">
      <Header />
      <FileInput
        preview={preview}
        file={file}
        setPreview={setPreview}
        setText={setText}
        setFile={setFile}
      />

      {textArr.length ? (
        <CopyTextList copy={copy} handleClick={handleClick} text={text} />
      ) : (
        <p className="mt-5 text-center">No applicable text found</p>
      )}
    </div>
  );
};

export default App;
