<template>
	<ul v-if="items" role="menu">
        <template v-for="(item,i) of items">
            <li v-if="visible(item) && !item.separator" :key="item.label || i" :class="[item.badgeStyle, {'layout-root-menuitem': root, 'active-menuitem': activeIndex === i && !item.disabled}]"
                role="none">
                <div class='arrow' v-if="item.items && root===true"></div>
                <div v-if="root">
                    <span class="layout-menuitem-text">{{item.label}}</span>
                </div>
                <router-link v-if="item.to" :to="item.to" :style="item.style" :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" :target="item.target" exact
                    @click="onMenuItemClick($event,item,i)" @mouseenter="onMenuItemMouseEnter(i)" role="menuitem" v-ripple>
                    <i :class="['layout-menuitem-icon', item.icon]"></i>
                    <span class="layout-menuitem-text">{{item.label}}</span>
                    <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                    <span v-if="item.badge" class="menuitem-badge">{{item.badge}}</span>
                </router-link>
                <a v-if="!item.to" :href="item.url||'#'" :style="item.style" :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" :target="item.target"
					@click="onMenuItemClick($event,item,i)" @mouseenter="onMenuItemMouseEnter(i)" role="menuitem" v-ripple>
                    <i :class="['layout-menuitem-icon', item.icon]"></i>
                    <span class="layout-menuitem-text">{{item.label}}</span>
                    <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                    <span v-if="item.badge" class="menuitem-badge">{{item.badge}}</span>
                </a>
                <div class="layout-menu-tooltip" v-if="root">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{item.label}}</div>
                </div>
                <transition name="layout-submenu-container">
                    <appsubmenu v-show="item.items && (root && (!isSlim() || (isSlim() && (mobileMenuActive || activeIndex !== null))) ? true : activeIndex === i)"
						:items="visible(item) && item.items" :menuActive="menuActive" :layoutMode="layoutMode" @menuitem-click="$emit('menuitem-click', $event)"></appsubmenu>
                </transition>
            </li>
            <li class="p-menu-separator" :style="item.style" v-if="visible(item) && item.separator" :key="'separator' + i" role="separator"></li>
        </template>
	</ul>
</template>
<script>
import EventBus from './event-bus';

export default {
	name: 'appsubmenu',
	emits: ['root-menuitem-click', 'menuitem-click'],
	props: {
		items: Array,
		layoutMode: String,
		menuActive: Boolean,
		mobileMenuActive: Boolean,
		root: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			activeIndex : null
		}
	},
	mounted() {
		EventBus.on('reset-active-index', () => {
			if((this.layoutMode === 'horizontal' || this.layoutMode === 'slim')) {
				this.activeIndex = null;
			}
		});
	},
	methods: {
		onMenuItemClick(event, item, index) {
			if (item.disabled) {
				event.preventDefault();
				return;
			}

			//execute command
			if (item.command) {
                item.command({originalEvent: event, item: item});
                event.preventDefault();
			}

            if (item.items) {
                event.preventDefault();
            }

			if (this.root) {
				this.$emit('root-menuitem-click', {
					originalEvent: event
				});
			}

            if (item.items) {
                this.activeIndex = index === this.activeIndex ? null : index;
            }
			else {
				if(this.layoutMode !== 'static') {
					const ink = this.getInk(event.currentTarget);
					if (ink) {
						this.removeClass(ink, 'p-ink-active');
					}
				}
			}

			this.$emit('menuitem-click', {
				originalEvent: event,
				item: item
			});
		},
		getInk(el) {
			for (let i = 0; i < el.children.length; i++) {
				if (typeof el.children[i].className === 'string' && el.children[i].className.indexOf('p-ink') !== -1) {
					return el.children[i];
				}
			}
			return null;
		},
		removeClass(element, className) {
			if (element.classList)
				element.classList.remove(className);
			else
				element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		},
		isMobile() {
			return window.innerWidth <= 640;
		},
		isSlim() {
			return this.layoutMode === 'slim';
		},
		onMenuItemMouseEnter(index) {
			if(this.root && this.menuActive && (this.layoutMode === 'horizontal' || this.layoutMode === 'slim') && !this.isMobile()) {
				this.activeIndex =  index;
			}
        },
        visible(item) {
            return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
        }
	}
}
</script>

<style scoped>

</style>
