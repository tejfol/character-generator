<template>
  <div>
    <header>
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <nuxt-icon name="clown-face" class="text-4xl" filled />
          </NuxtLink>
        </div>
        <div class="flex gap-x-6">
          <NuxtLink
            to="create"
            class="text-sm font-semibold leading-6 text-white"
            >Create</NuxtLink
          >
        </div>
      </nav>
    </header>

    <slot />
  </div>
</template>
