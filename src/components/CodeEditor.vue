<template>
  <div id="code-editor" ref="codeEditorRef" style="height: 81vh; width: 100%" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted, toRaw, withDefaults, defineProps, watch } from "vue";

// todo: value后面需要初始化默认值
interface Props {
  language: string;
  value: string;
  handleChange: (v: string) => void;
  handleLanguageChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "cpp",
  handleChange: Function,
  handleLanguageChange: Function,
});

// Hover on each property to see its docs!
const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
      props.handleLanguageChange(props.language);
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    theme: "vs-dark",
    lineNumbers: "on",
    fontSize: 13,
  });

  codeEditor.value.onDidChangeModelContent(() => {
    const content = toRaw(codeEditor.value).getValue();
    props.handleChange(content);
  });

  // codeEditor.value.onDidChangeModelLanguage(() => {
  //   const language = toRaw(codeEditor.value).getModel();
  //   console.log(language);
  //   localStorage.setItem("language", language);
  //   props.handleLanguageChange(language);
  // });
});
</script>

<style scoped>
#code-editor {
  width: 100%;
  height: 720px;
}
</style>
