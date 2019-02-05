import React, { Component } from 'react'
import { observer } from 'mobx-react'

import styles from './styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Spinner from '../Spinner'
import Item from './item'

export default observer(
  class PokemonList extends Component {
    componentDidMount () {
      let optionItemsPerPage = this.props.PaginationStore.paginationData.options.itemsPage.toJS()
      let minOption = Math.min.apply(Math, optionItemsPerPage)
      this.props.PokemonStore.loadPokemons(minOption, 0)
    }

    render () {
      const globalStyles = this.props.globalStyles
      let { pokemonsFilter, loadSelectedType, isFilterLoading, isFiltered } = this.props.FilterStore
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
        <Grid container spacing={8} style={{ ...globalStyles.container, ...styles.list }}>
          {itemsForPagination.map((item) =>
            <Item
              key={item.id}
              globalStyles={globalStyles}
              loadSelectedType={loadSelectedType}
              {...item} />
          )}
          {isFiltered & pokemonsFilter.length === 0
            ? <Typography variant='h5' component='h5'>Sorry, we did not find such a pokemon</Typography>
            : null
          }
        </Grid>
      )
    }
  })
