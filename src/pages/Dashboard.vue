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
              <div class="pokemon-item-content" :style="'background-color:'+slotProps.data.color">
                <div class="mb-4 mr-4 ml-4 flex align-items-center justify-content-between">
                  <div class="flex align-items-center justify-content-begin">
                    <img alt="img" class="pokemon-icon mr-2" :src="getSvg(slotProps.data.type)" />
                    <h2 class="mt-3">{{ slotProps.data.name }}</h2>
                  </div>
                  <div class="flex align-items-center justify-content-between">
                    <i class="pokemon-icon fa fa-heart mr-2"></i>
                    <h2 class="m-0 mr-2">{{ slotProps.data.hp }}</h2>
                  </div>
                </div>
                <div class="mb-5">
                  <img :src="slotProps.data.image"
                       :alt="slotProps.data.name" class="pokemon-image"/>
                </div>
                <div>
                  <!--                  <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>-->
                  <!--                  <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span>-->
                  <div class="flex align-items-center justify-content-around mt-5">
                    <div class="block">
                      <i class="pokemon-icon fa fa-fire-flame-curved"></i>
                      <h2>{{ slotProps.data.attack }}</h2>
                    </div>
                    <div class="block">
                      <i class="pokemon-icon fa fa-shield"></i>
                      <h2>{{ slotProps.data.defense }}</h2>
                    </div>
                    <div class="block">
                      <i class="pokemon-icon fa fa-bolt"></i>
                      <h2>{{ slotProps.data.agility }}</h2>
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
      loading: false,
      pokemons: [],
      color: [
        {type: 'fire', color: '#FDDFDF'},
        {type: 'grass', color: '#DEFDE0'},
        {type: 'electric', color: '#FCF7DE'},
        {type: 'water', color: '#DEF3FD'},
        {type: 'psychic', color: '#E6E0F8'},
        {type: 'ice', color: '#E0F7FA'},
        {type: 'dragon', color: '#F5B7B1'},
        {type: 'dark', color: '#A9A9A9'},
        {type: 'fairy', color: '#FCEAFF'},
        {type: 'normal', color: '#F5F5F5'},
        {type: 'fighting', color: '#E6E0F8'},
        {type: 'flying', color: '#90d5e0'},
        {type: 'poison', color: '#98D7A5'},
        {type: 'ground', color: '#F4E7DA'},
        {type: 'rock', color: '#c0bdbd'},
        {type: 'bug', color: '#F8D5A3'},
        {type: 'ghost', color: '#787794'},
        {type: 'steel', color: '#F5F5F5'},
      ],
      svg:[
        {type: 'fire', svg: '../../public/iconsType/fire.svg'},
        {type: 'grass', svg: '../../public/iconsType/grass.svg'},
        {type: 'electric', svg: '../../public/iconsType/electric.svg'},
      ]
    }
  },
  async created() {
    const response = await DashboardService();
    this.topPokemons = {
      highestHp: response.data.reduce((prev, current) => (prev.hp > current.hp) ? prev : current),
      highestAgility: response.data.reduce((prev, current) => (prev.agility > current.agility) ? prev : current),
      highestAttack: response.data.reduce((prev, current) => (prev.attack > current.attack) ? prev : current),
      highestDefense: response.data.reduce((prev, current) => (prev.defense > current.defense) ? prev : current),
    }
    // map color
    this.pokemons = response.data.map(pokemon => {
      const color = this.color.find(c => c.type === pokemon.type);
      pokemon.color = color.color;
      return pokemon;
    })
    // map svg
    this.pokemons = response.data.map(pokemon => {
      const svg = this.svg.find(c => c.type === pokemon.type);
      pokemon.svg = svg.svg;
      return pokemon;
    })
    this.pokemons = response.data;
  },
  methods: {
    getSvg(svg) {
      return require('../../public/iconsType/'+svg+'.svg');
    }
  }
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
  }
}

.pokemon-image {
  width: 50%;
  height: 16rem;
  object-fit: contain;
}

.pokemon-icon {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
