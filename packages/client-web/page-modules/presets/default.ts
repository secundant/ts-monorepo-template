import { pipe } from 'ramda';
import { withTheme, withThemeServerProps } from '@my-project/client-web/page-modules/common/theme';
import { IServerPropsMiddleware } from '@my-project/client-web/services/ServerPropsContext/IServerPropsMiddleware';
import { ServerPropsContext } from '@my-project/client-web/services/ServerPropsContext';

export function withDefaultServerProps<
  Props extends {},
  Params extends {} = {},
  Query extends {} = {}
>(middleware?: IServerPropsMiddleware<Props, Params, Query>) {
  return ServerPropsContext.middlewaresToNextFn(withThemeServerProps(), middleware!);
}

export function withDefaultPage() {
  return pipe(withTheme());
}
