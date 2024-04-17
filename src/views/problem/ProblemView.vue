<template>
  <div id="manageProblemView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="Title" label="Title">
        <a-input
          v-model="searchParams.title"
          placeholder="please enter title"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item field="difficulty" label="Difficulty">
        <a-select
          v-model="searchParams.difficulty"
          placeholder="please select difficulty"
          style="width: 200px"
        />
      </a-form-item>
      <a-form-item field="tags" label="Tags">
        <a-select
          v-model="searchParams.tags"
          placeholder="please select tags"
          :options="{ candidateTags }"
          multiple
          max-tag-count="1"
          style="width: 200px"
        />
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        showTotal: true,
        showJumper: true,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #title="{ record }">
        <a-space>
          <a-link :hoverable="false" :href="toDescription(record)">
            {{ record.title }}
          </a-link>
        </a-space>
      </template>
      <template #difficulty="{ record }">
        <a-space>
          <a-tag v-if="record.difficulty === 0" color="green">Easy</a-tag>
          <a-tag v-else-if="record.difficulty === 1" color="orange">
            Medium
          </a-tag>
          <a-tag v-else-if="record.difficulty === 2" color="red">Hard</a-tag>
          <a-tag v-else color="grey">Unknown</a-tag>
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        <a-space>
          <span v-if="record.submitNum !== 0">
            {{ ((record.acceptNum / record.submitNum) * 100).toFixed(2) }}%
          </span>
          <span v-else>0.00%</span>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <!--      todo: 状态图标，当未登录时不显示，当用户登陆后，将已经accept的题目标记打勾图标，将submit但未accept的题目标记尝试中，将未做的题目标记为空白-->
      <template #status>
        <icon-check-circle />
        <icon-question-circle />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { ProblemControllerService } from "../../../generated";
import { Problem } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import {
  IconCheckCircle,
  IconQuestionCircle,
} from "@arco-design/web-vue/es/icon";
import { candidateTags } from "@/constant/CandidateTags";

// const show = ref(true);

const dataList = ref([]);

const total = ref(0);

// 查询参数，pageSize: 每页显示条数，current: 当前页码
const searchParams = ref({
  pageSize: 10,
  current: 1,
  title: "",
  difficulty: undefined,
  tags: [],
  index: undefined,
});

// 加载数据函数
const loadData = async () => {
  const res = await ProblemControllerService.listProblemVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records.map(
      (problem: Problem, index: number) => ({
        ...problem,
        index: index + 1, // 从1开始的序号
      })
    );
    total.value = res.data.total;
  } else {
    message.error("Failed to load data. " + res.message);
  }
};

// 进入页面时加载数据
onMounted(() => {
  loadData();
});

// 表格列定义 todo: 有些数据需要加载但是在该页面中不用显示，而要在详情页中显示
const columns = [
  {
    title: "Status",
    slotName: "status",
  },
  {
    title: "No.",
    dataIndex: "index",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  // {
  //   title: "ID",
  //   dataIndex: "id",
  // },
  {
    title: "Title",
    dataIndex: "title",
    slotName: "title",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  // {
  //   title: "Tags",
  //   dataIndex: "tags",
  // },
  {
    title: "Difficulty",
    slotName: "difficulty",
    dataIndex: "difficulty",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  {
    // todo: 完成对accept rate的排序功能
    title: "Accept Rate",
    slotName: "acceptRate",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  // {
  //   title: "Thumb",
  //   dataIndex: "thumbNum",
  // },
  // {
  //   title: "Favour",
  //   dataIndex: "favourNum",
  // },
  {
    title: "CreateTime",
    slotName: "createTime",
    dataIndex: "createTime",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
];

const router = useRouter();

// 监听查询参数变化，加载数据
watchEffect(() => {
  loadData();
});

// 分页改变时触发
const onPageChange = async (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

// 跳转到题目详情页
const toDescription = (record: Problem) => {
  return `/problem/description?id=${record.id}`;
};

// const candidateTags = [
//   { label: "Array", value: "Array" },
//   { label: "String", value: "String" },
//   { label: "Math", value: "Math" },
//   { label: "Tree", value: "Tree" },
//   { label: "Graph", value: "Graph" },
//   { label: "Dynamic Programming", value: "Dynamic Programming" },
//   { label: "Backtracking", value: "Backtracking" },
//   { label: "Design", value: "Design" },
//   { label: "Bit Manipulation", value: "Bit Manipulation" },
//   { label: "Greedy", value: "Greedy" },
//   { label: "Depth-first Search", value: "Depth-first Search" },
//   { label: "Breadth-first Search", value: "Breadth-first Search" },
//   { label: "Binary Search", value: "Binary Search" },
//   { label: "Two Pointers", value: "Two Pointers" },
//   { label: "Sort", value: "Sort" },
//   { label: "Heap", value: "Heap" },
//   { label: "Hash Table", value: "Hash Table" },
//   { label: "Stack", value: "Stack" },
//   { label: "Queue", value: "Queue" },
//   { label: "Linked List", value: "Linked List" },
//   { label: "Union Find", value: "Union Find" },
//   { label: "Trie", value: "Trie" },
//   { label: "Binary Indexed Tree", value: "Binary Indexed Tree" },
//   { label: "Segment Tree", value: "Segment Tree" },
//   { label: "Binary Search Tree", value: "Binary Search Tree" },
//   { label: "Recursion", value: "Recursion" },
//   { label: "Divide and Conquer", value: "Divide and Conquer" },
//   { label: "Sliding Window", value: "Sliding Window" },
//   { label: "Topological Sort", value: "Topological Sort" },
//   { label: "Random", value: "Random" },
//   { label: "Geometry", value: "Geometry" },
//   { label: "Map", value: "Map" },
//   { label: "Set", value: "Set" },
// ];
</script>

<style scoped></style>
