<template>
	<div class="layout-dashboard">
		<div class="grid">
			<div class="col-12 lg:col-6 xl:col-3">
				<div class="overview-box sales">
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
				<div class="overview-box views">
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
				<div class="overview-box users">
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
				<div class="overview-box checkin">
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

			<div class="col-12 lg:col-8">
				<div class="card card-w-title statistics">
					<h5>Statistics</h5>
					<Chart type="line" :data="chartData" :options="chartOptions"/>
				</div>
			</div>

			<div class="col-12 lg:col-4">
				<div class="user-card card">
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

			<div class="col-12 md:col-6 lg:col-4 task-list">
				<div class="card card-w-title tasks">
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

			<div class="col-12 md:col-12 lg:col-4">
				<div class="card card-w-title resolution-center p-fluid">
					<h5>Support Request</h5>
					<label htmlFor="resolution-username">Username</label>
					<InputText id="resolution-username" type="text" placeholder="Username"/>

					<label htmlFor="resolution-message">Message</label>
					<Textarea id="resolution-message" placeholder="Message"></Textarea>

					<div class="resolution-button-bar">
						<Button type="button" label="Save Draft" class="p-button-secondary" icon="pi pi-plus"/>
						<Button type="button" label="Send" icon="pi pi-check"/>
					</div>
				</div>
			</div>

			<div class="col-12 md:col-12 lg:col-4">
				<div class="card card-w-title team">
					<h5>Team</h5>
					<ul>
						<li>
							<img src="layout/images/avatar.png" alt="babylon-layout"/>
							<div class="team-box">
								<span class="team-member">Arlene Welch</span>
								<span class="team-member-role">Design</span>
							</div>
							<a href="/">
								<i class="pi pi-comment"></i>
							</a>
							<a href="/">
								<i class="pi pi-share-alt"></i>
							</a>
						</li>
						<li>
							<img src="layout/images/avatar-john.png" alt="babylon-layout"/>
							<div class="team-box">
								<span class="team-member">John Swisher</span>
								<span class="team-member-role">Development</span>
							</div>
							<a href="/">
								<i class="pi pi-comment"></i>
							</a>
							<a href="/">
								<i class="pi pi-share-alt"></i>
							</a>
						</li>
						<li>
							<img src="layout/images/avatar-julia.png" alt="babylon-layout"/>
							<div class="team-box">
								<span class="team-member">Warren Shaw</span>
								<span class="team-member-role">Sales</span>
							</div>
							<a href="/">
								<i class="pi pi-comment"></i>
							</a>
							<a href="/">
								<i class="pi pi-share-alt"></i>
							</a>
						</li>
						<li>
							<img src="layout/images/avatar-kevin.png" alt="babylon-layout"/>
							<div class="team-box">
								<span class="team-member">Kevin Lane</span>
								<span class="team-member-role">Marketing</span>
							</div>
							<a href="/">
								<i class="pi pi-comment"></i>
							</a>
							<a href="/">
								<i class="pi pi-share-alt"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="col-12 xl:col-6">
				<div class="card card-w-title timeline">
					<h5>Timeline</h5>
					<ul>
						<li>
							<div class="activity-link"></div>
							<div class="timeline-icon">
								<i class="pi pi-globe"></i>
							</div>
							<div class="timeline-content">
								<h3>Notes Added</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit tortor a
									ipsum vehicula,
									in semper sapien auctor.</p>
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
								<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
									doloremque laudantium,
									totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
									architecto beatae vitae dicta sunt explicabo.</p>
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
									<img src="layout/images/dashboard/image-1.png" alt="babylon-layout"/>
									<img src="layout/images/dashboard/image-2.png" alt="babylon-layout"/>
									<img src="layout/images/dashboard/image-3.png" alt="babylon-layout"/>
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

			<div class="col-12 xl:col-6">
				<div class="card card-w-title global-sales p-fluid">
					<h5>Global Sales</h5>
<!--					<DataTable :value="products" responsiveLayout="scroll" v-model:selection="selectedProduct" selectionMode="single" dataKey="id" :rows="5" style="margin-bottom: 20px" :paginator="true">-->
<!--						<Column field="name" header="Name" :sortable="true">-->
<!--							<template #body="slotProps">-->
<!--								<span class="p-column-title">Name</span>-->
<!--								{{slotProps.data.name}}-->
<!--							</template>-->
<!--						</Column>-->
<!--						<Column field="category" header="Category" :sortable="true">-->
<!--							<template #body="slotProps">-->
<!--								<span class="p-column-title">Category</span>-->
<!--								{{slotProps.data.category}}-->
<!--							</template>-->
<!--						</Column>-->
<!--						<Column field="price" header="Price" :sortable="true">-->
<!--							<template #body="slotProps">-->
<!--								<span class="p-column-title">Price</span>-->
<!--								{{formatCurrency(slotProps.data.price)}}-->
<!--							</template>-->
<!--						</Column>-->
<!--						<Column field="inventoryStatus" header="Status" :sortable="true">-->
<!--							<template #body="slotProps">-->
<!--								<span class="p-column-title">Status</span>-->
<!--								<span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{slotProps.data.inventoryStatus}}</span>-->
<!--							</template>-->
<!--						</Column>-->
<!--						<Column bodyStyle="text-align: center">-->
<!--							<template #body>-->
<!--								<Button icon="pi pi-search" type="button"></Button>-->
<!--							</template>-->
<!--						</Column>-->
<!--					</DataTable>-->
				</div>
				<div class="card card-w-title live-support">
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

			<div class="col-12 md:col-12 lg:col-12">
				<div class="card card-w-title">
					<h5>Schedule</h5>
					<FullCalendar :events="events" :options="options"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import ProductService from '../service/ProductService';
import EventService from '../service/EventService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
	data() {
		return {
			chartData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Sales',
						data: [12, 19, 3, 5, 2, 3, 9],
						borderColor: [
							'#7E57C2',
						],
						borderWidth: 3,
						borderDash: [5, 5],
						fill: false,
						pointRadius: 3,
						tension: .4
					},
					{
						label: 'Income',
						data: [1, 2, 5, 3, 12, 7, 15],
						backgroundColor: [
							'rgba(187,222,251,0.2)',
						],
						borderColor: [
							'#42A5F5',
						],
						borderWidth: 3,
						fill: true,
						tension: .4
					},
					{
						label: 'Expenses',
						data: [7, 12, 15, 5, 3, 13, 21],
						borderColor: [
							'#FFB300',
						],
						borderWidth: 3,
						fill: false,
						pointRadius: [4, 6, 4, 12, 8, 0, 4],
						tension: .4
					},
					{
						label: 'New Users',
						data: [3, 7, 2, 17, 15, 13, 19],
						borderColor: [
							'#66BB6A',
						],
						borderWidth: 3,
						fill: false,
						tension: .4
					}
				]
			},
			chartOptions: {
				responsive: true,
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			},
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
			],
			tasksCheckbox: [],
			products: null,
			selectedProduct: null,
			options: {
				plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialDate : '2023-01-01',
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                selectable:true,
                selectMirror: true,
                dayMaxEvents: true
			},
			events: null,
		}
	},
	// productService: null,
	eventService: null,
	created() {
		// this.productService = new ProductService();
		this.eventService = new EventService();
	},
	mounted() {
		// this.productService.getProducts().then(data => this.products = data);
		this.eventService.getEvents().then(data => this.events = data);
	},
	methods: {
		toggle(event) {
			this.$refs.menu.toggle(event);
		},
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		}
	}
}
</script>

<style scoped lang="scss">
.product-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}

::v-deep(.fc .fc-col-header-cell-cushion),
::v-deep(.fc-daygrid-dot-event .fc-event-time),
::v-deep(.fc-daygrid-dot-event .fc-event-title),
::v-deep(.fc .fc-daygrid-day-number),
::v-deep(.fc .fc-daygrid-more-link) {
	color: var(--text-color);
}

@media screen and (max-width: 960px) {
    ::v-deep(.fc-header-toolbar) {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
