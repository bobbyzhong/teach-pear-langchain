import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
// import { PromptTemplate } from "langchain/prompts";
// import { TextLoader } from "langchain/document_loaders/fs/text";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { GitbookLoader } from "langchain/document_loaders/web/gitbook";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json();
    const content = body.query;

    const model = new OpenAI({ temperature: 0 });

    const loader = new GitbookLoader(
        "https://docs.gitbook.com/product-tour/navigation"
    );

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 1,
    });

    const docOutput = await splitter.splitDocuments(docs);
    console.log(docOutput.length);
    console.log(docOutput[0].pageContent.length);

    const res = "hello";
    return NextResponse.json({ res });
}
