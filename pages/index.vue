<template>
  <div class="container text-center mt-3">
    <h1>Jitsi in nuxt</h1>
    <div class="d-flex justify-content-center mt-5">
      <input
        v-model="room"
        type="text"
        class="form-control w-50 mr-2"
        placeholder="Your meeting room"
      >
      <button
        class="btn btn-primary mb-2"
        @click="connectToJitsi"
      >
        Open room
      </button>
    </div>
    <div
      id="meet"
      class="my-5"
    >
      {{ closeMsg }}
      <button
        v-if="jitsi"
        type="button"
        class="close"
        aria-label="Close"
        @click="close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jitsi: false,
      room: '',
      apiJitsi: null,
      closeMsg: '',
    };
  },

  methods: {
    connectToJitsi () {
      const domain = 'meet.jit.si';
      const options = {
        roomName: this.room,
        width: '80%',
        height: '100%',
        parentNode: document.querySelector('#meet'),
      };
        // eslint-disable-next-line no-undef
      this.apiJitsi = new JitsiMeetExternalAPI(domain, options);
      this.jitsi = true;
    },

    close () {
      // this doesn't work now
      this.apiJitsi.dispose();
      this.jitsi = false;
      this.room = '';
      this.closeMsg = 'You\'ve finished your video meeting.';
    },
  },
};
</script>

<style>
  #meet {
    position: relative;
    max-width: 100%;
    height: 80vh;
  }

  .close {
    position: absolute;
    top: -1%;
    right: 8%;
  }
</style>
