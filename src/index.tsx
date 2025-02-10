import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter as Router } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

import './styles/index.scss';
import { MenuProvider } from './store/MenuProvider';
import { SearchProvider } from './store/SearchProvider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const Root = () => (
  <Provider store={store}>
    <MenuProvider>
      <SearchProvider>
        <Router>
          <AppRoutes />
        </Router>
      </SearchProvider>
    </MenuProvider>
  </Provider>
);

root.render(<Root />);
