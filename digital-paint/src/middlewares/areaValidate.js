import ALERTS from "./alerts";

const areaValidate = (data) => {
  const { width, height, window, door } = data;

  const WINDOW = 2.4 * window;
  const DOOR = 1.52 * door;
  const AREA = width * height;

  const windoor = WINDOW + DOOR;

  if (door) {
    const validate = height - 1.9;
    if (validate < 0.3) {
      ALERTS.invalid_door();
      return true;
    }
  }

  if (width && height) {
    if (AREA < 1 || AREA > 50) {
      ALERTS.invalid_area();
      return true;
    }
  }

  if (windoor > AREA / 2) {
    ALERTS.invalid_windoor();
    return true;
  }

  return false;
};

export default areaValidate;
