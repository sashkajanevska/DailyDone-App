export default function getRandomColor() {
  const colors = [
    "#3498db",
    "#773cc5",
    "#db4b5f",
    "#3dc490",
    "#2c7e24",
    "#e2cc4c",
    "#1e3e96",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
