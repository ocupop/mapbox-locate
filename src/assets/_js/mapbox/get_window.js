/* @flow */

function getWindow() {
  if (typeof window === undefined) {
    throw new Error('window not available');
  }

  return window;
}

export { getWindow };