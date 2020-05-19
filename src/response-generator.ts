import { RouteConfig } from './route-config';

export type ResponseGenerated = {
  status: number;
  body: unknown;
};
export class ResponseGenerator {
  constructor(private readonly config: RouteConfig) {}

  public generate(): ResponseGenerated {
    return {
      status: 200,
      body: this.config.template,
    };
  }
}
