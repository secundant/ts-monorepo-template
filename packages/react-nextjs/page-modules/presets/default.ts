import { pipe } from 'ramda';
import { withTheme, withThemeServerProps } from '@app/react-nextjs/page-modules/common/theme';
import { IServerPropsMiddleware } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsMiddleware';
import { ServerPropsContext } from '@app/react-nextjs/services/ServerPropsContext';

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
