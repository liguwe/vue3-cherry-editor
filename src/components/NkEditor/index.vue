<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const editorRef = ref(null);
const saveRef = ref(null);
const editorMode = ref('readonly');

onMounted(() => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('tinymce');
  editorRef.value.appendChild(textarea);
  window.tinymce.init({
    height: 600,
    menubar: false,
    statusbar: true,
    language: 'zh_CN', // 设置为简体中文
    readonly: true,
    // 设置常用字体
    font_formats: '微软雅黑="Microsoft YaHei", "Helvetica Neue", "PingFang SC", sans-serif;苹果苹方="PingFang SC", "Microsoft YaHei", sans-serif;宋体=simsun, serif;仿宋体=FangSong, serif;黑体=SimHei, sans-serif;Arial=arial, helvetica, sans-serif;Arial Black="arial black", "avant garde";Comic Sans MS="Comic Sans MS", sans-serif;Courier New="courier new", courier;',
    // 配置可选择字体大小
    fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 30px 32px',
    selector: 'textarea.tinymce',
    auto_focus: false,
    skip_focus: true,
    toolbar: 'fontselect fontsizeselect formatselect ch-number-headings ' +
        '| bold italic underline strikethrough ' +
        '| ch-text-color ch-back-color removeformat ' +
        '| ch-alignment ch-right-indentation ch-left-indentation ch-lineheight ' +
        '| numlist bullist ch-checklist ' +
        '| ch-table image ch-video  ch-toc cherry-codeblock link' +
        '| ch-splitline blockquote ch-word preview' +
        '| fullscreen ',
    plugins: [
      'quickbars',
      'link',
      'image',
      'imagetools',
      'lists',
      'advlist',
      'table',
      'fullscreen',
      'paste',
      'anchor',
      'media',
      'advlist',
      // 'cherry-draw.io',
      'cherry-mindmap',
      'cherry-app',
      'cherry-alignment',
      'cherry-blockquotefix',
      'cherry-floatbar-extand',
      'cherry-lineheight',
      // 'cherry-word',
      // 'cherry-video',
      'preview',
      'cherry-splitline',
      'cherry-number-headings',
      'cherry-indentation',
      'cherry-colorpicker',
      'cherry-checklist',
      'cherry-panel',
      'cherry-tencent-docs',
      'cherry-table',
      'cherry-code',
      'cherry-toc',
      'cherry-codeblock',
    ],
    init_instance_callback(editor) {
      // 在编辑器初始化后，将内容添加到编辑器中
      editor.setContent(props.content);
      // 默认是只读的状态的
      setReadonly();
    },
    toolbar_mode: 'floating',
    quickbars_insert_toolbar: false,
    table_toolbar: 'mytableprops tabledelete | tablemergecells tablesplitcells | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
    panelblock_toolbar: 'cherry-panel__tips cherry-panel__info cherry-panel__ok cherry-panel__warning cherry-panel__error | cherry-panel__delete',
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
    valid_children: '+pre[ol],+a[i|#text],+body[style]',
    block_formats: 'Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Paragraph=p',
    body_class: 'cherry-editor-content',
    // :::: image upload setting start
    images_upload_url: 'http://localhost:3000/api/upload',
    automatic_uploads: true,
    images_upload_credentials: false,
    images_upload_handler: (blobInfo, success, failure, progress) => {
      let xhr, formData;
      // eslint-disable-next-line prefer-const
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'http://localhost:3000/api/upload');
      xhr.upload.onprogress = function (e) {
        progress(e.loaded / e.total * 100);
      };
      xhr.onload = function (res) {
        const json = JSON.parse(xhr.responseText);
        success(json.url);
      };
      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };
      // eslint-disable-next-line prefer-const
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    },
    file_picker_callback(callback, _value, meta) {
      // 上传视频
      if (meta.filetype === 'media') {

      }
      // 上传图片
      // Provide image and alt text for the image dialog
      if (meta.filetype === 'image') {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function () {
          const file = this.files[0];
          const reader = new FileReader();
          reader.onload = function () {
            const id = 'blobid' + (new Date()).getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = reader.result.split(',')[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            callback(blobInfo.blobUri(), {title: file.name});
          };
          reader.readAsDataURL(file);
        };
        input.click();
      }

    },
    // image_advtab: true,
    // :::: image upload setting start
    setup(ed) {

    },
  });
})

function save() {
  console.log(window.tinymce.activeEditor.getContent());
}

function setReadonly() {
  editorMode.value = 'readonly';
  const editor = window.tinymce.activeEditor;
  editor.setMode('readonly');
  editor.editorContainer.querySelector('.tox-editor-header').style.display = 'none';
}

function setDesign() {
  editorMode.value = 'design';
  const editor = window.tinymce.activeEditor;
  editor.setMode('design');
  editor.editorContainer.querySelector('.tox-editor-header').style.display = 'block';
}





onUnmounted(() => {
  // todo 记得销毁
})

</script>

<template>
  <div class="content">
    <div class="actions">
      <button ref="saveRef" @click="save">保存</button>
      <button v-if="editorMode === 'design'" ref="saveRef" @click="setReadonly">只读模式</button>
      <button v-if="editorMode === 'readonly'" ref="saveRef" @click="setDesign">编辑模式</button>
    </div>
    <div ref="editorRef"/>
  </div>
</template>

<style scoped>

button {
  margin: 0 8px;
}


</style>
