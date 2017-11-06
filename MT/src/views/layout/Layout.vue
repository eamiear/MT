<template>
	<section class="wrapper">
    <header-top signin-up='home'>
      <span slot='logo' class="head_logo"  @click="reload">Utopa</span>
    </header-top>
		<section class="main-content content-wrapper">
			<app-main></app-main>
		</section>
    <footer-shelf></footer-shelf>
	</section>
</template>

<script>
import { HeaderTop, AppMain, FooterShelf } from '@/views/layout'
export default {
  name: 'layout',
  components: {
    HeaderTop,
    AppMain,
    FooterShelf
  },
  methods: {
    reload () {
      window.location.reload()
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/styles/mixin';
  .head_logo{
    left: 0.4rem;
    font-weight: 400;
    @include sc(0.7rem, #fff);
    @include wh(2.3rem, 0.7rem);
    @include ct;
  }
  .main-content {
    padding-top: 2.35rem;
    border-top: 1px solid $bc;
    background-color: #fff;
    margin-bottom: 0.4rem;
  }
</style>
