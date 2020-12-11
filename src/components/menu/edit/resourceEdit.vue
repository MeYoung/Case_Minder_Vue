<template>
  <div>
     <el-select
        v-model="sourceSelectedData"
        allow-create
        filterable
        :multiple="true"
        :popper-append-to-body="true"
        collapse-tags
        default-first-option
        placeholder="请输入/选择自定义标签"
        :disabled="commandDisabled"
        @change="handleChange"
      >
        <el-option
          v-for="(item, index) in sourceData"
          :key="index.name"
          :value="item.name"
          :label="item.name"
        />
      </el-select>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'ResourceEdit',
    computed: {
      ...mapGetters({
        'minder': 'getMinder',
        'editor': 'getEditor'
      }),
      commandDisabled() {
        let minder = this.minder;
        minder.on && minder.on('interactchange', this.handleInteractChange);
        return this.minder.queryCommandState && this.minder.queryCommandState('resource') === -1;
      },
    },
    data() {
      return {
        sourceData: [],
        sourceSelectedData: [],
        isInteracting: false,
      }
    },
    watch: {
      sourceData: {
        handler: function (val, oVal) {
          // https://github.com/fex-team/kityminder-core/wiki/command#resource
          if (this.minder.queryCommandState('resource') != -1 && this.sourceData) {
            let resource = this.sourceData.filter(function (resource) {
              return resource.selected;
            }).map(function (resource) {
              return resource.name;
            });
            if (this.isInteracting) {
              return;
            }
            this.minder.execCommand('resource', resource);
          }
        },
        deep: true,
      }
    },
    methods: {
      handleChange(val) {
        // 新增一个自定义标签
        const currentVal = val[val.length - 1];
        const resource = this.sourceData.filter(function (resource) {
          return resource.selected;
        }).map(function (resource) {
          return resource.name;
        });
        if (!!currentVal && resource.indexOf(currentVal) === -1) {
          this.sourceData.push({
            name: currentVal,
            selected: true
          });
        }
        // 去掉一个自定义标签
        this.sourceData.forEach(item => {
          if (val && val.indexOf(item.name) === -1) {
            if (item.selected) {
              item.selected = false;
            }
          }
        });
      },
      handleInteractChange() {
        let selected = this.minder.queryCommandValue('resource');
        this.sourceSelectedData = selected;
        let used = this.minder.getUsedResource().map(function (resourceName) {
          return {
            name: resourceName,
            selected: selected.indexOf(resourceName) > -1
          }
        });
        this.sourceData = used;
        this.isInteracting = true;
        this.$nextTick(() => {
          this.isInteracting = false;
        })
      }
    }
  }
</script>
