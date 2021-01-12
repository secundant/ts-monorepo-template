import { ITheme, IThemeCreatorOptions } from '@my-project/client-web/styles/ITheme';

export default ({ createMui }: IThemeCreatorOptions): ITheme => ({ mui: createMui({}) });
