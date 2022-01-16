const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', 'utils', '<rootDir>/'],
  // We recommend placing the extensions most commonly used in your project on the left
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jest-environment-jsdom',
  // Resolve Typescript paths
  moduleNameMapper: {
    'faker': '@faker-js/faker',
    '@pages/(.*)': '<rootDir>/pages/$1',
    '@components/(.*)': '<rootDir>/app/components/$1',
    '@utils/(.*)': '<rootDir>/app/utils/$1',
    '@lib/(.*)': '<rootDir>/app/lib/$1',
    '@containers/(.*)': '<rootDir>/app/containers/$1',
    '@screens/(.*)': '<rootDir>/app/screens/$1',
    '@hooks/(.*)': '<rootDir>/app/hooks/$1',
    '@providers/(.*)': '<rootDir>/app/store/providers/$1',
    '@reducers/(.*)': '<rootDir>/app/store/reducers/$1',
    '@context/(.*)': '<rootDir>/app/store/context/$1',
    '@actions/(.*)': '<rootDir>/app/store/actions/$1',
    '@api/(.*)': '<rootDir>/app/api/$1',
    '@data/(.*)': '<rootDir>/app/data/$1',
  },
}

/* Cleanup is called after each test automatically by default */

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
