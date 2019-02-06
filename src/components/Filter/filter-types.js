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
      labelWidth: 0
    }

    this.handleTypesChange = (event) => {
      event.target.value.indexOf('all') !== -1
        ? this.props.setTypes([])
        : this.props.setTypes(event.target.value)
    }

    this.handleCheck = () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.props.loadSelectedType(this.props.types.toJS())
      }, 1000)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.types !== this.props.types) {
      if (this.props.types.length === 0) {
        this.props.setFiltered(false)
        this.props.loadPokemons(this.props.itemsPerPage, 0)
      } else {
        this.handleCheck()
      }
    }
  }

  componentDidMount () {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    })
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    const {
      types,
      typesData,
      globalStyles
    } = this.props

    return (
      <form autoComplete='off' style={{ ...styles.bar }}>
        <FormControl variant='outlined' style={{ ...styles.filterControl, ...styles.typesControl }}>
          <InputLabel
            ref={ref => { this.InputLabelRef = ref }}
            htmlFor='select-multiple'>
            Types
          </InputLabel>
          <Select
            multiple
            value={types}
            onChange={this.handleTypesChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name='type'
                id='select-multiple'
              />}>
            <MenuItem value='all'>
              All
            </MenuItem>
            {typesData.map(type => (
              <MenuItem
                key={type.url}
                value={type}
                style={{ ...globalStyles.typeItem }}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    )
  }
}
export default FilterTypes
