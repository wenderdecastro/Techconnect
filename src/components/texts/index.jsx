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

export const ProfileName = ({ nomeExibicao, nomeUsuario }) => {
  return (
    <div className={`flex flex-col px-2`}>
      <h2 className={``}>{nomeExibicao}</h2>
      <p className={``}>{nomeUsuario}</p>
    </div>
  );
};
