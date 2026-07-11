type BrandSymbolProps = {
  className?: string;
  imageClassName?: string;
};

export function BrandSymbol({ className = "", imageClassName = "" }: BrandSymbolProps) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-visible rounded-2xl bg-black/65 p-2 shadow-[0_0_34px_rgb(14_165_233_/_0.18)] ring-1 ring-sky-300/25 ${className}`}
    >
      <img
        src="/brand/logo.png"
        alt="NextAura AI"
        className={`block h-auto object-contain select-none ${imageClassName}`}
      />
    </span>
  );
}
