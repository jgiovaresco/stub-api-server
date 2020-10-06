/* eslint-disable @typescript-eslint/no-use-before-define */
import Bluebird from 'bluebird';
import { isFunction, isPlainObject } from 'lodash';

import {
  RequestContext,
  Template,
  TemplateObject,
  TemplateObjectValue,
} from '../route-config';

export function processTemplate(
  template: Template,
  context: RequestContext<unknown>,
): Promise<unknown> {
  let result: unknown = template;

  if (isFunction(template)) {
    result = template(context);
  }

  if (isTemplateObject(template)) {
    result = Bluebird.reduce(
      Object.entries(template),
      processObjectKey(context),
      {},
    );
  }

  if (!isPromise(result)) {
    return Promise.resolve(result);
  }

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPromise(value: any): value is Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!value && 'function' === typeof value.then;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTemplateObject(value: any): value is TemplateObject {
  return isPlainObject(value);
}

function processObjectKey(context: RequestContext<unknown>) {
  return async (
    result: TemplateObject,
    [key, value]: [string, TemplateObjectValue],
  ) => {
    result[key] = (await processTemplate(value, context)) as TemplateObject;
    return result;
  };
}
