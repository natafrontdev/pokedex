import React, { Fragment } from 'react'

import globalStyles from './globalStyles'

import FilterContainer from '../../containers/FilterContainer'
import PokemonContainer from '../../containers/PokemonContainer'

const App = () => {
  return (
    <Fragment>
      <FilterContainer globalStyles={globalStyles} />
      <PokemonContainer globalStyles={globalStyles} />
    </Fragment>
  )
}

export default App
