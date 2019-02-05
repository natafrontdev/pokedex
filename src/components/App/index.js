import React, { Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import globalStyles from './globalStyles'

import Filter from '../Filter'
import PokemonList from '../PokemonList'

const App =
  inject('PokemonStore', 'PaginationStore', 'FilterStore')(
    observer(({ PokemonStore, FilterStore, PaginationStore }) => {
      let { isFiltered, pokemonsFilter } = FilterStore
      let { loadPokemons, pokemonsData } = PokemonStore
      let { changePage, changeItemsPerPage, paginationData, paginationData: { itemsPerPage } } = PaginationStore

      return (
        <Fragment>
          <Filter
            FilterStore={FilterStore}
            paginationData={paginationData}
            loadPokemons={loadPokemons}
            count={isFiltered ? pokemonsFilter.length : pokemonsData.length}
            itemsPerPage={itemsPerPage}
            changePage={changePage}
            changeItemsPerPage={changeItemsPerPage}
            globalStyles={globalStyles} />
          <PokemonList
            PokemonStore={PokemonStore}
            PaginationStore={PaginationStore}
            FilterStore={FilterStore}
            globalStyles={globalStyles} />
        </Fragment>
      )
    }))

export default App
