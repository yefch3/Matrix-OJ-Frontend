<template>
  <div id="addProblemView">
    <h2 style="text-align: center">Add Problem</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="Title" required>
        <a-input
          v-model="form.title"
          placeholder="please enter title..."
          style="border: 1px solid #ccc; width: auto"
        />
      </a-form-item>
      <a-form-item field="content" label="Content">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="tags" label="Tag">
        <a-select
          v-model="form.tags"
          :style="{ width: '400px' }"
          placeholder="Please select tags..."
          multiple
          :options="candidateTags"
          allow-create="true"
          max-tag-count="3"
        >
        </a-select>
      </a-form-item>
      <a-form-item field="difficulty" label="Difficulty">
        <a-select
          v-model="form.difficulty"
          style="width: 160px; max-width: 50%"
          allow-clear
        >
          <a-option style="color: limegreen" :value="0">Easy</a-option>
          <a-option style="color: orange" :value="1">Medium</a-option>
          <a-option style="color: red" :value="2">Hard</a-option>
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
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
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
          <a-button
            @click="() => handleDelete(index)"
            style="width: 100px"
            type="outline"
            status="danger"
          >
            Delete
          </a-button>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button
          @click="handleAdd"
          style="width: 100px"
          type="outline"
          status="success"
          v-if="form.judgeCase.length < 5"
          >Add Case</a-button
        >
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          style="min-width: 100px"
          @click="doSubmit"
        >
          Submit</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  ProblemAddRequest,
  ProblemControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  title: "",
  answer: "",
  content: "",
  difficulty: undefined,
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

const candidateTags = [
  { label: "Array", value: "Array" },
  { label: "String", value: "String" },
  { label: "Math", value: "Math" },
  { label: "Tree", value: "Tree" },
  { label: "Graph", value: "Graph" },
  { label: "Dynamic Programming", value: "Dynamic Programming" },
  { label: "Backtracking", value: "Backtracking" },
  { label: "Design", value: "Design" },
  { label: "Bit Manipulation", value: "Bit Manipulation" },
  { label: "Greedy", value: "Greedy" },
  { label: "Depth-first Search", value: "Depth-first Search" },
  { label: "Breadth-first Search", value: "Breadth-first Search" },
  { label: "Binary Search", value: "Binary Search" },
  { label: "Two Pointers", value: "Two Pointers" },
  { label: "Sort", value: "Sort" },
  { label: "Heap", value: "Heap" },
  { label: "Hash Table", value: "Hash Table" },
  { label: "Stack", value: "Stack" },
  { label: "Queue", value: "Queue" },
  { label: "Linked List", value: "Linked List" },
  { label: "Union Find", value: "Union Find" },
  { label: "Trie", value: "Trie" },
  { label: "Binary Indexed Tree", value: "Binary Indexed Tree" },
  { label: "Segment Tree", value: "Segment Tree" },
  { label: "Binary Search Tree", value: "Binary Search Tree" },
  { label: "Recursion", value: "Recursion" },
  { label: "Divide and Conquer", value: "Divide and Conquer" },
  { label: "Sliding Window", value: "Sliding Window" },
  { label: "Topological Sort", value: "Topological Sort" },
  { label: "Random", value: "Random" },
  { label: "Geometry", value: "Geometry" },
  { label: "Map", value: "Map" },
  { label: "Set", value: "Set" },
];

const doSubmit = async () => {
  console.log(form);
  const res = await ProblemControllerService.addProblemUsingPost(
    form as ProblemAddRequest
  );
  if (res.code === 0) {
    message.success("Created successfully!");
  } else {
    message.error("Failed to create!" + res.message);
  }
};

const onContentChange = (v: string) => {
  form.content = v;
};

const onAnswerChange = (v: string) => {
  form.answer = v;
};
</script>

<style scoped>
.config-input {
  margin-right: 10px;
}
</style>
