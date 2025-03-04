import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createWorker } from 'tesseract.js';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const imgToText = async (image: File | Blob) => {
  const worker = await createWorker('eng', 1);
  const {
    data: { text },
  } = await worker.recognize(image);
  await worker.terminate();

  return text;
};

export const splitText = (text: string): string[] => {
  return text.includes('ENT202')
    ? text
        .trim()
        .split('\n')
        .filter((t) => t.includes('ENT202') || t.includes('Amount PHP'))
        .map((t) => t.split(' ')[2])
    : [];
};

export const removeComma = (text: string): string => {
  return text.includes(',') ? text.replace(',', '') : text;
};
