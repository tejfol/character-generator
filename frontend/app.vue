<script setup>
const {
  data: characters,
  execute,
  pending,
} = await useFetch("http://localhost:3000/");

const deleteCharacter = async (id) => {
  await useFetch(`http://localhost:3000/character/${id}`, { method: "DELETE" });

  execute();
};
</script>

<template>
  <div class="px-4 sm:px-8 py-4">
    <ul
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
    >
      <li
        v-for="character in characters.list"
        :key="character.id"
        class="flex flex-col h-fit border"
      >
        <div>
          <img
            class="aspect-auto object-cover w-full xl:max-h-[75vh]"
            :src="`http://localhost:3000${character.avatar}`"
            alt=""
          />
        </div>
        <div
          class="flex flex-col p-1 text-center gap-2 h-fit border h-full w-full"
        >
          <p class="font-bold">{{ character.name }}</p>
          <button type="button" @click="deleteCharacter(character._id)">
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
</template>
