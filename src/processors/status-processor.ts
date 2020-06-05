import { RequestContext, StatusFn } from '../route-config';

const DEFAULT_STATUS = 200;

export function defaultStatus() {
  return DEFAULT_STATUS;
}

export function processStatus(
  statusFn: StatusFn,
  context: RequestContext<unknown>,
) {
  return statusFn(context);
}
