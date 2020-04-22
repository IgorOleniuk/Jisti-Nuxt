<template>
  <div class="container text-center mt-5">
    <h1>Jitsi in nuxt</h1>
    <!--<div class="d-flex justify-content-center mt-5">
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
    </div>-->
    <div class="row mt-5">
      <div class="col-4">
        <h4>Room #1</h4>
        <div
          class="video"
          @click="createFirstroom"
        >
          <img
            src="~/static/01.jpg"
            style="width: 200px; height: 200px;"
          >
        </div>
      </div>
      <div class="col-4">
        <h4>Room #2</h4>
        <div
          class="video"
          @click="createSecondRoom"
        >
          <img
            src="~/static/02.jpg"
            style="width: 200px; height: 200px;"
          >
        </div>
      </div>
      <div class="col-4">
        <h4>Room #3</h4>
        <div
          class="video"
          @click="createThirdRoom"
        >
          <img
            src="~/static/03.jpg"
            style="width: 200px; height: 200px;"
          >
        </div>
      </div>
    </div>
   <!-- <div class="rooms mt-5">
      <h2>Avalible video rooms</h2>
      <template v-if="apiJitsi">
        <div class="row">
          <div
            v-for="(room, index) in rooms"
            :key="index"
            class="col-3"
          >
            <a
              :href="room._url"
              target="_blank"
            >
              <img
                style="width: 100px; height: 100px;"
                src="~/static/small_man.jpeg"
              >
            </a>
          </div>
        </div>
      </template>
      <p v-else>Here is not any avalible video rooms</p>
    </div>-->
    <!--<button
      class="btn btn-dark"
      @click="getJitsiInfo"
    >
      Get Info
    </button>-->
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
      apiJitsi2: null,
      apiJitsi3: null,
      rooms: [],
      closeMsg: '',
      data: null,
    };
  },

  /* mounted () {
    this.createFirstroom();
    this.createSecondRoom();
    this.createThirdRoom();
  }, */

  methods: {
    connectToJitsi () {
      const domain = 'meet.jit.si';
      const options = {
        roomName: this.roomName,
        width: '80%',
        height: '100%',
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen', 'hangup', 'settings', 'info',
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
      if (this.apiJitsi) {
        this.apiJitsi.dispose();
        this.apiJitsi = null;
      } else if (this.apiJitsi2) {
        this.apiJitsi2.dispose();
        this.apiJitsi2 = null;
      } else if (this.apiJitsi3) {
        this.apiJitsi3.dispose();
        this.apiJitsi3 = null;
      }
      this.jitsi = false;
    },

    getJitsiInfo () {
      /* this.data = this.apiJitsi.executeCommands({
        console.log('lol');
      }); */
      console.log(this.data);
    },

    createFirstroom () {
      if (this.apiJitsi === null && this.apiJitsi2 === null && this.apiJitsi3 === null) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: 'Room-1',
          width: '80%',
          height: '100%',
          parentNode: document.querySelector('#meet'),
        };
        // eslint-disable-next-line no-undef
        this.apiJitsi = new JitsiMeetExternalAPI(domain, options);
        this.apiJitsi.executeCommand('subject', 'Room #1');
        this.jitsi = true;
      }
    },

    createSecondRoom () {
      if (this.apiJitsi2 === null && this.apiJitsi === null && this.apiJitsi3 === null) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: 'Room-2',
          width: '80%',
          height: '100%',
          parentNode: document.querySelector('#meet'),
        };
        // eslint-disable-next-line no-undef
        this.apiJitsi2 = new JitsiMeetExternalAPI(domain, options);
        this.apiJitsi2.executeCommand('subject', 'Room #2');
        this.jitsi = true;
      }
    },

    createThirdRoom () {
      if (this.apiJitsi3 === null && this.apiJitsi === null && this.apiJitsi2 === null) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: 'Room-3',
          width: '80%',
          height: '100%',
          parentNode: document.querySelector('#meet'),
        };
        // eslint-disable-next-line no-undef
        this.apiJitsi3 = new JitsiMeetExternalAPI(domain, options);
        this.apiJitsi3.executeCommand('subject', 'Room #3');
        this.jitsi = true;
      }
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

  .video {
    cursor: pointer;
  }
</style>
