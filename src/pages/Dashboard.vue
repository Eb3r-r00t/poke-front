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
            <div class="pokemon-item">
              <div class="pokemon-item-content">
                <div class="mb-4 mr-4 ml-4 flex align-items-center justify-content-between">
                  <h2 class="mb-0 ml-2">{{ slotProps.data.name }}</h2>
                  <div class="flex align-items-center justify-content-between">
                    <i class="pokemon-icon fa fa-heart mr-2"></i>
                    <h2 class="m-0 mr-2">{{ slotProps.data.hp }}</h2>
                  </div>
                </div>
                <div class="mb-5">
                  <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif"
                       :alt="slotProps.data.name" class="pokemon-image" />
                </div>
                <div>
<!--                  <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>-->
<!--                  <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span>-->
                  <div class="flex align-items-center justify-content-around mt-5">
                    <div class="block">
                      <i class="pokemon-icon fa fa-fire-flame-curved"></i>
                      <h2>{{slotProps.data.attack}}</h2>
                    </div>
                    <div class="block">
                      <i class="pokemon-icon fa fa-shield"></i>
                      <h2>{{slotProps.data.defense}}</h2>
                    </div>
                    <div class="block">
                      <i class="pokemon-icon fa fa-bolt"></i>
                      <h2>{{slotProps.data.agility}}</h2>
                    </div>
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
.pokemon-item {
.pokemon-item-content {
  border: 1px solid var(--surface-border);
  border-radius: 5%;
  margin: 0.3rem;
  text-align: center;
  padding: 1rem 0;
  background-color: #e76950;
}
// make with background, rounded corners, and shadow
.pokemon-icon{
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pokemon-image {
  height: 50%;
  width: 50%;
}
}
</style>
