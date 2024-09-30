import next from "next";

export const Text = (props) => {
  return <p className={` ${props.children}`}>{props.children}</p>;
};

export const userInfo = ({nomeExibicao, nomeUsuario}) => {
  return (
    <div className={`flex flex-col ${style.children}`}>
      <h2 className={`size-3`}>{nomeExibicao}</h2>
      <p className={``}>{nomeUsuario}</p>
    </div>
  );
};
