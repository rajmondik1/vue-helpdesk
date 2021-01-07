<template>
  <div>

    <div
        id="main-content"
        class="container"
    >
      <div class="row">
        <h1> Debug panel </h1>
        <div class="col-md-6">
          <div class="form-group">
            <label for="connect">Session </label>
            <input v-model="session"/> Session ID: {{ session }}
            <button
                id="connect"
                class="btn btn-default"
                type="submit"
                :disabled="connected == true"
                @click.prevent="connect"
            >Connect
            </button>
            <button
                id="disconnect"
                class="btn btn-default"
                type="submit"
                :disabled="connected == false"
                @click.prevent="disconnect"
            >Disconnect
            </button>
          </div>
        </div>

        <div class="col-md-6">
          <label for="name">Name</label>
          <input
              type="text"
              id="name"
              class="form-control"
              v-model="name"
              placeholder="Your name here..."
          >
        </div>
      </div>


    <div style="border: 5px solid black">
      <chat-list :messages="received_messages"/>

      <chat-input v-model="message" @send="send"/>
    </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import ChatList from "@/components/chat/ChatList";
import ChatInput from "@/components/chat/ChatInput";

export default {
  components: {ChatInput, ChatList},
  data() {
    return {
      received_messages: [],
      message: null,
      connected: false,
      session: null,
      name: ''
    };
  },
  methods: {
    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        let msg = {
          sender: this.name,
          content: this.message,
          session: {id: this.session}
        };

        // TODO: Rename ticket and token to session

        console.log(JSON.stringify(msg));
        this.stompClient.send("/app/chat", JSON.stringify(msg), {});
      }
    },
    connect() {
      if (this.session) {
        this.connectToWebsocket();
      } else {
        this.getToken().then(token => {
          this.session = token;
          this.connectToWebsocket();
        })
      }
    },
    connectToWebsocket() {
      this.socket = new SockJS("http://localhost:8080/ws");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            // console.log(frame);

            this.stompClient.subscribe("/session/" + this.session + "/messages", tick => {
              console.log(tick);
              this.received_messages.push(JSON.parse(tick.body));
            });


          },
          error => {
            console.log(error);
            this.connected = false;
          }
      );
    },
    async getToken() {
      const response = await fetch('http://localhost:8080/session/new');
      const token = await response.text();
      console.log('Fetching token... ');
      return token;
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  }
}
</script>