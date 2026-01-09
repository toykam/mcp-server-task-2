import type { FastMCP } from "fastmcp";
import { z } from "zod";
import { reviewAnalyzer } from "../../../transformer/pipeline.js";

export const reviewAnalyzerToolHandler = async (server: FastMCP) => {
    server.addTool({
        name: 'analyze_review',
        description: "Analyze a product review and provide insights such as sentiment, key points, and suggestions for improvement.",
        parameters: z.object({
            text: z.string().min(10)
        }),
        execute: async (input) => {
            const { text } = input;
            const result = await reviewAnalyzer(text)

            console.log("Review Analyzer Result:", result);

            return {
                // data: result.data,
                isError: !result.success,
                content: [
                    {
                        type: "text",
                        text: result.error ? `Error: ${result.error}` : `${JSON.stringify(result.data, null, 2)}`
                    }
                ]
            }
        }
    })
}