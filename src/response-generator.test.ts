import { ResponseGenerator } from './response-generator';
import { RouteConfig, Template } from './route-config';
import { newRouteConfig } from '../test/fixtures';

describe('RouteGenerator should', () => {
  function aGeneratorFor(config: RouteConfig) {
    return new ResponseGenerator(config);
  }

  function generatedBody(template: Template) {
    const generator = aGeneratorFor(newRouteConfig({ template }));
    const response = generator.generate();
    return response.body;
  }

  it('generate a 200 response by default', () => {
    const route = newRouteConfig({ template: 'Hello World' });

    const response = aGeneratorFor(route).generate();
    expect(response.status).toBe(200);
  });

  it('process a simple value template', () => {
    expect(generatedBody(true)).toEqual(true);
    expect(generatedBody('Hello World')).toEqual('Hello World');
    expect(generatedBody(123)).toEqual(123);
    expect(generatedBody(null)).toEqual(null);
  });

  it('process object templates', () => {
    const template = { message: 'Hello World' };
    const templateDeep = { root: { msg: 'Hello' } };

    expect(generatedBody(template)).toEqual({ message: 'Hello World' });
    expect(generatedBody(templateDeep)).toEqual({ root: { msg: 'Hello' } });
  });
});
