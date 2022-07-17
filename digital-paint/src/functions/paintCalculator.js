import areaCalculator from "./areaCalculator";

const paintCalculator = (inputFields) => {
  const PAINT_SIZE = [18, 3.6, 2.5, 0.5];
  const PAINT_AREA = [90, 18, 12.5, 2.5];

  const inks = [];

  let total = areaCalculator(inputFields);

  for (let p in PAINT_SIZE) {
    const paint = PAINT_SIZE[p];
    const ink_area = PAINT_AREA[p];

    if (total >= ink_area) {
      let t = Math.floor(total / ink_area);
      inks.push({ name: paint, quantity: t });

      total -= ink_area * t;
    }
  }

  return inks;
};

export default paintCalculator;
