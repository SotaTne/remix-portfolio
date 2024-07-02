export default function Menu(props: { size?: number | undefined; color?: string | undefined }) {
  //おすすめカラー #7f7f7f black white
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={"number" === typeof props.size ? props.size : 24}
      viewBox="0 -960 960 960"
      width={"number" === typeof props.size ? props.size : 24}
      fill={"string" === typeof props.color ? props.color : "#7f7f7f"}
      role="img"
      aria-label="menu"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}
