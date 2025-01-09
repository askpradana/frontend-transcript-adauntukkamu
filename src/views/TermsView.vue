<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <router-link
      to="/settings"
      class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <span>Back to Settings page</span>
    </router-link>

    <h1 class="text-3xl font-bold mb-6">Refund Policy and Terms of Service</h1>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Token Purchase and Usage</h2>
      <ol class="list-decimal pl-6 space-y-2">
        <li>
          Tokens purchased on this website are for use exclusively with our AI
          transcription services.
        </li>
        <li>
          Each token represents one unit of service access on our platform.
        </li>
      </ol>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Refund Eligibility</h2>

      <h3 class="text-xl font-medium mb-3">Eligible for Refund</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>
          Unused tokens that have never been applied to any transcription
          service
        </li>
        <li>
          Tokens that have not been activated or associated with any project
        </li>
      </ul>

      <h3 class="text-xl font-medium mb-3">Not Eligible for Refund</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>
          Tokens that have been used, partially used, or applied to any
          transcription service
        </li>
        <li>Tokens purchased at a discount or through promotional offers</li>
        <li>Expired tokens (if applicable)</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Refund Process</h2>
      <p class="mb-3">To request a refund for eligible tokens:</p>
      <ol class="list-decimal pl-6 space-y-2">
        <li>
          Send an email directly to
          <a
            href="mailto:support@adauntukkamu.com"
            class="text-blue-600 hover:underline"
            >support@adauntukkamu.com</a
          >
        </li>
        <li>
          Include in your email:
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li>Your account information</li>
            <li>The number of unused tokens you wish to refund</li>
            <li>
              Your original purchase information (date and transaction ID if
              available)
            </li>
          </ul>
        </li>
      </ol>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Additional Terms</h2>
      <ol class="list-decimal pl-6 space-y-2">
        <li>All refund requests will be reviewed on a case-by-case basis</li>
        <li>
          We reserve the right to modify these terms and conditions at any time
        </li>
        <li>
          The decision regarding refund eligibility is final and at our
          discretion
        </li>
        <li>Processing of approved refunds may take up to [3] business days</li>
      </ol>
    </section>

    <p class="mt-8 font-medium">
      By purchasing tokens, you acknowledge and agree to these terms and
      conditions.
    </p>
  </div>
</template>

<script setup lang="ts">
// Component for displaying Terms and Conditions
</script>
