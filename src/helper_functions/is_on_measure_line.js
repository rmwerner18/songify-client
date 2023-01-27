export const isOnMeasureLine = (i) => {
  if ((i + 1) % 8 === 0 && i !== 31) {
    return 'measure-line';
  }
};
