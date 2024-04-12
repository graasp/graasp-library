import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import ThemeRegistry from './ThemeRegistry';
import { nunito } from './fonts';
import Providers from './providers';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: change lang
    <html lang="en" className={nunito.className}>
      <body>
        <Suspense>
          <Providers>
            <ThemeRegistry options={{ key: 'mui', prepend: true }}>
              {children}
            </ThemeRegistry>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
