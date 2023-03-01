<script setup>
import NkEditor from './components/NkEditor/index.vue';
import {ref} from 'vue';
const content = ref('<div class="tox-clear-float">\n' +
    '<table style="border-collapse: collapse; width: 75%; background-color: #ffffff; border-color: #ced4d9; height: 110px;" border="2" cellpadding="8">\n' +
    '<tbody>\n' +
    '<tr style="height: 22px;">\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5433%; height: 22px;">&nbsp;</td>\n' +
    '</tr>\n' +
    '<tr style="height: 22px;">\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5433%; height: 22px;">&nbsp;</td>\n' +
    '</tr>\n' +
    '<tr style="height: 22px;">\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5433%; height: 22px;">&nbsp;</td>\n' +
    '</tr>\n' +
    '<tr style="height: 22px;">\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">4</td>\n' +
    '<td style="width: 13.5433%; height: 22px;">&nbsp;</td>\n' +
    '</tr>\n' +
    '<tr style="height: 22px;">\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">3</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">4</td>\n' +
    '<td style="width: 13.5417%; height: 22px;">&nbsp;</td>\n' +
    '<td style="width: 13.5433%; height: 22px;">&nbsp;</td>\n' +
    '</tr>\n' +
    '</tbody>\n' +
    '</table>\n' +
    '</div>\n' +
    '<p>&nbsp;</p>\n' +
    '<p>&nbsp;</p>\n' +
    '<p>测试</p>\n' +
    '<ol>\n' +
    '<li>dfdfdffdfdfd</li>\n' +
    '<li>发灯光</li>\n' +
    '<li>丰登广告&nbsp;</li>\n' +
    '</ol>\n' +
    '<p>&nbsp;</p>\n' +
    '<p>这是一张图片</p>\n' +
    '<p>&nbsp;</p>\n' +
    '<p>&nbsp;</p>\n' +
    '<p>一段代码</p>\n' +
    '<p>&nbsp;</p>\n' +
    '<p>&nbsp;</p>\n' +
    '<div class="tox-clear-float">\n' +
    '<div class="tox-clear-float"><img src="http://localhost:3000/uploads/blobid1677639427138.png" width="461" height="223" /></div>\n' +
    '</div>')
</script>

<template>

  <main>
    <NkEditor :content="content"/>
  </main>

</template>

<style scoped>
header {
  height:60px ;
  margin: 0 auto;
  line-height: 60px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
}



</style>
