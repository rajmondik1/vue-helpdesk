<template>
  <div class="container">
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="inbox_chat">
            <ChatTicket @click="getChat" v-for="session in sessions" :key="session.id" :session="session"/>
            <button @click="getSessions">Refresh list</button>
          </div>
        </div>
        <Conversation :active-chat="activeChat"/>
      </div>
    </div>
  </div>
</template>

<script>
import styles from './style.css';
import Conversation from "@/components/dashboard/chat/Conversation";
import ChatTicket from "@/components/dashboard/tickets/ChatTicket";
import axios from "axios";

export default {
  components: {ChatTicket, Conversation},
  data() {
    return {
      sessions: [],
      activeChat: []
    }
  },
  methods: {
    getSessions() {
      axios.get("http://localhost:8080/session/list").then(res => {
        this.sessions = res.data;
        console.log(res);
      })
    },
    getChat(sessionId) {
      if (sessionId) {
        axios.get("http://localhost:8080/chat/list/" + sessionId).then(res => {
          this.activeChat = res.data;
          console.log(res);
        })
      }
    }
  },
  created() {
    this.getSessions();
  }
}
</script>