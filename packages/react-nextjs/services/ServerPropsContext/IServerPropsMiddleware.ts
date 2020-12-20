import { IServerPropsContext } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsContext';

export interface IServerPropsMiddleware<
  Props extends {},
  Params extends {} = {},
  Query extends {} = {}
> {
  (ctx: IServerPropsContext<Params, Query>): null | Props | Promise<Props | null>;
}
