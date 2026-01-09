import type { ServiceResponse } from "../../utils/types.js";

class CodeGenerator {
    async generateCode(language: string, task: string): Promise<ServiceResponse<string>> {
        return { success: true, data: `Generated code for ${language} to ${task}` };
    }
}


const codeGenerator = new CodeGenerator();

export default codeGenerator;