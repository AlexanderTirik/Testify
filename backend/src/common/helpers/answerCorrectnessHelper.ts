export const checkCorrectness = (correctOptionsIds: string[], studentOptionsIds: string[]) => (
  correctOptionsIds.length === studentOptionsIds.length
    && correctOptionsIds.every((el, index) => el === studentOptionsIds[index])
);
