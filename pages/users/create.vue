<script setup>
definePageMeta({
  middleware: ["auth"]
});
</script>
<template>
  <h1>Create New User</h1>
  <GoBack>or go back to user list</GoBack>
  <form>
    <label>
      <div>User</div>
      <input type="text" name="name" />
    </label>
    <button class="btn">Create User</button>
  </form>
</template>
