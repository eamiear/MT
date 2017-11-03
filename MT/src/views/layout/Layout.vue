<template>
	<section class="wrapper">
		<section class="main-content content-wrapper">
			<app-main></app-main>
		</section>
	</section>
</template>

<script>
import { AppMain } from '@/views/layout'
export default {
  name: 'layout',
  components: {
    AppMain
  }
}
</script>
