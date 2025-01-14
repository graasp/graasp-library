/**
 * Produces a pastel color that is defined by the given id
 * @param id
 * @param luminance
 * @returns oklch color
 */
export function getColorFromId(id: string, luminance: number): string {
  const rawHue = id.slice(0, 2);
  const hue = (parseInt(rawHue, 16) / 256) * 360;
  const saturation = 0.13;
  return `oklch(${luminance} ${saturation} ${hue})`;
}
