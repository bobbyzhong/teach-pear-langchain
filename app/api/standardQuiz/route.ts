import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";

export const runtime = "edge";

export async function POST(req: Request) {
    const { prompt } = await req.json();
    const promptObj = JSON.parse(prompt);
    const content = promptObj.content;
    const numQuestions = promptObj.numQuestions;
    const difficulty = promptObj.difficulty;

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
        questions:
            "list containing every question. Ex: [Question 1, Question 2, etc.]",
        choices:
            "list containing a list for each question's 3 possible answer choices",
        answers:
            "list containing letters to each question's correct letter answer",
    });

    const formatInstructions = parser.getFormatInstructions();

    const templatePrompt = new PromptTemplate({
        template: `Given the content generate a ${numQuestions} question quiz of ${difficulty} difficulty level. Give each question three answer choices (A,B,C) and return a single JSON object. \n{format_instructions}\n{content}`,
        inputVariables: ["content"],
        partialVariables: { format_instructions: formatInstructions },
    });

    const { stream, handlers } = LangChainStream();

    const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        streaming: true,
        temperature: 0,
    });

    const input = await templatePrompt.format({
        content: `Content: ${content}`,
    });
    console.log(input);

    llm.call([new HumanChatMessage(input)], {}, [handlers]).catch(
        console.error
    );

    return new StreamingTextResponse(stream);
}