<template>
	<div class="route-bar">
		<div class="route-bar-breadcrumb">
			<ul>
				<li><button class="p-link" @click="home"><i class="pi pi-home"></i></button></li>
				<template v-if="$route.meta.breadcrumb">
					<li v-if="$route.meta.breadcrumb[0].parent">/</li>
					<li v-if="$route.meta.breadcrumb[0].parent">{{$route.meta.breadcrumb[0].parent}}</li>
					<li>/</li>
					<li>{{$route.meta.breadcrumb[0].label}}</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			home() {
				window.location = "/#/"
			}
		}
	}
</script>

<style scoped>

</style>