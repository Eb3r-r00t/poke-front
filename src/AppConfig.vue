<template>
    <div id="layout-config">
        <a id="layout-config-button" class="layout-config-button" @click="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" :class="{ 'layout-config-active': configActive }" @click="onConfigClick">
            <h5>Menu Mode</h5>
            <div class="field-radiobutton">
                <RadioButton id="static" name="layoutMode" value="static" v-model="d_layoutMode" @change="changeLayout($event, 'static')" />
                <label for="static">Static</label>
            </div>
            <div class="field-radiobutton">
                <RadioButton id="overlay" name="layoutMode" value="overlay" v-model="d_layoutMode" @change="changeLayout($event, 'overlay')" />
                <label for="overlay">Overlay</label>
            </div>
            <div class="field-radiobutton">
                <RadioButton id="horizontal" name="layoutMode" value="horizontal" v-model="d_layoutMode" @change="changeLayout($event, 'horizontal')" />
                <label for="horizontal">Horizontal</label>
            </div>
            <div class="field-radiobutton">
                <RadioButton id="slim" name="layoutMode" value="slim" v-model="d_layoutMode" @change="changeLayout($event, 'slim')" />
                <label for="slim">Slim</label>
            </div>

            <h5>Menu Colors</h5>
            <div class="field-radiobutton">
                <RadioButton id="dark" name="lightMenu" :value="true" v-model="d_darkMenu" @change="changeMenuColor($event, true)"/>
                <label for="dark">Dark</label>
            </div>
            <div class="field-radiobutton">
                <RadioButton id="light" name="lightMenu" :value="false" v-model="d_darkMenu" @change="changeMenuColor($event, false)"/>
                <label for="light">Light</label>
            </div>

            <h5>User Profile</h5>
            <div class="field-radiobutton">
                <RadioButton id="inline" name="profileMode" value="inline" v-model="d_profileMode" :disabled="isHorizontal()" @change="changeProfileMode($event, 'inline')"/>
                <label for="dark">Inline</label>
            </div>
            <div class="field-radiobutton">
                <RadioButton id="popup" name="profileMode" value="popup" v-model="d_profileMode" :disabled="isHorizontal()" @change="changeProfileMode($event, 'popup')"/>
                <label for="dark">Popup</label>
            </div>

            <h5 style="margin-top: 0">Input Style</h5>
			<div class="field-radiobutton">
				<RadioButton id="input_outlined" name="inputstyle" value="outlined" :modelValue="value" @update:modelValue="onChange"/>
				<label for="input_outlined">Outlined</label>
			</div>
			<div class="field-radiobutton">
				<RadioButton id="input_filled" name="inputstyle" value="filled" :modelValue="value" @update:modelValue="onChange"/>
				<label for="input_filled">Filled</label>
			</div>

			<h5 style="margin-top: .5em">Ripple Effect</h5>
			<InputSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange"/>

            <h5>Themes</h5>
            <div class="layout-themes">
                <div  v-for="t of themes" :key="t.name">
                    <a @click="changeComponentTheme($event, t.file)" :class="['layout-config-option', {'selected': (theme === t.file)}]" :style="{backgroundColor:t.color}">
                        <i class="pi pi-check" v-if="theme === t.file"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['layout-change', 'menu-color-change', 'menu-type-change', 'profile-mode-change', 'config-button-click', 'config-click'],
    props: {
        layoutMode: {
            type: String,
            default: null
        },
        darkMenu: {
            type: Boolean,
            default: null
        },
        profileMode: {
            type: String,
            default: null
        },
        configActive: {
            type: Boolean,
            default: null,
        },
        configClick: {
            type: Boolean,
            default: null,
        }
    },
    data() {
        return {
            active: false,
            theme: 'blue',
            themes: [
                {name: 'Amber Accent', file: 'amber', color:'#FFC107'},
                {name: 'Blue Accent', file: 'blue', color:'#2196F3'},
                {name: 'Blue Gray Accent', file: 'bluegray', color:'#607D8B'},
                {name: 'Brown Accent', file: 'brown', color:'#795548'},
                {name: 'Cyan Accent', file: 'cyan', color:'#00BCD4'},
                {name: 'Deep Orange Accent', file: 'deeporange', color:'#FF5722'},
                {name: 'Deep Purple Accent', file: 'deeppurple', color:'#673AB7'},
                {name: 'Green Accent', file: 'green', color:'#4CAF50'},
                {name: 'Indigo Accent', file: 'indigo', color:'#3F51B5'},
                {name: 'Light Blue Accent', file: 'lightblue', color:'#03A9F4'},
                {name: 'Light Green Accent', file: 'lightgreen', color:'#8BC34A'},
                {name: 'Lime Accent', file: 'lime', color:'#CDDC39'},
                {name: 'Orange Accent', file: 'orange', color:'#FF9800'},
                {name: 'Pink Accent', file: 'pink', color:'#E91E63'},
                {name: 'Purple Accent', file: 'purple', color:'#9C27B0'},
                {name: 'Teal Accent', file: 'teal', color:'#00796B'},
                {name: 'Yellow Accent', file: 'yellow', color:'#FFEB3B'},
            ],
            d_layoutMode: this.layoutMode,
            d_darkMenu: this.darkMenu,
            d_profileMode: this.profileMode
        }
    },
    watch: {
        $route() {
            if (this.active) {
                this.active = false;
                this.unbindOutsideClickListener();
            }
        },
        layoutMode(newValue) {
            this.d_layoutMode = newValue;
        },
        darkMenu(newValue) {
            this.d_darkMenu = newValue;
        },
        profileMode(newValue) {
            this.d_profileMode = newValue;
        }
    },
    outsideClickListener: null,
    methods: {
        onChange(value) {
            this.$primevue.config.inputStyle = value;
        },
        onRippleChange(value) {
            this.$primevue.config.ripple = value;
        },
        changeLayout(event, layoutMode) {
            this.$emit('layout-change', layoutMode);
            event.preventDefault();
        },
        changeMenuColor(event, menuColor) {
            this.$emit('menu-color-change', menuColor);
            event.preventDefault();
        },
        changeProfileMode(event, profileMode) {
            this.$emit('profile-mode-change', profileMode);
            event.preventDefault();
        },
        changeComponentTheme(event, theme) {
            this.changeStyleSheetUrl('theme-css', theme, 'theme-');
            this.changeStyleSheetUrl('layout-css', theme, 'layout-');
            this.theme = theme;
            event.preventDefault();
        },
        changeStyleSheetUrl(id, value, prefix) {
            let element = document.getElementById(id);
            let urlTokens = element.getAttribute('href').split('/');
            urlTokens[urlTokens.length - 1] = prefix + value + '.css' ;
            let newURL = urlTokens.join('/');
            this.replaceLink(element, newURL);

            let topbarLogo = document.getElementById('layout-topbar-logo');
            let menuLogo = document.getElementById('layout-menu-logo');

            if (value.localeCompare('yellow') === 0 || value.localeCompare('lime') === 0) {
                topbarLogo.src = 'layout/images/logo-black.png';
                menuLogo.src = 'layout/images/logo-black.png';

            } else {
                topbarLogo.src = 'layout/images/logo-white.png';
                menuLogo.src = 'layout/images/logo-white.png';
            }
        },
        replaceLink(linkElement, href) {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.active && this.isOutsideClicked(event)) {
                        this.active = false;
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        isOutsideClicked(event) {
            return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target));
        },
        onConfigButtonClick(event) {
            this.$emit("config-button-click", event);
            event.preventDefault();
        },
        onConfigClick(event) {
            this.$emit("config-click", event);
        },
        isHorizontal() {
			return this.layoutMode === 'horizontal';
		},
    },
    computed: {
        containerClass() {
            return ['layout-config', {'layout-config-active': this.active}];
        },
        rippleActive() {
            return this.$primevue.config.ripple;
        },
        value() {
            return this.$primevue.config.inputStyle;
        }
    }
}
</script>
