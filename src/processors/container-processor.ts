/* eslint-disable @typescript-eslint/no-use-before-define */
import Bluebird from 'bluebird';
import { isFunction, isPlainObject } from 'lodash';

import {
  RequestContext,
  Container,
  ContainerObject,
  ContainerObjectValue,
} from '../route-config';

export function processContainer(
  container: Container,
  context: RequestContext<unknown>,
  generatedBody: unknown,
): Promise<unknown> {
  let result: unknown = container;

  if (isFunction(container)) {
    result = container(context, generatedBody);
  }

  if (isContainerObject(container)) {
    result = Bluebird.reduce(
      Object.entries(container),
      processObjectKey(context, generatedBody),
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
  return !!value && 'function' === typeof value.then;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isContainerObject(value: any): value is ContainerObject {
  return isPlainObject(value);
}

function processObjectKey(
  context: RequestContext<unknown>,
  generatedBody: unknown,
) {
  return async (
    result: ContainerObject,
    [key, value]: [string, ContainerObjectValue],
  ) => {
    result[key] = (await processContainer(
      value,
      context,
      generatedBody,
    )) as ContainerObject;
    return result;
  };
}
