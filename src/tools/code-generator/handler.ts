
import { z } from "zod";
import type { FastMCP } from "fastmcp";
import codeGenerator from "./code-generator.js";

const codeGeneratorToolHandler = async (server: FastMCP) => {
    server.addTool({
        name: 'generate_code',
        description: "Generate code for a specified programming language and task.",
        parameters: z.object({
            task: z.string()
        }),
        execute: async (input) => {
            const res = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    model: "hf.co/Qwen/Qwen3-1.7B-GGUF",
                    prompt: input.task,
                    stream: false,
                }),
            });

            

            const data = await res.json();
            // return { code: data.response };
            // const { language, task } = input;
            // const result = await codeGenerator.generateCode(language, task);
            return {
                content: [
                    {
                        type: "text",
                        text: data.response
                    }
                ]
            }
        }
    })
}


export default codeGeneratorToolHandler;