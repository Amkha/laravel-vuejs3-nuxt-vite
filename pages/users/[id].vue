<script setup>
definePageMeta({
  middleware: ["auth"]
});
</script>
<template>
  <h1>Update User</h1>
  <GoBack>or go back to User list</GoBack>
  <form>
    <label>
      <div>User name</div>
      <input type="text" />
    </label>

    <label>
      <div>Email</div>
      <input type="text" />
    </label>

    <button class="btn">Update User</button>
  </form>
</template>
