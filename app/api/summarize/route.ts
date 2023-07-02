import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { PromptTemplate } from "langchain/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { readFile } from "fs";

export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json();
    const content = body.query;

    const model = new OpenAI({ temperature: 0 });

    const template = "What is the summary of this content: {content}";
    const promptA = new PromptTemplate({
        template,
        inputVariables: ["content"],
    });

    const responseA = await promptA.format({ content: content });

    const res = await model.call(responseA);
    return NextResponse.json({ res });
}
