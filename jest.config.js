module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@/resources/(.*)": "<rootDir>/src/resources/$1",
        "@/utils/(.*)": "<rootDir>/src/utils/$1"
    },
    testPathIgnorePatterns: ['.d.ts', '.js'],
    setupFiles: ['<rootDir>/jest/setEnvVars.js', '<rootDir>/jest/teardown.js'],
    // setupFilesAfterEnv: ['<rootDir>/jest/teardown.js'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    }
};