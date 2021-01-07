<template>
  <div class="incoming_msg_img">
    Sender:<a :href="recipient">{{ recipient }}</a>
  </div>
</template>

<script>
export default {
  props: {
    recipient: String
  }
}
</script>