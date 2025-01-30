<template>
  <!-- 第三部分，显示Todo列表（底部显示分页按钮） -->
  <!-- 任务列表 -->
  <UCard class="mx-auto my-4 max-w-sm">
    <div class="flex justify-start gap-4">
      <UIcon name="i-fluent-emoji-flat-clipboard" class="w-5 h-5 mt-1" />
      <h2 class="text-lg font-semibold mb-2">待办清单</h2>
    </div>
    <div v-if="paginatedTodos.length === 0" class="text-center text-gray-500">
      <UIcon name="i-fluent-emoji-flat-confetti-ball" size="lg" />
      今日无事，好好休息吧！
    </div>

    <div v-else>
      <div
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="flex justify-between items-center p-3 gap-2 border-b"
      >
        <!-- Title（点击打开详情） -->
        <UPopover overlay>
          <UButton
            color="white"
            class="text-left flex-1"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          >
            <span
              class="truncate w-40 inline-block align-middle"
              :title="todo.title"
            >
              {{ todo.title }}
            </span>
          </UButton>

          <template #panel>
            <div class="p-4">
              <p class="text-sm text-gray-700">
                <strong>内容:</strong> {{ todo.content }}
              </p>
              <p class="text-sm text-gray-700">
                <strong>截止日期:</strong> {{ todo.dueDate }}
              </p>
              <p class="text-sm text-gray-700">
                <strong>分类:</strong> {{ todo.category }}
              </p>
            </div>
          </template>
        </UPopover>

        <!-- Done 按钮 -->
        <UButton
          :color="todo.status === 'done' ? 'gray' : 'green'"
          variant="soft"
          @click="markAsDone(todo.id)"
        >
          {{ todo.status === "done" ? "✅ 已完成" : "✅ Done" }}
        </UButton>
      </div>

      <!-- 分页控件 -->
      <div class="flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="pageSize"
          :total="totalPages * pageSize"
          :active-button="{ variant: 'outline' }"
          :inactive-button="{ color: 'gray' }"
          @update:model-value="fetchTodos"
          class="mx-auto mt-4"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const todos = ref([
  {
    id: 1,
    title: "完成Tika项目设计",
    content: "需要完善前端UI，并优化交互逻辑",
    dueDate: "2025-02-05",
    category: "工作",
    status: "pending",
  },
  {
    id: 2,
    title: "学习Nuxt3",
    content: "深入理解Nuxt3的动态路由和服务端渲染",
    dueDate: "2025-02-10",
    category: "学习",
    status: "pending",
  },
  {
    id: 3,
    title: "写一篇技术博客",
    content: "分享Vue3 + Nuxt3的实践经验",
    dueDate: "2025-02-07",
    category: "学习",
    status: "pending",
  },
  {
    id: 4,
    title: "观看一部电影",
    content: "推荐《银翼杀手2049》",
    dueDate: "2025-02-03",
    category: "娱乐",
    status: "pending",
  },
  {
    id: 5,
    title: "健身30分钟",
    content: "跑步+无氧训练",
    dueDate: "2025-01-30",
    category: "生活",
    status: "done",
  },
  {
    id: 6,
    title: "读一本书",
    content: "阅读《深入浅出Vue.js》",
    dueDate: "2025-02-12",
    category: "学习",
    status: "pending",
  },
  {
    id: 7,
    title: "整理房间",
    content: "清理桌面，收拾衣柜",
    dueDate: "2025-02-08",
    category: "生活",
    status: "pending",
  },
  {
    id: 8,
    title: "写LeetCode题解",
    content: "记录动态规划的解题思路",
    dueDate: "2025-02-15",
    category: "学习",
    status: "pending",
  },
  {
    id: 9,
    title: "准备面试",
    content: "复习计算机基础+刷算法题",
    dueDate: "2025-02-20",
    category: "工作",
    status: "pending",
  },
  {
    id: 10,
    title: "旅游计划",
    content: "规划下次旅行的行程",
    dueDate: "2025-03-01",
    category: "生活",
    status: "pending",
  },
]);

const pageSize = 4; // 每页显示4条
const currentPage = ref(1); // 当前页码

// 计算总页数
const totalPages = computed(() => Math.ceil(todos.value.length / pageSize));

// 计算当前页的 Todo 数据
const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return todos.value.slice(start, start + pageSize);
});

// 标记任务完成
const markAsDone = (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.status = todo.status === "done" ? "pending" : "done";
  }
};

// 更新分页时刷新数据
const fetchTodos = () => {
  paginatedTodos.value;
};
</script>
