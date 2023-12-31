<script setup>
import { Form, Field } from "vee-validate";

const {
  public: { $api },
} = useRuntimeConfig();

const image = reactive({ mimetype: "", image: "" });
const name = ref("");
const sex = ref("");
const realm = ref("");
const type = ref("");
const personality = ref("");
const motto = ref("");

const onSelectFile = (e) => {
  const files = e.currentTarget.files;

  if (files && files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      image.image = e.target.result;
    };

    image.mimetype = files[0].type.split("/")[1];

    image.image = reader.readAsDataURL(files[0]);
  }
};

const onSubmit = async (values) => {
  await useFetch(`${$api}/character`, {
    method: "POST",
    body: { avatar: image, ...values },
  });
};
</script>

<template>
  <div class="mx-auto max-w-7xl p-4 lg:p-8">
    <Form @submit="onSubmit" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div
        :style="{ 'background-image': `url(${image.image})` }"
        class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-36 bg-contain bg-no-repeat bg-center"
      >
        <div class="text-center my-auto">
          <svg
            class="mx-auto h-12 w-12 text-gray-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="mt-4 flex text-sm leading-6 text-gray-400">
            <label
              for="avatar"
              class="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                @input="onSelectFile"
                id="avatar"
                name="avatar"
                type="file"
                class="sr-only"
              />
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs leading-5 text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
      <div class="text-white font-medium space-y-4">
        <div class="sm:col-span-3">
          <label for="first-name" class="block font-medium leading-6 text-white"
            >Name</label
          >
          <div class="mt-2">
            <Field
              type="text"
              name="name"
              id="name"
              v-model="name"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="first-name" class="block font-medium leading-6 text-white"
            >Sex</label
          >
          <div class="mt-2">
            <Field
              type="text"
              name="sex"
              id="sex"
              v-model="sex"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="first-name" class="block font-medium leading-6 text-white"
            >Realm</label
          >
          <div class="mt-2">
            <Field
              type="text"
              name="realm"
              id="realm"
              v-model="realm"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="first-name" class="block font-medium leading-6 text-white"
            >Type</label
          >
          <div class="mt-2">
            <Field
              type="text"
              name="type"
              id="type"
              v-model="type"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="first-name" class="block font-medium leading-6 text-white"
            >Personality</label
          >
          <div class="mt-2">
            <Field
              type="text"
              name="personality"
              id="personality"
              v-model="personality"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="first-name" class="block font-medium leading-6 text-white"
            >Motto</label
          >
          <div class="mt-2">
            <Field
              type="text"
              name="motto"
              id="motto"
              v-model="motto"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          class="block rounded-md bg-indigo-500 px-5 py-2 mt-4 ml-auto w-fit font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>
