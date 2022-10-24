<template>
	<div class="help-wrapper">
		<div class="help-header">
			<div class="header-content">
				<h1>Babylon Help Center</h1>
				<div class="search-form">
					<AutoComplete id="acSimple" v-model="text" :suggestions="filteredText" @complete="filterText($event)" placeholder="Search from 29,994,421 help documents"></AutoComplete>
					<i class="pi pi-search"></i>
				</div>
			</div>
		</div>

		<div class="help-container">
			<div class="help-content-header">
				<div class="card help-content-header-tab tab-1" :class="{'selected-tab': activeTab == 'basic'}" @click="selectTab('basic')">
					<div class="tab-icon">
						<i class="pi pi-compass"></i>
					</div>
					<div class="tab-content">
						<h3>The Basics</h3>
						<span>4 articles in this collection</span>
					</div>
				</div>
				<div class="card help-content-header-tab tab-2" :class="{'selected-tab': activeTab == 'license'}" @click="selectTab('license')">
					<div class="tab-icon">
						<i class="pi pi-bookmark"></i>
					</div>
					<div class="tab-content">
						<h3>Questions About Licenses</h3>
						<span>3 articles in this collection</span>
					</div>
				</div>
				<div class="card help-content-header-tab tab-3" :class="{'selected-tab': activeTab == 'framework'}" @click="selectTab('framework')">
					<div class="tab-icon">
						<i class="pi pi-folder"></i>
					</div>
					<div class="tab-content">
						<h3>Questions About Frameworks</h3>
						<span>72 articles in this collection</span>
					</div>
				</div>
			</div>

			<div class="help-contents-wrapper">
				<div class="help-contents-row" :style="{transform: activeTab==='basic'? 'translate3d(0, 0, 0)' : activeTab==='license'? 'translate3d(-100%, 0, 0)' : 'translate3d(-200%, 0, 0)'}">
					<div class="card help-content">
						<div class="questions-header">
							<h1>The Basics</h1>
							<span>4 articles in this collection</span>
							<div class="profile-images">
								<img src="layout/images/extensions/avatar-1.png" alt="babylon-layout" />
								<img src="layout/images/extensions/avatar-2.png" alt="babylon-layout" />
								<img src="layout/images/extensions/avatar-3.png" alt="babylon-layout" />
							</div>
						</div>

						<div class="questions-content">
							<Accordion>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											Which do I need to develop a SaaS application?
										</div>
									</template>
									Nunc viverra nisl ac enim facilisis, sit amet elementum arcu sagittis. Maecenas nec nisi arcu. Donec tempus scelerisque neque, eu commodo velit auctor in. Cras in lorem porttitor ligula cursus gravida eu ut ex. Proin eu posuere dolor. Mauris condimentum, elit et viverra egestas, metus purus tempor lorem, eu ultricies tellus odio a nunc.
								</AccordionTab>
								<AccordionTab >
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											I’m a freelancer/agency. Can I use the item for an end product I’m doing for a client?
										</div>
									</template>
									Morbi commodo augue turpis, ut luctus justo elementum eget. In maximus enim a dignissim porta. Sed eget erat turpis. Phasellus elementum ex non magna convallis auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ullamcorper arcu nisi, ac consectetur dui consequat ac.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											We’re a reseller, are we able to purchase a license on behalf of our client?
										</div>
									</template>
									Donec aliquet, nulla vel dignissim sollicitudin, nibh magna dapibus mauris, vel egestas nisi quam id turpis. Duis consequat elementum consequat. Phasellus vulputate, elit sed commodo interdum, erat lorem molestie tortor, a commodo est lacus ut sapien. Mauris tristique magna eu diam pellentesque semper sed nec ante. Pellentesque id accumsan erat. Vivamus dictum tristique ex, quis sodales felis convallis id. Donec hendrerit auctor neque, semper posuere arcu.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											Is there a recurring fee or is it perpetual?
										</div>
									</template>
									Nulla facilisi. Nam bibendum venenatis quam id fermentum. Sed quis libero id lorem lacinia sollicitudin. Quisque commodo, urna ac facilisis maximus, mi augue dictum lacus, non aliquam turpis libero eget mauris. Praesent venenatis leo vitae sem vulputate, at elementum felis tempus.

									Nulla lobortis condimentum nisi vitae ultrices. Aenean ac mi et lectus varius efficitur.
								</AccordionTab>
							</Accordion>
						</div>
					</div>
					<div class="card help-content">
						<div class="questions-header">
							<h1>Questions About Licenses</h1>
							<span>4 articles in this collection</span>
							<div class="profile-images">
								<img src="layout/images/extensions/avatar-1.png" alt="babylon-layout" />
								<img src="layout/images/extensions/avatar-2.png" alt="babylon-layout" />
								<img src="layout/images/extensions/avatar-3.png" alt="babylon-layout" />
							</div>
						</div>

						<div class="questions-content">
							<Accordion>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											Which do I need to develop a SaaS application?
										</div>
									</template>
									Nunc viverra nisl ac enim facilisis, sit amet elementum arcu sagittis. Maecenas nec nisi arcu. Donec tempus scelerisque neque, eu commodo velit auctor in. Cras in lorem porttitor ligula cursus gravida eu ut ex. Proin eu posuere dolor. Mauris condimentum, elit et viverra egestas, metus purus tempor lorem, eu ultricies tellus odio a nunc.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											I’m a freelancer/agency. Can I use the item for an end product I’m doing or a client?
										</div>
									</template>
									Morbi commodo augue turpis, ut luctus justo elementum eget. In maximus enim a dignissim porta. Sed eget erat turpis. Phasellus elementum ex non magna convallis auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ullamcorper arcu nisi, ac consectetur dui consequat ac.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											We’re a reseller, are we able to purchase a license on behalf of our client?
										</div>
									</template>
									Donec aliquet, nulla vel dignissim sollicitudin, nibh magna dapibus mauris, vel egestas nisi quam id turpis. Duis consequat elementum consequat. Phasellus vulputate, elit sed commodo interdum, erat lorem molestie tortor, a commodo est lacus ut sapien. Mauris tristique magna eu diam pellentesque semper sed nec ante. Pellentesque id accumsan erat. Vivamus dictum tristique ex, quis sodales felis convallis id. Donec hendrerit auctor neque, semper posuere arcu.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											Is there a recurring fee or is it perpetual?
										</div>
									</template>
									Nulla facilisi. Nam bibendum venenatis quam id fermentum. Sed quis libero id lorem lacinia sollicitudin. Quisque commodo, urna ac facilisis maximus, mi augue dictum lacus, non aliquam turpis libero eget mauris. Praesent venenatis leo vitae sem vulputate, at elementum felis tempus.

									Nulla lobortis condimentum nisi vitae ultrices. Aenean ac mi et lectus varius efficitur.
								</AccordionTab>
							</Accordion>
						</div>
					</div>
					<div class="card help-content">
						<div class="questions-header">
							<h1>Questions About Frameworks</h1>
							<span>4 articles in this collection</span>
							<div class="profile-images">
								<img src="layout/images/extensions/avatar-1.png" alt="babylon-layout" />
								<img src="layout/images/extensions/avatar-2.png" alt="babylon-layout" />
								<img src="layout/images/extensions/avatar-3.png" alt="babylon-layout" />
							</div>
						</div>

						<div class="questions-content">
							<Accordion>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											Which do I need to develop a SaaS application?
										</div>
									</template>
									Nunc viverra nisl ac enim facilisis, sit amet elementum arcu sagittis. Maecenas nec nisi arcu. Donec tempus scelerisque neque, eu commodo velit auctor in. Cras in lorem porttitor ligula cursus gravida eu ut ex. Proin eu posuere dolor. Mauris condimentum, elit et viverra egestas, metus purus tempor lorem, eu ultricies tellus odio a nunc.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											I’m a freelancer/agency. Can I use the item for an end product I’m doing for a client?
										</div>
										</template>
									Morbi commodo augue turpis, ut luctus justo elementum eget. In maximus enim a dignissim porta. Sed eget erat turpis. Phasellus elementum ex non magna convallis auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ullamcorper arcu nisi, ac consectetur dui consequat ac.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											We’re a reseller, are we able to purchase a license on behalf of our client?
										</div>
									</template>
									Donec aliquet, nulla vel dignissim sollicitudin, nibh magna dapibus mauris, vel egestas nisi quam id turpis. Duis consequat elementum consequat. Phasellus vulputate, elit sed commodo interdum, erat lorem molestie tortor, a commodo est lacus ut sapien. Mauris tristique magna eu diam pellentesque semper sed nec ante. Pellentesque id accumsan erat. Vivamus dictum tristique ex, quis sodales felis convallis id. Donec hendrerit auctor neque, semper posuere arcu.
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<i class="pi pi-circle-on"></i>
										<div class="accordion-title">
											Is there a recurring fee or is it perpetual?
										</div>
									</template>
									Nulla facilisi. Nam bibendum venenatis quam id fermentum. Sed quis libero id lorem lacinia sollicitudin. Quisque commodo, urna ac facilisis maximus, mi augue dictum lacus, non aliquam turpis libero eget mauris. Praesent venenatis leo vitae sem vulputate, at elementum felis tempus.

									Nulla lobortis condimentum nisi vitae ultrices. Aenean ac mi et lectus varius efficitur.
								</AccordionTab>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: null,
				filteredText: [],
				activeTab: 'basic',
			}
		},
		methods: {
			filterText(event) {
				const query = event.query;
				let filteredText = []
				for (let i = 0; i < 10; i++) {
					filteredText.push(query + i);
				}
				this.filteredText = filteredText;
			},
			selectTab(tab) {
				this.activeTab = tab;
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep(.p-accordion) {
    .p-accordion-header a {
        background-color: transparent;
        padding: 24px 0px;
        margin: 0 40px;
        border: none;
        color: #292b2c;
        font-size: 14px;
        font-weight: 600;
        border-bottom: 1px solid rgba(41, 43, 44, 0.1);
        position: relative;
        display: flex;
        align-items: center;

        .accordion-title {
            display: inline-block;
            margin-left: 10px;
            padding: 0 15px ;
        }

        .p-accordion-toggle-icon {
            position: absolute;
            right: 0;
            left: auto;
            color: #292b2c;
            font-weight: 600;
        }

        &.p-state-active {
            background-color: transparent;
        }
    }

    .p-accordion-content {
        border: none;
        padding: 22px 28px;
        margin: 0 40px;
        line-height: 1.5;
    }
}
@media (max-width: 992px) {
	::v-deep(.p-accordion) {
        .p-accordion-header {
            padding: 24px 0px;
            margin: 0 10px;
        }
        .p-accordion-content {
            padding: 22px 28px;
            margin: 0 10px;
        }
    }
}
</style>
