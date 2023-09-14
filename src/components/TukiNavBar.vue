<style scoped>
nav {
  background: #eee;
}
ul {
  display: flex;
  overflow: hidden;
}
main {
  padding: 1em;
}
</style>
<template>
  <nav>
    <ul>
      <tuki-nav-bar-item v-for="(navTab, index) in navStore.tabs" :key="index" :active="navStore.current == index"
        :path="navTab.path" :title="navTab.title" :index="index" @active="onActive" @close="onClose" />
    </ul>
  </nav>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive :max="100" :exclude="excludes">
        <component :is="wrap($route.fullPath, Component)" class="panel" :ref="setComponentRef"></component>
      </keep-alive>
    </router-view>
  </main>
</template>
<script lang="ts">
import TukiNavBarItem from '@/components/TukiNavBarItem.vue'
import { ref, h, useSlots, defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useNavStore } from '@/stores/nav'
import { Md5 } from 'ts-md5'

export default defineComponent({
  name: 'TukiNavBar',
  components: {
    TukiNavBarItem
  },
  props: { active: Number },
  setup(props, context) {
    const navStore = useNavStore()
    const router = useRouter()
    const slotDefault = useSlots().default
    if (slotDefault != undefined) {
      const slotDefaultNodes = slotDefault()
      console.log('slotDefaultNodes', slotDefaultNodes)
      for (let node of slotDefaultNodes) {
        if (node.type == TukiNavBarItem) {
          if (node.props != null) {
            navStore.addTab(node.props.path, node.props.title)
            console.log('navStore', navStore)
          }
        }
      }
    }

    const excludes = ref<string[]>([])

    const wrapperMap = new Map();
    const wrap = (fullPath:string, component) => {
      // console.log('component_fullpath', fullPath)
      let wrapper;
      const wrapperName = getComponentName(fullPath);
      // console.log(wrapperName)
      if (wrapperMap.has(wrapperName)) {
        wrapper = wrapperMap.get(wrapperName)
      } else {
        wrapper = {
          name: wrapperName,
          methods: {
            reload() {
              console.log("wrapper.reload")
              if (this.$refs.child && typeof (this.$refs.child.reload) == 'function') {
                this.$refs.child.reload()
              } else {
                console.log('子组件没有定义reload方法')
              }
            }
          },
          render() {
            return h(component, { ref: "child" })
          }
        }
        wrapperMap.set(wrapperName, wrapper)
      }

      return h(wrapper)
    }

    const onActive = (index: number) => {
      // 如果点击的当前页卡刷新页卡内容(要求组件定义了reload)
      if (index == navStore.current) {
        if (typeof (componentRef.value.reload) === 'function') {
          componentRef.value.reload()
        }
        //router.push({ path: navStore.tabs[navStore.current].path, force: true })
      } else {
        navStore.setCurrent(index)
        router.push(navStore.tabs[navStore.current].path)
      }
    }

    const getComponentName = (fullpath: string):string => {
      return Md5.hashStr(fullpath).toUpperCase()
    }

    const onClose = (index: number) => {
      // const instance = getCurrentInstance();
      // const cache = instance.parent.__v_cache
      // console.log('cache', cache)

      // 从数据中减少页卡标签
      // console.log(navStore.tabs)
      // console.log(index)
      // console.log(navStore.tabs[index].path)
      // const componentName =  Md5.hashStr(navStore.tabs[index].path).toUpperCase()
      // console.log('componentName', componentName)
      clearCache(getComponentName(navStore.tabs[index].path))
      // 
      navStore.tabs.splice(index, 1)
      // 如果是当前激活页卡 需要切换页卡
      if (navStore.current == index) {
        // 默认切换到后一个页卡 如果没有 则切换到前一个页卡
        if (navStore.tabs.length <= index) {
          navStore.current = index - 1
        }
        // if (typeof(componentRef.value.reset) === 'function') {
        //   componentRef.value.reset()
        // }
        // router.back()
        // currentComponent.value.destroy()
        router.push({ path: navStore.tabs[navStore.current].path })
      }
    }

    const componentRef = ref(null);
    const setComponentRef = (el) => {
      componentRef.value = el;
    }

    const disallowCache = (name: string) => {
      excludes.value.push(name)
    }

    const allowCache = (name: string) => {
      excludes.value = excludes.value.filter((item) => item !== name)
    }

    const clearCache = (name: string) => {
      disallowCache(name)
      // 1s后恢复缓存
      setTimeout(() => {
        allowCache(name)
      }, 1000)
    }


    return {
      navStore,
      router,
      onActive,
      onClose,
      componentRef,
      setComponentRef,
      wrap,
      excludes,
      clearCache
    }
  }
})
</script>