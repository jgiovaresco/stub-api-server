import Bluebird from 'bluebird';

import { RequestPayload, RequestQuery, RequestContext } from '../route-config';
import { processTemplate } from './template-processor';

describe('processTemplate should', () => {
  function newContext(query?: RequestQuery, payload?: RequestPayload<unknown>) {
    return { query, payload, url: 'http://localhost:8000' };
  }

  it('process a simple value', async () => {
    const context = newContext();
    expect(await processTemplate(true, context)).toEqual(true);
    expect(await processTemplate('Hello World', context)).toEqual(
      'Hello World',
    );
    expect(await processTemplate(123, context)).toEqual(123);
    expect(await processTemplate(null, context)).toEqual(null);
  });

  describe('process object templates', () => {
    it('using simple values', async () => {
      const context = newContext();
      const template = { message: 'Hello World' };
      const templateDeep = { root: { msg: 'Hello' } };

      expect(await processTemplate(template, context)).toEqual({
        message: 'Hello World',
      });
      expect(await processTemplate(templateDeep, context)).toEqual({
        root: { msg: 'Hello' },
      });
    });

    it('using functions with query provided', async () => {
      const template = {
        message: (ctx: RequestContext<unknown>) => `Hello ${ctx.query?.name}`,
      };
      const context = newContext({ name: 'John' });

      expect(await processTemplate(template, context)).toEqual({
        message: 'Hello John',
      });
    });

    it('using functions with request body provided', async () => {
      type Body = { name: string };
      const template = {
        message: (ctx: RequestContext<Body>) => `Hello ${ctx.payload?.name}`,
      };
      const context = newContext({}, { name: 'John' });

      expect(await processTemplate(template, context)).toEqual({
        message: 'Hello John',
      });
    });
  });

  describe('process function templates', () => {
    it('using query provided', async () => {
      const template = (ctx: RequestContext<unknown>) =>
        `Hello ${ctx.query?.name}`;
      const context = newContext({ name: 'John' });

      expect(await processTemplate(template, context)).toEqual('Hello John');
    });

    it('using request body provided', async () => {
      type Body = { name: string };
      const template = (ctx: RequestContext<Body>) =>
        `Hello ${ctx.payload?.name}`;
      const context = newContext({}, { name: 'John' });

      expect(await processTemplate(template, context)).toEqual('Hello John');
    });

    it('using async function', async () => {
      const template = () => Bluebird.delay(10).then(() => 'Hello World');
      const context = newContext();

      expect(await processTemplate(template, context)).toEqual('Hello World');
    });
  });
});
