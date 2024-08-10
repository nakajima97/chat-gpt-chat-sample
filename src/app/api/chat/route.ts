import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const POST = async (request: NextRequest) => {
  // const { messages } = request.json();

  // completion: 完了、完成
  const completions = await openai.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages: [{ role: 'user', content: '200文字程度の適当な文章を作成してください' }],
    stream: true
  })

  // レスポンスのデータを読み取るためのreaderを作成
  const reader = completions.toReadableStream().getReader();
  const decoder = new TextDecoder('utf-8');

  // データを返すための変数を作成
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

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