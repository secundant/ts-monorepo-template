import React from 'react';
import { Typography } from '@material-ui/core';
import { NavOnlyLayout } from '@app/react-nextjs/components/common/Layout/NavOnly';
import { LayoutNavigationProvider } from '@app/react-nextjs/contexts/Layout/Navigation';
import { PageHead } from '@app/react-nextjs/components/common/Page/Head';
import {
  withDefaultPage,
  withDefaultServerProps
} from '@app/react-nextjs/page-modules/presets/default';

interface OtherPageProps {
  value: number;
}

export const getServerSideProps = withDefaultServerProps<OtherPageProps>(async () => {
  await new Promise(r => setTimeout(r, 100));
  return {
    value: Math.ceil(100 + Math.random() * 500)
  };
});

export default withDefaultPage()(function OtherPage({ value }: OtherPageProps) {
  return (
    <LayoutNavigationProvider>
      <NavOnlyLayout>
        <PageHead title="Other page" description="Page with getServerSideProps" />
        <Typography variant="h2" gutterBottom>
          Other page (ssr value: {value})
        </Typography>

        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </NavOnlyLayout>
    </LayoutNavigationProvider>
  );
});
