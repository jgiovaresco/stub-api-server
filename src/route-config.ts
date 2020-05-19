export type RouteConfig = {
  method: string;
  path: string;
  template: Template;
};

export type TemplateLeafValue = string | boolean | number | null | object;

export type TemplateObject = { [key in string]: TemplateLeafValue };

export type Template = TemplateLeafValue | TemplateObject;
