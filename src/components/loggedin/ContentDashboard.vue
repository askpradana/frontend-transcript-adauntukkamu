<template>
  <main class="p-6">
    <h1 class="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
        <p>You have 3 new transcripts this week.</p>
        <p>Last transcript: 2 hours ago</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="flex space-x-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Transcript
          </button>
          <button
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View All
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Recent Transcripts</h2>
      <ul class="bg-white rounded-lg shadow">
        <li class="border-b p-4 hover:bg-gray-50">
          Transcript 1 - Created on 2023-05-01
        </li>
        <li class="border-b p-4 hover:bg-gray-50">
          Transcript 2 - Created on 2023-04-28
        </li>
        <li class="p-4 hover:bg-gray-50">
          Transcript 3 - Created on 2023-04-25
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
// Add any necessary imports and logic here
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
