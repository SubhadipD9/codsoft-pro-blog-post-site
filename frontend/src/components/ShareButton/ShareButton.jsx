import { useState } from "react";
import shareIcon from "../../assets/share.png";
import checkIcon from "../../assets/check.png";

export const ShareButton = () => {
  const [copied, setCopied] = useState(false);
  const handelCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <button
        onClick={handelCopy}
        type="button"
        className="absolute right-3 flex items-center justify-center cursor-pointer border-none bg-transparent p-1 transition-opacity hover:opacity-70"
      >
        {copied ? (
          <img
            src={checkIcon}
            alt="share"
            className="w-6 h-6 mt-5 object-contain"
          />
        ) : (
          <img
            src={shareIcon}
            alt="share"
            className="w-6 h-6 mt-5 object-contain"
          />
        )}
      </button>
    </div>
  );
};
