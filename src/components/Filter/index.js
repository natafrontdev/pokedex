import React from 'react'

import styles from './styles'

import Grid from '@material-ui/core/Grid'
import FilterTypes from './filter-types'
import FilterSearch from './filter-search'
import Pagination from '../Pagination'

const Filter = (props) => {
  const {
    onSearchChange,
    onSearchClear,
    term,
    setTerm,

    types,
    setTypes,
    typesData,
    loadPokemons,
    loadSelectedType,
    setFiltered,

    optionsItemsPerPage,
    onChangePage,
    onChangeItemsPerPage,
    count,
    itemsPerPage,
    page,
    isApiPagination,
    loadNewPokemons,

    globalStyles
  } = props;

  return (
    <Grid
      container
      spacing={8}
      alignItems={'flex-end'}
      style={{ ...globalStyles.container, ...styles.stickyTop }}>
      <Grid
        item
        xs={12} sm={12} md={4} lg={4}>
        <FilterSearch
          onSearchChange={onSearchChange}
          onSearchClear={onSearchClear}
          term={term}
          setTerm={setTerm} />
      </Grid>
      <Grid
        item
        xs={12} sm={6} md={4} lg={4}>
        <FilterTypes
          types={types}
          setTypes={setTypes}
          typesData={typesData}
          loadPokemons={loadPokemons}
          loadSelectedType={loadSelectedType}
          setFiltered={setFiltered}
          globalStyles={globalStyles} />
      </Grid>
      <Grid
        item
        xs={12} sm={6} md={4} lg={4}>
        <Pagination
          optionsItemsPerPage={optionsItemsPerPage}
          onChangePage={onChangePage}
          onChangeItemsPerPage={onChangeItemsPerPage}
          count={count}
          itemsPerPage={itemsPerPage}
          page={page}
          isApiPagination={isApiPagination}
          loadNewPokemons={loadNewPokemons} />
      </Grid>
    </Grid>
  )
}

export default Filter
