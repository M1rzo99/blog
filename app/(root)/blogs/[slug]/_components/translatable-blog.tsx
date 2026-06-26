"use client";
import { useLanguage } from "@/app/(root)/_components/providers/language-provider";
import { LanguageToggle } from "@/components/shared/language-toggle";
import parse from "html-react-parser";
import { Globe, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  contentHtml: string;
  slug: string;
}

async function translateField(text: string, targetLang: string, isHtml: boolean) {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang, isHtml }),
  });
  if (!res.ok) throw new Error("Translation failed");
  const { translated } = await res.json();
  return translated as string;
}

export function TranslatableBlog({ title, contentHtml, slug }: Props) {
  const { language } = useLanguage();
  const [displayTitle, setDisplayTitle] = useState(title);
  const [displayHtml, setDisplayHtml] = useState(contentHtml);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (language === "uz") {
      setDisplayTitle(title);
      setDisplayHtml(contentHtml);
      return;
    }

    const cacheKey = `q13_trans_${slug}_${language}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { t, h } = JSON.parse(cached);
        setDisplayTitle(t);
        setDisplayHtml(h);
        return;
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    Promise.all([
      translateField(title, language, false),
      translateField(contentHtml, language, true),
    ])
      .then(([newTitle, newHtml]) => {
        setDisplayTitle(newTitle);
        setDisplayHtml(newHtml);
        localStorage.setItem(cacheKey, JSON.stringify({ t: newTitle, h: newHtml }));
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));
  }, [language, slug, title, contentHtml]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              {language === "en" ? "Translating…" : "번역 중…"}
            </p>
          </div>
        </div>
      )}

      <h1 className="font-luckiest text-4xl md:text-5xl leading-tight tracking-tight mb-5">
        {displayTitle}
      </h1>

      <div className="flex items-center gap-2.5 mb-10">
        <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground">O'qish tili:</span>
        <LanguageToggle />
      </div>

      <div
        className="prose dark:prose-invert prose-base md:prose-lg max-w-none
          prose-headings:font-luckiest prose-headings:tracking-tight
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-md
          prose-blockquote:border-l-4 prose-blockquote:border-primary
          prose-blockquote:text-muted-foreground prose-blockquote:not-italic
          prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
          prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
      >
        {parse(displayHtml)}
      </div>
    </>
  );
}
