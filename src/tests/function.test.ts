import { generateRandomColor } from "../function";



test('generateRandomColor returns a valid color', () => {
  const color = generateRandomColor();
  const colorRegex = /^#[0-9A-F]{6}$/i; 

  expect(color).toMatch(colorRegex);
});