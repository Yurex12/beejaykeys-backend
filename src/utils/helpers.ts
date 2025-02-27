const colors = ['red', 'gray', 'yellow'];
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
