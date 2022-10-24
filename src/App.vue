<template>
  <div :class="containerClass" @click="onDocumentClick">
    <AppTopBar :topbarMenuActive="topbarMenuActive" :activeTopbarItem="activeTopbarItem" :horizontal="isHorizontal()"
               :profileMode="profileMode"
               @menubutton-click="onMenuButtonClick" @topbar-menubutton-click="onTopbarMenuButtonClick"
               @topbar-item-click="onTopbarItemClick"></AppTopBar>

    <transition name="layout-menu-container">
      <div class="layout-menu-container" @click="onMenuClick" v-show="isMenuVisible()">
        <div class="layout-menu-logo" @click="$router.push({path: '/'})">
          <button class="p-link">
            <img id="layout-menu-logo" src="layout/images/logo-white.png" alt="babylon-layout"/>
          </button>
        </div>
        <div class="layout-menu-wrapper">
          <div class="menu-scroll-content">
            <AppInlineProfile v-if="displayInlineProfile" @profile-click="onProfileClick"
                              :expanded="profileExpanded"></AppInlineProfile>
            <AppMenu :model="menu" :layoutMode="layoutMode" :active="menuActive"
                     :mobileMenuActive="staticMenuMobileActive" @menuitem-click="onMenuItemClick"
                     @root-menuitem-click="onRootMenuItemClick"></AppMenu>
          </div>
        </div>
      </div>
    </transition>

    <div class="layout-main">
      <AppBreadcrumb></AppBreadcrumb>

      <div class="layout-content">
        <router-view/>
      </div>

      <AppFooter/>
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" :darkMenu="darkMenu"
               @menu-color-change="onMenuColorChange"
               :profileMode="profileMode" @profile-mode-change="onProfileModeChange" :configActive="configActive"
               @config-click="onConfigClick" @config-button-click="onConfigButtonClick"></AppConfig>

    <div v-if="staticMenuMobileActive" class="layout-mask"></div>
  </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppInlineProfile from './AppInlineProfile.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppFooter from './AppFooter.vue';
import EventBus from './event-bus';

export default {
  data() {
    return {
      layoutMode: 'static',
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      overlayMenuActive: false,
      topbarMenuActive: false,
      activeTopbarItem: null,
      menuActive: false,
      darkMenu: true,
      profileMode: 'popup',
      profileExpanded: false,
      configActive: false,
      configClick: false,
      menu: [
        {
          label: 'Home Page', icon: 'fa pi-fw pi-home',
          items: [
            {label: 'Dashboard', icon: 'fa fa-home', to: '/'}
          ]
        },
        // {
        // 	label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
        // 	items: [
        // 		{label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout'},
        // 		{label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input'},
        // 		{label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel"},
        // 		{label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "/invalidstate"},
        // 		{label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon'},
        // 		{label: 'Table', icon: 'pi pi-fw pi-table', to: '/table'},
        // 		{label: 'List', icon: 'pi pi-fw pi-list', to: '/list'},
        // 		{label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree'},
        // 		{label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel'},
        // 		{label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay'},
        // 		{label: "Media", icon: "pi pi-fw pi-image", to: "/media"},
        // 		{label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu'},
        // 		{label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages'},
        // 		{label: 'File', icon: 'pi pi-fw pi-file', to: '/file'},
        // 		{label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart'},
        // 		{label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc'},
        // 	]
        // },
        // {
        // 	label: "Utilities", icon:'pi pi-fw pi-globe',
        // 	items: [
        // 		{label: 'Display', icon:'pi pi-fw pi-desktop', to:'/display'},
        // 		{label: 'Elevation', icon:'pi pi-fw pi-external-link', to:'/elevation'},
        // 		{label: 'Flexbox', icon:'pi pi-fw pi-directions', to:'/flexbox'},
        // 		{label: 'Icons', icon:'pi pi-fw pi-prime', to:'/icons'},
        // 		{label: 'Widgets', icon:'pi pi-fw pi-star', to:'/widgets'},
        // 		{label: 'Grid System', icon:'pi pi-fw pi-th-large', to:'/grid'},
        // 		{label: 'Spacing', icon:'pi pi-fw pi-arrow-right', to:'/spacing'},
        // 		{label: 'Typography', icon:'pi pi-fw pi-align-center', to:'/typography'},
        // 		{label: 'Text', icon:'pi pi-fw pi-pencil', to:'/text'},
        // 	]
        // },
        // {
        // 	label: "UI Blocks", icon: "pi pi-building",
        // 	items: [
        // 		{label: "Free Blocks", icon: "pi pi-fw pi-eye", to: "/blocks", badge: "NEW"},
        // 		{label: "All Blocks", icon: "pi pi-fw pi-globe", url: "https://www.primefaces.org/primeblocks-vue"}
        // 	]
        // },
        {
          label: 'Products', icon: 'pi pi-fw pi-align-left',
          items: [
            {
              label: 'Inverters', icon: 'fa fa-bolt', to: '/inverters',
            },
            {
              label: 'Modules', icon: 'fa fa-solar-panel', to: '/modules',
            },
            {
              label: 'Structures', icon: 'fa fa-compass-drafting', to: '/structures',
            },
            {
              label: 'Transformers', icon: 'fa fa-charging-station', to: '/transformers',
            },
            {
              label: 'Others', icon: 'fa fa-angles-right',
              items: [
                {
                  label: 'String Box', icon: 'fa fa-shield-halved', to: '/string_box',
                },
                {
                  label: 'Connectors', icon: 'fa fa-plug', to: '/connectors',
                },
                {
                  label: 'Cables', icon: 'fa fa-grip-lines', to: '/cables',
                },
              ]
            }
          ]
        },
        {
          label: 'Configs', icon: 'pi pi-fw pi-clone',
          items: [
            {label: 'Users', icon: 'fa fa-user', to: '/users'},
            {label: 'Brands', icon: 'fa fa-bag-shopping', to: '/brands'},
            {label: 'Product Categories', icon: 'fa fa-sitemap', to: '/product_categories'},
            {label: 'Structure Types', icon: 'fa fa-layer-group', to: '/structure_types'},
            // {label: 'Rigs', icon: 'pi pi-fw pi-desktop', to: '/rigs'},
            // {label: 'Gpus', icon: 'pi pi-fw pi-server', to: '/gpus'},
            // {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar'},
            // {label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline'},
            // {label: 'Landing', icon: 'pi pi-fw pi-user-plus', url: 'pages/landing.html', target: '_blank'},
            // {label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
            // {label: 'Invoice', icon: 'pi pi-fw pi-dollar', to: '/invoice'},
            // {label: 'Help', icon: 'pi pi-fw pi-question-circle', to: '/help'},
            // {label: 'Wizard', icon: 'pi pi-fw pi-star-fill', to: '/wizard'},
            // {label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error'},
            // {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
            // {label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access'},
            // {label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'}
          ]
        },
        // {
        // 	label: 'Get Started', icon: 'pi pi-fw pi-download',
        // 	items: [
        // 		{
        // 			label: 'Documentation', icon: 'pi pi-fw pi-file',to: '/documentation'
        // 		},
        // 		{
        // 			label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
        // 		}
        // 	]
        // }
      ]
    }
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    }
  },
  methods: {
    onDocumentClick() {
      if (!this.topbarItemClick) {
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
      }

      if (!this.menuClick) {
        if (this.isHorizontal() || this.isSlim()) {
          this.menuActive = false;
        }

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
          this.hideOverlayMenu();
        }

        EventBus.emit('reset-active-index');
        this.unblockBodyScroll();
      }

      if (!this.profileClick && this.layoutMode !== 'static') {
        this.profileExpanded = false;
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      this.topbarItemClick = false;
      this.menuClick = false;
      this.profileClick = false;
      this.configClick = false;
    },
    onMenuButtonClick(event) {
      this.menuClick = true;
      this.topbarMenuActive = false;

      if (this.layoutMode === 'overlay') {
        this.overlayMenuActive = !this.overlayMenuActive;
      }

      if (this.isDesktop())
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
        if (this.staticMenuMobileActive) {
          this.blockBodyScroll();
        } else {
          this.unblockBodyScroll();
        }
      }

      event.preventDefault();
    },
    onTopbarMenuButtonClick(event) {
      this.topbarItemClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;
      this.hideOverlayMenu();
      event.preventDefault();
    },
    onTopbarItemClick(event) {
      this.topbarItemClick = true;

      if (this.activeTopbarItem === event.item)
        this.activeTopbarItem = null;
      else
        this.activeTopbarItem = event.item;

      event.originalEvent.preventDefault();
    },
    onMenuClick() {
      this.menuClick = true;
    },
    isMenuVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static')
          return !this.staticMenuDesktopInactive;
        else if (this.layoutMode === 'overlay')
          return this.overlayMenuActive;
        else
          return true;
      } else {
        return true;
      }
    },
    onProfileClick(event) {
      this.profileClick = true;
      this.profileExpanded = !this.profileExpanded;
      if (this.isHorizontal() || this.isSlim()) {
        EventBus.emit('reset-active-index');
      }

      event.preventDefault();
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
      this.staticMenuDesktopInactive = false;
      this.overlayMenuActive = false;

      if (this.isHorizontal()) {
        this.profileMode = 'popup'
      }
    },
    onMenuColorChange(menuColor) {
      this.darkMenu = menuColor;
    },
    onProfileModeChange(profileMode) {
      this.profileMode = profileMode;
    },
    isHorizontal() {
      return this.layoutMode === 'horizontal';
    },
    isSlim() {
      return this.layoutMode === 'slim';
    },
    hideOverlayMenu() {
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isMobile() {
      return window.innerWidth <= 640;
    },
    onMenuItemClick(event) {
      if (!event.item.items) {
        EventBus.emit('reset-active-index');
        this.hideOverlayMenu();
      }
      if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
        this.menuActive = false;
      }
    },
    onRootMenuItemClick() {
      this.menuActive = !this.menuActive;
    },
    onConfigClick() {
      this.configClick = true;
    },
    onConfigButtonClick() {
      this.configActive = !this.configActive;
      this.configClick = true;
    },
    addClass(element, className) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += ' ' + className;
    },
    removeClass(element, className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    blockBodyScroll() {
      this.addClass(document.body, 'blocked-scroll');
    },
    unblockBodyScroll() {
      this.removeClass(document.body, 'blocked-scroll');
    },
  },
  computed: {
    containerClass() {
      return ['layout-wrapper', {
        'layout-horizontal': this.layoutMode === 'horizontal',
        'layout-overlay': this.layoutMode === 'overlay',
        'layout-static': this.layoutMode === 'static',
        'layout-slim': this.layoutMode === 'slim',
        'layout-static-inactive': this.staticMenuDesktopInactive,
        'layout-mobile-active': this.staticMenuMobileActive,
        'layout-overlay-active': this.overlayMenuActive,
        'layout-menu-dark': this.darkMenu,
        'layout-menu-light': !this.darkMenu,
        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': this.$primevue.config.ripple === false
      }];
    },
    displayInlineProfile() {
      return this.profileMode === 'inline' && this.layoutMode !== 'horizontal'
    }
  },
  components: {
    'AppTopBar': AppTopBar,
    'AppConfig': AppConfig,
    'AppInlineProfile': AppInlineProfile,
    'AppMenu': AppMenu,
    'AppBreadcrumb': AppBreadcrumb,
    'AppFooter': AppFooter
  }
}
</script>

<style lang="scss">
@import 'App.scss';
</style>
