import { newRouteConfig } from '../../test/fixtures';
import { RequestPayload, RequestQuery } from '../route-config';
import { processStatus } from './status-processor';

describe('processStatus should', () => {
  function newContext(query?: RequestQuery, payload?: RequestPayload<unknown>) {
    return { query, payload, url: 'http://localhost:8000' };
  }

  it('return a 200 response by default', () => {
    const route = newRouteConfig({ template: 'Hello World' });
    const context = newContext();

    expect(processStatus(route, context)).toBe(200);
  });
});
