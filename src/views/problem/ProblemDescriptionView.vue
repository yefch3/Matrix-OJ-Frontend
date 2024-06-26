<template>
  <div id="problemDescriptionView">
    <!--    todo: 把左边的题目详情改成可以单独滚动的样式-->
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-card>
          <a-tabs default-active-key="description" size="mini">
            <a-tab-pane key="description">
              <template #title>
                <icon-bookmark style="color: dodgerblue" /> Description
              </template>
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
              <template #title>
                <icon-bg-colors style="color: dodgerblue" /> Solution
              </template>
              "No solution yet."
            </a-tab-pane>
            <a-tab-pane key="submission">
              <template #title>
                <icon-record style="color: dodgerblue" /> Submission
              </template>
              <!--              todo: submission records, test cases-->
              Content of Tab Panel 3
            </a-tab-pane>
            <a-tab-pane key="test case">
              <template #title>
                <icon-check-square style="color: limegreen" /> Test Case
              </template>
              "No test case yet.
            </a-tab-pane>
            <a-tab-pane key="test result">
              <template #title>
                <icon-right style="color: limegreen" /> Test Result
              </template>
              "No test result yet."
            </a-tab-pane>
            <a-tab-pane key="discussion">
              <template #title>
                <icon-message style="color: limegreen" /> Discussion
              </template>
              "No discussion yet."
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card>
          <a-dropdown @select="selectLanguage">
            <a-button style="margin-right: 1px; margin-bottom: 2px">
              <IconCode style="color: limegreen" /> &nbsp;
              {{ form.language }} &nbsp;
              <icon-down />
            </a-button>
            <template #content>
              <a-doption>cpp</a-doption>
              <a-doption>python</a-doption>
              <a-doption>java</a-doption>
            </template>
          </a-dropdown>
          <a-button
            style="margin-right: 1px; margin-bottom: 2px"
            @click="doRun"
          >
            <IconCaretRight /> &nbsp; Run
          </a-button>
          <a-button
            style="color: limegreen; margin-bottom: 2px"
            @click="doSubmit"
          >
            <icon-upload /> &nbsp; Submit
          </a-button>
          <!--          todo: 增加自定义编辑器设置的功能-->
          <code-editor
            :value="form.code as string"
            :language="form.language as string"
            :handle-change="changeCode"
            :handle-language-change="selectLanguage"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  withDefaults,
  defineProps,
  onMounted,
  watch,
  computed,
} from "vue";
import {
  Problem,
  ProblemControllerService,
  ProblemSubmitAddRequest,
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
  IconDown,
  IconCaretRight,
  IconUpload,
} from "@arco-design/web-vue/es/icon";
import { ProblemSubmitControllerService } from "../../../generated";
import { useStore } from "vuex";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const problem = ref<ProblemVO>();
// 获取用户id
const store = useStore();
const userId = store.state.user.loginUser?.id;

const loadData = async () => {
  // console.log(userId);
  const res = await ProblemControllerService.getProblemVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    problem.value = res.data;
  } else {
    message.error("Failed to load data. " + res.message);
  }
};

const form = ref<ProblemSubmitAddRequest>({
  problemId: props.id as any,
  language: localStorage.getItem("language" + userId + props.id) || "cpp",
  code: localStorage.getItem("code" + userId + props.id) || "",
});

// todo: 目前来说，语言和代码都是存储在localStorage中的，后面我认为应该优先获取用户的提交记录，
//  然后显示上次提交的代码和语言；如果未提交过，则显示默认的代码和语言，但是如果用户改变了代码和语言但是未提交，那么应该保存用户的选择。
// 可以这么做：在用户选择语言和修改代码的时候，就保存到localStorage中，然后在用户提交的时候，再保存到后端，并且在用户提交成功后，清空localStorage中的数据。
const selectLanguage = (e: any) => {
  form.value.language = e;
  localStorage.setItem("language" + userId + form.value.problemId, e);
};

onMounted(() => {
  loadData();
});

// todo: 实现运行测试功能，需要在后端实现API
const doRun = () => {
  console.log("Run");
};

const changeCode = (v: string) => {
  form.value.code = v;
  localStorage.setItem("code" + userId + form.value.problemId, v);
};

const doSubmit = async () => {
  const res = await ProblemSubmitControllerService.doProblemSubmitUsingPost(
    form.value
  );
  if (res.code === 0) {
    message.success("Submit successfully.");
  } else {
    message.error("Failed to submit. " + res.message);
  }
};
</script>

<style scoped>
#problemDescriptionView {
}
</style>
