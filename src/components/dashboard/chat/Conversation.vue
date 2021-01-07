<template>
  <div class="mesgs">
    <div class="msg_history">
      {{activeChat.length}} messages
      <hr>
      <Message v-if="activeChat.length > 0" v-for="chatMessage in activeChat" :key="chatMessage.id" :message="chatMessage" />

    </div>
    <div class="type_msg">
      <div class="input_msg_write">
        <input type="text" class="write_msg" placeholder="Type a message"/>
        <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import Recipient from "@/components/dashboard/chat/Recipient";
import Message from "@/components/dashboard/chat/Message";

export default {
  components: {Message, Recipient},
  props: {
    activeChat: Array
  },
  methods: {

  },
}

</script>