export const noPath = {
  method: 'GET',
  template: { message: 'route1' },
};

export const noMethod = {
  path: '/boom',
  template: { message: 'route1' },
};

export const noTemplate = {
  method: 'GET',
  path: '/boom',
};

export const nothingRelatedToARouteConfig = [{
  name: 'John',
}];

export default {
  name: 'Jane',
}
