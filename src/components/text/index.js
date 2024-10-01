export function Title() {
  return <h1 className="text-yellow-700">Nome da pessoa</h1>;
}

export function ProfileInfo() {
  return <h2>@pessoa</h2>
}

export const BtnText = () => {
  <h1></h1>
};

export const Menu_textProfile = (props) => {
  <div class="bg-opacity-5 rounded-2xl bg-white overflow-hidden px-3 py-1 ">
    <p className={`text-sm ${props.styles}`}>{props.children}</p>
  </div>
};
