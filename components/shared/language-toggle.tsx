"use client";
import { useLanguage, type Language } from "@/app/(root)/_components/providers/language-provider";
import { cn } from "@/lib/utils";

const LANGS: { code: Language; label: string }[] = [
  { code: "uz", label: "UZB" },
  { code: "en", label: "ENG" },
  { code: "ko", label: "한국" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-md border border-input overflow-hidden h-9">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={cn(
            "px-2.5 h-full text-xs font-semibold tracking-wide transition-colors",
            language === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
