export function buildRoutePath(path){
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParamsRegex = path.replace(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

  const pathRegex = new RegExp(`^${pathWithParamsRegex}(?<query>\\?(.*))?$`);

  return pathRegex;
}