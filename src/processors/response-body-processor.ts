/* eslint-disable @typescript-eslint/no-use-before-define */
import { isNil, times } from 'lodash';

import {
  CollectionRouteConfig,
  isCollection,
  RequestContext,
  RouteConfig,
} from '../route-config';
import { processTemplate } from './template-processor';
import { processContainer } from './container-processor';

export async function processBody(
  config: RouteConfig,
  context: RequestContext<unknown>,
) {
  const body = await buildBody(config, context);
  return containerize(config, context, body);
}

async function buildBody(config: RouteConfig, context: RequestContext<unknown>) {
  if (isCollection(config)) {
    return processCollection(config, context);
  }
  return processTemplate(config.template, context);
}

async function processCollection(
  config: CollectionRouteConfig,
  context: RequestContext<unknown>,
) {
  const size = config.collectionSize;

  return Promise.all(
    times(size, () => processTemplate(config.template, context)),
  );
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
