<template>
  <div class="home row">
    <div class="col-lg-2"></div>
    <div class="col-lg-8">
      <div id="gallery">
        <!-- carousel part-->
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
          <b-carousel-slide v-for="image in images" :key="image['img-src']" :img-src="image['img-src']"></b-carousel-slide>
        </b-carousel>

        <p class="caption mt-4">
          {{ images[slide].caption }}
        </p>
      </div>

      <!-- youtube part-->
      <div id="youtube">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/Tx2cGzsPSlc" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

    </div>
    <div class="col-lg-2"></div>
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
  .caption {
    color: ivory;
  }
</style>
