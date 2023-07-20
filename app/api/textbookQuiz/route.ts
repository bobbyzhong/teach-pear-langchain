import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { embedInputAndQueryLLM } from "@/utils";
import { indexName } from "@/config";

export async function POST(req: NextRequest) {
    const promptObj = await req.json();

    const client = new PineconeClient();
    await client.init({
        apiKey: process.env.PINECONE_API_KEY || "",
        environment: process.env.PINECONE_ENVIRONMENT || "",
    });
    const text = await embedInputAndQueryLLM(client, indexName, promptObj);
    return NextResponse.json({ data: text });
}
