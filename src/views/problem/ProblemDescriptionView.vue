<template>
  <div id="problemDescriptionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-card>
          <a-tabs default-active-key="description" size="mini">
            <a-tab-pane key="description">
              <template #title> <icon-bookmark /> Description </template>
              <a-card v-if="problem">
                <h1>{{ problem.id }}. {{ problem.title }}</h1>
                <a-space>
                  <a-tag
                    v-if="problem"
                    :color="
                      problem.difficulty === 0
                        ? 'green'
                        : problem.difficulty === 1
                        ? 'orange'
                        : problem.difficulty === 2
                        ? 'red'
                        : 'grey'
                    "
                  >
                    {{
                      problem.difficulty === 0
                        ? "Easy"
                        : problem.difficulty === 1
                        ? "Medium"
                        : problem.difficulty === 2
                        ? "Hard"
                        : "Unknown"
                    }}
                  </a-tag>
                  <a-tag v-for="tag in problem.tags" :key="tag" color="blue">
                    {{ tag }}
                  </a-tag>
                </a-space>
                <MdViewer :value="problem.content || ''" />
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="solution">
              <template #title> <icon-bg-colors /> Solution </template>
              "No solution yet."
            </a-tab-pane>
            <a-tab-pane key="submission">
              <template #title> <icon-record /> Submission </template>
              <!--              todo: submission records, test cases-->
              Content of Tab Panel 3
            </a-tab-pane>
            <a-tab-pane key="test case">
              <template #title> <icon-check-square /> Test Case </template>
              "No test case yet.
            </a-tab-pane>
            <a-tab-pane key="test result">
              <template #title> <icon-right /> Test Result </template>
              "No test result yet."
            </a-tab-pane>
            <a-tab-pane key="discussion">
              <template #title> <icon-message /> Discussion </template>
              "No discussion yet."
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card>
          <a-tabs default-active-key="code" size="mini">
            <a-tab-pane key="code">
              <template #title> <icon-code /> Code </template>
              <CodeEditor />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, onMounted } from "vue";
import {
  Problem,
  ProblemControllerService,
  ProblemVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  IconBookmark,
  IconBgColors,
  IconRecord,
  IconCheckSquare,
  IconRight,
  IconMessage,
  IconCode,
} from "@arco-design/web-vue/es/icon";

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
