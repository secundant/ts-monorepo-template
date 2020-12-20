import { IServerPropsMiddleware } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsMiddleware';
import { applyServerPropsMiddleware } from '@app/react-nextjs/page-modules/core/ServerProps/applyMiddleware';

export function combineServerPropsMiddlewares<Params extends {}, Query extends {}>(
  ...middlewares: Array<IServerPropsMiddleware<any, Params, Query>>
): IServerPropsMiddleware<any, Params, Query> {
  return context => applyServerPropsMiddleware(context, ...middlewares.filter(v => !!v));
}
