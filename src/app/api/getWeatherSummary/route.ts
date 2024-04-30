import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { weatherData } = await request.json();
  const url = "https://open-ai21.p.rapidapi.com/conversationgpt35";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `Gib kurz und knackig die wichtigsten Tageswerte der folgenden Wetterdaten wieder: ${JSON.stringify(
            weatherData
          )}. Trage die Daten mit charmanten Worten vor und gib am ende, wenn noch Zeichen übrig sind, einen zum Wetter passenden Witz wieder. Beschränke deine Antwort auf maximal 256 Zeichen.`,
        },
      ],
      web_access: false,
      system_prompt: "",
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
    }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return new NextResponse(result);
  } catch (err) {
    if (typeof err === "string") {
      return new NextResponse(err, {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else if (err instanceof Error) {
      return new NextResponse(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
}
