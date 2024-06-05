import { type NextApiRequest, type NextApiResponse } from 'next';
import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources/index.mjs';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const oaiClient = new OpenAI({
    apiKey: process.env.OPENPIPE_API_KEY,
    baseURL: process.env.OPENPIPE_BASE_URL,
  });

  const payload: ChatCompletionCreateParams = {
    model: 'openpipe:test-content-mistral-p3',
    messages: [{ role: 'system', content: 'count to 3' }],
  };
  const completion = await oaiClient.chat.completions.create(payload);
  res.status(200).json({
    model: 'openpipe:test-content-mistral-p3',
    request: 'count to 3',
    response: completion.choices[0]?.message.content,
  });
}
