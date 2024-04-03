<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted, toRaw, withDefaults, defineProps } from "vue";

interface Props {
  value: string;
  // automaticLayout: boolean;
  // language: string;
  // theme: string;
  // readOnly: boolean;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  // language: "cpp",
  // theme: "vs-dark",
  // readOnly: false,
  // automaticLayout: true,
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleChange: (v: string) => {
    console.log(v);
  },
});
// Hover on each property to see its docs!
const codeEditorRef = ref();
const codeEditor = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: "",
    language: "cpp",
    // value: props.value,
    // language: props.language,
    // automaticLayout: props.automaticLayout,
    theme: "vs-dark",
    // readOnly: props.readOnly,
    lineNumbers: "on",
    // minimap: {
    //   enabled: true,
    // },
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
