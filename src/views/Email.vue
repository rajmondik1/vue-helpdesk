<template>
<div>
  <input type="email" v-model="email" @keyup.enter="submit">
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    submit() {
      this.$router.push('/chat/' + this.email);
    }
  }
}
</script>