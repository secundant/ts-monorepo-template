import { join } from 'path';

export interface PnpWebpackExternalsOptions {
  workspaceRootDir: string;
}

export function PnpWebpackExternals({ workspaceRootDir }: PnpWebpackExternalsOptions) {
  const pnpApi = require('pnpapi');

  return ({ context, request }: any, callback: any) => {
    const excludeAs = (path: string) => {
      callback(null, `commonjs ${path}`);
    };

    try {
      const requestPath = pnpApi.resolveRequest(request, join(context, 'index.js'), {
        considerBuiltins: false
      });

      if (YARN_PNP_RE.test(requestPath)) {
        return excludeAs(requestPath);
      } else {
        return callback();
      }
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        // Make all not found modules external
        if (YARN_PNP_RE.test(request)) {
          return excludeAs(request);
        } else {
          return callback();
        }
      }
      throw err;
    }
  };
}

const YARN_PNP_RE = /\.yarn/;
