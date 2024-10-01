import next from "next";

export const Text = (props) => {
  return <p className={` ${props.style}`}>{props.children}</p>;
};

export const ProfileName = (props) => {
  return (
    <div className={`flex flex-col px-2 gap-1 ${props.fieldStyle}`}>
      <h2 className={`text-sm ${props.nameStyle}`}>{props.nomeExibicao}</h2>
      <p className={`w-4/5 text-sm  opacity-50 bg-zinc-800 px-2 rounded-2xl ${props.userStyle}`}>{props.nomeUsuario}</p>
    </div>
  );
};
