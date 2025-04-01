export function buildRoutePath(path){
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathwithParamsRegex = path.replace(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

  const pathRegex = new RegExp(`^${pathwithParamsRegex}`);

  return pathRegex;
}