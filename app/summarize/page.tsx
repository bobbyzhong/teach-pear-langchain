// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
    // Extract the `prompt` from the body of the request
    const { messages } = await req.json();

    messages.unshift({
        content:
            "Your role is to take the content I give you and return a three bullet summary of it. Separate each with new line and a bullet point",
        role: "system",
    });

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: false,
        messages: messages.map((message: any) => ({
            content: message.content,
            role: message.role,
        })),

        max_tokens: 3000,
    });

    // Convert the response into a friendly text-stream

    // const stream = OpenAIStream(response);

    // Respond with the stream
    // return new StreamingTextResponse(stream);
    return response;
}
