import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducer'
import './index.css'
import Scoreboard from './components/Scoreboard'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers())

ReactDOM.render(
  <Provider store={store}>
    <Scoreboard />
  </Provider>,
  document.getElementById('root')
)
