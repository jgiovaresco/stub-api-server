[![ci](https://github.com/jgiovaresco/stub-api-server/workflows/CI/badge.svg)](https://github.com/jgiovaresco/stub-api-server/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/jgiovaresco/stub-api-server/branch/master/graph/badge.svg)](https://codecov.io/gh/jgiovaresco/stub-api-server)
![release](https://badgen.net/github/release/jgiovaresco/stub-api-server)

# stub-api-server

This lib allows you to configure an HTTP server responding dynamic fake JSON.

The common usecase is stubbing a REST API for Integration Tests.

## Introduction

stub-api-server allow you to define an endpoint based on a simple object

```typescript
// routes/route.ts
import { RouteConfig } from 'stub-api-server';

const route: RouteConfig = {
  method: 'GET',
  path: '/hello',
  template: { message: 'Hello World' },
};

export default route;
```

```typescript
// index.ts
import path from 'path';
import { StubApiServer } from 'stub-api-server';

const server = new StubApiServer();
server.useRoutesFromDir(path.resolve('./routes'));
server.start();
```

```shell script
➜ ts-node index.ts
Starting server on http://localhost:8000
```
