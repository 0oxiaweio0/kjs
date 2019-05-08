<template>
  <div class="complex-table">
    <el-table
      ref="table"
      class="complex-table"
      v-bind="$attrs"
      :data="data"
    >
      <!-- 多选列 -->
      <el-table-column
        v-if="cMultiple"
        type="selection"
        align="center"
        width="50"
        fixed="left"
        :selectable="selectable"
        reserve-selection
      >
      </el-table-column>
      <!-- 序号列 -->
      <el-table-column
        v-if="cOrder"
        type="index"
        align="center"
        :label="cFirstColumnTitle"
        :width="cFirstColumnWidth"
        fixed="left"
      >
      </el-table-column>

      <slot v-if="cColumnsOrder === 'suffix'"></slot>
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop || column.label"
        v-bind="column"
        filter-placement="bottom"
        show-overflow-tooltip
      >
        <!-- 表头 -->
        <template
          slot="header"
          slot-scope="slot">
          <custom-table-header
            v-if="column.cFilter"
            :ref="`customTableHeader_${column.prop}`"
            :table-column="slot.column"
            :data-column="column"
            :filters="filters"
            @filter="handleFilter"
            @sort="handleSort"
            @clear-sort="clearCustomSort"
          />
          <template v-else>
            {{ column.label }}
          </template>
        </template>

        <!-- 列内容 -->
        <template slot-scope="slot">
          <template>
            {{ column.cFormatter ? column.cFormatter(slot.row, slot.column, slot.row[column.prop]) : slot.row[column.prop] }}
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 自定义头
import CustomTableHeader from './CustomTableHeader'
// 自定义列
import { mapState, mapGetters } from 'vuex/types'
import _get from 'lodash/get'

export default {
  name: 'ComplexTable',

  components: {
    CustomTableHeader
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    // 列定义
    // tips:
    // 1. 筛选必须传入columnKey！！！
    // 2. 新写的自定义列内容组件需要在此文件中提前注册！！！
    //
    // {
    //     //两两搭配，cFilter与cSortable，默认的sortable和filters
    //     cContent: 'usernmae',//自定义列内容组件。支持['username']，在ComplexTable组件上使用@c-column-click与自定义列内容组件交互
    //     cContentProps: {},//自定义列内容组件props
    //     cFilter: 'text', // 默认为'text'。支持['username']。
    //     cSortable: true,

    // cToDic: true, //转为字典项
    // cToPosition: true, //转为职位项

    //     cFormatter (row) {
    //         // 格式化
    //     }
    // }
    cColumns: {
      type: Array,
      required: true
    },
    // 使用“数组配置的列”在“slot列”前面还是后面
    cColumnsOrder: {
      type: String,
      validator: v => ['prefix', 'suffix'].includes(v),
      default: 'suffix'
    },
    // 是否添加排序列
    cOrder: {
      type: Boolean,
      default: false
    },
    // 是否添加多选列
    cMultiple: {
      type: Boolean,
      default: false
    },
    // 是否显示筛选条件列表
    cShowFilter: {
      type: Boolean,
      default: false
    },
    // 自定义第一列
    cFirstColumnTitle: {
      type: String,
      default: '序号'
    },
    // 自定义第一列with
    cFirstColumnWidth: {
      type: Number,
      default: 50
    },
    // 是否进行选项控制
    cSelectable: {
      type: Boolean,
      default: false

    }
  },
  data() {
    return {
      // 所有筛选条件
      filters: []
    }
  },

  computed: {
    ...mapState({
      dictionary: state => state.system.dictionary
    }),
    ...mapGetters(['id2nameInDictionary', 'id2nameInPosition']),
    tableColumns() {
      return this.cColumns.map(v => {
        const obj = {}
        // 装载字典项的filters
        if (v.filters && v.filters.length === 0 && v.cDicCode) {
          if (this.dictionary.length === 0) {
            this.$store.dispatch('GetDictionary')
          }

          const currrentDic = this.dictionary.find(v2 => v2.dictionaryCode === v.cDicCode)
          if (currrentDic) {
            obj.filters = currrentDic.dtoValList.map(v => {
              return {
                text: v.name,
                value: v.id
              }
            })
          }
        }
        // 格式化字典项
        if (v.cToDic) {
          if (Object.keys(this.id2nameInDictionary).length === 0) {
            this.$store.dispatch('GetDictionaryAll')
          }
          obj.cFormatter = (row, column, cellValue) => {
            return this.id2nameInDictionary[cellValue]
          }
        }
        // 格式化职位
        if (v.cToPosition) {
          if (Object.keys(this.id2nameInPosition).length === 0) {
            this.$store.dispatch('GetPositionTree')
          }
          obj.cFormatter = (row, column, cellValue) => {
            return this.id2nameInPosition[cellValue]
          }
        }

        return {
          ...v,
          ...obj
        }
      })
    }
  },
  methods: {
    selectable(row, index) {
      let isDisabled = false
      if (!this.cSelectable) {
        isDisabled = true
      } else {
        row.status !== 0 ? isDisabled = false : isDisabled = true
      }
      return isDisabled
    },
    // 获取列内容组件名称
    getComponentNameByType(type) {
      const handler = {
        username: 'ColumnUserName',
        promotionTime: 'ColumnSetTime',
        replyWay: 'ColumnDefenceSelect'
      }
      return handler[type]
    },
    // 排序
    handleSort(args) {
      if (args.custom) {
        this.$refs.table.clearSort()
      }
      this.$emit('c-sort', args)
    },
    // 筛选
    // filters 为当前筛选结果
    handleFilter(filters) {
      // 合并到综合筛选条件
      const currentKey = Object.keys(filters)[0]
      const currentValue = filters[currentKey]
      const currentFilter = {
        key: currentKey,
        value: currentValue,
        label: this.cColumns.find(v => v.columnKey === currentKey).label
      }
      // 非字典项选项传入显示名字（字典项可通过store取）
      const currentColumn = this.cColumns.find(v => v.columnKey === currentKey)
      if (!currentColumn.cDicCode && currentColumn.filters) {
        currentFilter.aliasValue = currentColumn.filters.filter(v => currentValue.includes(v.value)).map(v => v.text).join('、')
      }

      // 原筛选条件里有的话，删除，重新加入
      const oldOrder = this.filters.findIndex(v => v.key === currentKey)
      if (oldOrder !== -1) {
        this.filters.splice(oldOrder, 1)
      }

      // 判断不为空
      if (
        (Array.isArray(currentValue) && currentValue.length > 0) ||
          (!Array.isArray(currentValue) && currentValue !== '')
      ) {
        this.filters.push(currentFilter)
      }

      this.$emit('c-filter', this.filters)
    },
    /**
       * 关闭筛选条件
       */
    handleFilterClose({ key, label }) {
      this.onClearFilter(key)
      this.$emit('c-filter', this.filters)
    },
    /**
       * 关闭所有筛选条件
       */
    handleFilterCloseAll() {
      this.onClearFilter()
      this.$emit('c-filter', this.filters)
    },
    /**
       * 自定义组件的自定义事件
       */
    handleColumnClick(v) {
      this.$emit('c-column-click', v)
    },
    /**
       * 清空自定义排序
       */
    clearCustomSort(prop) {
      if (!prop) {
        this.tableColumns.forEach(({ prop }) => {
          const refs = _get(this.$refs, `customTableHeader_${prop}`)
          if (Array.isArray(refs)) {
            refs.forEach(ref => ref.onClearSort())
          }
        })
      }
    },
    // 对外接口 - 暴露ref
    onGetRef() {
      return this.$refs.table
    },
    // 对外接口 - 清空筛选
    onClearFilter(prop) {
      if (!prop) {
        this.filters = []
        this.$refs.table.clearFilter()
        this.tableColumns.forEach(({ prop }) => {
          const refs = _get(this.$refs, `customTableHeader_${prop}`)
          if (Array.isArray(refs)) {
            refs.forEach(ref => ref.onClearFilter())
          }
        })
      } else {
        const index = this.filters.findIndex(v => v.key === prop)
        if (index > -1) {
          this.filters.splice(index, 1)
        }
        const refs = _get(this.$refs, `customTableHeader_${prop}`)
        if (Array.isArray(refs)) {
          refs.forEach(ref => ref.onClearFilter())
        } else {
          this.$refs.table.clearFilter(prop)
        }
      }
    },
    // 对外接口 - 清空排序
    onClearSort(prop) {
      if (!prop) {
        this.$refs.table.clearSort()
        this.clearCustomSort()
      }
    },
    // 对外接口 - 重置查询
    onResetQuery() {
      this.onClearFilter()
      this.onClearSort()
    }
  }
}
</script>

<style lang="less" scoped>
  .complex-table {
    width: 100%;
  }
</style>
