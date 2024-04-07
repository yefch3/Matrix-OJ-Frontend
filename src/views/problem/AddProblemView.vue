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
      <a-select
        v-model="form.difficulty"
        style="width: 160px; max-width: 50%"
        allow-clear
      >
        <a-option>Easy</a-option>
        <a-option>Medium</a-option>
        <a-option>Hard</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="judgeConfig" label="Limit">
      <a-row>
        <a-col :span="6">
          <a-form :model="form" layout="vertical">
            <a-form-item field="memory" label="Memory (MB)">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                :min="0"
                class="config-input"
              >
              </a-input-number>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="6">
          <a-form :model="form" layout="vertical">
            <a-form-item field="stack" label="Stack (MB)">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                :min="0"
                class="config-input"
              >
              </a-input-number>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="6">
          <a-form :model="form" layout="vertical">
            <a-form-item field="time" label="Time (ms)">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                :min="0"
                class="config-input"
              >
              </a-input-number>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item field="answer" label="Answer">
      <MdEditor v-model="form.answer" style="width: 80%" />
    </a-form-item>
    <a-form-item
      v-for="(judgeCaseItem, index) of form.judgeCase"
      :label="`Case${index + 1}`"
      :key="index"
    >
      <a-space direction="vertical">
        <a-form-item
          :field="`form.judgeCase[${index}].input`"
          :label="`Input`"
          :key="index"
        >
          <a-input
            v-model="judgeCaseItem.input"
            placeholder="please enter input..."
          />
        </a-form-item>
        <a-form-item
          :field="`form.judgeCase[${index}].output`"
          :label="`Output`"
          :key="index"
        >
          <a-input
            v-model="judgeCaseItem.output"
            placeholder="please enter output..."
          />
        </a-form-item>
        <a-form-item>
          <a-button
            @click="() => handleDelete(index)"
            style="width: 100px"
            type="outline"
          >
            Delete
          </a-button>
        </a-form-item>
      </a-space>
    </a-form-item>
    <a-form-item>
      <a-button @click="handleAdd" style="width: 100px" type="primary"
        >Add Case</a-button
      >
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const form = reactive({
  title: "",
  answer: "",
  content: "",
  difficulty: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
});
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style scoped>
.config-input {
  margin-right: 10px;
}
</style>
