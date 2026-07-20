export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="24" height="24" rx="7" fill="#0075de" />
      <path
        d="M6 8.5C6 7.67 6.67 7 7.5 7h9c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5H10l-3 2.5v-2.5H7.5A1.5 1.5 0 0 1 6 15.5v-7Z"
        fill="white"
        fillOpacity="0.92"
      />
      <circle cx="9.5" cy="11.5" r="0.9" fill="#0075de" />
      <circle cx="12.5" cy="11.5" r="0.9" fill="#0075de" />
      <circle cx="15.5" cy="11.5" r="0.9" fill="#0075de" />
    </svg>
  );
}
