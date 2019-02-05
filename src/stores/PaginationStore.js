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
  // paginationLoading: false,

  changePage: action((page) => {
    console.log('action changePage - ', page)
    const currentPage = Number(page)
    runInAction(() => {
      this.paginationData.page = currentPage
    })
  }),

  changeItemsPerPage: action(async (items) => {
    console.log('action changeItemsPerPage')
    const currentItemsPerPage = Number(items)
    runInAction(() => {
      this.paginationData.itemsPerPage = currentItemsPerPage
      this.changePage(0)
    })
  })

})
