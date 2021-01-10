<template>
  <div class="chat-message">
    <div class="outgoing_msg">
      <Recipient :recipient="message.sender"/>
        <div class="sent_msg">
          <p>{{ message.content }}</p>
          <span class="time_date">{{ message.date | date }}</span></div>
      </div>
    </div>
</template>

<script>
import Recipient from "@/components/dashboard/chat/Recipient";
import moment from 'moment';
export default {
  components: {Recipient},
  props: {
    message: Object
  },
  filters: {
    date(value) {
      if (value) {
        return moment(value).format('YYYY-MM-DD HH:mm')
      }
    }
  }
}
</script>