export default function My_Logo(props: {
  size?: number | undefined;
  priority?: boolean | undefined;
}) {
  return (
    /*
    <Image
      src="image/my_logo.svg"
      width={"number" === typeof props.size ? props.size : 36}
      height={"number" === typeof props.size ? (props.size * 2) / 3 : 24}
      alt={"MySiteLogo"}
      className="inline-block"
      priority={"boolean" == typeof props.priority ? props.priority : false}
      aria-label="Ekite"
    />
    */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1500 1000"
      width={"number" === typeof props.size ? props.size : 36}
      height={"number" === typeof props.size ? (props.size * 2) / 3 : 36}
      fill="none"
    >
      <path fill="#EC4A4A" d="m729.538 396.17 521.832 511.553H1480L954 53 729.538 396.17Z" />
      <path fill="#514D4D" d="m611.5 50.5 76.359 818.156L844.19 387.583 611.5 50.5Z" />
      <path fill="#4361CA" d="M611.5 50.5 338.917 892.009H.432L611.5 50.5Z" />
      <path fill="#6AEC4A" d="M954.085 52.694 682.163 890.202l-341.599.49L954.085 52.694Z" />
    </svg>
  );
}
