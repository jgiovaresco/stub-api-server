/* eslint-disable @typescript-eslint/no-use-before-define */
import { ExtendableContext } from 'koa';
import { isFunction } from 'lodash';

import { RouteConfig, Template } from './route-config';

export type ResponseGenerated = {
  status: number;
  body: unknown;
};

export class ResponseGenerator {
  constructor(private readonly config: RouteConfig) {}

  public async generate(
    context: ExtendableContext,
  ): Promise<ResponseGenerated> {
    return {
      status: 200,
      body: await process(this.config.template, context),
    };
  }
}

function process(
  template: Template,
  context: ExtendableContext,
): Promise<unknown> {
  let result: unknown = template;

  if (isFunction(template)) {
    result = template(...extractTemplateFunctionParams(context));
  }

  if (!isPromise(result)) {
    return Promise.resolve(result);
  }
  return result;
}

function extractTemplateFunctionParams(context: ExtendableContext) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [context.query, (context.request as any).body];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPromise(value: any): value is Promise<unknown> {
  return !!value && 'function' === typeof value.then;
}
