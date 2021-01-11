<template>
  <div class="mesgs">
    <div class="msg_history">
      {{ activeChat.length }} messages
      <hr>
      <Message v-if="activeChat.length > 0" v-for="chatMessage in activeChat" :key="chatMessage.id"
               :message="chatMessage"/>

    </div>
    <div class="type_msg">
      <div class="input_msg_write">
        <input type="text"
               class="write_msg"
               v-model="message"
               @keyup.enter="send"
               ref="msg"
               placeholder="Type a message"/>

        <button class="msg_send_btn"
                type="button"
                @click="send">
          <i class="fa fa-paper-plane-o"
             aria-hidden="true"></i>>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Recipient from "@/components/dashboard/chat/Recipient";
import Message from "@/components/dashboard/chat/Message";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  components: {Message, Recipient},
  data() {
    return {
      message: null,
      name: ''
    };
  },
  props: {
    activeChat: Array,
    activeSession: String | Number,
    email: String | null
  },
  methods: {
    send() {
      if (!this.message || this.message.length <= 0) return;

      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        let msg = {
          sender: this.email ? this.email : "Support",
          content: this.message,
          session: {id: this.activeSession}
        };

        this.stompClient.send("/app/chat", JSON.stringify(msg), {});
        this.message = "";
        this.$refs["msg"].value = "";
      }
    },
    connectToSessionWS() {
      this.socket = new SockJS("http://localhost:8080/ws");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            // console.log(frame);

            this.stompClient.subscribe("/session/" + this.activeSession + "/messages", tick => {
              console.log(tick);
              this.activeChat.push(JSON.parse(tick.body));
              setTimeout(this.scrollToBottom, 500)
            });
          },
          error => {
            console.log(error);
          }
      );
    },
    scrollToBottom() {
        let el = this.$el.getElementsByClassName('chat-message');
        el = el[el.length - 1];
        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.scrollIntoView({behavior: 'smooth'});
        }
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    },
  },
  watch: {
    activeSession() {
      this.disconnect();
      this.connectToSessionWS();
    }
  },
  destroyed() {
    this.disconnect();
  }
}

</script>