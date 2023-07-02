import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json();
    const website = body.query;

    const model = new OpenAI({ temperature: 0 });

    const tools = [
        new SerpAPI(process.env.SERPAPI_API_KEY, {
            location: "Los Angeles, California,United States",
            hl: "en",
            gl: "us",
        }),
    ];

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
        questions:
            "list containing every question. Ex: [Question 1, Question 2, Question 3]",
        choices:
            "list containing a list for each question's 3 possible answer choices",
        answers:
            "list containing letters to each question's correct letter answer",
    });

    const formatInstructions = parser.getFormatInstructions();

    const templatePrompt = new PromptTemplate({
        template: `Given the content in this website, {website} generate a 2 question quiz. Give each question three answer choices (A,B,C) and return a single JSON object. \n{format_instructions}`,
        inputVariables: ["website"],
        partialVariables: { format_instructions: formatInstructions },
    });

    const input = await templatePrompt.format({
        website: `${website}`,
    });
    console.log("INPUT");
    console.log(input);

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentType: "zero-shot-react-description",
        verbose: true,
    });

    // const res = await executor.call({ input });
    const res = "";
    console.log("RESULT");
    console.log(res);

    return NextResponse.json({ res });
}

// OUTPUT
{
    output: '{\n  "type": "object",\n  "properties": {\n    "questions": {\n      "type": "string",\n      "description": "list containing every question. Ex: [Question 1, Question 2, Question 3]"\n    },\n    "choices": {\n      "type": "string",\n      "description": "list containing a list for each question\'s 3 possible answer choices"\n    },\n    "answers": {\n      "type": "string",\n      "description": "list containing letters to each question\'s correct letter answer"\n    }\n  },\n  "required';
}
