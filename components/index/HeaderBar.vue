<template>
  <!-- 第一部分，Auth页面和About页面跳转 -->
  <UCard class="mx-auto mt-4 max-w-sm">
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center gap-4">
        <!-- 头像 -->
        <!-- <UAvatar
          chip-color="primary"
          chip-text=""
          chip-position="top-right"
          size="lg"
          src="https://avatars.githubusercontent.com/u/99076044?v=4"
          alt="Avatar"
          class="shadow-md mb-1"
        /> -->
        <!-- <UChip text="3" size="xl"> -->
          <UButton icon="i-heroicons-inbox" color="gray" size="sm" 
          @Click="featureDeveloping" />
        <!-- </UChip> -->
        <!-- <UChip text="1" size="xl"> -->
          <UButton icon="i-heroicons-bell" color="gray" size="sm"
            @Click="featureDeveloping"
          />
        <!-- </UChip> -->
      </div>

      <!-- Auth 跳转按钮 -->
      <UButton
        color="gray"
        variant="solid"
        size="md"
        icon="i-fluent-cloud-16-regular"
      >
        <NuxtLink to="/auth" class="flex items-center gap-2"> 登录 </NuxtLink>
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { UButton } from '#components';
const toast = useToast()

const featureDeveloping = () => {
  toast.add({
    title: "功能开发中",
    description: "该功能正在开发中，敬请期待",
    color: "gray",
    timeout: 2000,
  })
}
</script>
