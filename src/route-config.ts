export type RouteConfig = {
  method: string;
  path: string;
  template: Template;
};

export type RequestQuery = { [key: string]: string | string[] };
export type RequestPayload<T> = T;

export type RequestContext<T> = {
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

export type StatusFn = () => number;

export type TemplateLeafValue = string | boolean | number | null | object;

export type TemplateFunction = (
  query?: RequestQuery,
  body?: RequestPayload<unknown>,
) => TemplateLeafValue;

export type TemplateObjectValue = TemplateLeafValue | TemplateFunction;
export type TemplateObject = {
  [key in string]: TemplateObjectValue;
};

export type Template = TemplateLeafValue | TemplateObject | TemplateFunction;
