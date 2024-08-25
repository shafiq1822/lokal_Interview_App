import React from 'react'
import JobListScreen from './js/screens/JobListScreen'
import store from './js/redux/store'
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

const App = () => {

  console.ignoredYellowBox = true; 

  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" 
      />
      <JobListScreen />
    </Provider>
  )
}

export default App