/* eslint-disable @typescript-eslint/no-use-before-define */
import { isNil } from 'lodash';

import { RequestContext, RouteConfig } from '../route-config';
import { processTemplate } from './template-processor';
import { isCollection, processCollection } from './collection-processor';
import { processContainer } from './container-processor';

const cache: Record<string, unknown> = {};

export async function processBody(
  config: RouteConfig,
  context: RequestContext<unknown>,
) {
  const cacheKey = config.method + context.url;

  if (config.cache && !isNil(cache[cacheKey])) {
    return cache[cacheKey];
  }

  const body = await containerize(
    config,
    context,
    await buildBody(config, context),
  );
  cache[cacheKey] = body;
  return body;
}

async function buildBody(
  config: RouteConfig,
  context: RequestContext<unknown>,
) {
  if (isCollection(config)) {
    return processCollection(config, context);
  }
  return processTemplate(config.template, context);
}

async function containerize(
  config: RouteConfig,
  context: RequestContext<unknown>,
  generatedBody: unknown,
) {
  if (isNil(config.container)) {
    return generatedBody;
  }

  return processContainer(config.container, context, generatedBody);
}
