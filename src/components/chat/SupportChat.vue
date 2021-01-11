<template>
  <div>
    <div
        id="main-content"
        class="container"
    >
      <div>
        <Conversation style="width: 40%; border: 1px solid black" :email="email" :active-session="session" :active-chat="received_messages"/>
      </div>
    </div>
  </div>
</template>

<script>
import Conversation from "@/components/dashboard/chat/Conversation";
import styles from '../dashboard/style.css';

export default {
  components: {Conversation},
  props: {
    email: String,
  },
  data() {
    return {
      received_messages: [],
      message: null,
      connected: false,
      session: null,
    };
  },
  methods: {
    connect() {
      this.getToken().then(token => {
        this.session = token;
      }).catch(() => {
        this.connect()
      });
    },
    async getToken() {
      const response = await fetch('http://localhost:8080/session/new');
      const token = await response.text();
      console.log('Fetching token... ');
      return token;
    },
  },
  mounted() {
    this.connect();
  }
}
</script>