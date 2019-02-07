import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles'

import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class Pagination extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      itemsPerPage: this.props.itemsPerPage,
      name: 'hai',
      labelWidth: 0,
      isLastPage: false
    }

    this.handleFirstPageButtonClick = () => {
      this.props.onChangePage(0)
      this.props.loadNewPokemons(this.state.itemsPerPage, 0)
    }

    this.handleBackButtonClick = () => {
      let newPage = this.props.page === 1 ? 0 : this.props.page - 1
      console.log('handleBackButtonClick', newPage)
      this.props.onChangePage(newPage)
      this.props.loadNewPokemons(this.props.itemsPerPage, this.props.page * this.props.itemsPerPage - this.props.itemsPerPage)
    }

    this.handleNextButtonClick = () => {
      console.log('handleNextButtonClick', this.props.page)
      this.props.onChangePage(this.props.page + 1)
      this.props.loadNewPokemons(this.props.itemsPerPage, (this.props.page + 1) * this.props.itemsPerPage)
    }

    this.handleLastPageButtonClick = () => {
      this.props.onChangePage(Math.max(0, Math.ceil(this.props.count / this.props.itemsPerPage) - 1))
      this.props.loadNewPokemons(this.props.itemsPerPage, (Math.max(0, Math.ceil(this.props.count / this.props.itemsPerPage) - 1)) * this.props.itemsPerPage)
    }

    this.handleChange = event => {
      this.props.onChangeItemsPerPage(event.target.value)
      this.setState({ [event.target.name]: event.target.value })
      this.props.loadNewPokemons(Number(event.target.value), 0)
    }
  }

  componentDidMount () {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    })
  }

  render () {
    let { page, optionsItemsPerPage, itemsPerPage, count } = this.props

    return (
      <div style={{ ...styles.pagination }}>
        <FormControl variant='outlined' style={{ ...styles.paginationControl }}>
          <InputLabel
            ref={ref => { this.InputLabelRef = ref }}
            htmlFor='outlined-age-native-simple'>
            Elements
          </InputLabel>
          <Select
            native
            value={this.state.itemsPerPage}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                name='itemsPerPage'
                labelWidth={this.state.labelWidth}
                id='outlined-age-native-simple'
              />
            }>
            {optionsItemsPerPage.map((value, i) =>
              <option key={i} value={value}>{value}</option>
            )}
          </Select>
        </FormControl>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='First Page'>
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label='Previous Page'>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={
            this.props.isApiPagination
              ? page >= Math.ceil(this.props.count / itemsPerPage) - 1
              : page >= Math.ceil(count / itemsPerPage) - 1
          }
          aria-label='Next Page'>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={
            this.props.isApiPagination
              ? page >= Math.ceil(this.props.count / itemsPerPage) - 1
              : page >= Math.ceil(count / itemsPerPage) - 1
          }
          aria-label='Last Page'>
          <LastPageIcon />
        </IconButton>
      </div>
    )
  }
}

export default Pagination
