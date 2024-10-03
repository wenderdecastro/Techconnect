import { FiLogOut } from "react-icons/fi";

export const BlueBtn = ({ onclick, text, style }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className={`bg-primary-blue ${style} w-fit rounded-full font-medium text-sm text-black`}
    >
      {text}
    </button>
  );
};

export const Exit = ({ onclick, img, style }) => {
  return (
    <button type="button" onClick={onclick}>
      <FiLogOut className=" size-5 bg-neutral-background" />
    </button>
  );
};
