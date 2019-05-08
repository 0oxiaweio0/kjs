<template>
    <span class="custom-table-header complex-table-header">
        <span>{{ tableColumn.label }}</span>
        <span
            v-if="dataColumn.cSortable"
            class="caret-wrapper">
            <i
                class="sort-caret ascending"
                :class="{ active: order === 'ascending' }"
                @click="handleSort('ascending')"></i>
            <i
                class="sort-caret descending"
                :class="{ active: order === 'descending' }"
                @click="handleSort('descending')"></i>
        </span>
        <el-popover
            v-model="isShowPopover"
            :visible-arrow="false"
            placement="bottom"
            trigger="click"
            transition="el-zoom-in-top"
            popper-class="complex-table-header__popover"
        >
            <template slot="reference">
                <span class="el-table__column-filter-trigger">
                    <i
                        class="el-icon-search"
                        title="查询"
                    ></i>
                </span>
            </template>
            <template>
                <div class="complex-table-header__filter">
                    <component
                        :is="filterComponent"
                        v-if="filterComponent"
                        ref="filterComponent"
                        class="custom-component"
                        v-bind="dataColumn.cFilterProps"
                        :is-filter="true"
                        :filters="filters"
                        @filter="handleFilterComponent"
                    />
                    <el-input
                        v-else
                        v-model.trim="filteredValue"
                        placeholder="请输入内容 ~"
                        clearable
                        @keyup.enter.native="handleFilter"
                    >
                        <i
                            slot="suffix"
                            class="el-input__icon el-icon-search"
                            @click="handleFilter"></i>
                    </el-input>
                </div>
            </template>
        </el-popover>
    </span>
</template>

<script>
// 人员
import SelectorUser from '@/components/common/SelectorUser'
// 时间
import SelectorTime from './SelectorTime'
// 时间范围
import SelectorTimeRange from './SelectorTimeRange'

export default {
  components: {
    SelectorUser,
    SelectorTime,
    SelectorTimeRange
  },

  props: {
    // el-table的column
    tableColumn: {
      type: Object,
      required: true
    },
    // 配置项columns的column
    dataColumn: {
      type: Object,
      required: true
    },
    // 表格所有筛选条件（目前用于控制时间选择）
    filters: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isShowPopover: false,
      filteredValue: '',
      order: ''
    }
  },

  computed: {
    filterComponent() {
      if (this.dataColumn.cFilter === 'text') return false
      const handler = {
        username: 'SelectorUser',
        time: 'SelectorTime',
        timeRange: 'SelectorTimeRange'
      }
      return handler[this.dataColumn.cFilter]
    }
  },

  methods: {
    // 默认input框筛选
    handleFilter() {
      this.isShowPopover = false
      this.$emit('filter', {
        [this.tableColumn.columnKey]: this.filteredValue
      })
    },
    // 自定义筛选
    handleFilterComponent(value) {
      this.$emit('filter', {
        [this.tableColumn.columnKey]: value
      })
      this.isShowPopover = false
    },
    // 自定义排序
    handleSort(order) {
      if (this.order === order) {
        this.order = ''
      } else {
        this.$emit('clear-sort')
        this.order = order
      }
      this.$emit('sort', {
        custom: true,
        order: this.order,
        column: this.tableColumn,
        prop: this.dataColumn.prop
      })
    },
    // 对外接口 - 清空筛选条件
    onClearFilter() {
      this.filteredValue = ''
    },
    // 对外接口 - 清空排序
    onClearSort() {
      this.order = ''
    }
  }
}
</script>

<style lang="less" scoped>
.complex-table-header {
    // letter-spacing: -3px;
    // > span {
    //     letter-spacing: 0;
    // }

    // label
    &__label {
        cursor: pointer;
    }

    // sort
    .ascending.active {
        border-bottom-color: @primary;
    }
    .descending.active {
        border-top-color: @primary;
    }

    // filter
    &__filter {
        padding: 10px;
        .custom-component {
            width: 100%;
        }
        .el-input {
            /deep/ .el-input__inner {
                padding: 0 10px;
            }
            /deep/ .el-input__icon {
                cursor: pointer;
            }
        }
    }
}
</style>
