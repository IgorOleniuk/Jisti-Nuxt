<template>
  <div class="container text-center mt-3">
    <h1>Jitsi in nuxt</h1>
    <div class="d-flex justify-content-center mt-5">
      <input
        v-model="roomName"
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
    <div class="rooms mt-5">
      <h2>Avalible video rooms</h2>
      <template v-if="apiJitsi">
        <ul
          v-for="(room, index) in rooms"
          :key="index"
        >
          <li>
            <a
              href="#"
              target="_blank"
            >
              Room
              {{ room._url }}
            </a>
          </li>
        </ul>
      </template>
      <p v-else>Here is not any avalible video rooms</p>
    </div>
    <button
      class="btn btn-dark"
      @click="getJitsiInfo"
    >
      Get Info
    </button>
    {{ data }}
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
      roomName: '',
      apiJitsi: null,
      rooms: [],
      closeMsg: '',
      data: null,
    };
  },

  methods: {
    connectToJitsi () {
      const domain = 'meet.jit.si';
      const options = {
        roomName: this.roomName,
        width: '80%',
        height: '100%',
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen', 'hangup', 'settings',
          ],
          SHOW_WATERMARK_FOR_GUESTS: true,
          SHOW_BRAND_WATERMARK: false,
          BRAND_WATERMARK_LINK: '',
          SHOW_POWERED_BY: false,
          SHOW_DEEP_LINKING_IMAGE: false,
          SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile'],
        },
        parentNode: document.querySelector('#meet'),
      };
        // eslint-disable-next-line no-undef
      this.apiJitsi = new JitsiMeetExternalAPI(domain, options);
      this.apiJitsi.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671111');
      this.jitsi = true;
      this.roomName = '';
      this.rooms.push(this.apiJitsi);
      console.log(this.rooms);
    },

    close () {
      // this doesn't work now
      this.apiJitsi.dispose();
      this.jitsi = false;
      this.roomName = '';
      this.closeMsg = 'You\'ve finished your video meeting.';
    },

    getJitsiInfo () {
      /* this.data = this.apiJitsi.executeCommands({
        console.log('lol');
      }); */
      console.log(this.data);
    },
  },
};
</script>

<style>
  .container {
    height: 100vh;
  }

  #meet {
    position: relative;
    max-width: 100%;
    height: 80%;
  }

  .close {
    position: absolute;
    top: -1%;
    right: 8%;
  }
</style>
