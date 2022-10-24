<template>
	<div :class="['layout-profile', {'layout-profile-active': expanded}]">
		<button class="layout-profile-button p-link" @click="onClick">
			<img src="layout/images/avatar.png" alt="babylon-layout"/>
			<div class="layout-profile-userinfo">
				<span class="layout-profile-name">Arlene Welch</span>
				<span class="layout-profile-role">Design Ops</span>
			</div>
			<i class="layout-profile-icon pi pi-angle-down"></i>
		</button>

		<transition name="layout-profile-menu">
			<ul class="layout-profile-menu" v-show="expanded">
				<li role="menuitem">
					<button class="p-link" :tabIndex="expanded ? null : '-1'">
						<i class="pi pi-user"></i>
						<span>Profile</span>
					</button>
				</li>
				<li role="menuitem">
					<button class="p-link" :tabIndex="expanded ? null : '-1'">
						<i class="pi pi-cog"></i>
						<span>Settings</span>
					</button>
				</li>
				<li role="menuitem">
					<button class="p-link" :tabIndex="expanded ? null : '-1'">
						<i class="pi pi-envelope"></i>
						<span>Messages</span>
					</button>
				</li>
				<li role="menuitem">
					<button class="p-link" :tabIndex="expanded ? null : '-1'">
						<i class="pi pi-bell"></i>
						<span>Notifications</span>
					</button>
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
	export default {
		emits: ['profile-click'],
		props: {
			expanded: {
				type: Boolean,
				default: null
			}
		},
		methods: {
			onClick(event) {
				this.$emit('profile-click', event);
				event.preventDefault();
			}
		},
		name: "AppInlineProfile"
	}
</script>

<style scoped>

</style>
