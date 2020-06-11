import { isNil } from 'lodash';

import { RequestContext, RouteConfig } from '../route-config';

const DEFAULT_STATUS = 200;

export function processStatus(
  config: RouteConfig,
  context: RequestContext<unknown>,
): number {
  if (isNil(config.status)) {
    return DEFAULT_STATUS;
  }

  return config.status(context);
}
