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
    <a-form-item field="judgeConfig" label="Judge Config">
      <a-row>
        <a-col :span="8">
          <a-form-item field="memoryLimit" label="Memory Limit">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              allow-clea
              :min="0"
            >
              <template #append>MB</template>
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="stackLimit" label="Stack Limit">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              allow-clear
              :min="0"
            >
              <template #append>MB</template>
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="timeLimit" label="Time Limit">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              allow-clear
              :min="0"
            >
              <template #append>ms</template>
            </a-input-number>
          </a-form-item>
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
import { reactive } from "vue";
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
</script>

<style scoped></style>
