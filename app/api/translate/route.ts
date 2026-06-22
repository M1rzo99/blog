import { NextRequest, NextResponse } from "next/server";
import translate from "google-translate-api-x";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang, isHtml } = await req.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    if (isHtml) {
      const result = await translateHtml(text, targetLang);
      return NextResponse.json({ translated: result });
    }

    const result = await translate(text, { to: targetLang });
    const translated = Array.isArray(result) ? result[0].text : result.text;
    return NextResponse.json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}

async function translateHtml(html: string, targetLang: string): Promise<string> {
  // Split HTML into tag vs text segments, translate only text nodes
  const parts = html.split(/(<[^>]+>)/g);

  const translated = await Promise.all(
    parts.map(async (part) => {
      if (!part || part.startsWith("<") || !part.trim()) return part;
      try {
        const res = await translate(part, { to: targetLang });
        return res.text;
      } catch {
        return part;
      }
    })
  );

  return translated.join("");
}
