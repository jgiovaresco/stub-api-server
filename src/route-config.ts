export type RouteConfig = {
  method: string;
  path: string;
  template: Template;
};

export type TemplateLeafValue = string | boolean | number | null | object;

export type TemplateFunction = (
  query?: object,
  body?: object,
) => TemplateLeafValue;

export type TemplateObjectValue = TemplateLeafValue | TemplateFunction;
export type TemplateObject = {
  [key in string]: TemplateObjectValue;
};

export type Template = TemplateLeafValue | TemplateObject | TemplateFunction;
