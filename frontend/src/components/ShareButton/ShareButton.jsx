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
    <button
      onClick={handelCopy}
      type="button"
      // Added bottom-0 and adjusted right positioning
      className="absolute bottom-2 right-2 flex items-center justify-center cursor-pointer border-none bg-transparent p-1 transition-opacity hover:opacity-70"
    >
      {copied ? (
        <img
          src={checkIcon}
          alt="copied"
          // Removed mt-5 so the icon aligns perfectly with the bottom
          className="w-6 h-6 object-contain"
        />
      ) : (
        <img
          src={shareIcon}
          alt="share"
          // Removed mt-5
          className="w-6 h-6 object-contain"
        />
      )}
    </button>
  );
};
