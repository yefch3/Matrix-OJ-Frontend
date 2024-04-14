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
      <template #optional="{ record }">
        <a-button style="width: 60px" type="primary" @click="doUpdate(record)"
          >Update</a-button
        >
        <a-button style="width: 60px" status="danger" @click="clickDelete"
          >Delete</a-button
        >
        <a-modal
          :visible="visible"
          @ok="handleDeleteOk(record)"
          @cancel="handleDeleteCancel"
          okText="Confirm"
          cancelText="Cancel"
          unmountOnClose
        >
          <template #title> Warning </template>
          <div>
            <p>Are you sure to delete this problem?</p>
          </div>
        </a-modal>
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

// const show = ref(true);

const dataList = ref([]);

const total = ref(0);

// 查询参数，pageSize: 每页显示条数，current: 当前页码
const searchParams = ref({
  pageSize: 1,
  current: 1,
});

// 加载数据函数
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

// 进入页面时加载数据
onMounted(() => {
  loadData();
});

// 表格列定义
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

// 点击删除按钮，触发二次确认删除题目对话框
const clickDelete = async () => {
  visible.value = true;
};

// 删除题目，并刷新列表
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

// 跳转到更新题目页面
const doUpdate = (problem: Problem) => {
  router.push({
    path: "/update/problem",
    query: {
      id: problem.id,
    },
  });
};

// 删除题目二次确认对话框是否可见
const visible = ref(false);

// 二次确认删除题目
const handleDeleteOk = async (problem: Problem) => {
  await doDelete(problem);
  visible.value = false;
};

// 二次确认取消删除题目
const handleDeleteCancel = () => {
  visible.value = false;
};

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
