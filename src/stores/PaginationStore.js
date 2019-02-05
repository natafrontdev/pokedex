import { runInAction, extendObservable, action } from 'mobx'

export default extendObservable(this, {
  paginationData: {
    'page': 0,
    'itemsPerPage': 10,
    'options': {
      'itemsPage': [10, 20, 50],
      'allItems': 949
    }
  },

  changePage: action((page) => {
    const currentPage = Number(page)
    runInAction(() => {
      this.paginationData.page = currentPage
    })
  }),

  changeItemsPerPage: action(async (items) => {
    const currentItemsPerPage = Number(items)
    runInAction(() => {
      this.paginationData.itemsPerPage = currentItemsPerPage
      this.changePage(0)
    })
  })

})
