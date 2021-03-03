/**
 * @fileOverview
 *
 * 脑图示例运行时
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */
define(function (require, exports, module) {
  var Minder = require('../minder');
  console.log("----this -minder-----",this.minder)
  console.log("----this.selector-----",this.selector)


  function MinderRuntime() {
    console.log('00000Minder00000',Minder)
    // 不使用 kityminder 的按键处理，由 ReceiverRuntime 统一处理
    var minder = new Minder({
      enableKeyReceiver: false,
      enableAnimation: true
    });
    console.info('minder instance',minder)
    console.log("----this.selector-----",this.selector)

    // 渲染，初始化
    minder.renderTo(this.selector);
    minder.setTheme(null);
    minder.select(minder.getRoot(), true);
    minder.execCommand('text', '中心主题');
    console.log("-----minder-----",minder)
    // 导出给其它 Runtime 使用
    this.minder = minder;
    console.log("----this -minder-----",this.minder)

  }

  return module.exports = MinderRuntime;
});
