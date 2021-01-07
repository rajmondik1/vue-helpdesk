<template>
  <div>
    <div class="outgoing_msg">
      <Recipient :recipient="message.sender"/>
        <div class="sent_msg">
          <p>{{ message.content }}</p>
          <span class="time_date"> 11:01 AM    |    June 9</span></div>
      </div>
    </div>
</template>

<script>
import Recipient from "@/components/dashboard/chat/Recipient";
export default {
  components: {Recipient},
  props: {
    message: Object
  }
}
</script>