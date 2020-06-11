import { processBody, processStatus } from './processors';
import { ResponseGenerated, RouteConfig, RequestContext } from './route-config';

export class ResponseGenerator {
  constructor(private readonly config: RouteConfig) {}

  public async generate(
    context: RequestContext<unknown>,
  ): Promise<ResponseGenerated> {
    return {
      status: processStatus(this.config, context),
      body: await processBody(this.config, context),
    };
  }
}
