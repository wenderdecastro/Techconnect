import { ButtonText } from "../texts";
import { FiLogOut } from "react-icons/fi";

export function LargeButton({ onClick, Text, Inverse = false, Style }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-8 py-4 rounded-full ${
        Inverse
          ? "border border-primary-blue bg-neutral-background"
          : "bg-primary-blue"
      } ${Style} `}
    >
      <ButtonText
        style={Inverse ? "text-primary-blue" : "text-neutral-background"}
      >
        {Text}
      </ButtonText>
    </button>
  );
}

export function SmallButton({ onClick, Text, Inverse = false, Style }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-[0.36rem] rounded-full ${
        Inverse
          ? "border border-primary-blue bg-neutral-background"
          : "bg-primary-blue"
      } ${Style} `}
    >
      <ButtonText
        style={Inverse ? "text-primary-blue" : "text-neutral-background"}
      >
        {Text}
      </ButtonText>
    </button>
  );
}

export function Link({ onClick, Text, Style }) {
  return (
    <p onClick={onClick} className={`cursor-pointer text-primary-red ${Style}`}>
      {Text}
    </p>
  );
}

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
