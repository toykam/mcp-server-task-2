import { pipeline } from "@huggingface/transformers";
import type { ServiceResponse } from "../utils/types.js";

// const main = async () => {
//     const classifier = await pipeline("sentiment-analysis", "Xenova/bert-base-multilingual-uncased-sentiment", {
//         device: "gpu"
//     });

//     const result = await classifier("I love using FastMCP for building MCP servers!");

//     console.log(result);
// }

export const reviewAnalyzer = async (text: string): Promise<ServiceResponse<any>> => {
    const classifier = await pipeline("sentiment-analysis");

    const result = await classifier(text);

    if (!result || result.length === 0) {
        return { success: false, error: "Failed to analyze the review." };
    }



    return { success: true, data: result[0]  };
}