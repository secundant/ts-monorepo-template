import { IServerPropsContext } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsContext';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { IncomingMessage } from 'http';
import { IServerPropsMiddleware } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsMiddleware';
import { combineServerPropsMiddlewares } from '@app/react-nextjs/page-modules/core/ServerProps/combineMiddlewares';

export class ServerPropsContext<Params extends {}, Query extends {}>
  implements IServerPropsContext<Params, Query> {
  static middlewaresToNextFn<Params extends {}, Query extends {}>(
    ...middlewares: Array<IServerPropsMiddleware<any, Params, Query>>
  ): GetServerSideProps<any, Params> {
    const middleware = combineServerPropsMiddlewares(...middlewares);

    return async nextContext => {
      const context = new ServerPropsContext<Params, Query>(nextContext);
      const props = await middleware(context);

      return context.getResult() ?? { props };
    };
  }

  readonly params: Params;
  readonly query: Query;
  readonly request: IncomingMessage;

  private result: GetServerSidePropsResult<unknown> | null = null;

  constructor({ params, query, req }: GetServerSidePropsContext<Params>) {
    this.params = params!;
    this.query = query as Query; // TODO Add runtypes support
    this.request = req;
  }

  getResult(): GetServerSidePropsResult<unknown> | null {
    return this.result;
  }

  async redirect(path: string): Promise<void> {
    this.result = {
      redirect: {
        destination: path,
        statusCode: 301
      }
    };
  }

  notFound(): void {
    this.result = {
      notFound: true
    };
  }
}
