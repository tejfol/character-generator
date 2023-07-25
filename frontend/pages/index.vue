<script setup>
import MasonryWall from "@yeger/vue-masonry-wall";

const {
  data: characters,
  execute,
  pending,
} = await useFetch("http://localhost:3000/api/character/");

const deleteCharacter = async (id) => {
  await useFetch(`http://localhost:3000/api/character/${id}`, {
    method: "DELETE",
  });

  execute();
};
</script>

<template>
  <div class="max-w-7xl mx-auto my-8 px-8">
    <div v-if="characters && characters.length != 0" class="text-white">
      <MasonryWall
        :items="characters.list"
        :ssr-columns="4"
        :column-width="260"
        :gap="0"
      >
        <template #default="{ item, index }">
          <div
            :style="{ height: `${item}px` }"
            class="card flex flex-col overflow-hidden relative group"
          >
            <NuxtLink :to="`${item._id}`">
              <img
                draggable="false"
                width="400"
                height="400"
                class="transition-all ease-in-out aspect-auto object-cover w-full group-hover:scale-110"
                :src="`http://localhost:3000${item.avatar}`"
                alt="_"
              />
            </NuxtLink>
            <div
              class="transition-all duration-300 absolute -bottom-full h-fit flex flex-col py-2 px-4 text-center gap-2 w-full group-hover:bottom-0 group-hover:bg-black/70"
            >
              <p class="font-bold text-3xl">{{ item.name }}</p>
              <button
                type="button"
                class="ml-auto mb-2"
                @click="deleteCharacter(item._id)"
              >
                <nuxt-icon class="text-2xl" name="delete" filled />
              </button>
            </div>
          </div>
        </template>
      </MasonryWall>

      <!-- <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <li
          v-for="character in characters.list"
          :key="character._id"
          class="flex flex-col h-fit border rounded-xl overflow-hidden relative group"
        >
          <NuxtLink :to="`${character._id}`">
            <img
              draggable="false"
              width="400"
              height="400"
              class="aspect-auto object-cover w-full"
              :src="`http://localhost:3000${character.avatar}`"
              alt="_"
            />
          </NuxtLink>
          <div
            class="transition-all duration-300 absolute -bottom-full h-fit flex flex-col py-2 px-4 text-center gap-2 w-full group-hover:bottom-0 group-hover:bg-black/70"
          >
            <p class="font-bold text-3xl">{{ character.name }}</p>
            <button
              type="button"
              class="ml-auto mb-2"
              @click="deleteCharacter(character._id)"
            >
              <nuxt-icon class="text-2xl" name="delete" filled />
            </button>
          </div>
        </li>
      </ul> -->
    </div>
    <div v-else class="flex flex-col">
      <nuxt-icon class="text-7xl mx-auto w-fit" filled name="not-found" />
      <h2 class="text-center text-white text-2xl">No available character</h2>
    </div>
  </div>
</template>
