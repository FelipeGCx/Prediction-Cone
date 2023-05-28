<template>
  <nav>
    <ul class="menu">
      <li v-for="(item, idx) in data" :key="idx" class="item" @mousemove.stop="getCursorPosition">
        {{ item.title }}
        <ul class="submenu">
          <li class="subitem" v-for="(subitem, idxx) in item.subitems" :key="idxx">
            {{ subitem.title }}
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = [
  {
    title: 'one',
    subitems: [{ title: 'one' }, { title: 'one' }, { title: 'one' }]
  },
  {
    title: 'two',
    subitems: [{ title: 'two' }, { title: 'two' }]
  },
  {
    title: 'three',
    subitems: [{ title: 'three' }, { title: 'three' }, { title: 'three' }, { title: 'three' }]
  },
  {
    title: 'four',
    subitems: [
      { title: 'four' },
      { title: 'four' },
      { title: 'four' },
      { title: 'four' },
      { title: 'four' }
    ]
  }
]
const widthMenu = ref('0px')
const width = ref('0px')
const height = ref('0px')
const clip = ref('')

const getCursorPosition = (event: { toElement: any; offsetX: number; offsetY: any }): void => {
  const wm = event.toElement.clientWidth
  const hm = event.toElement.clientHeight
  widthMenu.value = `${wm}px`
  if (event.offsetY <= hm) {
    let w = wm - event.offsetX + 5
    width.value = `${w}px`
  }
  const h = event.toElement.children[0].clientHeight
  height.value = `${h}px`
  const yPos = `${(hm / h) * 100}%`
  clip.value = `polygon(0 ${yPos}, 0 0%, 50% 0, 100% 0, 100% 100%, 50% 100%)`
}
</script>

<style lang="scss">
ul,
li {
  list-style: none;
}
nav {
  min-height: 100vh;
  align-items: center;
  .menu {
    display: flex;
    flex-direction: column;
    .item {
      padding: 0.5rem 1rem;
      align-items: center;
      background-color: rgb(30, 35, 58);
      border-radius: 0.1rem;
      position: relative;

      .submenu {
        position: absolute;
        display: none;
        flex-direction: column;
        top: 0;
        left: v-bind(widthMenu);
        .subitem {
          padding: 0.5rem 7rem;
          background-color: rgb(30, 35, 58);
          border-radius: 0.1rem;
          position: relative;
          &:hover {
            background-color: rgb(56, 58, 185);
          }
        }
      }
      &:hover {
        background-color: rgb(59, 152, 196);
        &::after {
          content: '';
          background-color: red;
          // background-color: transparent;
          opacity: 50%;
          position: absolute;
          z-index: 1;
          clip-path: v-bind(clip);
          height: v-bind(height);
          width: v-bind(width);
          right: 0;
          top: 0;
        }
        .submenu {
          display: flex;
        }
      }
    }
  }
}
</style>
