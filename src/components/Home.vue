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
      <h1>#guitar</h1>
      <p>연습한 곡을 기록하지 않으니 잊어버리더라고요.</p>
      <p>오래 이어 온 취미를 더 오래 간직하기 위해 <br> 웹페이지를 제작하였습니다.</p>
    </section>

    <!-- youtube part-->
    <section>
      <b-card-group id="youtube" columns>
        <b-card
          no-body
          style="max-width: 25rem;"
          v-for="embed in embeds"
          :key="embed.id"
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
      if (process.env.NODE_ENV === 'development') {
        this.$http
          .get('http://localhost:8000/instagram')
          .then (function (response) {
            vm.images = response.data.filter(
              x => x.caption && x.media_type !== 'VIDEO' && x.caption.includes('#guitar')
            )
          })
        this.$http
          .get('http://localhost:8000/youtube')
          .then(function (response) {
            let playlist = response.data.filter(k => k.status.privacyStatus !== 'private');
            vm.embeds = playlist.map(x => x.snippet);
          }).catch(function () {
          vm.embeds = [
            {id: '1fwRzD1INZw', title: '😕', description: '최신 영상을 불러오지 못했어요!', privacy: "public"},
            {id: 'Tx2cGzsPSlc', title: '😕', description: '최신 영상을 불러오지 못했어요!', privacy: "private"},
            {id: 'yW7K20UUx5c', title: '😕', description: '최신 영상을 불러오지 못했어요!'}
          ].filter(k => k.privacy !== 'private')
        })
      } else {
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
            let playlist = response.data.filter(k => k.status.privacyStatus !== 'private');
            vm.embeds = playlist.map(x => x.snippet);
          }).catch(function () {
          vm.embeds = [
            {id: '1fwRzD1INZw', title: '😕', description: '최신 영상을 불러오지 못했어요!', privacy: "public"},
            {id: 'Tx2cGzsPSlc', title: '😕', description: '최신 영상을 불러오지 못했어요!', privacy: "private"},
            {id: 'yW7K20UUx5c', title: '😕', description: '최신 영상을 불러오지 못했어요!'}
          ].filter(k => k.privacy !== 'private')
        })
      }
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

  .about-section {
    padding: 50px;
    margin: 50px 0;
    background-color: #474e5d;
    opacity: 0.8;
    color: white;
  }
  .about-section h1 {
    font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma, Sans-Serif, serif;
    padding: 7px 15px;
    font-weight: bold;
  }

</style>
