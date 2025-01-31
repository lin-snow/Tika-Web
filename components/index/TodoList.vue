<template>
  <!-- 第三部分，显示Todo列表（底部显示分页按钮） -->
  <!-- 任务列表 -->
  <UCard class="mx-auto my-4 max-w-sm">
    <div class="flex justify-between items-center">
      <div class="flex justify-start gap-4">
        <UIcon name="i-fluent-emoji-flat-clipboard" class="w-5 h-5 mt-1" />
        <h2 class="text-lg font-semibold mb-2">待办清单</h2>
      </div>
      <div>
        <UButton
          color="gray"
          @click="todo.fetchTodosData"
          size="sm"
          class="mr-3"
        >
          <UIcon name="i-fluent-arrow-sync-12-filled" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
    <div v-if="todo.todos.length === 0" class="text-center text-gray-500">
      <UIcon name="i-fluent-emoji-flat-confetti-ball" size="lg" />
      今日无事，好好休息吧！
    </div>

    <div v-else>
      <div
        v-for="todo in todo.todos"
        :key="todo.todoId"
        class="flex justify-between items-center p-3 gap-2 border-b"
      >
        <!-- 点击打开详情 -->
        <UButton
          color="white"
          class="text-left w-auto"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          @click="openModal(todo)"
        >
          <span class="truncate w-48 inline-block align-middle" :title="todo.title">
            {{ todo.title }}
          </span>
        </UButton>

        <!-- Done 按钮 -->
        <UButton color="gray" variant="solid" @click="markAsDone(todo)">
          <UIcon name="i-fluent-checkmark-12-filled" class="w-4 h-4" />
        </UButton>
      </div>

        <!-- 任务详情 Modal -->
        <UModal v-model="isModalOpen" >
          <UCard class="max-w-lg m-4">
            <h2 class="text-md font-semibold mb-2 ml-2">{{ selectedTodo?.title }}</h2>
            
            <UDivider size="sm" type="dotted" />

            <div class="m-2">
              <p class="text-sm text-gray-700">
              <UIcon name="i-fluent-emoji-flat-page-facing-up" class="w-4 h-4"/> <strong>内容:</strong> {{ selectedTodo?.content || "无" }}
              </p>
              <p class="text-sm my-1 text-gray-700">
                <UIcon name="i-fluent-emoji-flat-alarm-clock" class="w-4 h-4"/> <strong>截止日期:</strong> {{ selectedTodo?.dueDate || "无" }}
              </p>
              <p class="text-sm text-gray-700">
                <UIcon name="i-fluent-emoji-flat-file-folder" class="w-4 h-4"/> <strong>分类:</strong> {{
                  selectedTodo?.categoryName === "default" ? "默认" : selectedTodo?.categoryName
                }}
              </p>
            </div>

            <UDivider size="sm" type="dotted" />
            
            <UButton color="gray" @click="isModalOpen = false" class="mt-2 ml-2">关闭</UButton>
            
          </UCard>
        </UModal>

      
        <!-- <UButton color="gray" variant="solid">
          <UIcon name="i-fluent-checkmark-12-filled" class="w-4 h-4" />
        </UButton> -->

      <!-- 分页控件 -->
      <div class="flex justify-center">
        <UPagination
          v-model="todo.currentPage"
          :page-count="todo.pageSize"
          :total="todo.total"
          :active-button="{ variant: 'outline' }"
          :inactive-button="{ color: 'gray' }"
          @update:model-value="todo.fetchTodosData"
          class="mx-auto mt-4"
        />
      </div>
      
    </div>
  </UCard>
</template>


<script setup lang="ts">
import { ref } from "vue";
import type { Todo, TodoToUpdate } from "~/types/models";

const todo = useTodoStore();
const { updateTodo } = useTodo();

const isModalOpen = ref(false);
const selectedTodo = ref<Todo | null>(null);

const openModal = (todo: Todo) => {
  selectedTodo.value = todo;
  isModalOpen.value = true;
};

// 如果你需要在组件挂载时加载数据，可以使用 onMounted
onMounted(() => {
  todo.fetchTodosData();
});

// 标记为已完成
const markAsDone = async (todoAsDone: Todo) => {
  // console.log("markAsDone", id);
  const todoToUpdate : TodoToUpdate = {
    id: todoAsDone.todoId,
    title: todoAsDone.title,
    content: todoAsDone.content,
    status: 0,
  }
  await updateTodo(todoToUpdate);
  todo.fetchTodosData();
};
</script>
