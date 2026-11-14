import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';
import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { githubAuthApiRef } from '@backstage/core-plugin-api';
import { SignInPage } from '@backstage/core-components';

const signInPage = SignInPageBlueprint.make({
  params: {
    loader: async () => props => {
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background:
              'linear-gradient(135deg, #0f0f1a 0%, #1b1c33 40%, #0a0c1a 100%)',
            position: 'relative',
            padding: 20,
          }}
        >
          {/* --- Catalyst banner --- */}
          {/* --- Catalyst Logo & Title --- */}
          {/* <div style={{ marginBottom: 50, textAlign: 'center' }}>
            <img
              src={catalystLogo}
              alt="Catalyst Logo"
              style={{ height: 150, marginBottom: 10 }}
            />
          </div> */}
          <SignInPage
            {...props}
            title=""
            providers={[
              'guest',
              {
                id: 'github-auth-provider',
                title: 'Github',
                message:
                  'Sign in using your Digital Engineering Github account.',
                apiRef: githubAuthApiRef,
              },
            ]}
          />
          <div
            style={{
              color: '#aaa',
              letterSpacing: 4,
              fontSize: 18,
            }}
          >
            PIPELINES OF CODE
          </div>
        </div>
      );
    },
  },
});

export default createApp({
  features: [
    catalogPlugin,
    navModule,
    homeModule,
    createFrontendModule({
      pluginId: 'app',
      extensions: [signInPage],
    }),
  ],
});