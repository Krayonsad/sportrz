// src/lib/gameConfig.ts
export interface GameInfo {
  id: string;
  name: string;
  categories: string[];
  path: string;
  thumbnail: string;
  gameUrl: string; // New field for the hosted game URL
}

// Configuration for your hosted games
export const GAMES_BASE_URL = 'https://sportrz.com/Games'; // Your domain with Games folder

// Sample games data - you'll need to populate this with your actual games
export const GAMES_DATA: GameInfo[] = [
  {
    id: '1',
    name: 'Game 1',
    categories: ['Arcade', 'Casual'],
    path: '/Games/1',
    thumbnail: '/Games/1/thumbnail.jpg', // Assuming you have thumbnails
    gameUrl: `${GAMES_BASE_URL}/1/index.html`
  },
  {
    id: 'blocktower',
    name: 'Block Tower',
    categories: ['Puzzle', 'Arcade'],
    path: '/Games/blocktower',
    thumbnail: '/Games/blocktower/thumbnail.jpg',
    gameUrl: `${GAMES_BASE_URL}/blocktower/index.html`
  }
  // Add more games as needed
];

// Categories configuration
export const CATEGORIES = [
  'Top Games',
  'Recommended by Sportrz',
  'Arcade',
  'Casual',
  'Strategy',
  'Defense',
  'Racing',
  'Sports',
  'Puzzle',
  'Shooter',
  'Horror',
  'Board & Card',
  'Educational',
  'Platformer',
  'Simulation',
  'Physics',
  'Kids',
  'Idle / Clicker',
  'Music / Rhythm',
  'Trivia / Quiz'
];

export const categoryIcons: Record<string, string> = {
  'Top Games': '🏆',
  'Recommended by Sportrz': '❤️',
  'Arcade': '🕹️',
  'Casual': '🎮',
  'Strategy': '🧠',
  'Defense': '🛡️',
  'Racing': '🏎️',
  'Sports': '⚽',
  'Puzzle': '🧩',
  'Shooter': '🎯',
  'Horror': '👻',
  'Board & Card': '🎲',
  'Educational': '📚',
  'Platformer': '🏃',
  'Simulation': '🏗️',
  'Physics': '⚛️',
  'Kids': '🧸',
  'Idle / Clicker': '👆',
  'Music / Rhythm': '🎵',
  'Trivia / Quiz': '❓'
};