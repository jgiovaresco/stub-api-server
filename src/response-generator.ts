import { ResponseGenerated, RouteConfig, RequestContext } from './route-config';

import { defaultStatus, processStatus, processTemplate } from './processors';

export class ResponseGenerator {
  constructor(private readonly config: RouteConfig) {}

  public async generate(
    context: RequestContext<unknown>,
  ): Promise<ResponseGenerated> {
    return {
      status: processStatus(this.config.status || defaultStatus, context),
      body: await processTemplate(this.config.template, context),
    };
  }
}
