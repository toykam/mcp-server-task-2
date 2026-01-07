import { ServiceResponse } from "../../utils/types";


class Calculator {
  calculate(operation: string, a: number, b: number): ServiceResponse<number> {
    // Validate inputs
    if (typeof a !== "number" || typeof b !== "number") {
      return {
        success: false,
        error: "Both operands must be numbers"
      };
    }

    if (!isFinite(a) || !isFinite(b)) {
      return {
        success: false,
        error: "Numbers must be finite (not Infinity or NaN)"
      };
    }

    // Perform the operation
    switch (operation) {
      case "add":
        return {
          success: true,
          data: a + b
        };
      
      case "subtract":
        return {
          success: true,
          data: a - b
        };
      
      case "multiply":
        return {
          success: true,
          data: a * b
        };
      
      case "divide":
        if (b === 0) {
          return {
            success: false,
            error: "Cannot divide by zero"
          };
        }
        return {
          success: true,
          data: a / b
        };
      
      default:
        return {
          success: false,
          error: "Invalid operation. Supported operations are: add, subtract, multiply, divide"
        };
    }
  }


}

const calculator = new Calculator();

export default calculator;