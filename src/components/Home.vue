<template>
  <div class="home">
    <!-- carousel part-->
    <section id="gallery">
      <div class="row">
        <div class="col-lg p-0"></div>
        <div class="col-lg-7 p-0">
          <b-carousel
            id="carousel-fade"
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

    <!-- youtube part-->
    <section id="youtube">
      <b-card-group columns>
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
            <b-card-title>Card Title</b-card-title>
            <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </b-card-text>
          </b-card-body>

          <b-card-body>
            <b-button variant="outline-danger">PDF</b-button>
            <b-button variant="outline-primary">Guitar Pro</b-button>
          </b-card-body>

          <b-card-footer>This is a footer</b-card-footer>

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
        embeds: [
          {id: '1fwRzD1INZw'},
          {id: 'Tx2cGzsPSlc'},
          {id: 'yW7K20UUx5c'}
        ],
        images: []
      }
    },
    created() {
      let vm = this
      this.$http
        .get('https://wr6wm9szy5.execute-api.ap-northeast-2.amazonaws.com/api/')
        .then(function (response) {
          vm.images = response.data
        })
        .catch(function () {
          vm.images = [
            {'img-src': "https://picsum.photos/1024/480/?image=52", caption: 'Hello World'},
            {'img-src': "https://picsum.photos/1024/480/?image=54"},
            {'img-src': "https://picsum.photos/1024/480/?image=58"},
            {'img-src': "https://picsum.photos/1024/480/?image=55"}
          ]
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

  #youtube {
    margin-top: 2rem
  }
</style>
