import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import styles from './styles'

import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class FilterTypes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: '',
      name: '',
      labelWidth: 0
    }

    this.handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
      if (event.target.value === 'all') {
        this.props.setFiltered(false)
        this.props.loadPokemons(this.props.itemsPerPage, 0)
      } else {
        this.props.loadSelectedType(event.target.value.url)
      }
    }
  }

  componentDidMount () {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    })
  }

  render () {
    const {
      types,
      globalStyles
    } = this.props

    return (
      <form autoComplete='off' style={{ ...styles.bar }}>
        <FormControl variant='outlined' style={{ ...styles.filterControl, ...styles.typesControl }}>
          <InputLabel
            ref={ref => { this.InputLabelRef = ref }}
            htmlFor='outlined-type-simple'>
          Types
          </InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name='type'
                id='outlined-type-simple'
              />
            }>
            <MenuItem value='all'>All</MenuItem>
            {types.map((type) =>
              <MenuItem
                key={type.url}
                value={type}
                style={{ ...globalStyles[`type_${type.name}`], ...globalStyles.typeItem }}>
                {type.name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    )
  }
}
export default FilterTypes
