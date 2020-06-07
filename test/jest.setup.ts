import 'jest-extended';
import 'jest-chain';
import request from 'superagent';
import diff from 'jest-diff';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveStatus: (expected: number) => CustomMatcherResult;
      toHaveBody: (expected: unknown) => CustomMatcherResult;
    }
  }
}
expect.extend({
  toHaveStatus(received: request.Response, expectedStatus: number) {
    const pass = received.status === expectedStatus;

    if (pass) {
      return {
        pass: true,
        message: () =>
          `Expected status '${received.status}' not to be ${expectedStatus}`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `Expected status '${received.status}' to be ${expectedStatus}`,
      };
    }
  },
  toHaveBody(received: request.Response, expected: unknown) {
    const options = {
      comment: 'Object.is equality',
      isNot: this.isNot,
      promise: this.promise,
    };

    const pass = this.equals(received.body, expected);
    const message = pass
      ? () =>
          this.utils.matcherHint('toEqual', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return (
            this.utils.matcherHint('toBe', undefined, undefined, options) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };
    return { actual: received, message, pass };
  },
});
