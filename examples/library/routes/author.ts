// routes/author.ts
import Chance from 'chance';

import { RequestContext, SimpleRouteConfig } from '../../../src';

const faker = new Chance('1234');

type AuthorBody = {
  firstName: string;
  lastName: string;
};
export const newAuthor: SimpleRouteConfig = {
  method: 'POST',
  path: '/authors',
  status: () => 201,
  template: {
    id: faker.natural(),
    firstname: (ctx: RequestContext<AuthorBody>) => ctx.payload?.firstName,
    lastname: (ctx: RequestContext<AuthorBody>) => ctx.payload?.lastName,
  },
};
