import { runInAction, extendObservable, action } from 'mobx'
import PokemonService from '../services/pokemon-service'

const pokemonService = new PokemonService()

export default extendObservable(this, {
  isFiltered: false,
  isFilterLoading: false,
  pokemonsFilter: [],
  pokemonsTypes: [],
  pokemonsStartData: [],
  term: '',

  setFiltered: action((filtered) => {
    const newFiltered = filtered
    runInAction(() => {
      this.isFiltered = newFiltered
    })
  }),

  loadAllTypes: action(async () => {
    this.isFilterLoading = true
    const response = await pokemonService.loadPokemonsAllTypes()
    const json = await response.results
    runInAction(() => {
      this.pokemonsTypes = json
      this.pokemonsFilter = json
      this.isFilterLoading = false
    })
  }),

  loadSelectedType: action(async (url) => {
    this.isFilterLoading = true
    this.isFiltered = true
    const response = await pokemonService.loadPokemonsSelectedType(url)
    const json = await response
    runInAction(() => {
      this.pokemonsFilter = json
      this.isFilterLoading = false
    })
  }),

  loadStartData: action(async () => {
    console.log('loadStartData')
    this.isFilterLoading = true
    const response = await pokemonService.loadPokemonsStartData()
    const json = await response.results
    runInAction(() => {
      this.pokemonsStartData = json
      this.isFilterLoading = false
    })
  }),

  setTerm: action((term) => {
    const newTerm = term
    runInAction(() => {
      this.term = newTerm
    })
  }),

  onSearchChange: action(async (term) => {
    console.log('StartData', this.pokemonsStartData)
    this.isFilterLoading = true
    this.isFiltered = true
    const items = this.pokemonsStartData

    if (term.length === 0) {
      this.isFilterLoading = false
      this.isFiltered = false
      return items
    }

    let pokemonsSearch = items.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(term.toLowerCase())
    })
    console.log('Search Store pokemonsSearch', pokemonsSearch)
    const response = pokemonService.loadData(pokemonsSearch)
    const json = await response
    runInAction(() => {
      this.pokemonsFilter = json
      this.isFilterLoading = false
    })
  })

})
