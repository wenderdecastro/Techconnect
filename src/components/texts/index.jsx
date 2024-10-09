import next from "next";

export const Text = (props) => {
  return <p className={` ${props.style}`}>{props.children}</p>;
};

export const ButtonText = (props) => {
  return <p className={` text-neutral-background  ${props.style}`}>{props.children}</p>;
};

export const MediumText = (props) => {
  return <p className={` text-[0.875rem] ${props.style}`}>{props.children}</p>;
};

export const ProfileName = (props) => {
  return (
    <div className={`flex flex-col px-2 gap-1 ${props.fieldStyle}`}>
      <h2 className={`text-sm ${props.nameStyle}`}>{props.nomeExibicao}</h2>
      <p className={`w-4/5 text-sm  opacity-50 ${props.userStyle}`}>{props.nomeUsuario}</p>
    </div>
  );
};
