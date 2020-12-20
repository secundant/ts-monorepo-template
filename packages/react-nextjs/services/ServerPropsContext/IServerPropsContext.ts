import { IncomingMessage } from 'http';
import { GetServerSidePropsResult } from 'next';

export interface IServerPropsContext<Params extends {}, Query extends {}> {
  readonly query: Query;
  readonly params: Params;
  readonly request: IncomingMessage;

  getResult(): GetServerSidePropsResult<unknown> | null;
  redirect(path: string): Promise<void>;
  notFound(): void;
}
