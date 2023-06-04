module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx,jsx,js}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    
}   