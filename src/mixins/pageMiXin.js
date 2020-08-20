/**
 *
 */
var mixinMethod = {
  data () {
    return {
      query: {},
      currentPage: 1,
      currentPageSize: 10
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.currentPageSize = pageSize
      var params = Object.assign({}, this.query)
      this.fetch(params)
    },
    // table翻页
    handleCurrentPageChange (pageIndex) {
      this.currentPage = pageIndex
      var params = Object.assign({}, this.query)
      params.pageSize = this.currentPageSize
      params.pageIndex = this.currentPage
      this.fetch(params)
    },
    //防止报错
    fetch () {

    }
  }
}
export default mixinMethod
