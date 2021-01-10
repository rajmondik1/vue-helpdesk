<template>
  <div class="container">
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="inbox_chat">
            <ChatTicket @click="getChat" @refresh="getSessions" v-for="session in sessions" :key="session.id" :session="session"/>
            <button @click="getSessions">Refresh list</button>
          </div>
        </div>
        <Conversation :active-session="activeSession" :active-chat="activeChat"/>
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
      activeChat: [],
      activeSession: null
    }
  },
  methods: {
    getSessions() {
      axios.get("http://localhost:8080/session/list").then(res => {
        this.sessions = res.data;
        if (res.data.length > 0 && res.data[0]) {
          this.activeSession = res.data[0].id;
          this.getChat(this.activeSession);
        }
      })
    },
    getChat(sessionId) {
      if (sessionId) {
        this.activeSession = sessionId;
        axios.get("http://localhost:8080/chat/list/" + sessionId).then(res => {
          this.activeChat = res.data;
        })
      }
    }
  },
  created() {
    this.getSessions();
  }
}
</script>