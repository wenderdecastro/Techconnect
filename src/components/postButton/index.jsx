export const PostButton = (props) => {
  return (
    <div className={`bg-neutral-900 py-1 rounded-2xl flex justify-center ${props.fieldStyle}`}>
      <button
        type="button"
        onClick={props.onClick}
        className={`flex gap-3 text-sm ${props.style}`}
      >
        {props.children}
      </button>
    </div>
  );
};
