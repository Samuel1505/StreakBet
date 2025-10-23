interface StarIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function StarIcon({ size = 24, className = "", style }: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}