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
    <div className="flex items-center bg-muted/60 rounded-full p-1 gap-0.5">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={cn(
            "px-3 py-1 text-xs font-semibold tracking-wide rounded-full transition-all duration-200",
            language === code
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
