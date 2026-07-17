export type SocialPlatform =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "email"
  | "github"
  | "default";

export type SocialLinkVariant = "icon" | "pill" | "row" | "cta" | "compact" | "text";

const platformMatchers: Array<[SocialPlatform, RegExp]> = [
  ["linkedin", /linkedin/i],
  ["facebook", /facebook|fb\.com/i],
  ["instagram", /instagram/i],
  ["youtube", /youtube|youtu\.be/i],
  ["tiktok", /tiktok/i],
  ["whatsapp", /whatsapp|wa\.me|api\.whatsapp/i],
  ["email", /^mailto:|\bemail\b/i],
  ["github", /github/i],
];

export function getSocialPlatform(value: string, label = ""): SocialPlatform {
  const candidate = `${value} ${label}`;
  return platformMatchers.find(([, matcher]) => matcher.test(candidate))?.[0] ?? "default";
}

const platformStyles: Record<SocialPlatform, string> = {
  linkedin:
    "border-[#0a66c2]/55 bg-[#0a66c2]/12 !text-[#8ec8ff] shadow-[0_0_0_1px_rgb(10_102_194_/_0.06),0_10px_24px_rgb(10_102_194_/_0.08)] hover:border-[#0a66c2]/90 hover:bg-[#0a66c2]/20 hover:shadow-[0_12px_30px_rgb(10_102_194_/_0.22)] focus-visible:ring-[#49a4f5]/80",
  facebook:
    "border-[#1877f2]/55 bg-[#1877f2]/12 !text-[#9bc8ff] shadow-[0_0_0_1px_rgb(24_119_242_/_0.06),0_10px_24px_rgb(24_119_242_/_0.08)] hover:border-[#1877f2]/90 hover:bg-[#1877f2]/20 hover:shadow-[0_12px_30px_rgb(24_119_242_/_0.22)] focus-visible:ring-[#69a7ff]/80",
  instagram:
    "border-fuchsia-300/45 bg-[linear-gradient(135deg,rgb(249_24_128_/_0.15),rgb(138_58_185_/_0.16),rgb(252_175_69_/_0.12))] !text-[#ffc2e8] shadow-[0_10px_24px_rgb(214_42_126_/_0.09)] hover:border-fuchsia-300/75 hover:bg-[linear-gradient(135deg,rgb(249_24_128_/_0.23),rgb(138_58_185_/_0.25),rgb(252_175_69_/_0.18))] hover:shadow-[0_12px_30px_rgb(214_42_126_/_0.23)] focus-visible:ring-fuchsia-300/80",
  youtube:
    "border-red-400/55 bg-red-500/12 !text-red-200 shadow-[0_10px_24px_rgb(239_68_68_/_0.08)] hover:border-red-400/90 hover:bg-red-500/20 hover:shadow-[0_12px_30px_rgb(239_68_68_/_0.22)] focus-visible:ring-red-300/80",
  tiktok:
    "border-white/35 bg-zinc-950 !text-white shadow-[0_0_0_1px_rgb(255_255_255_/_0.07),0_10px_24px_rgb(0_0_0_/_0.35)] hover:border-white/70 hover:bg-zinc-900 hover:shadow-[0_0_24px_rgb(255_255_255_/_0.16)] focus-visible:ring-white/80",
  whatsapp:
    "border-[#25d366]/55 bg-[#25d366]/12 !text-[#a5f5c1] shadow-[0_10px_24px_rgb(37_211_102_/_0.08)] hover:border-[#25d366]/90 hover:bg-[#25d366]/20 hover:shadow-[0_12px_30px_rgb(37_211_102_/_0.22)] focus-visible:ring-[#72eea1]/80",
  email:
    "border-sky-300/55 bg-sky-400/12 !text-sky-100 shadow-[0_10px_24px_rgb(56_189_248_/_0.08)] hover:border-sky-200/90 hover:bg-sky-400/20 hover:shadow-[0_12px_30px_rgb(56_189_248_/_0.22)] focus-visible:ring-sky-200/80",
  github:
    "border-slate-300/35 bg-slate-100/8 !text-slate-100 shadow-[0_10px_24px_rgb(148_163_184_/_0.07)] hover:border-slate-200/70 hover:bg-slate-100/14 hover:shadow-[0_12px_30px_rgb(148_163_184_/_0.16)] focus-visible:ring-slate-200/80",
  default:
    "border-cyan-300/35 bg-cyan-300/10 !text-cyan-100 hover:border-cyan-200/70 hover:bg-cyan-300/15 focus-visible:ring-cyan-200/80",
};

const variants: Record<SocialLinkVariant, string> = {
  icon: "grid h-11 w-11 place-items-center rounded-full",
  pill: "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold",
  row: "group flex min-h-16 items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-slate-100",
  cta: "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold",
  compact:
    "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
  text: "inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium",
};

export function socialBrandClassName(
  href: string,
  label = "",
  variant: SocialLinkVariant = "icon",
): string {
  return [
    variants[variant],
    "border transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071020]",
    platformStyles[getSocialPlatform(href, label)],
  ].join(" ");
}
