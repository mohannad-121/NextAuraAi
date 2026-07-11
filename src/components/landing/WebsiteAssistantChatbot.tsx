import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/translations";
import { chatbotCopy, getChatbotResponse } from "@/lib/getChatbotResponse";
import type { SupportedLanguage } from "@/data/siteKnowledge";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

export function WebsiteAssistantChatbot() {
  const { language, dir } = useLanguage();
  const currentLanguage = language as SupportedLanguage;
  const copy = chatbotCopy[currentLanguage] || chatbotCopy.en;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, role: "assistant", content: copy.welcome },
  ]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    setMessages([{ id: 1, role: "assistant", content: copy.welcome }]);
    nextId.current = 2;
  }, [copy.welcome]);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const assistantSide = dir === "rtl" ? "left-4 sm:left-6" : "right-4 sm:right-6";
  const quickSuggestions = useMemo(() => copy.suggestions.slice(0, 6), [copy.suggestions]);

  const sendMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { id: nextId.current++, role: "user", content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      const response = getChatbotResponse(trimmed, currentLanguage);
      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: "assistant", content: response },
      ]);
      setLoading(false);
    }, 420);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className={`fixed bottom-24 z-[80] md:bottom-6 ${assistantSide}`}>
      <AnimatePresence>
        {open ? (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-3 flex h-[min(72vh,620px)] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[1.35rem] border border-primary/35 bg-background/92 shadow-[0_24px_90px_oklch(0.05_0.04_265_/_0.82),0_0_54px_oklch(0.58_0.24_315_/_0.24)] backdrop-blur-2xl sm:w-[420px]"
            dir={dir}
          >
            <header className="flex items-center justify-between border-b border-primary/20 bg-card/60 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-[0_0_30px_oklch(0.68_0.22_28_/_0.28)]"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Bot className="h-5 w-5 text-background" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-bold text-foreground">
                    NextAura Assistant
                  </h2>
                  <p className="truncate text-xs text-muted-foreground">
                    {currentLanguage === "ar"
                      ? "اسأل عن خدماتنا، مشاريعنا، الأسعار، والفريق"
                      : currentLanguage === "es"
                        ? "Pregunta sobre servicios, proyectos, precios y equipo"
                        : "Ask about our services, projects, pricing, and team"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition-colors hover:border-cyan/60 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div ref={viewportRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary/80 text-primary-foreground shadow-[0_0_24px_oklch(0.58_0.24_315_/_0.18)]"
                        : "border border-border/60 bg-card/72 text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/72 px-3.5 py-2.5 text-sm text-muted-foreground">
                    <span>{copy.placeholders.typing}</span>
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-primary/20 bg-background/70 p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="shrink-0 rounded-full border border-primary/25 bg-card/70 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-cyan/60 hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={copy.placeholders.input}
                  className="min-h-12 min-w-0 flex-1 rounded-2xl border border-border/80 bg-card/72 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-cyan/70"
                />
                <button
                  type="submit"
                  aria-label={copy.placeholders.send}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-background shadow-[0_0_30px_oklch(0.68_0.22_28_/_0.22)] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open NextAura Assistant"
        className="group relative flex min-h-14 min-w-14 items-center justify-center rounded-2xl border border-primary/35 text-background shadow-[0_0_42px_oklch(0.58_0.24_315_/_0.32)] transition-transform hover:-translate-y-1 md:min-h-16 md:min-w-16"
        style={{ background: "var(--gradient-primary)" }}
      >
        <span className="absolute inset-0 -z-10 rounded-2xl bg-primary/30 blur-xl transition-opacity group-hover:opacity-80" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-foreground" />
      </button>
    </div>
  );
}
