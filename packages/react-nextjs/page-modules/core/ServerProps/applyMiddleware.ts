import { IServerPropsMiddleware } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsMiddleware';
import { IServerPropsContext } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsContext';

export async function applyServerPropsMiddleware<Params extends {}, Query extends {}>(
  context: IServerPropsContext<Params, Query>,
  ...middlewares: Array<IServerPropsMiddleware<unknown, Params, Query>>
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
