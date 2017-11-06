<template>
	<section class="app-main" style="min-height: 100%">
    <div>
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
      <svg-icon></svg-icon>
    </div>
	</section>
</template>

<script>
  import svgIcon from '@/components/common/svg'
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    components: {
      svgIcon
    }
  }
</script>

<style>
  @import "../../assets/styles/normal.scss";

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
