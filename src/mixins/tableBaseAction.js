/**
 *
 */
var mixinMethod = {
  data () {
    return {
      selection: [], // 多选项
      currentRow: null, // 当前行
      entity: {},
      query: {},
      order: '',
      order_by: ''
    }
  },
  methods: {
    // 至少选择一条数据
    checkMustSelect () {
      if (!this.selection || this.selection.length == 0) {
        this.$message({
          type: 'error',
          message: '请至少选择一条数据'
        })
        return false
      }
      return true
    },
    // 勾选当前数据
    checkMustSelectCurrent () {
      if (!this.currentRow) {
        this.$message({
          type: 'error',
          message: '请至选择一条数据'
        })
        return false
      }
      return true
    },
    resetAll () {
      this.selection = [], // 多选项
        this.currentRow = null, // 当前行
        this.entity = {},
        this.query = {}
      if (typeof this.initData === 'function') {
        this.initData()
      }
    },
    /** 已经删除的列不显示 */
    tableRowClassName ({
      row
    }) {
      if (row.isValid == 0) {
        return 'hiddenRow'
      }
    },
    /** 选中行 */
    handleSelectionChange (val) {
      this.selection = val
    },
    /** 选中当前行*/
    handleCurrentChange (val) {
      this.currentRow = val
    },
    /** input获取焦点*/
    handleFocus (el) {
      if (el && el.select && typeof el.select === 'function') {
        el.select()
      }
    },


    updateTable (tableData) {
      var tableDataE = tableData || this.tableData || []
      tableDataE.push([])
      tableDataE.pop([])
    },
    clearAll () {
      this.initQuery()
    },
    // 设置获取人员信息List，
    setPeopleList (entity) {
      var peopleList = []
      peopleList.push({
        nextProcessorId: entity.nextProcessorId,
        nextProcessorName: entity.nextProcessorName
      })
      this.$set(this, 'peopleList', peopleList)
    },
    // 排序
    sortChange (obj) {
      const params = {}
      if (obj.order == 'ascending') {
        params.order = 'asc'
      } else if (obj.order == 'descending') {
        params.order = 'desc'
      } else {
        params.order = ''
      }
      params.order_by = obj.prop
      if (obj.prop == null) {
        params.order_by = ''
      }
      this.orderChange(params)
      this.fetch(this.query)
    },
    orderChange (params) {
      this.order = params.order
      this.order_by = params.order_by
    }
  }
}
export default mixinMethod
