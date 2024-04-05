<template>
  <div
    id="addProblemView"
    style="
      text-align: center;
      font-size: 24px;
      font-family: 'Arial', sans-serif;
      font-weight: bold;
      margin-bottom: 20px;
    "
  >
    Add Problem
  </div>
  <a-form :model="form">
    <a-form-item field="title" label="Title" required>
      <a-input
        v-model="form.title"
        placeholder="please enter title..."
        style="border: 1px solid #ccc; width: auto"
      />
    </a-form-item>
    <a-form-item field="content" label="Content">
      <MdEditor v-model="form.content" style="width: 80%" />
    </a-form-item>
    <a-form-item field="tag" label="Tag">
      <a-input-tag
        v-model="form.tags"
        label="Tag"
        placeholder="please choose tags..."
        allow-clear
        style="border: 1px solid #ccc; width: auto; max-width: 50%"
      />
    </a-form-item>
    <a-form-item field="difficulty" label="Difficulty">
      <a-select v-model="form.difficulty" style="width: 160px; max-width: 50%">
        <a-option>Easy</a-option>
        <a-option>Medium</a-option>
        <a-option>Hard</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="judgeConfig" label="Limit">
      <a-row>
        <a-col :span="18">
          <a-form :model="form" :layout="layout">
            <a-form-item field="memory" label="Memory">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                allow-clear
                :min="0"
              >
                <template #append>MB</template>
              </a-input-number>
            </a-form-item>
            <a-form-item field="stack" label="Stack">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                allow-clear
                :min="0"
              >
                <template #append>MB</template>
              </a-input-number>
            </a-form-item>
            <a-form-item field="time" label="Time">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                allow-clear
                :min="0"
              >
                <template #append>ms</template>
              </a-input-number>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item field="answer" label="Answer">
      <MdEditor v-model="form.answer" style="width: 80%" />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const form = reactive({
  title: "asdf",
  answer: "",
  content: "",
  difficulty: null,
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: null,
    stackLimit: null,
    timeLimit: null,
  },
  tags: [],
});

const layout = ref("vertical");
</script>

<style scoped></style>
