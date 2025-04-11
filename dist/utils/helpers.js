"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = getRandomColor;
const colors = ['red', 'gray', 'yellow'];
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
