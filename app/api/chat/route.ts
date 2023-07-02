import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";

export const runtime = "edge";

export async function POST(req: Request) {
    const { prompt } = await req.json();
    const promptObj = JSON.parse(prompt);

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
        template: `Given the content generate a ${promptObj.numQuestions} question quiz. Give each question three answer choices (A,B,C) and return a single JSON object. \n{format_instructions}\n{content}`,
        inputVariables: ["content"],
        partialVariables: { format_instructions: formatInstructions },
    });

    const { stream, handlers } = LangChainStream();

    const llm = new ChatOpenAI({
        streaming: true,
        temperature: 0,
    });

    const input = await templatePrompt.format({
        content: `Content: ${promptObj.content}`,
    });

    llm.call([new HumanChatMessage(input)], {}, [handlers]).catch(
        console.error
    );

    return new StreamingTextResponse(stream);
}
