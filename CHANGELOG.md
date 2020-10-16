### [0.6.7](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.6...v0.6.7) (2020-10-16)

### [0.6.6](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.5...v0.6.6) (2020-10-06)

### [0.6.5](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.4...v0.6.5) (2020-10-06)

### [0.6.4](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.3...v0.6.4) (2020-09-25)

### [0.6.3](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.2...v0.6.3) (2020-08-13)

### [0.6.2](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.1...v0.6.2) (2020-08-13)

### [0.6.1](https://github.com/jgiovaresco/stub-api-server/compare/v0.6.0...v0.6.1) (2020-06-15)


### Bug Fixes

* only read js & ts files when loading routes from directory ([873366d](https://github.com/jgiovaresco/stub-api-server/commit/873366d83114f535ed3237db9f43dd6e7283c3f1))

## [0.6.0](https://github.com/jgiovaresco/stub-api-server/compare/v0.5.0...v0.6.0) (2020-06-14)


### Features

* add back the ability to load routes from directory ([afc334a](https://github.com/jgiovaresco/stub-api-server/commit/afc334a3b66d9ef003a13f0601a11e985ec15335))

## [0.5.0](https://github.com/jgiovaresco/stub-api-server/compare/v0.4.0...v0.5.0) (2020-06-12)


### Features

* remove the ability to load routes from directory ([c7f6b59](https://github.com/jgiovaresco/stub-api-server/commit/c7f6b5938c924af5d3a2ddc2f0f78ef53dfa3b72))

## [0.4.0](https://github.com/jgiovaresco/stub-api-server/compare/v0.3.0...v0.4.0) (2020-06-11)


### Features

* implement dummy cache ([3136bdc](https://github.com/jgiovaresco/stub-api-server/commit/3136bdcc971d8ca5da819273acd187d05a72431a))

## [0.3.0](https://github.com/jgiovaresco/stub-api-server/compare/v0.2.0...v0.3.0) (2020-06-11)


### Features

* allow to use a function to generate the collection size ([03fe80c](https://github.com/jgiovaresco/stub-api-server/commit/03fe80cdd87446987f9cb47871d8e6fb60cf0d5c))

## [0.2.0](https://github.com/jgiovaresco/stub-api-server/compare/v0.1.1...v0.2.0) (2020-06-11)


### Features

* add container to the route config ([e02d63f](https://github.com/jgiovaresco/stub-api-server/commit/e02d63fea6ec7c0eb8a28b47fe35891fa8cc6790))
* add request params to the RequestContext ([5f3cf27](https://github.com/jgiovaresco/stub-api-server/commit/5f3cf27c097084142e211e57aa8ebc5a4b8cc5d5))
* allow to define many routes in the same file ([adc56dd](https://github.com/jgiovaresco/stub-api-server/commit/adc56ddb175f5bd1861fc577756fe4fb18dac1e2))
* allow to generate collection responses ([aab947c](https://github.com/jgiovaresco/stub-api-server/commit/aab947cd194a128378d292ba0261857703ab6872))
* allow to override status in route config ([781f4d3](https://github.com/jgiovaresco/stub-api-server/commit/781f4d361566e917e84b8adf82a0034ed7a41572))
* change template function signature to receive a RequestContext ([2b0a6f0](https://github.com/jgiovaresco/stub-api-server/commit/2b0a6f07ba360904583c87e9d3a1cae24d39f5f0))
* display a message showing the listening url ([d254814](https://github.com/jgiovaresco/stub-api-server/commit/d254814e49459db180d2e1cf275ad04b80840e86))
* use hapi library instead koa ([4b681a5](https://github.com/jgiovaresco/stub-api-server/commit/4b681a530d9e5f9c69ae400cdaaa57fd85eeb279))


### Bug Fixes

* getting 500 status when handling POST requests ([e5a0f91](https://github.com/jgiovaresco/stub-api-server/commit/e5a0f916306b9dc0e09e37183788ab9512b8d3c2))

### [0.1.1](https://github.com/jgiovaresco/stub-api-server/compare/v0.1.0...v0.1.1) (2020-06-03)


### Bug Fixes

* export RouteConfig type ([944894e](https://github.com/jgiovaresco/stub-api-server/commit/944894e814b47d9e4acab57b8eda6554d5a5f488))

## 0.1.0 (2020-06-03)


### Features

* configure simple GET route ([0e386f4](https://github.com/jgiovaresco/stub-api-server/commit/0e386f47d5ef1783b1e5fed73122aa68498544da))
* load routes config from a directory ([194d504](https://github.com/jgiovaresco/stub-api-server/commit/194d504b8259616c3b55f492e8252957b649a12c))
* start http server using the provided port ([2227a0a](https://github.com/jgiovaresco/stub-api-server/commit/2227a0ac0387ab313d65471e72c691912e509505))
* start http server using the random port ([037a27f](https://github.com/jgiovaresco/stub-api-server/commit/037a27f381f65fb1c7b6e4eaed455c1a47267713))
* stub responds 501 by default ([e4bf5fe](https://github.com/jgiovaresco/stub-api-server/commit/e4bf5fe316c428ebefa04251ab74197be3d256d6))
