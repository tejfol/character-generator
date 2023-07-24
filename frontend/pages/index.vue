<script setup>
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
  <div class="max-w-7xl mx-auto">
    <div v-if="characters" class="px-4 sm:px-8 py-4 text-white">
      <ul
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        <li
          v-for="character in characters.list"
          :key="character.id"
          class="flex flex-col h-fit border rounded-xl"
        >
          <img
            width="400"
            height="400"
            class="aspect-auto object-cover w-full xl:max-h-[75vh]"
            :src="`http://localhost:3000${character.avatar}`"
            alt="_"
          />
          <div
            class="flex flex-col py-2 px-4 text-center gap-2 h-fit h-full w-full"
          >
            <p class="font-bold">{{ character.name }}</p>
            <button
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg ml-auto text-sm px-3 py-1.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              @click="deleteCharacter(character._id)"
            >
              Delete
            </button>
            <!-- <p>
            <span class="font-bold">Sex:</span> {{ character.sex || "-----" }}
          </p>
          <p>
            <span class="font-bold">Realm:</span>
            {{ character.realm || "-----" }}
          </p>
          <p>
            <span class="font-bold">type:</span> {{ character.type || "-----" }}
          </p>
          <p>
            <span class="font-bold">personality:</span>
            {{ character.personality || "-----" }}
          </p>
          <p>
            <span class="font-bold">motto:</span>
            {{ character.motto || "-----" }}
          </p> -->
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-col my-12">
      <nuxt-icon class="text-7xl mx-auto w-fit" filled name="not-found" />
      <h2 class="text-center text-white text-2xl">No available characters</h2>
    </div>
  </div>
</template>
