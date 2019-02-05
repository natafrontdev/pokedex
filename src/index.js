import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { Provider } from 'mobx-react'
import PokemonStore from './stores/PokemonStore'
import PaginationStore from './stores/PaginationStore'
import FilterStore from './stores/FilterStore'

const stores = { PokemonStore, PaginationStore, FilterStore }

const Root = (
  <Provider {...stores}>
    <App />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
