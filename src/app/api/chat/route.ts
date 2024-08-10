import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const POST = async (request: NextRequest) => {
  const messages = await request.json();

  // completion: 完了、完成
  const completions = await openai.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages,
    stream: true
  })

  // レスポンスのデータを読み取るためのreaderを作成
  const reader = completions.toReadableStream().getReader();
  const decoder = new TextDecoder('utf-8');

  // データを返すための変数を作成
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // 先にレスポンスを返すために即時関数で非同期実行する
  (async () => {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const decodedValue = decoder.decode(value);
      const response = encoder.encode(`data: ${decodedValue}\n\n`);
      writer.write(response)
    }

    writer.close();
  })();

  return new NextResponse(stream.readable, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Content-Encoding": "none"
    }
  });
}