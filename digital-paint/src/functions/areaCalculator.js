const areaCalculator = (inputFields) => {
  let total = 0;

  for (let i in inputFields) {
    const { width, height, window, door } = inputFields[i];
    const area = width * height;
    const windows = window * 2.4;
    const doors = door * 1.52;

    total += area - (windows + doors);
  }

  return total;
};

export default areaCalculator;
