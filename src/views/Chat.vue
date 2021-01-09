<template>
  <support-chat :email="$route.params.name"/>
</template>

<script>
import SupportChat from "@/components/chat/SupportChat";

// TODO: Implement vuex

export default {
  components: {
    SupportChat
  },
  created() {
    console.log(this.$route.params.name);
    // this.connect();
  }
};
</script>

<style scoped>
</style>