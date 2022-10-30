<template>
	<div class="layout-dashboard">
		<div class="grid">
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="overview-box sales">
          <div v-if="topPokemons">
            <i class="overview-icon fa fa-heart"></i>
            <span class="overview-title">Highest HP</span>
            <i class="overview-arrow pi pi-chevron-circle-up"></i>
            <div class="overview-numbers">
              {{ topPokemons.highestHp.name }}
            </div>
            <div class="overview-subinfo">
              {{ topPokemons.highestHp.hp }}
            </div>
          </div>
          <div v-else>
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="overview-box views">
          <div v-if="topPokemons">
            <i class="overview-icon fa fa-bolt"></i>
            <span class="overview-title">Highest Agility</span>
            <i class="overview-arrow pi pi-chevron-circle-up"></i>
            <div class="overview-numbers">
              {{ topPokemons.highestAgility.name }}
            </div>
            <div class="overview-subinfo">
              {{ topPokemons.highestAgility.agility }}
            </div>
          </div>
          <div v-else>
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="overview-box users">
          <div v-if="topPokemons">
            <i class="overview-icon fa fa-fire-flame-curved"></i>
            <span class="overview-title">Highest Attack</span>
            <i class="overview-arrow pi pi-chevron-circle-up"></i>
            <div class="overview-numbers">
              {{ topPokemons.highestAttack.name }}
            </div>
            <div class="overview-subinfo">
              {{ topPokemons.highestAttack.attack }}
            </div>
          </div>
          <div v-else>
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="overview-box checkin">
          <div v-if="topPokemons">
            <i class="overview-icon fa fa-shield"></i>
            <span class="overview-title">Highest Defense</span>
            <i class="overview-arrow pi pi-chevron-circle-up"></i>
            <div class="overview-numbers">
              {{ topPokemons.highestDefense.name }}
            </div>
            <div class="overview-subinfo">
              {{ topPokemons.highestDefense.defense }}
            </div>
          </div>
          <div v-else>
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
      </div>
		</div>
    <div class="card">
      <div class="poke-card">
        <Carousel :value="pokemons" :numVisible="3" :numScroll="3">
          <template #header>
            <h5>Basic</h5>
          </template>
          <template #item="slotProps">
            <div class="product-item">
              <div class="product-item-content">
                <div class="mb-3">
<!--                  <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="product-image" />-->
                </div>
                <div>
                  <div class="mr-4 ml-4 flex align-items-center justify-content-between">
                    <h4 class="mb-0 ml-2">{{ slotProps.data.name }}</h4>
                    <div class="flex align-items-center justify-content-between">
                      <i class="overview-icon fa fa-heart mr-2"></i>
                      <h4 class="m-0 mr-2">{{ slotProps.data.hp }}</h4>
                    </div>
                  </div>
<!--                  <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>-->
<!--                  <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span>-->
                  <div class="car-buttons mt-5">
                    <Button icon="pi pi-search" class="p-button p-button-rounded mr-2" />
                    <Button icon="pi pi-star-fill" class="p-button-success p-button-rounded mr-2" />
                    <Button icon="pi pi-cog" class="p-button-help p-button-rounded" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
	</div>
</template>

<script>
import DashboardService from "@/service/DashboardService";
export default {
  data() {
    return {
      topPokemons: null,
      pokemons: [{
        name: 'Bulbasaur',
        hp: 45,
        attack: 49,
        defense: 49,
        agility: 45
      }, {
        name: 'Ivysaur',
        hp: 60,
        attack: 62,
        defense: 63,
        agility: 60
      }, {
        name: 'Venusaur',
        hp: 80,
        attack: 82,
        defense: 83,
        agility: 80
      }, {
        name: 'Charmander',
        hp: 39,
        attack: 52,
        defense: 43,
        agility: 65
      }, {
        name: 'Charmeleon',
        hp: 58,
        attack: 64,
        defense: 58,
        agility: 80
      }, {
        name: 'Charizard',
        hp: 78,
        attack: 84,
        defense: 78,
        agility: 100
      }],
    }
  },
  async created() {
    const response  = await DashboardService();
    this.topPokemons = response.data;
  },
}
</script>
<style lang="scss" scoped>
.product-item {
.product-item-content {
  border: 1px solid var(--surface-border);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 1rem 0;
}
.product-image {
  width: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
}
</style>
