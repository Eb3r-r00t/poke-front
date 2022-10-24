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
        {
          label: 'Manage', icon: 'pi pi-fw pi-clone',
          items: [
            {label: 'Pokemons', icon: 'fa fa-fire', to: '/pokemons'}
          ]
        },
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
