import { ServiceResponse } from "../../../utils/types";
import convert, { Unit } from "convert-units";
import { normalizeUnit } from "./unit-mappings";

class UnitConverter {
    async convertUnit(value: number, fromUnit: string, toUnit: string): Promise<ServiceResponse<number>> {
        if (!isFinite(value)) return { success: false, error: "Value must be finite (not Infinity or NaN)" };
        if (fromUnit == toUnit) return { success: true, data: value };

        const from = normalizeUnit(fromUnit);
        const to = normalizeUnit(toUnit);

        const converted = convert(value).from(from as Unit).to(to as Unit);
        return { success: true, data: converted };
    }
}

const unitConverter = new UnitConverter();

export default unitConverter;