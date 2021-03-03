define(function (require, exports, module) {
  function ContainerRuntime() {
    var container;
    console.info("this.selector",this.selector)
    if (typeof (this.selector) == 'string') {
      container = document.querySelector(this.selector);
    } else {
      container = this.selector;
    }

    if (!container) throw new Error('Invalid selector: ' + this.selector);

    // 这个类名用于给编辑器添加样式
    container.classList.add('km-editor');
    console.info("container",container)

    // 暴露容器给其他运行时使用
    this.container = container;
  }

  return module.exports = ContainerRuntime;
});
