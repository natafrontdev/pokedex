import React from 'react'

import styles from './styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Item from './item'

const PokemonList = (props) => {
  const {
    globalStyles,
    itemsForPagination,
    loadSelectedUrl,
    isFiltered,
    pokemonsFilter
  } = props

  return (
    <Grid container spacing={8} style={{ ...globalStyles.container, ...styles.list }}>
      {itemsForPagination.map((item) =>
        <Item
          key={item.id}
          globalStyles={globalStyles}
          loadSelectedType={loadSelectedUrl}
          {...item} />
      )}
      {isFiltered & pokemonsFilter.length === 0
        ? <Typography variant='h5' component='h5'>Sorry, we did not find such a pokemon</Typography>
        : null
      }
    </Grid>
  )
}

export default PokemonList
