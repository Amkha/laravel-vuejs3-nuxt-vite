<script setup>
import axios from "axios";
const users = await axios.get("/users");
console.log("USERS:",users);
definePageMeta({
  middleware: ["auth"]
});
function  setTwoFactor(two){
  return two ? true : false;
};
function formtDate(date){
  return date.substring(0,10);
}
</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">Users List</h1>
      <div class="flex items-center">
        <SearchInput modelValue="" />
        <NuxtLink to="/links/create" class="ml-4">
          <IconPlusCircle class="inline" /> Create New User
        </NuxtLink>
      </div>
    </nav>

    <div v-if="true">
      <table class="table-fixed w-full">
        <thead class="bg-blue-500">
          <tr class="text-red-500">
            <th class="w-[5%]">ID</th>
            <th class="w-[25%]">Name</th>
            <th class="w-[25%]">Email</th>
            <th class="w-[10%]">Created</th>
            <th class="w-[10%]">Two-Factor</th>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[5%] text-center">
              <button><IconRefresh /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users.data.data" :key="user.id">
            <td>
              <a :href="user.id" target="_blank">{{ user.id }}</a>
            </td>
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ user.email }}
            </td>
            <td>
              {{ formtDate(user.created_at) }}
            </td>
            <td>
              {{ setTwoFactor(user.two_factor_secret) }}
            </td>
            <!-- <td>
              <a
                :href="`${useRuntimeConfig().public.appURL}/${user.id}`"
                target="_blank"
              >
                {{
                  useRuntimeConfig().public.appURL.replace(
                    /^http(s?):\/\//,
                    ""
                  )
                }}/{{ user.id }}
              </a>
            </td> -->
            
            <!-- <td>{{ user.views }}</td> -->
            <td>
              <NuxtLink class="no-underline" :to="`/users/${user.id}`"
                ><iconEdit
              /></NuxtLink>
            </td>
            <td>
              <button><IconTrash /></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="mt-5 flex justify-center"></div>
    </div>

    <!-- No links message for when table is empty -->
    <div
      v-else
      class="border-dashed border-gray-500 p-3 border-[1px] text-center"
    >
      <div class="flex justify-center">
        <IconLink />
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No user found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No user created yet
          <NuxtLink to="/users/create" class="text-green-600"
            >Go create your first user!</NuxtLink
          >
        </span>
      </p>
    </div>
  </div>
</template>
