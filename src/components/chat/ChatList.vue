<template>
  <div class="row">
    <div class="col-md-12">
      <table
          id="conversation"
          class="table table-striped"
      >
        <thead>
        <tr>
          <th>Chat</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in messages"
        >
          <td>From: {{item.sender }} | {{ item.content }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: Array
  }
}
</script>