<template>
  <div id="problemDescriptionView">
    {{ problem }}
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";
import { ProblemControllerService, ProblemVO } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const problem = ref<ProblemVO>();

const loadData = async () => {
  const res = await ProblemControllerService.getProblemVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    problem.value = res.data;
  } else {
    message.error("Failed to load data. " + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#problemDescriptionView {
}
</style>
