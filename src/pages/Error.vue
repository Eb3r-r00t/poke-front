<template>
	<div class="exception-body  error">
		<div class="exception-panel"></div>

		<div class="exception-content">
			<img src="layout/images/logo-black.png" alt="babylon-layout"/>
			<h1><span class="exception-name">ERROR</span> OCCURRED</h1>
			<p>Something went wrong.</p>
			<a @click="goDashboard" style="cursor: pointer;">Back to Dashboard</a>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goDashboard(){
				this.$router.push({ path: '/' });
			}
		}
	}
</script>

<style scoped>

</style>