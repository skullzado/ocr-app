import React, { useCallback } from 'react';
import { PreviewType } from '../lib/types';
import { useDropzone } from 'react-dropzone';
import { cn, imgToText } from '../lib/util';

type Props = {
  file: File | null;
  preview: PreviewType;
  setPreview: React.Dispatch<React.SetStateAction<PreviewType>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const FileInput = ({ file, preview, setPreview, setText, setFile }: Props) => {
  const onDrop = useCallback(
    async (acceptedFiles: Array<File>) => {
      const file = new FileReader();

      file.onload = () => {
        setPreview(file.result);
        setFile(acceptedFiles[0]);
      };

      file.readAsDataURL(acceptedFiles[0]);

      const text = await imgToText(acceptedFiles[0]);
      setText(text);
    },
    [setFile, setPreview, setText]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="flex flex-col items-center gap-5 p-5 h-[720px]">
      {file ? <p>{file.name}</p> : <p>No image added</p>}
      <div
        className={cn(
          'h-full p-5 w-full flex items-center justify-center outline-4 outline-slate-400 outline-dashed',
          isDragActive && 'outline-slate-950'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} multiple={false} accept="image/*" />
        {isDragActive ? (
          <p>Drop the image here</p>
        ) : preview ? (
          <img
            className="w-full h-full object-contain"
            src={preview as string}
            alt="Upload preview"
          />
        ) : (
          <p>Drag 'n' Drop or Click Here to add the image.</p>
        )}
      </div>
    </div>
  );
};
export default FileInput;
