<template>
  <div>
    <header class="border-b border-white/50">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <NuxtLink
            to="/"
            class="-m-1.5 p-1.5 flex text-white items-center gap-1.5 font-bold"
          >
            Character
            <nuxt-icon name="clown-face" class="text-4xl" filled />
            Generator
          </NuxtLink>
        </div>
        <div class="flex gap-x-6">
          <NuxtLink to="create" class="font-semibold leading-6 text-white"
            >Create</NuxtLink
          >
        </div>
      </nav>
    </header>

    <slot />
  </div>
</template>
