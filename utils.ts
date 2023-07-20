import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { timeout } from "./config";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";

export const embedInputAndQueryLLM = async (
    client: any,
    indexName: any,
    promptObj: any
) => {
    const numQuestions = promptObj.numQuestions;
    const difficulty = promptObj.difficulty;
    const textbook = promptObj.textbook;
    const concepts = promptObj.concepts;
    const chapters = promptObj.chapters;

    const question = `Generate a ${numQuestions} question quiz of ${difficulty} difficulty level based on chapter(s) ${chapters} from textbook "${textbook}". Put an emphasis on these concepts: ${concepts}. Give each question three answer choices (A,B,C) and return a single JSON object. \n You must format your output as a JSON value that adheres to a given "JSON Schema" instance. "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents. For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}} would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings. Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted. Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas! Here is the JSON Schema instance your output must adhere to. {"type":"object","properties":{"questions":{"type":"string","description":"list containing every question. Ex: [Question 1, Question 2, etc.]"},"choices":{"type":"string","description":"list containing a list for each question's 3 possible answer choices labeled A, B, or C"},"answers":{"type":"string","description":"list containing letters to each question's correct letter answer"}},"required":["questions","choices","answers"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}`;

    const demoAnswer = `{
"questions": [
    "Who is credited with discovering the New World?",
    "Which continent did Columbus initially believe he had reached?",
    "What were the main factors driving European exploration of the New World?"
],
"choices": [
    ["A. Christopher Columbus", "B. Marco Polo", "C. Queen Elizabeth I"],
    ["A. Europe", "B. Africa", "C. Asia"],
    ["A. Markets, capital, and technology", "B. Labor and raw materials", "C. Sweet potatoes and maize"]
],
"answers": ["A", "C", "A"]
}`;
    // 10. Log the answer
    console.log(`Answer: ${demoAnswer}`);
    return demoAnswer;
    //     // 1. Start query process
    //     console.log("Querying Pinecone vector store...");
    //     // 2. Retrieve the Pinecone index
    //     const index = client.Index(indexName);
    //     // 3. Create query embedding
    //     const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
    //     // 4. Query Pinecone index and return top 10 matches
    //     let queryResponse = await index.query({
    //         queryRequest: {
    //             topK: 10,
    //             vector: queryEmbedding,
    //             includeMetadata: true,
    //             includeValues: true,
    //         },
    //     });
    //     // 5. Log the number of matches
    //     console.log(`Found ${queryResponse.matches.length} matches ...`);
    //     // 6. Log the questions being asked
    //     console.log(`Asking question: ${question} ...`);
    //     if (queryResponse.matches.length) {
    //         // 7. Create an OpenAI instance and load the QAStuffChain
    //         const llm = new OpenAI({ modelName: "gpt-3.5-turbo" });
    //         const chain = loadQAStuffChain(llm);
    //         // 8. Extract and concatenate page content from matched documents
    //         const concatenatedPageContent = queryResponse.matches
    //             .map((match: any) => match.metadata.pageContent)
    //             .join(" ");
    //         const result = await chain.call({
    //             input_documents: [
    //                 new Document({ pageContent: concatenatedPageContent }),
    //             ],
    //             question: question,
    //         });
    //         const demoAnswer = `{
    //   "questions": [
    //     "Who is credited with discovering the New World?",
    //     "Which continent did Columbus initially believe he had reached?",
    //     "What were the main factors driving European exploration of the New World?"
    //   ],
    //   "choices": [
    //     ["A. Christopher Columbus", "B. Marco Polo", "C. Queen Elizabeth I"],
    //     ["A. Europe", "B. Africa", "C. Asia"],
    //     ["A. Markets, capital, and technology", "B. Labor and raw materials", "C. Sweet potatoes and maize"]
    //   ],
    //   "answers": ["A", "C", "A"]
    // }`;
    //         // 10. Log the answer
    //         console.log(`Answer: ${result.text}`);
    //         return result.text;
    //     } else {
    //         // 11. Log that there are no matches so gpt will not be queried
    //         console.log("Since there are no matches, GPT will not be queried. ");
    //     }
};

export const createPineconeIndex = async (
    client: any,
    indexName: any,
    vectorDimension: any
) => {
    // 1. Initiate index existence check
    console.log(`Checking "${indexName}"... `);
    // 2. Get list of existing indexes
    const existingIndexes = await client.listIndexes();
    // 3. If index doesn't exist, create it
    if (!existingIndexes.includes(indexName)) {
        // 4. Log index creation initiation
        console.log(`Creating "${indexName}"...`);
        // 5. Create Index
        await client.createIndex({
            createRequest: {
                name: indexName,
                dimension: vectorDimension,
                metric: "cosine",
            },
        });
        // 6. Log successful creation
        console.log(
            `Creating index... please wait for it to finish initializing. `
        );

        // 7. Wait for index initialization
        await new Promise((resolve) => setTimeout(resolve, timeout));
    } else {
        // 8. Log if index already exists
        console.log(`"${indexName}" already exists. `);
    }
};

export const updatePinecone = async (
    client: any,
    indexName: any,
    docs: any
) => {
    // 1. Retrieve pinecone index
    const index = client.Index(indexName);
    // 2. Log the retrieved index name.
    console.log(`Pinecone index retrieved: ${indexName}`);

    // 3. Process each document in the docs array
    for (const doc of docs) {
        console.log(`Processing document: ${doc.metadata.source}`);
        const txtPath = doc.metadata.source;
        const text = doc.pageContent;
        // 4. Create RecursiveCharacterTextSplitter instance
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
        });
        console.log("Splitting text into chunks...");
        // 5. Split text into chunks (documents)
        const chunks = await textSplitter.createDocuments([text]);
        console.log(`Text split into ${chunks.length} text chunks ...`);
        console.log(
            `Calling OpenAI's embeddings endpoint documents with ${chunks.length} text chunks ...`
        );
        // 6. Create OpenAI embeddings for documents
        const embeddingsArrays = await new OpenAIEmbeddings().embedDocuments(
            chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
        );
        console.log(
            `Creating ${chunks.length} vectors array with id, values, and metadata ...`
        );

        // 7. Create and upsert vectors in batches of 100
        const batchSize = 100;
        let batch: any = [];
        for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            const vector = {
                id: `${txtPath}_${idx}`,
                values: embeddingsArrays[idx],
                metadata: {
                    ...chunk.metadata,
                    loc: JSON.stringify(chunk.metadata.loc),
                    pageContent: chunk.pageContent,
                    txtPath: txtPath,
                },
            };
            batch = [...batch, vector];

            // When batch is full or it's the last item, upsert the vectors
            if (batch.length === batchSize || idx === chunks.length - 1) {
                console.log("GOT HERE");
                await index.upsert({
                    upsertRequest: {
                        vectors: batch,
                    },
                });
                // Empty the batch
                batch = [];
            }
        }
        console.log("upserted");
    }
};

export const queryPineconeVectorStoreAndQueryLLM = async (
    client: any,
    indexName: any,
    question: any
) => {
    // 1. Start query process
    console.log("Querying Pinecone vector store...");
    // 2. Retrieve the Pinecone index
    const index = client.Index(indexName);
    // 3. Create query embedding
    const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
    // 4. Query Pinecone index and return top 10 matches
    let queryResponse = await index.query({
        queryRequest: {
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
        },
    });
    // 5. Log the number of matches
    console.log(`Found ${queryResponse.matches.length} matches ...`);
    // 6. Log the questions being asked
    console.log(`Asking question: ${question} ...`);
    if (queryResponse.matches.length) {
        // 7. Create an OpenAI instance and load the QAStuffChain
        const llm = new OpenAI({ modelName: "gpt-3.5-turbo" });
        const chain = loadQAStuffChain(llm);
        // 8. Extract and concatenate page content from matched documents
        const concatenatedPageContent = queryResponse.matches
            .map((match: any) => match.metadata.pageContent)
            .join(" ");
        const result = await chain.call({
            input_documents: [
                new Document({ pageContent: concatenatedPageContent }),
            ],
            question: question,
        });
        // 10. Log the answer
        console.log(`Answer: ${result.text}`);
        return result.text;
    } else {
        // 11. Log that there are no matches so gpt will not be queried
        console.log("Since there are no matches, GPT will not be queried. ");
    }
};
