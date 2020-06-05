export type RouteConfig = {
  method: string;
  path: string;
  status?: StatusFn;
  template: Template;
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

export type TemplateLeafValue = string | boolean | number | null | object;

export type TemplateFunction = (
  context: RequestContext<unknown>,
) => TemplateLeafValue;

export type TemplateObjectValue = TemplateLeafValue | TemplateFunction;
export type TemplateObject = {
  [key in string]: TemplateObjectValue;
};

export type Template = TemplateLeafValue | TemplateObject | TemplateFunction;
