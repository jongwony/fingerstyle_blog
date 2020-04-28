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
            <b-carousel-slide v-for="image in images" :key="image['img-src']" :text="image.caption"
                              :img-src="image['img-src']"></b-carousel-slide>
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
              :src="'https://www.youtube.com/embed/' + embed.id"
              allowfullscreen
            ></b-embed>
          </template>

          <b-card-body>
            <b-card-title>{{ embed.title }}</b-card-title>
            <b-card-sub-title v-if="embed.subtitle" class="mb-2">{{ embed.subtitle }}</b-card-sub-title>
            <b-card-text>
              {{ embed.description }}
            </b-card-text>
          </b-card-body>

          <b-card-body v-if="embed.downloads">
            <b-button variant="outline-danger">{{ embed.downloads }}</b-button>
            <b-button variant="outline-primary">{{ embed.downloads }}</b-button>
          </b-card-body>

          <b-card-footer v-if="embed.footer">{{ embed.footer }}</b-card-footer>

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
      this.$http
        .get('https://wr6wm9szy5.execute-api.ap-northeast-2.amazonaws.com/api/instagram')
        .then(function (response) {
          vm.images = response.data
        })
        .catch(function () {
          vm.images = [
            {'img-src': "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/93522189_229360631664835_7968747596775217704_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=FPa_WvDvtI0AX9mEGFv&oh=ae1960df92ea03f579209b5bcf7e3997&oe=5ECB1AEA", caption: "😕 최신 이미지를 못가져왔어요!"},
            {'img-src': "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/80867696_133634928107905_1774379108143455026_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=VyTUkhVeg5YAX8uxrg4&oh=05c1ed363a3b13276e02a1e9abc45075&oe=5ECAC941", caption: "😕 최신 이미지를 못가져왔어요!"},
            {'img-src': "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/76794627_160192132011970_2407652251358697861_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=ZDR6dD5FyRwAX-lZUdW&oh=1facc8f250aa4e577c0eb8d03136f7d3&oe=5EA4E0E1", caption: "😕 최신 이미지를 못가져왔어요!"}
          ]
        })
      this.$http
        .get('https://wr6wm9szy5.execute-api.ap-northeast-2.amazonaws.com/api/youtube')
        .then(function (response) {
          vm.embeds = response.data.filter(k => k.privacy !== 'private')
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
