<template>
  <!-- 第二部分，显示添加Todo表单 -->
  <UCard class="mx-auto mt-4 max-w-sm">
    <div class="flex justify-start gap-4">
      <UIcon name="i-unjs-unbuild" class="mt-1 w-5 h-5" />
      <h2 class="text-lg font-semibold mb-3">添加任务</h2>
    </div>
    <!-- Todo Title -->
    <UInput
      icon="i-fluent-emoji-flat-thinking-face"
      size="sm"
      color="white"
      :trailing="false"
      placeholder="输入任务标题..."
      v-model="todoTitle"
      class="mb-4"
    />

    <!-- Todo Content -->
    <UTextarea
      v-model="todoContent"
      size="sm"
      color="white"
      placeholder="输入任务内容..."
      rows="4"
      class="mb-4"
    />

    <!-- Todo Due Date && Todo Category && Action -->

    <UTabs :items="items" class="w-full">
      <template #item="{ item }">
        <!-- Todo 分类选择 -->
        <div
          v-if="item.key === 'category'"
          class="flex justify-between items-center gap-2 p-2"
        >
          <span class="text-md text-gray-600">选择分类：</span>
          <USelectMenu
            v-model="selectedCategory"
            :options="categories"
            class="w-32"
          />
        </div>

        <!-- 截止日期选择 -->
        <div
          v-else-if="item.key === 'dueDate'"
          class="flex justify-between items-center gap-2 p-2"
        >
          <span class="text-md text-gray-600">选择日期：</span>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              variant="outline"
              :label="format(date, 'd MMM, yyy')"
            />

            <template #panel="{ close }">
              <DatePicker v-model="date" is-required @close="close" />
            </template>
          </UPopover>
        </div>

        <!-- Todo 操作按钮 -->
        <div
          v-else-if="item.key === 'actions'"
          class="flex justify-between items-center gap-2 p-2"
        >
          <UButton
            color="red"
            variant="soft"
            size="md"
            icon="i-fluent-emoji-flat:broom"
            @click="clearForm"
          >
            清空表单
          </UButton>

          <UButton
            color="green"
            variant="soft"
            size="md"
            icon="i-fluent-emoji-flat:writing-hand-medium-light"
            @click="addTask"
          >
            添加任务
          </UButton>
        </div>
      </template>
    </UTabs>
  </UCard>
</template>

<script setup>
import { ref } from "vue";
import { format } from "date-fns";

const date = ref(new Date());

const items = [
  { key: "category", label: "分类", description: "选择任务所属分类" },
  { key: "dueDate", label: "截止日期", description: "选择任务的截止日期" },
  { key: "actions", label: "操作", description: "任务操作" },
];

const categories = ["工作", "学习", "生活", "娱乐"]; // 示例分类
const selectedCategory = ref(categories[0]); // 存储选中的分类
</script>
