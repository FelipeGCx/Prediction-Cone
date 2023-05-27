<template>
  <nav>
    <ul class="menu">
      <li v-for="(item, idx) in data" :key="idx" class="item" @mousemove="getCursorPosition">
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

const xPos = ref('0%')
const yPos = ref('0%')
const width = ref(null)
const height = ref(null)
const clip = ref(null)
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
const getCursorPosition = (event: { offsetY: number; offsetX: number; srcElement: any }): void => {
  // console.log(event);
  // ((valor_original - valor_min_original) / (valor_max_original - valor_min_original)) * (valor_max_deseado - valor_min_deseado) + valor_min_deseado
  if (event.srcElement.children.length > 1) {
    let childs = event.srcElement.children.length;
    let w = event.srcElement.clientWidth
    let h = event.srcElement.clientHeight
    console.log(event.srcElement.children)
    xPos.value = `${((event.offsetX - 0) / (w - 0)) * (100 - 0) + 0}%`
    yPos.value = `${((event.offsetY - 0) / (h / childs - 0)) * (100 - 0) + 0}%`
    clip.value = `polygon(${xPos.value} ${yPos.value}, ${xPos.value} ${yPos.value}, 100% 0, 100% 100%)`
    width.value = `${w}px`
    height.value = `${h}px`
    console.log(height.value)
  }
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
      padding: 0.5rem 1.5rem;
      background-color: rgb(30, 35, 58);
      border-radius: 0.5rem;
      position: relative;

      .submenu {
        position: absolute;
        display: none;
        flex-direction: column;
        .subitem {
          padding: 0.5rem 1.5rem;
          background-color: rgb(30, 35, 58);
          border-radius: 0.5rem;
          position: relative;
          top: -30px;
          right: -21px;
          &:hover {
            background-color: antiquewhite;
          }
        }
      }
      &:hover {
        background-color: antiquewhite;
        &::after {
          content: '';
          // background-color: red;
          background-color: transparent;
          position: absolute;
          z-index: 1;
          clip-path: v-bind(clip);
          height: v-bind(height);
          width: v-bind(width);
          top: 0;
          left: 0;
        }
        .submenu {
          display: flex;
        }
      }
    }
  }
}
</style>
