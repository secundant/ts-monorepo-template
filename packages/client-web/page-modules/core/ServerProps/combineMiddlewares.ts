import { IServerPropsMiddleware } from '@my-project/client-web/services/ServerPropsContext/IServerPropsMiddleware';
import { applyServerPropsMiddleware } from '@my-project/client-web/page-modules/core/ServerProps/applyMiddleware';

export function combineServerPropsMiddlewares<Params extends {}, Query extends {}>(
  ...middlewares: Array<IServerPropsMiddleware<any, Params, Query>>
): IServerPropsMiddleware<any, Params, Query> {
  return context => applyServerPropsMiddleware(context, ...middlewares.filter(v => !!v));
}
