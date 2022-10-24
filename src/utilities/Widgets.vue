<template>
	<div class="grid">
		<h4>Reusable CSS widgets for your applications.</h4>
		<div class="col-12">
			<div class="card">
				<h4>Overview Boxes</h4>
				<div class="grid">
					<div class="col-12 lg:col-6 xl:col-3">
						<div class="widget-overview-box sales">
							<i class="overview-icon pi pi-dollar"></i>
							<span class="overview-title">Sales</span>
							<i class="overview-arrow pi pi-chevron-circle-up"></i>
							<div class="overview-numbers">
								$ 92,440
							</div>
							<div class="overview-subinfo">
								21% more than yesterday
							</div>
						</div>
					</div>
					<div class="col-12 lg:col-6 xl:col-3">
						<div class="widget-overview-box views">
							<i class="overview-icon pi pi-search"></i>
							<span class="overview-title">Views</span>
							<i class="overview-arrow pi pi-chevron-circle-up"></i>
							<div class="overview-numbers">
								7029
							</div>
							<div class="overview-subinfo">
								2% more than yesterday
							</div>
						</div>
					</div>
					<div class="col-12 lg:col-6 xl:col-3">
						<div class="widget-overview-box users">
							<i class="overview-icon pi pi-users"></i>
							<span class="overview-title">Users</span>
							<i class="overview-arrow pi pi-chevron-circle-up"></i>
							<div class="overview-numbers">
								9522
							</div>
							<div class="overview-subinfo">
								7% more than yesterday
							</div>
						</div>
					</div>
					<div class="col-12 lg:col-6 xl:col-3">
						<div class="widget-overview-box checkin">
							<i class="overview-icon pi pi-map-marker"></i>
							<span class="overview-title">Check-Ins</span>
							<i class="overview-arrow pi pi-chevron-circle-up"></i>
							<div class="overview-numbers">
								4211
							</div>
							<div class="overview-subinfo">
								18% more than yesterday
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 xl:col-5">
			<div class="grid">
				<div class="col-12">
					<div class="card widget-timeline">
						<h5>Timeline</h5>
						<ul>
							<li>
								<div class="activity-link"></div>
								<div class="timeline-icon">
									<i class="pi pi-globe"></i>
								</div>
								<div class="timeline-content">
									<h3>Notes Added</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit tortor a ipsum vehicula, in semper sapien auctor.</p>
									<div class="timeline-footer">
										<i class="pi pi-clock"></i>
										<span>3 Sep 2018 at 10:41</span>
									</div>
								</div>
							</li>
							<li>
								<div class="activity-link"></div>
								<div class="timeline-icon">
									<i class="pi pi-calendar"></i>
								</div>
								<div class="timeline-content">
									<h3>Reminder Scheduled</h3>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
										totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
									<div class="timeline-footer">
										<i class="pi pi-clock"></i>
										<span>4 Sep 2018 at 11:30</span>
									</div>
								</div>
							</li>
							<li>
								<div class="activity-link"></div>
								<div class="timeline-icon">
									<i class="pi pi-image"></i>
								</div>
								<div class="timeline-content">
									<div class="child">
										<div>
											<span>3 Photos Added to</span>
											<span class="colorful">Album-23</span>
										</div>
										<img src="layout/images/dashboard/image-1.png" alt="babylon-layout" />
										<img src="layout/images/dashboard/image-2.png" alt="babylon-layout" />
										<img src="layout/images/dashboard/image-3.png" alt="babylon-layout" />
										<div class="timeline-footer">
											<i class="pi pi-clock"></i>
											<span>9 Sep 2018 at 00:44</span>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div class="activity-link"></div>
								<div class="timeline-icon">
									<i class="pi pi-image"></i>
								</div>
								<div class="timeline-content">
									<div class="child">
										<h3>Location Update</h3>
										<img src="layout/images/dashboard/antalya.png" alt="babylon-layout" style="width:100%"/>
										<div class="timeline-footer">
											<i class="pi pi-clock"></i>
											<span>16 Sep 2018 at 20:02</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 xl:col-7">
			<div class="grid">
				<div class="col-12 xl:col-6">
					<div class="card widget-tasks">
						<h5>Tasks</h5>
						<ul>
							<li>
								<Checkbox name="task" value="reports" v-model="tasksCheckbox"/>
								<span>Sales Reports</span>
								<span class="task-badge red"></span>
							</li>
							<li>
								<Checkbox name="task" value="pay" v-model="tasksCheckbox"/>
								<span>Pay Invoices</span>
								<span class="task-badge orange"></span>
							</li>
							<li>
								<Checkbox name="task" value="dinner" v-model="tasksCheckbox"/>
								<span>Kate's Birthday</span>
								<span class="task-badge orange"></span>
							</li>
							<li>
								<Checkbox name="task" value="meeting" v-model="tasksCheckbox"/>
								<span>Client Meeting</span>
								<span class="task-badge green"></span>
							</li>
							<li>
								<Checkbox name="task" value="theme" v-model="tasksCheckbox"/>
								<span>New Themes</span>
								<span class="task-badge green"></span>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-12 xl:col-6">
					<div class="card widget-team">
						<h5>Team</h5>
						<ul>
							<li>
								<img src="layout/images/avatar.png" alt="babylon-layout"/>
								<div class="team-box">
									<span class="team-member">Arlene Welch</span>
									<span class="team-member-role">Design</span>
								</div>
								<a href="#">
									<i class="pi pi-comment"></i>
								</a>
								<a href="#">
									<i class="pi pi-share-alt"></i>
								</a>
							</li>
							<li>
								<img src="layout/images/avatar-john.png" alt="babylon-layout"/>
								<div class="team-box">
									<span class="team-member">John Swisher</span>
									<span class="team-member-role">Development</span>
								</div>
								<a href="#">
									<i class="pi pi-comment"></i>
								</a>
								<a href="#">
									<i class="pi pi-share-alt"></i>
								</a>
							</li>
							<li>
								<img src="layout/images/avatar-julia.png" alt="babylon-layout"/>
								<div class="team-box">
									<span class="team-member">Warren Shaw</span>
									<span class="team-member-role">Sales</span>
								</div>
								<a href="#">
									<i class="pi pi-comment"></i>
								</a>
								<a href="#">
									<i class="pi pi-share-alt"></i>
								</a>
							</li>
							<li>
								<img src="layout/images/avatar-kevin.png" alt="babylon-layout"/>
								<div class="team-box">
									<span class="team-member">Kevin Lane</span>
									<span class="team-member-role">Marketing</span>
								</div>
								<a href="#">
									<i class="pi pi-comment"></i>
								</a>
								<a href="#">
									<i class="pi pi-share-alt"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-12">
					<div class="card widget-live-support">
						<h5>Live Support</h5>
						<ul>
							<li>
								<div class="grid">
									<div class="col-fixed">
										<img src="layout/images/avatar-john.png" alt="babylon-layout"/>
									</div>
									<div class="col">
										<div class="chat-message">Lorem ipsum dolor sit amet, consectetur adipiscing
											elit.
											Nam ac euismod justo, eget blandit purus.
										</div>
									</div>
								</div>
							</li>
							<li>
								<div class="grid">
									<div class="col">
										<div class="chat-message">Mauris malesuada quis risus ut consequat.
											Maecenas ornare nunc risus, pulvinar euismod mi pellentesque eget.
										</div>
									</div>
									<div class="col-fixed">
										<img src="layout/images/avatar-julia.png" alt="babylon-layout"/>
									</div>
								</div>
							</li>
							<li>
								<div class="grid">
									<div class="col-fixed">
										<img src="layout/images/avatar-john.png" alt="babylon-layout"/>
									</div>
									<div class="col">
										<div class="chat-message">Lorem ipsum dolor sit amet, consectetur adipiscing
											elit.
											Nam ac euismod justo, eget blandit purus.
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div class="new-message">
						<div class="grid grid-nogutter">
							<div class="col">
								<InputText type="text" placeholder="Write a message.."/>
							</div>
							<div class="col-fixed">
								<Button label="Send"></Button>
							</div>
						</div>
					</div>
					</div>
				</div>
				<div class="col-12">
					<div class="card widget-user-card">
						<div class="user-card-header">
							<img src="layout/images/dashboard/bg-header.png" alt="babylon-layout" class="profile-image"/>
						</div>
						<div class="user-card-content">
							<img src="layout/images/avatar.png" alt="babylon-layout"/>
							<Button icon="pi pi-bars" @click="toggle"/>
							<Menu :model="menuItems" :popup="true" ref="menu" appendTo="body"/>

							<div class="user-card-name">
								<span>Arlene Welch</span>
							</div>

							<div class="user-detail">
								<ul>
									<li class="clearfix">
										<i class="pi pi-list"></i>
										<span class="project-title">Tasks</span>
										<span class="project-detail">3 open</span>
										<div class="project-progressbar">
											<div class="project-progressbar-value" style="width: 50%"></div>
										</div>
									</li>
									<li class="clearfix">
										<i class="pi pi-dollar"></i>
										<span class="project-title">Revenue</span>
										<span class="project-detail">+20%</span>
										<div class="project-progressbar">
											<div class="project-progressbar-value" style="width: 20%"></div>
										</div>
									</li>
									<li class="clearfix">
										<i class="pi pi-money-bill"></i>
										<span class="project-title">Payments</span>
										<span class="project-detail">24 new</span>
										<div class="project-progressbar">
											<div class="project-progressbar-value" style="width: 65%"></div>
										</div>
									</li>
									<li class="clearfix">
										<i class="pi pi-users"></i>
										<span class="project-title">Clients</span>
										<span class="project-detail">+80%</span>
										<div class="project-progressbar">
											<div class="project-progressbar-value" style="width: 80%"></div>
										</div>
									</li>
									<li class="clearfix">
										<i class="pi pi-money-bill"></i>
										<span class="project-title">Sales</span>
										<span class="project-detail">+45</span>
										<div class="project-progressbar">
											<div class="project-progressbar-value" style="width: 45%"></div>
										</div>
									</li>
									<li class="clearfix">
										<i class="pi pi-chart-bar"></i>
										<span class="project-title">Performance</span>
										<span class="project-detail">+75</span>
										<div class="project-progressbar">
											<div class="project-progressbar-value" style="width: 75%"></div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 lg:col-4">
			<div class="card p-fluid widget-resolution-center">
				<h5>Support Request</h5>

				<label for="resolution-firstname">Fistname</label>
				<InputText id="resolution-firstname" type="text" placeholder="Name" />

				<label for="resolution-lastname">Lastname</label>
				<InputText id="resolution-lastname" type="text" placeholder="Name" />

				<label for="resolution-message">Message</label>
				<Textarea id="resolution-message" placeholder="Message"></Textarea>

				<div class="resolution-button-bar">
					<Button label="Save Draft" class="p-button-secondary" icon="pi pi-plus"></Button>
					<Button label="Send" icon="pi pi-check"></Button>
				</div>
			</div>
		</div>

		<div class="col-12 lg:col-4">
			<div class="card">
				<h4>Image List</h4>

				<ul class="widget-image-list">
					<li>
						<span>Product</span>
						<span>Sales</span>
					</li>
					<li>
						<span>
							<img src="demo/images/product/bamboo-watch.jpg" alt="babylon-layout" />
							<span>Bamboo Watch</span>
						</span>
						<span class="listitem-value">82</span>
					</li>
					<li>
						<span>
							<img src="demo/images/product/blue-band.jpg" alt="babylon-layout" />
							<span>Blue Band</span>
						</span>
						<span class="listitem-value">75</span>
					</li>
					<li>
						<span>
							<img src="demo/images/product/game-controller.jpg" alt="babylon-layout" />
							<span>Game Controller</span>
						</span>
						<span class="listitem-value">64</span>
					</li>
					<li>
						<span>
							<img src="demo/images/product/lime-band.jpg" alt="babylon-layout" />
							<span>Lime Band</span>
						</span>
						<span class="listitem-value">62</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="col-12 lg:col-4">
			<div class="card widget-pricing-box">
				<h3>Professional</h3>
				<span class="pricing-intro">Starting From</span>
				<h3>10$ per month</h3>

				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ex condimentum, bibendum ligula a, ultrices magna.</p>
				<ul>
					<li> Responsive</li>
					<li> Push Messages</li>
					<li> 10 Support Tickets</li>
					<li> Free Shipping</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Widgets",
		data() {
			return {
				tasksCheckbox: null,
				menuItems: [
					{
						label: 'Save',
						icon: 'pi pi-check'
					},
					{
						label: 'Update',
						icon: 'pi pi-refresh'
					},
					{
						label: 'Delete',
						icon: 'pi pi-trash'
					}
				]
			}
		},
		methods: {
			toggle(event) {
				this.$refs.menu.toggle(event);
			},
		}
	}
</script>

<style scoped>

</style>
