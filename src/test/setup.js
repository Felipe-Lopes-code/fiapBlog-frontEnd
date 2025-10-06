import '@testing-library/jest-dom';

/* eslint-disable no-underscore-dangle */
// Mock window.location.hash
Object.defineProperty(window, 'location', {
  value: {
    hash: '#/',
    assign: jest.fn(),
  },
  writable: true
});
/* eslint-enable no-underscore-dangle */
