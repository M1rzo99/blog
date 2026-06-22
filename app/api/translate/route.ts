import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const LANG_NAMES: Record<string, string> = {
  en: "English",
  ko: "Korean",
  uz: "Uzbek",
};

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang, isHtml } = await req.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const langName = LANG_NAMES[targetLang] ?? targetLang;

    const prompt = isHtml
      ? `You are a precise translator. Translate the text content in the following HTML to ${langName}.
CRITICAL rules:
- Preserve ALL HTML tags, attributes, and structure exactly as-is
- Only translate human-readable text between tags
- Do NOT translate code, class names, IDs, URLs, or attribute values
- Return ONLY the translated HTML with no explanation or markdown wrapper

HTML to translate:
${text}`
      : `Translate the following text to ${langName}. Return ONLY the translation with no explanation:

${text}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const translated =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
