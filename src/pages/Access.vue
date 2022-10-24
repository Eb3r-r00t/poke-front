<template>
	<div class="exception-body access-denied">
		<div class="exception-panel"></div>

		<div class="exception-content">
			<img src="layout/images/logo-black.png" alt="babylon-layout"/>
			<h1><span class="exception-name">ACCESS</span> DENIED</h1>
			<p>You don't have the necessary permissions.</p>
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