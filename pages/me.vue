<script setup>
import axios from "axios";
const {user} = useAuth();
definePageMeta({
  middleware: ["auth"]
});
</script>

<template>
  <p><strong>User Name:</strong> {{ user.name }}</p>
  <p><strong>User Email:</strong> {{ user.email}}</p>
</template>
