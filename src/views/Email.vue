<template>
  <div class="container-fluid">
    <button class="open-button" @click="openForm()">Chat</button>

    <div class="chat-popup" id="myForm">
      <form class="form-container" @submit.prevent>
        <h1>LiveChat</h1>

        <label for="email"><b>Email</b></label>
        <input id="email" type="email" class="form-control email-input" placeholder="Enter your email" v-model="email"
               @keyup.enter="submit">

        <button type="submit" class="btn" @click="submit">Start chat!</button>
        <button type="button" class="btn cancel close-button" @click="closeForm()">Close</button>
      </form>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

.email-input {
  margin: 20px 0 20px 0;
}

/* Button used to open the chat form - fixed at the bottom of the page */
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

.close-button {
  position: fixed;
  bottom: 13px;
  right: 28px;
  width: 280px !important;
}

/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
  width: 300px;
  height: 500px;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Set a style for the submit/send button */
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
</style>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    submit() {
      this.$router.push('/chat/' + this.email);
    },
    openForm() {
      document.getElementById("myForm").style.display = "block";
    },
    closeForm() {
      document.getElementById("myForm").style.display = "none";
    }
  }
}
</script>