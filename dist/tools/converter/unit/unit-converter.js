"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convert_units_1 = __importDefault(require("convert-units"));
const unit_mappings_1 = require("./unit-mappings");
class UnitConverter {
    async convertUnit(value, fromUnit, toUnit) {
        if (!isFinite(value))
            return { success: false, error: "Value must be finite (not Infinity or NaN)" };
        if (fromUnit == toUnit)
            return { success: true, data: value };
        const from = (0, unit_mappings_1.normalizeUnit)(fromUnit);
        const to = (0, unit_mappings_1.normalizeUnit)(toUnit);
        const converted = (0, convert_units_1.default)(value).from(from).to(to);
        return { success: true, data: converted };
    }
}
const unitConverter = new UnitConverter();
exports.default = unitConverter;
