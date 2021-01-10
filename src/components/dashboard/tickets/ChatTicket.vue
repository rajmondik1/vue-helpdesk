<template>
  <div @click="clicked" class="chat_list" :class="{ active: 'active_chat'}">
    <div class="chat_people">
      <div class="chat_ib">
        <h5>Ticket: {{session.id}}  <button @click="closeSession">Close session</button></h5>
        <p>Status: {{ session.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
  active: Boolean,
  session: Object
},
  methods: {
    clicked() {
      this.$emit('click', this.session.id);
    },
    closeSession() {
      axios.patch('http://localhost:8080/session/close/' + this.session.id).then(() => {
        this.$emit('refresh');
      })
    }
  }
}
</script>