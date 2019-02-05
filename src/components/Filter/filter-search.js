import React from 'react'

import styles from './styles'

import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

class FilterSearch extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchChange = (event) => {
      this.props.setTerm(event.target.value)
    }

    this.onSearchClear = () => {
      this.props.setTerm('')
    }

    this.handleCheck = () => {
      clearTimeout(this.timer)
      const term = this.props.term
      this.timer = setTimeout(() => {
        this.props.onSearchChange(term)
      }, 500)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.term !== this.props.term) {
      if (this.props.term === '') {
        this.props.onSearchClear()
      }
      this.handleCheck()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    return (
      <form noValidate autoComplete='off'>
        <TextField
          style={{ ...styles.filterControl }}
          id='outlined-password-input'
          label='Search'
          margin='normal'
          variant='outlined'
          value={this.props.term}
          onChange={this.handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  key='close'
                  aria-label='Close'
                  color='inherit'
                  onClick={this.onSearchClear}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>
    )
  }
}

export default FilterSearch
