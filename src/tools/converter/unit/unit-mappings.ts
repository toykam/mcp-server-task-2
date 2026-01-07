import convert from "convert-units";

export const unitMappings: Record<string, convert.Unit> = {
  // Length
  meter: "m",
  meters: "m",
  m: "m",
  kilometer: "km",
  kilometers: "km",
  km: "km",
  centimeter: "cm",
  centimeters: "cm",
  cm: "cm",
  millimeter: "mm",
  millimeters: "mm",
  mm: "mm",
  inch: "in",
  inches: "in",
  foot: "ft",
  feet: "ft",
  "ft-us": "ft-us",
  yard: "yd",
  yards: "yd",
  mile: "mi",
  miles: "mi",

  // Mass
  gram: "g",
  grams: "g",
  g: "g",
  kilogram: "kg",
  kilograms: "kg",
  kg: "kg",
  milligram: "mg",
  milligrams: "mg",
  mg: "mg",
  pound: "lb",
  pounds: "lb",
  lb: "lb",
  ounce: "oz",
  ounces: "oz",
  oz: "oz",
  ton: "t",
  tons: "t",

  // Temperature
  celsius: "C",
  "°c": "C",
  C: "C",
  fahrenheit: "F",
  "°f": "F",
  F: "F",
  kelvin: "K",
  K: "K",
  rankine: "R",
  R: "R",


   // SPEED
  "m/s": "m/s",
  meterspersecond: "m/s",
  kilometerperhour: "km/h",
  kmph: "km/h",
  kmh: "km/h",
  knots: "knot",
  knot: "knot",
  ftpers: "ft/s",
  "ft/s": "ft/s",

  // TIME
  nanosecond: "ns",
  ns: "ns",
  microsecond: "mu",
  microseconds: "mu",
  millisecond: "ms",
  ms: "ms",
  second: "s",
  seconds: "s",
  s: "s",
  minute: "min",
  minutes: "min",
  min: "min",
  hour: "h",
  hours: "h",
  day: "d",
  days: "d",
  week: "week",
  weeks: "week",
  month: "month",
  months: "month",
  year: "year",
  years: "year",

  // PRESSURE
  pascal: "Pa",
  pa: "Pa",
  kilopascal: "kPa",
  kpa: "kPa",
  hectopascal: "hPa",
  hpa: "hPa",
  megapascal: "MPa",
  mpa: "MPa",
  bar: "bar",
  torr: "torr",
  psi: "psi",
  ksi: "ksi",

  // ENERGY
  joule: "J",
  J: "J",
  kilojoule: "kJ",
  kJ: "kJ",
  Wh: "Wh",
  kilowattsecond: "kWh",
  kWh: "kWh",

  // POWER
  watt: "W",
  wattage: "W",
  W: "W",
  kilowatt: "kW",
  kW: "kW",
  milliwatt: "mW",
  mW: "mW",
  megawatt: "MW",
  MW: "MW",
  gigawatt: "GW",
  GW: "GW",

  // ANGLE
  degree: "deg",
  degrees: "deg",
  deg: "deg",
  radian: "rad",
  rad: "rad",
  grad: "grad",
  arcminute: "arcmin",
  arcminutes: "arcmin",
  arcsecond: "arcsec",
  arcseconds: "arcsec",

  // FREQUENCY
  hertz: "Hz",
  Hz: "Hz",
  kilohertz: "kHz",
  kHz: "kHz",
  megahertz: "MHz",
  MHz: "MHz",
  gigahertz: "GHz",
  GHz: "GHz",
  terahertz: "THz",
  THz: "THz",
  rpm: "rpm",
  "deg/s": "deg/s",
  "rad/s": "rad/s"

  // Add more categories here...
};



export const normalizeUnit = (input: string): string | null => {
  const key = input.toLowerCase().replace(/\s+/g, "");
  return unitMappings[key] || null;
}