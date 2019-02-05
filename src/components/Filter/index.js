import React, { Component } from 'react'
import { observer } from 'mobx-react'

import styles from './styles'

import Grid from '@material-ui/core/Grid'
import FilterTypes from './filter-types'
import FilterSearch from './filter-search'
import Pagination from '../Pagination'

export default observer(
  class Filter extends Component {
    constructor (props) {
      super(props)

      this.handleLoadSelectedType = (url) => {
        this.props.FilterStore.loadSelectedType(url)
      }

      this.handleSetFiltered = (filtered) => {
        this.props.FilterStore.setFiltered(filtered)
      }

      this.handleChangePage = (page) => {
        this.props.changePage(page)
      }

      this.handleChangeItemsPerPage = event => {
        this.props.changeItemsPerPage(event)
      }

      this.load = (limit, offset) => {
        this.props.loadPokemons(limit, offset)
      }
    }

    componentDidMount () {
      this.props.FilterStore.loadAllTypes()
      this.props.FilterStore.loadStartData()
    }

    render () {
      let { globalStyles, loadPokemons, count } = this.props
      let { term, setTerm, onSearchChange, isFiltered } = this.props.FilterStore
      let { page, itemsPerPage, options: { itemsPage, allItems } } = this.props.paginationData
      let allTypes = this.props.FilterStore.pokemonsTypes
      let isApiPagination = !isFiltered

      return (
        <Grid
          container
          spacing={8}
          alignItems={'flex-end'}
          style={{ ...globalStyles.container, ...styles.stickyTop}}>
          <Grid
            item
            xs={12} sm={12} md={4} lg={4}>
            <FilterSearch
              onSearchChange={onSearchChange}
              onSearchClear={loadPokemons}
              term={term}
              setTerm={setTerm} />
          </Grid>
          <Grid
            item
            xs={12} sm={6} md={4} lg={4}>
            <FilterTypes
              types={allTypes.slice(0, allTypes.length - 2)}
              loadPokemons={loadPokemons}
              loadSelectedType={this.handleLoadSelectedType}
              setFiltered={this.handleSetFiltered}
              globalStyles={globalStyles} />
          </Grid>
          <Grid
            item
            xs={12} sm={6} md={4} lg={4}>
            <Pagination
              optionsItemsPerPage={itemsPage}
              onChangePage={this.handleChangePage}
              onChangeItemsPerPage={this.handleChangeItemsPerPage}
              count={isApiPagination ? allItems : count}
              itemsPerPage={itemsPerPage}
              page={page}
              isApiPagination={isApiPagination}
              loadNewPokemons={this.load} />
          </Grid>
        </Grid>
      )
    }
  })
