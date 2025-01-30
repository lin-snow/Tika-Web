<template>
  <!-- 第一部分，Auth页面和About页面跳转 -->
  <UCard class="mx-auto mt-4 max-w-sm">
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center gap-4">
        <!-- 头像 -->
        <UAvatar
          chip-color="primary"
          chip-text=""
          chip-position="top-right"
          size="lg"
          src="https://avatars.githubusercontent.com/u/99076044?v=4"
          alt="Avatar"
          class="shadow-md"
        />
        <UChip text="3" size="2xl">
          <UButton icon="i-heroicons-inbox" color="gray" />
        </UChip>
        <UChip text="1" size="2xl">
          <UButton icon="i-heroicons-bell" color="gray" />
        </UChip>
      </div>

      <!-- Auth 跳转按钮 -->
      <UButton
        color="green"
        variant="soft"
        size="xl"
        icon="i-fluent-emoji-flat-robot"
      >
        <NuxtLink to="/auth" class="flex items-center gap-2"> 登录 </NuxtLink>
      </UButton>
    </div>
  </UCard>
</template>
