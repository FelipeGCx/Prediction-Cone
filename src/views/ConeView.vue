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
const ypos = ref('0')

const getCursorPosition = (event: MouseEvent) => {
  const target = event.target as HTMLLIElement;
  const wm = target.clientWidth
  const hm = target.clientHeight
  widthMenu.value = `${wm}px`
  if (event.offsetY <= hm) {
    let w = wm - event.offsetX + 5
    width.value = `${w}px`
  }
  console.log(event)
  const h = target.children[0]?.clientHeight
  height.value = `${h}px`
  ypos.value = '' + (target.clientHeight / 2) + 'px'

  clip.value = `polygon(100% 0, 0 ${ypos.value}, 100% 100%)`
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

  ul {
    display: flex;
    flex-direction: column;

    .item:hover {
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

  ul>.item {
    padding: 0.5rem 1rem;
    align-items: center;
    background-color: rgb(30, 35, 58);
    border-radius: 0.1rem;
    position: relative;
  }
}

.submenu {
  position: absolute;
  display: none;
  flex-direction: column;
  top: 0;
  left: 100%;

  .subitem {
    padding: 0.5rem 7rem;
    background-color: rgb(30, 35, 58);
    border-radius: 0.1rem;

    &:hover {
      background-color: rgb(56, 58, 185);
    }
  }

  &:hover {
    display: flex;
    flex-direction: column;
  }
}
</style>
