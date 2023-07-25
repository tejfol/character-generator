<script setup>
const route = useRoute();

const {
  public: { $static, $api },
} = useRuntimeConfig();

const { data } = await useFetch(`${$api}/character/${route.params.id}`, {
  method: "GET",
});
</script>

<template>
  <div class="text-white font-bold max-w-7xl mx-auto my-8 px-8">
    <div class="flex gap-12">
      <img
        class="w-96 object-cover rounded"
        :src="`${$static}/${data.avatar}`"
        alt=""
      />
      <div class="flex flex-col gap-2">
        <h1 class="text-6xl">{{ data.name }}</h1>
        <p>
          Sex: <span class="text-gray-300">{{ data.sex }}</span>
        </p>
        <p>
          Realm: <span class="text-gray-300">{{ data.realm }}</span>
        </p>
        <p>
          Type: <span class="text-gray-300">{{ data.type }}</span>
        </p>
        <p>
          Personality: <span class="text-gray-300">{{ data.personality }}</span>
        </p>
        <p>
          Motto: <span class="text-gray-300">{{ data.motto }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
