import React from 'react'
import JobListScreen from './js/screens/JobListScreen'
import store from './js/redux/store'
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <JobListScreen />
    </Provider>
  )
}

export default App