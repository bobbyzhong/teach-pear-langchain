// import { StreamingTextResponse, LangChainStream, Message } from "ai";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { AIChatMessage, HumanChatMessage } from "langchain/schema";
// import { StructuredOutputParser } from "langchain/output_parsers";
// import { PromptTemplate } from "langchain/prompts";

// export const runtime = "edge";

// export async function POST(req: Request) {
// const { prompt } = await req.json();
// const promptObj = JSON.parse(prompt);
// const content = promptObj.content;
// const numQuestions = promptObj.numQuestions;
// const difficulty = promptObj.difficulty;

//     const parser = StructuredOutputParser.fromNamesAndDescriptions({
//         questions:
//             "list containing every question. Ex: [Question 1, Question 2, etc.]",
//         choices:
//             "list containing a list for each question's 3 possible answer choices labeled A, B, or C",
//         answers:
//             "list containing letters to each question's correct letter answer",
//     });

//     const formatInstructions = parser.getFormatInstructions();

//     const templatePrompt = new PromptTemplate({
//         template: `Given the content generate a ${numQuestions} question quiz of ${difficulty} difficulty level. Give each question three answer choices (A,B,C) and return a single JSON object. \n{format_instructions}\n{content}`,
//         inputVariables: ["content"],
//         partialVariables: { format_instructions: formatInstructions },
//     });

//     const { stream, handlers } = LangChainStream();

//     const llm = new ChatOpenAI({
//         modelName: "gpt-3.5-turbo",
//         streaming: true,
//         temperature: 0,
//     });

//     const input = await templatePrompt.format({
//         content: `Content: ${content}`,
//     });
//     console.log(input);

//     llm.call([new HumanChatMessage(input)], {}, [handlers]).catch(
//         console.error
//     );

//     return new StreamingTextResponse(stream);
// }

import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function POST(req: Request) {
    const promptObj = await req.json();
    const content = promptObj.content;
    const numQuestions = promptObj.numQuestions;
    const difficulty = promptObj.difficulty;

    const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
    });
    const template = `Given the content generate a ${numQuestions} question quiz of ${difficulty} difficulty level. Give each question three answer choices (A,B,C) and return a single JSON object. \n You must format your output as a JSON value that adheres to a given "JSON Schema" instance. "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents. For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}} would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings. Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted. Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas! Here is the JSON Schema instance your output must adhere to. {"type":"object","properties":{"questions":{"type":"string","description":"list containing every question. Ex: [Question 1, Question 2, etc.]"},"choices":{"type":"string","description":"list containing a list for each question's 3 possible answer choices labeled A, B, or C"},"answers":{"type":"string","description":"list containing letters to each question's correct letter answer"}},"required":["questions","choices","answers"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}\n${content}`;

    console.log(template);
    // const embeddings = new OpenAIEmbeddings();
    // const documentRes = await embeddings.embedDocuments([
    //     "Hello world",
    //     "Bye bye",
    // ]);
    // console.log(documentRes);

    // const loader = new TextLoader("public/greatwork.txt");

    // const docs = await loader.load();
    // console.log(docs.length);
    const res = await model.call(template);

    console.log(res);
    return NextResponse.json({ res });
}
