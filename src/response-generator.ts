import { isNil } from 'lodash';

import {
  defaultStatus,
  processContainer,
  processStatus,
  processTemplate,
} from './processors';
import { ResponseGenerated, RouteConfig, RequestContext } from './route-config';

export class ResponseGenerator {
  constructor(private readonly config: RouteConfig) {}

  public async generate(
    context: RequestContext<unknown>,
  ): Promise<ResponseGenerated> {
    return {
      status: processStatus(this.config.status || defaultStatus, context),
      body: await this.generateBody(context),
    };
  }

  private async generateBody(context: RequestContext<unknown>) {
    const body = await processTemplate(this.config.template, context);

    if (isNil(this.config.container)) {
      return body;
    }

    return processContainer(this.config.container, context, body);
  }
}
