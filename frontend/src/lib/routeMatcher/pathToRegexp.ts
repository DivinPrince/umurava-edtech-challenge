import type {
    Match,
    MatchFunction,
    ParseOptions,
    Path,
    RegexpToFunctionOptions,
    TokensToRegexpOptions,
  } from './path-to-regexp';
  import { match as matchBase, pathToRegexp as pathToRegexpBase } from './path-to-regexp';
  
  export const pathToRegexp = (path: string) => {
    try {
      return pathToRegexpBase(path);
    } catch (e: any) {
      throw new Error(
        `Invalid path: ${path}.\nConsult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x\n${e.message}`,
      );
    }
  };
  
  export function match<P extends object = object>(
    str: Path,
    options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions,
  ): MatchFunction<P> {
    try {
      return matchBase(str, options);
    } catch (e: any) {
      throw new Error(
        `Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x\n${e.message}`,
      );
    }
  }
  
  export { type Match, type MatchFunction };