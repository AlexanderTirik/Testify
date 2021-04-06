import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Routing from '../Routing';
import { history } from '../../common/helpers/historyHelper';
import Localization from '../Localization';

const App = () => (
  <Provider store={store}>
    <Localization>
      <ConnectedRouter history={history}>
        <Routing />
      </ConnectedRouter>
    </Localization>
  </Provider>
);

export default App;
