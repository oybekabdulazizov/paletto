import { useState } from 'react';

export default function useColourBoxState() {
  const [copied, setCopied] = useState(false);

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return { copied, changeCopyState };
}
