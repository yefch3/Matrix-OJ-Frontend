<template>
  <div id="manageProblemView">
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
        <!--        todo: 问题标题点击跳转到题目详情页-->
        <a-space>
          <a-link :hoverable="false" href="add/problem">
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

// const show = ref(true);

const dataList = ref([]);

const total = ref(0);

// 查询参数，pageSize: 每页显示条数，current: 当前页码
const searchParams = ref({
  pageSize: 10,
  current: 1,
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
  },
  // {
  //   title: "ID",
  //   dataIndex: "id",
  // },
  {
    title: "Title",
    slotName: "title",
  },
  // {
  //   title: "Tags",
  //   dataIndex: "tags",
  // },
  {
    title: "Difficulty",
    slotName: "difficulty",
  },
  {
    title: "Accept Rate",
    slotName: "acceptRate",
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
</script>

<style scoped></style>
