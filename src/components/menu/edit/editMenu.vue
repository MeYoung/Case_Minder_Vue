<template lang="html">
<div class="menu-container">
<!--  撤销回退、重做-->
  <back-and-right></back-and-right>

  <expand></expand>
  <selection></selection>
  <insert-box></insert-box>
  <move-box></move-box>
  <edit-del></edit-del>
  <!--    超链接-->
  <hyberlink></hyberlink>
<!--  查询、过滤-->
  <search></search>
  <node-box></node-box>
  <sequence-box></sequence-box>
  <progress-box></progress-box>
<!--  自定义标签-->
  <resource-edit></resource-edit>


</div>
</template>

<script>
import insertBox from './insertBox'
import moveBox from './moveBox'
import editDel from './editDel'
import sequenceBox from './sequenceBox'
import progressBox from './progressBox'
import expand from './expand'
import selection from './selection'
import NodeBox from "./noteBox";
import resourceEdit from "./resourceEdit";
import Search from "./search/search";
import hyberlink from "./hyberlink";
import backAndRight from "./backAndRight";


export default {
  name: 'editMenu',
  components: {
    Search,
    NodeBox,
    insertBox,
    moveBox,
    editDel,
    sequenceBox,
    progressBox,
    expand,
    selection,
    resourceEdit,
    hyberlink,
    backAndRight
  }
}
</script>
