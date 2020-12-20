import { ITheme, IThemeCreatorOptions } from '@app/react-nextjs/styles/ITheme';

export default ({ createMui }: IThemeCreatorOptions): ITheme => ({ mui: createMui({}) });
