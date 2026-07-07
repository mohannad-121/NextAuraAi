type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ className = "", imageClassName = "" }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center overflow-hidden rounded-xl bg-black/90 shadow-[0_0_34px_rgb(14_165_233_/_0.18)] ring-1 ring-sky-300/15 ${className}`}>
      <img
        src="/brand/nextaura-logo.svg"
        alt="NextAura AI Logo"
        className={`block h-auto w-full select-none ${imageClassName}`}
      />
    </span>
  );
}
