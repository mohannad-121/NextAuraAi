type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-[var(--primary-text)] sm:text-5xl">
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-6 max-w-2xl text-base leading-8 text-[var(--secondary-text)] sm:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      ) : null}
    </header>
  );
}
