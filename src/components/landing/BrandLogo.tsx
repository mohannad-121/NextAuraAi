type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ className = "", imageClassName = "" }: BrandLogoProps) {
  return (
    <span className={`inline-flex max-w-full items-center overflow-visible ${className}`}>
      <img
        src="/images/cinematic/logo-no-background.png"
        alt="NextAura AI"
        className={`block max-w-none object-contain select-none ${imageClassName}`}
      />
    </span>
  );
}
