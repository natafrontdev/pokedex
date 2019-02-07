import React, { Component } from 'react'
import { observer, inject  } from 'mobx-react'

import Filter from '../../components/Filter'

export default inject('PokemonStore', 'PaginationStore', 'FilterStore')(observer(
  class FilterContainer extends Component {
    constructor (props) {
      super(props)

      this.handleLoadSelectedType = (url) => {
        this.props.FilterStore.loadSelectedType(url)
      }

      this.handleSetFiltered = (filtered) => {
        this.props.FilterStore.setFiltered(filtered)
      }

      this.handleChangePage = (page) => {
        this.props.PaginationStore.changePage(page)
      }

      this.handleChangeItemsPerPage = event => {
        this.props.PaginationStore.changeItemsPerPage(event)
      }

      this.load = (limit, offset) => {
        this.props.PokemonStore.loadPokemons(limit, offset)
      }
    }

    componentDidMount () {
      this.props.FilterStore.loadAllTypes()
      this.props.FilterStore.loadStartData()
    }

    render () {
      const { globalStyles } = this.props
      let { term, types, setTerm, setTypes, pokemonsTypes, onSearchChange, isFiltered, pokemonsFilter } = this.props.FilterStore
      let { loadPokemons, pokemonsData } = this.props.PokemonStore
      let { paginationData } = this.props.PaginationStore
      let { page, itemsPerPage, options: { itemsPage, allItems } } = paginationData
      let count = isFiltered ? pokemonsFilter.length : pokemonsData.length

      return (
        <Filter
          types={types}
          setTypes={setTypes}
          typesData={pokemonsTypes.slice(0, pokemonsTypes.length - 2)}
          loadSelectedType={this.handleLoadSelectedType}
          setFiltered={this.handleSetFiltered}

          onSearchChange={onSearchChange}
          onSearchClear={loadPokemons}
          term={term}
          setTerm={setTerm}

          paginationData={paginationData}
          optionsItemsPerPage={itemsPage}
          loadPokemons={loadPokemons}
          page={page}
          count={!isFiltered ? allItems : count}
          itemsPerPage={itemsPerPage}
          onChangePage={this.handleChangePage}
          onChangeItemsPerPage={this.handleChangeItemsPerPage}
          isApiPagination={!isFiltered}
          loadNewPokemons={this.load}
          globalStyles={globalStyles} />
      )
    }
  }))
