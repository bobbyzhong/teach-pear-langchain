// app/api/completion/route.ts

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const apiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.json();

    const promptObj = JSON.parse(prompt);

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        // a precise prompt is important for the AI to reply with the correct tokens
        messages: [
            {
                role: "user",
                content: `Given the content simplify it so that a 3rd grader can understand it. 
                Content: ${promptObj.content}
        
Output:\n`,
            },
        ],
        max_tokens: 200,
        temperature: 0, // you want absolute certainty for spell check
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}
