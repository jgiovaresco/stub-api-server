// routes/books.ts
import Chance from 'chance';
import { times } from 'lodash';

import {
  CollectionRouteConfig,
  RequestContext,
  SimpleRouteConfig,
} from '../../../src';

const faker = new Chance('1234');

const bookTemplate = {
  id: '' + faker.natural(),
  name: faker.word(),
  authors: times(2, () => ({
    id: faker.natural(),
    firstname: faker.first(),
    lastname: faker.last(),
  })),
};

const books: CollectionRouteConfig = {
  method: 'GET',
  collection: true,
  collectionSize: 3,
  path: '/books',
  template: bookTemplate,
  container: {
    data: (ctx: RequestContext<unknown>, data: unknown[]) => data,
    count: (ctx: RequestContext<unknown>, data: unknown[]) => data.length,
    next: (ctx: RequestContext<unknown>) =>
      ctx.query?.page === '1' ? 2 : null,
    previous: (ctx: RequestContext<unknown>) =>
      ctx.query?.page === '2' ? 1 : null,
  },
};

const book: SimpleRouteConfig = {
  method: 'GET',
  path: '/books/{id}',
  template: {
    id: (ctx: RequestContext<unknown>) => ctx.params?.id,
    name: faker.word(),
    authors: times(2, () => ({
      id: faker.natural(),
      firstname: faker.first(),
      lastname: faker.last(),
    })),
  },
};

export default [books, book];
