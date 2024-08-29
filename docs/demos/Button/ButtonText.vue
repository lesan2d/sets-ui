<template>
  <div>
    <span>基础用法：</span>
    <s-button text>基础按钮</s-button>
    <s-button type="primary" text>主要按钮</s-button>
  </div>
  <div>
    <span>隐藏背景：</span>
    <s-button :bg="false">基础按钮</s-button>
    <s-button type="primary" :bg="false">主要按钮</s-button>
  </div>
  <div>
    <span>文本按钮：</span>
    <span style="font-size:14px;">
      通过CSS变量去除间距让<s-button text :bg="false" style="--s-button-padding: 0;text-decoration-line: underline;">按钮</s-button>看起来更接近文本
    </span>
  </div>
</template>
