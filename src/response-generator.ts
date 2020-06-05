import {
  ResponseGenerated,
  RouteConfig,
  RouteHandlerContext,
} from './route-config';

import { processTemplate } from './processors';

export class ResponseGenerator {
  constructor(private readonly config: RouteConfig) {}

  public async generate(
    context: RouteHandlerContext,
  ): Promise<ResponseGenerated> {
    return {
      status: 200,
      body: await processTemplate(this.config.template, context),
    };
  }
}
