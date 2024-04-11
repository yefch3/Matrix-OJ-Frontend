<template>
  <div id="manageProblemView">
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        showTotal: true,
        showJumper: true,
      }"
    >
      <template #optional="{ record }">
        <a-button style="width: 60px" type="primary" @click="doUpdate(record)"
          >Update</a-button
        >
        <a-button style="width: 60px" status="danger" @click="doDelete(record)"
          >Delete</a-button
        >
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ProblemControllerService } from "../../../generated";
import { Problem } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

// const show = ref(true);

const dataList = ref([]);

const total = ref(0);

const searchParams = ref({
  pageSize: 10,
  pageNum: 1,
});

const loadData = async () => {
  const res = await ProblemControllerService.listProblemByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    // console.log(res.data);
  } else {
    message.error("Failed to load data. " + res.message);
  }
};

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Content",
    dataIndex: "content",
  },
  {
    title: "Tags",
    dataIndex: "tags",
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
  },
  {
    title: "Answer",
    dataIndex: "answer",
  },
  {
    title: "Submitted",
    dataIndex: "submitNum",
  },
  {
    title: "Accepted",
    dataIndex: "acceptNum",
  },
  {
    title: "Case",
    dataIndex: "judgeCase",
  },
  {
    title: "Limit",
    dataIndex: "judgeConfig",
  },
  {
    title: "Thumb",
    dataIndex: "thumbNum",
  },
  {
    title: "Favour",
    dataIndex: "favourNum",
  },
  {
    title: "Creator",
    dataIndex: "userId",
  },
  {
    title: "CreateTime",
    dataIndex: "createTime",
  },
  {
    title: "UpdateTime",
    dataIndex: "updateTime",
  },
  {
    title: "IsDelete",
    dataIndex: "isDelete",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const doDelete = async (problem: Problem) => {
  const res = await ProblemControllerService.deleteProblemUsingPost({
    id: problem.id,
  });
  if (res.code === 0) {
    message.success("Delete success");
    await loadData();
  } else {
    message.error("Failed to delete. " + res.message);
  }
};

const router = useRouter();

const doUpdate = (problem: Problem) => {
  router.push({
    path: "/update/problem",
    query: {
      id: problem.id,
    },
  });
};
</script>

<style scoped></style>
