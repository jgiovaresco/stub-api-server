export type RouteConfig = {
  method: string;
  path: string;
  template: Template;
};

export type TemplateLeafValue = string | boolean | number | null | object;

export type TemplateObject = { [key in string]: TemplateLeafValue };
export type TemplateFunction = (
  query?: object,
  body?: object,
) => TemplateLeafValue;

export type Template = TemplateLeafValue | TemplateObject | TemplateFunction;
