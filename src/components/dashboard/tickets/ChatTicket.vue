<template>
  <div @click="clicked" class="chat_list" :class="{ active: 'active_chat'}">
    <div class="chat_people">
      <div class="chat_ib">
        <h5>Ticket: {{session.id}} <span class="chat_date">Dec 25</span></h5>
        <p>Status: Closed</p>
<!--        <p>Test, which is a new approach to have all solutions-->
<!--          astrology under one roof.</p>-->
      </div>
    </div>
  </div>
</template>

<script>

export default {
props: {
  active: Boolean,
  session: Object
},
  methods: {
    clicked() {
      this.$emit('click', this.session.id);
    }
  }
}
</script>