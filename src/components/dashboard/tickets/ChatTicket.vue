<template>
  <div @click="clicked" class="chat_list" :class="{ 'active_chat': isSelected}">
    <div class="chat_people">
      <div class="chat_ib">
        <h5>Ticket: {{ session.id }}
          <button v-if="isActive" @click="closeSession">Close session</button>
          <button v-if="!isActive" @click="deleteSession">X Delete session</button>
        </h5>
        <p :class="{'inactive': !isActive}">Status: {{ session.status }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.inactive {
  color: gray !important;
}
</style>

<script>
import axios from "axios";

export default {
  props: {
    active: Number,
    session: Object
  },
  methods: {
    clicked() {
      if (this.session.status === "ACTIVE") {
        this.$emit('click', this.session.id);
      }
    },
    closeSession() {
      axios.patch('http://localhost:8080/session/close/' + this.session.id).then(() => {
        this.$emit('refresh');
      })
    },
    deleteSession() {
      axios.delete('http://localhost:8080/session/' + this.session.id).then(() => {
        this.$emit('refresh');
      })
    }
  },
  computed: {
    isSelected() {
      console.log(this.active === this.session.id);
      return this.active === this.session.id;
    },
    isActive() {
      return this.session.status === 'ACTIVE';
    }
  }
}
</script>