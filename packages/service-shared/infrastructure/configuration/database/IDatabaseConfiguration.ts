export interface IDatabaseConfiguration {
  type: 'postgres';
  name?: string;
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database?: string;
  ssl?: boolean;
}
