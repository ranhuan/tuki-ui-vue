<script lang="ts">
import { Md5 } from 'ts-md5'
import { h, ref, watch, reactive, KeepAlive } from 'vue'

export default {
  props: ['data', 'activeIdx'],
  setup(props, { slots }) {
    // 当前激活页卡
    let current = ref(props.activeIdx)
    let tabKeys = reactive(
      slots.default().map((node, idx) => {
        return Md5.hashStr(
          JSON.stringify(node.props) + '_' + new Date().getTime() + '_' + JSON.stringify(props.data)
        )
      })
    )

    watch(
      () => props.activeIdx,
      (first, second) => {
        console.log('Watch props.selected function called with args:', first, second)
        current.value = first
        console.log(current)
      }
    )
    return {
      current,
      tabKeys
    }
  },
  methods: {
    switch(event: PointerEvent) {
      // ((event.target as HTMLLinkElement).parentNode as HTMLLIElement).classList.add('current')
      // this.current = 1
      let target = (event.target as HTMLLinkElement).parentNode as HTMLLIElement
      let siblings = (target.parentNode as HTMLMenuElement).childNodes
      console.log('siblings', siblings)
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] === target) {
          if (this.current == i) {
            // 刷新组件
            // this.tabKeys[i] = Md5.hashStr(this.tabKeys[i])
          } else {
            // 切换Tab
            this.current = i
          }
        }
      }
    }
  },
  render() {
    console.log('重新渲染TukiTab')
    if (this.$slots.default == undefined) {
      return h('div')
    }
    return [
      h(
        'menu',
        this.$slots.default().map((node, idx) => {
          // console.log(node.children.default())
          if (node.props == null) {
            node.props = { label: 'Tab' + idx }
          }
          return h(
            'li',
            this.current == idx ? { class: 'current' } : null,
            h('a', { onClick: this.switch }, node.props.label)
          )
        })
      ),
      // h(
      //   'ul',
      //   { class: 'pane-holder' },
      //   this.$slots.default().map((node, idx) => {
      //     if (node == null) {
      //       return h('div')
      //     }
      //     if (node.props === null) {
      //       node.props = {}
      //     }
      //     if (idx == this.current) {
      //       node.props.active = true
      //     } else {
      //       node.props.active = false
      //     }
      //     node.props.data = this.data
      //     node.props.childKey = this.tabKeys[idx]
      //     return node
      //   })
      // ),
      h(
        'div', {class: 'pane-holder'},
        h(KeepAlive,
          h(this.$slots.default()[this.current], { data: this.data })
        )
      )
    ]
  }
}
</script>
<style scoped>
menu {
  display: flex;
  /* background: #eee; */
  border-left: 1px rgba(0, 0, 0, 0.25) solid;
  border-bottom: 1px rgba(0, 0, 0, 0.25) solid;
  /* overflow: hidden; */
}

li {}

li>a {
  display: block;
  cursor: pointer;
  color: currentColor !important;
  background: #fff;
  padding: 0 1.5em;
  line-height: 3;
  border-right: 1px rgba(0, 0, 0, 0.25) solid;
  border-top: 1px rgba(0, 0, 0, 0.25) solid;
  /* border-bottom: 1px rgba(0,0,0,.25) solid; */
  white-space: nowrap;
  /* margin: 0 0 -10px; */
}

li.current>a {
  /* background-color: red; */
  /* border-bottom: none; */
  border-bottom: 1px #fff solid;
  margin-bottom: -2px;
}

.pane-holder {
  display: flex;
  border-left: 1px rgba(0, 0, 0, 0.25) solid;
  border-right: 1px rgba(0, 0, 0, 0.25) solid;
  border-bottom: 1px rgba(0, 0, 0, 0.25) solid;
  background: #fff;
  padding: 1em;
  flex: 100%;
}</style>
