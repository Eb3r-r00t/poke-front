<template>
	<AppSubmenu class="layout-menu" :items="model" :layoutMode="layoutMode" :menuActive="active" :mobileMenuActive="mobileMenuActive" :root="true"/>
</template>

<script>
import AppSubmenu from './AppSubmenu';

export default {
	props: {
		model: Array,
		layoutMode: String,
		active: Boolean,
		mobileMenuActive: Boolean
	},
	components: {
		'AppSubmenu': AppSubmenu
	}
}
</script>

<style scoped>

</style>