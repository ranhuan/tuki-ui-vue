<!-- <template>
    <table>
      <thead>
        <tr>
            <slot></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.platformCode + '_' +row.id">
            <td v-for="column in columns" :key="row.platformCode + '_' + row.id + '_' + column.prop">{{ [useSlots().default?.()] }}
            </td>
        </tr>
      </tbody>
    </table>
</template> -->
<style scoped>
table {
  display: table;
  border: 1px #ccc solid;
  border-spacing: 0;
  width: 100%;
  text-align: center;
  border-collapse: separate;
  text-indent: initial;
}

tr:hover {
  background: #ffe;
}

th {
  display: table-cell;
  border-bottom: 1px #eee solid;
  padding: 1em;
  line-height: 1.5;
  font-weight: normal;
  background: #f8f8f8;
}

td {
  border-bottom: 1px #eee solid;
  padding: 0.75em 1em;
  line-height: 1.5;
  height: inherit;
  vertical-align: middle;
}

th.ctricon {
  width: 2em;
}

i.exicon {
  display: block;
  line-height: 1.5;
}

i.more::before {
  font-family: 'Material Icons';
  content: 'unfold_more';
  font-size: 1.5em;
  vertical-align: top;
  color: rgba(0, 0, 0, 0.25);
}

i.less::before {
  font-family: 'Material Icons';
  content: 'unfold_less';
  font-size: 1.5em;
  vertical-align: top;
  color: rgba(0, 0, 0, 0.25);
}

tr.detail {
  /* display: none; */
}

tr.detail>td {
  background: #f8f8f8;
  padding: 1.5em;
}

tr.expand+tr.detail {
  display: table-row;
}
</style>
<script lang="ts">
import { h, ref, useSlots, reactive } from 'vue'
import TukiTableColumn from './TukiTableColumn.vue'
import TukiTableExpand from './TukiTableExpand.vue'

export default {
  name: 'TukiTable',
  props: { data: {required: true, type: Array, default: () => []} },
  //props:{[key:string]:unknown}, {slots}:SetupContext
  setup() {
    // let columns: { [key: string]: any }[] = []
    let columns = []

    // 标记展开的行
    let activeIdx = reactive([] as boolean[])
    // 展开组件
    let tableExpand = null
    // 默认插槽
    const slotDefault = useSlots().default

    if (slotDefault != undefined) {
      // 取回插槽内容
      const slotDefaultNodes = slotDefault()
      // console.log('slotDefaultNodes', slotDefaultNodes)
      for (let node of slotDefaultNodes) {
        if (node.type == TukiTableColumn) {
          // if (node.children != null) {
          //   // console.log("children", node.children.default())
          //   // const cellNodes = node.children.default()
          //   // console.log('cellNodes', cellNodes)
          // }
          // if (node.props == null) {
          //   columns.push({ prop: null, label: '' })
          // } else {
          //   columns.push(node.props)
          // }
          columns.push(node)
        } else if (node.type == TukiTableExpand) {
          tableExpand = node
        }
        // console.log('columns', columns)
        // console.log('slots', slots)
      }
    }
    return {
      columns, // tableColumn组件集的属性集
      slotDefault,
      tableExpand, // tableExpand组件
      activeIdx // 是否展开的标记
    }
  },
  methods: {
    expand(rowIdx: number) {
      // let target = event.currentTarget as HTMLTableRowElement
      // let siblings = (target.parentNode as HTMLTableSectionElement).childNodes
      if (this.activeIdx[rowIdx] == true) {
        this.activeIdx[rowIdx] = false
      } else {
        this.activeIdx[rowIdx] = true
      }
      // target.classList.toggle('expand')
      // for (let i = 0; i < siblings.length; i++) {
      //   if (siblings[i] === target) {
      //     this.activeIdx[i / 2] = true
      //   }
      // }
      // ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).classList.toggle('expand')
      // event.target.parentNode.classList.toggle('expand')
      // console.log(event.currentTarget)
      // 触发展开区域的第一个tab加载
    }
  },
  render() {
    let thRow = []
    if (this.tableExpand != null) {
      thRow.push(h('th', { class: 'ctricon' }))
    }
    for (let column of this.columns) {
      thRow.push(h('th', column.props.label))
    }
    let tbody = []
    console.log(this.data)
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i]
      // if (this.activeIdx.length == i) {
      //   console.log('init row' + i + 'activeIdx')
      //   this.activeIdx[i] = -1
      // }
      let tdRow = []
      if (this.tableExpand != null) {
        if (this.activeIdx[i] == true) {
          tdRow.push(h('td', { onClick: () => this.expand(i) }, h('i', { class: 'less' })))
        } else {
          tdRow.push(h('td', { onClick: () => this.expand(i) }, h('i', { class: 'more' })))
        }
      }
      for (let idx in this.columns) {
        const column = this.columns[idx]
        //tdRow.push(h('td', row[column.prop]))
        // if (this.slotDefault()[idx].children == undefined) {
        //   tdRow.push(h('td', { onClick: () => this.expand(i) }, row[column.prop]))
        // } else {
        //   tdRow.push(h('td', this.slotDefault()[idx].children.default()))
        // }
        // console.log('row', typeof(row))
        // console.log('column', column, column.props)
        column.props.row = row
        tdRow.push(h('td', column.props.expand ? { onClick: () => this.expand(i) } : null, column))
      }
      tbody.push(h('tr', tdRow))

      // 展开行内容
      // this.tableExpand: TukiTableExpand组件
      // this.tableExpand.children TukiTableExpand组件的全部插槽
      // this.tableExpand.children.default() ukiTableExpand组件的默认插槽 也就是TukiTab组件
      if (this.tableExpand != null) {
        if (this.tableExpand.props == null) {
          this.tableExpand.props = { data: row, ref: 'expandTabs' }
        } else {
          this.tableExpand.props.data = row
          // this.tableExpand.props.activeIdx = this.activeIdx[i]
          this.tableExpand.props.ref = 'expandTabs'
        }
        // let tabs = this.tableExpand.children.default()[0]

        // // 传递行数据和默认激活页卡数据给TukiTab组件
        // if (tabs.props == null) {
        //   tabs.props = { data: row, activeIdx: this.activeIdx[i], ref: 'expandTabs' }
        // } else {
        //   tabs.props.data = row
        //   tabs.props.activeIdx = this.activeIdx[i]
        //   tabs.props.ref = 'expandTabs'
        // }
        console.log('activeIdx', this.activeIdx)
        if (this.activeIdx[i] == true) {
          tbody.push(
            h('tr', { class: 'detail' }, h('td', { colspan: this.columns.length + 1 }, this.tableExpand))
          )
        }
      }
    }

    return h('table', [h('thead', h('tr', thRow)), h('tbody', tbody)])
  }
}
</script>

<!-- <script setup lang="ts">
import { ref, useSlots, renderSlot } from "vue"
import TukiTableColumn from "./TukiTableColumn.vue"

let columns: {[key: string]: any}[] = [];
const slots = useSlots()

const slotDefault = slots.default
if (slotDefault != undefined) {
  const slotDefaultNodes = slotDefault()
  for (let node of slotDefaultNodes) {
    console.log('node', node)
    if (node.type == TukiTableColumn) {
      if (node.children != null) {
        console.log("children", node.children)
      }
      if (node.props != null) {
        columns.push(node.props)
      }
    }
  }
}
console.log("defaultSlot", columns)
const props = defineProps(['data'])
console.log(props)
</script> -->
