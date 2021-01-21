import { IServerPropsMiddleware } from '@my-project/client-web/services/ServerPropsContext/IServerPropsMiddleware';
import { IServerPropsContext } from '@my-project/client-web/services/ServerPropsContext/IServerPropsContext';

export async function applyServerPropsMiddleware<Params extends {}, Query extends {}>(
  context: IServerPropsContext<Params, Query>,
  ...middlewares: Array<IServerPropsMiddleware<any, Params, Query>>
): Promise<unknown> {
  const props = {};

  for (const middleware of middlewares) {
    const middlewareProps = await middleware(context);

    if (middlewareProps) {
      Object.assign(props, middlewareProps);
    }
    if (context.getResult()) {
      return null;
    }
  }
  return props;
}
