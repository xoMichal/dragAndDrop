import { COLORS, LENGTHS } from "./constants";

export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const BLOCK = (opacity: number, isMoving: boolean, color: string) => {
  return ({
    opacity,
    backgroundColor: color,
    width: '300px',
    padding: LENGTHS.small,
    marginTop: LENGTHS.extraSmall,
    border: '1px solid #ccc',
    borderRadius: LENGTHS.xsmall,
    margin: LENGTHS.xsmall,
    color: COLORS.gold,
    transition: 'transform 0.2s ease',
    transform: isMoving ? 'translateY(10px)' : 'none',
  })
}
export const blockRow = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
  }
}