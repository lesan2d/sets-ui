<template>
  <div>
    <spanp>基础用法：</spanp>
    <s-button text>基础按钮</s-button>
    <s-button type="primary" text>主要按钮</s-button>
  </div>
  <div>
    <span>隐藏背景：</span>
    <s-button text :bg="false">基础按钮</s-button>
    <s-button type="primary" text :bg="false">主要按钮</s-button>
  </div>
  <div>
    <span style="font-size:14px;">通过变量去除间距让<s-button type="primary" text :bg="false"
        style="--s-button-padding: 0;">按钮</s-button>看起来更像文本</span>
  </div>
</template>
