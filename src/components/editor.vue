<template>
<div class="main-container">
  <header-menu></header-menu>
  <main-editor></main-editor>
  <navigator></navigator>

  <!-- note markdown 挂件 -->
  <div
    v-show="showNotePreviewer"
    class="note-box"
    ref="notePreviewer"
    :style="notBoxStyle"
  >
    <VueMarkdown  :source="markSource" />
  </div>


</div>

</template>

<script>
import headerMenu from '@/components/header'
import mainEditor from '@/components/main/mainEditor'
import navigator from '@/components/main/navigator'
import VueMarkdown from 'vue-markdown';


export default {
  name: 'editor',
  components: {
    headerMenu,
    mainEditor,
    navigator,
    VueMarkdown
  },
  //父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量
  provide() {
    return {
      main: this
    }
  },
  data(){
    return{
      showNotePreviewer:false,
      notBoxStyle: {},
      markSource:''
    }
  },
  mounted() {
    this.$refs.notePreviewer.addEventListener('wheel', (e) => { e.stopPropagation() });
    this.$refs.notePreviewer.addEventListener('mousedown', (e) => { e.stopPropagation() });
    this.$refs.notePreviewer.addEventListener('mousewheel', (e) => { e.stopPropagation() });

  },
  methods:{
    // 设置note显示和位置
    preview(node, keyword) {
      let icon = node.getRenderer('NoteIconRenderer').getRenderShape();
      let b = icon.getRenderBox('screen');
      let note = node.getData('note');
      let x = b.cx;
      let y = b.bottom;
      this.markSource = note;
      this.showNotePreviewer = true;
      this.notBoxStyle = {
        top: y + 'px',
        left: x + 'px',
      }
    },
    hidePreviewer() {
      this.showNotePreviewer = false;
    },
  }
}

</script>
