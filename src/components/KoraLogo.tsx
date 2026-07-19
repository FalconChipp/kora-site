interface KoraLogoProps {
  className?: string;
}

export default function KoraLogo({ className }: KoraLogoProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KORA"
      className={className}
    >
      {/* Leaf mark */}
      <path
        d="M4 28 C4 20 10 8 18 4 C18 4 20 14 14 22 C10 27 6 28 4 28Z"
        fill="#4E7A3C"
      />
      <path
        d="M18 4 C18 4 22 14 18 22 C15 27 10 28 8 28 C10 24 14 17 18 4Z"
        fill="#0F2B1F"
        opacity="0.6"
      />
      {/* Wordmark */}
      <text
        x="26"
        y="23"
        fontFamily="Sora, system-ui, sans-serif"
        fontWeight="600"
        fontSize="18"
        letterSpacing="0.04em"
        fill="#0F2B1F"
      >
        KORA
      </text>
    </svg>
  );
}
