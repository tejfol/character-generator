<script setup>
import MasonryWall from "@yeger/vue-masonry-wall";

const {
  public: { $static, $api },
} = useRuntimeConfig();

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const limit = ref("10");
const limits = [10, 25, 50];

const {
  data: characters,
  execute,
  pending,
} = await useFetch(`${$api}/character/`, {
  query: { limit },
  watch: [limit],
});

const deleteCharacter = async (id) => {
  await useFetch(`${$api}/character/${id}`, {
    method: "DELETE",
  });

  execute();
};
</script>

<template>
  <div class="max-w-7xl mx-auto my-8 px-8">
    <div v-if="characters && characters.length != 0" class="text-white">
      <!-- Search and limit -->
      <div class="mb-2">
        <Listbox as="div" v-model="limit" class="ml-auto w-fit font-sans">
          <div class="relative mt-2">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <span class="block truncate">{{ limit }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="lim in limits"
                  :key="lim.id"
                  :value="lim"
                  v-slot="{ active, limit }"
                >
                  <li
                    :class="[
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    ]"
                  >
                    <span
                      :class="[
                        limit ? 'font-semibold' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ lim }}</span
                    >

                    <span
                      v-if="limit"
                      :class="[
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <!-- List with Mansonry -->
      <MasonryWall
        :items="characters.list"
        :ssr-columns="4"
        :column-width="300"
        :gap="12"
      >
        <template #default="{ item, index }">
          <div class="overflow-hidden relative group h-fit">
            <NuxtLink :to="`${item._id}`">
              <img
                draggable="false"
                class="transition-all ease-in-out aspect-auto object-cover w-full group-hover:scale-110"
                :src="`${$static}/${item.avatar}`"
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
    </div>
    <div v-else class="flex flex-col">
      <nuxt-icon class="text-7xl mx-auto w-fit" filled name="not-found" />
      <h2 class="text-center text-white text-2xl">No available character</h2>
    </div>
  </div>
</template>
