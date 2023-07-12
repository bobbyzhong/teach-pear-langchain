import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function POST(req: Request) {
    const body = await req.json();
    const content = body.query;

    const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
    });

    // const embeddings = new OpenAIEmbeddings();
    // const documentRes = await embeddings.embedDocuments([
    //     "Hello world",
    //     "Bye bye",
    // ]);
    // console.log(documentRes);

    // const loader = new TextLoader("public/greatwork.txt");

    // const docs = await loader.load();
    // console.log(docs.length);
    const res = await model.call("What specific gpt model are you using? ");

    console.log(res);
    return NextResponse.json({ res });
}
