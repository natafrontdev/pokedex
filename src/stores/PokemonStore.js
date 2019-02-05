import { runInAction, extendObservable, action } from 'mobx'
import PokemonService from '../services/pokemon-service'

const pokemonService = new PokemonService()

export default extendObservable(this, {
  pokemonsData: [],
  pokemonsLoading: false,
  loadPokemons: action(async (limit, offset) => {
    this.pokemonsLoading = true
    const response = await pokemonService.loadPokemons(limit, offset)
    const json = await response
    runInAction(() => {
      this.pokemonsData = json
      this.pokemonsLoading = false
    })
  })
})
