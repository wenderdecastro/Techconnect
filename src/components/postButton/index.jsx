export const PostButton = (props) => {
  return (
    <div className={`bg-neutral-lightest_gray py-1 rounded-2xl flex cursor-pointer justify-center ${props.fieldStyle}`}>
      <button
        type="button"
        onClick={props.onClick}
        className={`flex items-center justify-center gap-3 w-full h-full text-sm ${props.style}`}
      >
        {props.children}
      </button>
    </div>
  );
};
