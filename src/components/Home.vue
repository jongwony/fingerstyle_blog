<template>
  <div class="home">
    <!-- carousel part-->
    <section>
      <div class="row">
        <div class="col-lg p-0"></div>
        <div class="col-lg-7 p-0">
          <b-carousel
            id="gallery"
            v-model="slide"
            :interval="5000"
            fade
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- v-bind in attributes -->
            <b-carousel-slide v-for="image in images" :key="image['media_url']" :text="image.caption"
                              :img-src="image['media_url']"></b-carousel-slide>
          </b-carousel>
        </div>
        <div class="col-lg p-0"></div>
      </div>
    </section>

    <section class="about-section">
      <h1>🎸 Guitar</h1>
      <p>
        연습한 곡을 기록하지 않으니 잊어버리더라고요
        <br>
        근데 기록해도 잊어버리는건 마찬가지입니다.
      </p>
      <hr>
    </section>

    <!-- youtube part-->
    <section>
      <b-card-group id="youtube" columns>
        <b-card
          no-body
          v-for="embed in embeds"
          :key="embed.id"
          class="d-inline-flex"
        >
          <template v-slot:header>
            <b-embed
              type="iframe"
              aspect="16by9"
              :src="'https://www.youtube.com/embed/' + embed.resourceId.videoId"
              allowfullscreen
            ></b-embed>
          </template>

          <b-card-body>
            <b-card-title>{{ embed.title }}</b-card-title>
            <b-card-sub-title v-if="embed.description" class="mb-2">{{ embed.description }}</b-card-sub-title>
          </b-card-body>
        </b-card>
      </b-card-group>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        slide: 0,
        sliding: null,
        props: {
          caption: String,
          text: String,
          'img-src': String,
        },
        embeds: [],
        images: []
      }
    },
    created() {
      let vm = this
      // chalice local - in api server
      this.$http
        .get('https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/instagram')
        .then(function (response) {
          vm.images = response.data.filter(
            x => x.caption && x.media_type !== 'VIDEO' && x.caption.includes('#guitar')
          )
        })
      this.$http
        .get('https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/youtube')
        .then(function (response) {
          let playlist = response.data.filter(
            k => k.status.privacyStatus !== 'private' && k.snippet.description.includes('#guitar')
          );
          vm.embeds = playlist.map(x => x.snippet);
        }).catch(function () {
        vm.embeds = [
          {id: '1fwRzD1INZw', title: '😕', description: '최신 영상을 불러오지 못했어요!', privacy: "public"},
          {id: 'Tx2cGzsPSlc', title: '😕', description: '최신 영상을 불러오지 못했어요!', privacy: "private"},
          {id: 'yW7K20UUx5c', title: '😕', description: '최신 영상을 불러오지 못했어요!'}
        ].filter(k => k.privacy !== 'private')
      })
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
  .home {
    margin-top: 56px;
  }
  .card-header {
    padding: 0;
  }
  hr {
    border: 1px solid var(--accent-color);
  }
  .card {
    max-width: 25rem;
    text-align: center;
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    color: var(--text-primary-color);
    background-color: var(--background-color-secondary);
  }
  .about-section {
    margin-top: 120px;
  }

</style>
