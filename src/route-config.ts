export type RouteConfig = CollectionRouteConfig | SimpleRouteConfig;

export type SimpleRouteConfig = {
  method: string;
  path: string;
  container?: Container;
  status?: StatusFn;
  template: Template;
};

export type CollectionRouteConfig = SimpleRouteConfig & {
  collection: boolean;
  collectionSize: number | CollectionSizeFn<unknown>;
};

export type RequestParams = Record<string, string>;
export type RequestQuery = { [key: string]: string | string[] };
export type RequestPayload<T> = T;

export type RequestContext<T> = {
  params?: RequestParams;
  query?: RequestQuery;
  payload?: RequestPayload<T>;
};
export type ResponseGenerated = {
  status: number;
  body: unknown;
};

export type Route = {
  method: string;
  path: string;
  handler: (context: RequestContext<unknown>) => Promise<ResponseGenerated>;
};

export type StatusFn = (ctx: RequestContext<unknown>) => number;
export type CollectionSizeFn<T> = (ctx: RequestContext<T>) => number;

export type ContainerLeafValue = string | boolean | number | null | object;
export type ContainerFunction = (
  context: RequestContext<unknown>,
  templateGenerated: unknown,
) => ContainerLeafValue;
export type ContainerObjectValue = ContainerLeafValue | ContainerFunction;
export type ContainerObject = {
  [key in string]: ContainerObjectValue;
};
export type Container =
  | ContainerLeafValue
  | ContainerObject
  | ContainerFunction;

export type TemplateLeafValue = string | boolean | number | null | object;
export type TemplateFunction = (
  context: RequestContext<unknown>,
) => TemplateLeafValue;
export type TemplateObjectValue = TemplateLeafValue | TemplateFunction;
export type TemplateObject = {
  [key in string]: TemplateObjectValue;
};
export type Template = TemplateLeafValue | TemplateObject | TemplateFunction;
