<template>
	<div class="grid p-fluid">
		<div class="col-12 lg:col-6">
			<div class="card">
				<h5>Linear Chart</h5>
				<Chart type="line" :data="lineData"></Chart>
			</div>
			<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">Pie Chart</h5>
				<Chart type="pie" :data="pieData" style="width: 50%"></Chart>
			</div>
			<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">Polar Area Chart</h5>
				<Chart type="polarArea" :data="polarData" style="width: 50%"></Chart>
			</div>
		</div>
		<div class="col-12 lg:col-6">
			<div class="card">
				<h5>Bar Chart</h5>
				<Chart type="bar" :data="barData"></Chart>
			</div>
			<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">Doughnut Chart</h5>
				<Chart type="doughnut" :data="pieData" style="width: 50%"></Chart>
			</div>
			<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">Radar Chart</h5>
				<Chart type="radar" :data="radarData" style="width: 50%"></Chart>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			lineData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'First Dataset',
						data: [65, 59, 80, 81, 56, 55, 40],
						fill: false,
						borderColor: '#03A9F4',
						tension: .4
					},
					{
						label: 'Second Dataset',
						data: [28, 48, 40, 19, 86, 27, 90],
						fill: false,
						borderColor: '#FFC107',
						tension: .4
					}
				]
			},
			pieData: {
				labels: ['A', 'B', 'C'],
				datasets: [
				{
					data: [540, 325, 702, 421],
					backgroundColor: [
						'rgb(54, 162, 235)',
						'rgb(255, 99, 132)',
						'rgb(255, 205, 86)',
						'rgb(75, 192, 192)'
					]
				}]
			},
			polarData: {
				datasets: [{
					data: [
						11,
						16,
						7,
						3
					],
					backgroundColor: [
						'rgb(54, 162, 235)',
						'rgb(255, 99, 132)',
						'rgb(255, 205, 86)',
						'rgb(75, 192, 192)'
					],
					label: 'My dataset'
				}],
				labels: [
					'Blue',
					'Purple',
					'Orange',
					'Green'
				]
			},
			barData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'My First dataset',
						backgroundColor: '#03A9F4',
						borderColor: '#03A9F4',
						data: [65, 59, 80, 81, 56, 55, 40]
					},
					{
						label: 'My Second dataset',
						backgroundColor: '#FFC107',
						borderColor: '#FFC107',
						data: [28, 48, 40, 19, 86, 27, 90]
					}
				]
			},
			radarData: {
				labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
				datasets: [
					{
						label: 'My First dataset',
						backgroundColor: 'rgba(179,181,198,0.2)',
						borderColor: 'rgba(179,181,198,1)',
						pointBackgroundColor: 'rgba(179,181,198,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(179,181,198,1)',
						data: [65, 59, 90, 81, 56, 55, 40]
					},
					{
						label: 'My Second dataset',
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: 'rgba(255,99,132,1)',
						pointBackgroundColor: 'rgba(255,99,132,1)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(255,99,132,1)',
						data: [28, 48, 40, 19, 96, 27, 100]
					}
				]
			}
		}
	}
}
</script>

<style scoped>

</style>
