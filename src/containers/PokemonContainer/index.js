import React, { Component } from 'react'
import { observer, inject  } from 'mobx-react'

import styles from './styles'

import Grid from '@material-ui/core/Grid'
import Spinner from '../../components/Spinner'
import PokemonList from '../../components/PokemonList'

export default inject('PokemonStore', 'PaginationStore', 'FilterStore')(observer(
  class PokemonContainer extends Component {
    componentDidMount () {
      let optionItemsPerPage = this.props.PaginationStore.paginationData.options.itemsPage.toJS()
      let minOption = Math.min.apply(Math, optionItemsPerPage)
      this.props.PokemonStore.loadPokemons(minOption, 0)
    }

    render () {
      const { globalStyles } = this.props
      let { pokemonsFilter, loadSelectedUrl, isFilterLoading, isFiltered } = this.props.FilterStore
      let { pokemonsData, pokemonsLoading } = this.props.PokemonStore
      let { paginationData: { page, itemsPerPage } } = this.props.PaginationStore
      let pokemons = isFiltered ? pokemonsFilter : pokemonsData
      let isApiPagination = !isFiltered
      let itemsForPagination = isApiPagination
        ? pokemons
        : pokemons.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

      let isLoading = pokemonsLoading || isFilterLoading

      if (isLoading) {
        return (
          <Grid container spacing={8} style={{ ...globalStyles.container, ...styles.list }}>
            <Spinner />
          </Grid>
        )
      }

      return (
        <PokemonList
          globalStyles={globalStyles}
          itemsForPagination={itemsForPagination}
          loadSelectedUrl={loadSelectedUrl}
          isFiltered={isFiltered}
          pokemonsFilter={pokemonsFilter} />
      )
    }
  }))
