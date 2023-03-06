export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!swiper|ssr-window|dom7)'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
};
