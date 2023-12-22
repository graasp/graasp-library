import 'react-toastify/dist/ReactToastify.css';

import ThemeRegistry from './ThemeRegistry';
import Providers from './providers';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: change lang
    <html lang="en">
      <body>
        <Providers>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
