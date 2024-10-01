import next from "next";

export const Text = (props) => {
  return <p className={` ${props.children}`}>{props.children}</p>;
};

export const ProfileName = ({nomeExibicao, nomeUsuario}) => {
  return (
    <div className={`flex flex-col px-2`}>
      <h2 className={``}>{nomeExibicao}</h2>
      <p className={``}>{nomeUsuario}</p>
    </div>
  );
};
