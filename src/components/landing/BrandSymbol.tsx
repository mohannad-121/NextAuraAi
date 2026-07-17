type BrandSymbolProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandSymbol({ className = "", imageClassName = "" }: BrandSymbolProps) {
  return (
    <span
      className={`relative inline-flex max-w-full items-center justify-center overflow-visible ${className}`}
    >
      <img
        src="/images/cinematic/logo-no-background.png"
        alt="NextAura AI"
        className={`block max-w-none object-contain select-none ${imageClassName}`}
      />
    </span>
  );
}
