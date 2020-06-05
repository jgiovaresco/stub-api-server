export type RouteConfig = {
  method: string;
  path: string;
  template: Template;
};

export type RequestQuery = { [key: string]: string | string[] };
export type RequestPayload = string | object;
export type RouteHandlerContext = {
  query?: RequestQuery;
  payload?: RequestPayload;
};
export type ResponseGenerated = {
  status: number;
  body: unknown;
};

export type Route = {
  method: string;
  path: string;
  handler: (context: RouteHandlerContext) => Promise<ResponseGenerated>;
};

export type StatusFn = () => number;

export type TemplateLeafValue = string | boolean | number | null | object;

export type TemplateFunction = (
  query?: RequestQuery,
  body?: RequestPayload,
) => TemplateLeafValue;

export type TemplateObjectValue = TemplateLeafValue | TemplateFunction;
export type TemplateObject = {
  [key in string]: TemplateObjectValue;
};

export type Template = TemplateLeafValue | TemplateObject | TemplateFunction;
