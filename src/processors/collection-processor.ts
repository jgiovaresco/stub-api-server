/* eslint-disable @typescript-eslint/no-use-before-define */
import { isNil, isNumber, times } from 'lodash';

import {
  CollectionRouteConfig,
  RequestContext,
  RouteConfig,
} from '../route-config';
import { processTemplate } from './template-processor';

export function isCollection(
  config: RouteConfig,
): config is CollectionRouteConfig {
  return !isNil((config as CollectionRouteConfig).collection);
}

export async function processCollection(
  config: CollectionRouteConfig,
  context: RequestContext<unknown>,
) {
  const size = processCollectionSize(config, context);

  return Promise.all(
    times(size, () => processTemplate(config.template, context)),
  );
}

function processCollectionSize(
  config: CollectionRouteConfig,
  context: RequestContext<unknown>,
) {
  const size = config.collectionSize;

  if (isNumber(size)) {
    return size;
  }

  return size(context);
}
