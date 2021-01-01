<template>
  <div class="col-md-12">
    <label for="msg">Message text</label>
    <textarea
        id="msg"
        class="form-control"
        :value="text"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="send"
    ></textarea>
    <button
        id="send"
        class="btn btn-default"
        type="submit"
        @click.prevent="send"
    >->
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  methods: {
    send() {
      this.$emit('send');
      this.text = null;
      this.$emit('input', null)
    },
  }
}
</script>