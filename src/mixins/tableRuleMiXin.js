/**
 *表格字段校验
 */
var mixinMethod = {
  data: {
    tableErrorMessage: new Set(),
    tableErrorMessageString: '',
    tableErrorMessageArr: []
  },
  methods: {
    validate (rows, tableRules) {
      this.tableErrorMessage = new Set()

      tableRules = tableRules || this.tableRules || []
      var result = {
        checked: true,
        message: '',
        type: ''
      }
      rows.map(row => {
        tableRules.map(rule => {
          if (rule.required !== false && this.emptyString(row[rule.prop])) {
            result.checked = false
            result.message = '请完善页面信息'
            result.type = '01'
            row[rule.prop + 'Error'] = true
          } else {
            row[rule.prop + 'Error'] = false
          }
        })
      })
      if (!result.checked) {
        return result
      }
      rows.map(row => {
        tableRules.map(rule => {
          if (rule.otherRules) {
            var ctx = this
            var result1 = rule.otherRules.call(ctx, row[rule.prop], row, rule)
            if (!result1.checked) {
              result.checked = false
              result.type = '02'
              result.message = result1.message
              this.tableErrorMessage.add(result1.message)
              row[rule.prop + 'Error'] = true
            } else {
              row[rule.prop + 'Error'] = false
            }
          }
        })
      })
      var tableErrorMessageArr = [...this.tableErrorMessage]
      this.tableErrorMessageArr = tableErrorMessageArr
      this.tableErrorMessageString = tableErrorMessageArr.join(',')
      return result
    },
    /** 单元格标红,单元格不可编辑 */
    tableCellClassName ({
      row,
      column
    }) {
      var _className = ' '
      if (column.property) {
        var item = column.property + 'Error'
        var item1 = column.property + 'IsDisable'
        if (row[item] == true) {
          _className = 'errCell '
        }
        if (row[item1] == true) {
          _className = 'disableCell '
        }
      }
      return _className
    },
  }
}
export default mixinMethod
