<template>
  <div class="grid crud-demo">
    <div class="col-12">
      <div class="card">
        <Toast/>

        <Toolbar class="mb-4">
          <template #start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="showCreateDialog = true"/>
            </div>
          </template>
        </Toolbar>

        <data-table :value="tableData" :loading="loading" v-model:selection="selectedData" dataKey="id"
                    :paginator="true" :rows="10" :rowsPerPageOptions="[10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    v-model:filters="filters" filterDisplay="menu"
                    :globalFilterFields="['name', 'type', 'hp', 'attack', 'defense', 'agility']"
                    responsiveLayout="scroll"
        >
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">{{ tableName }}</h5>
              <span class="p-input-icon-left">
                  <i class="pi pi-search"/>
                  <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
              </span>
            </div>
          </template>

          <template #empty> {{ tableNotFoundMessage }}</template>
          <template #loading> {{ tableLoadingMessage }}</template>
          <!--          <Column selectionMode="multiple" style="min-width: 3rem"></Column>-->

          <Column field="id" header="Code" sortable dataType="numeric" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column>

          <Column field="name" header="Name" sortable style="min-width: 14rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name"/>
            </template>
          </Column>

          <Column field="type" header="Type" sortable style="max-width: 28rem">
            <template #body="{ data }">
              {{ data.type }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name"/>
            </template>
          </Column>

          <Column field="hp" header="HP" sortable dataType="numeric" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.hp }}
            </template>
          </Column>

          <Column field="agility" header="Agility" sortable dataType="numeric" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.agility }}
            </template>
          </Column>

          <Column field="attack" header="Attack" sortable dataType="numeric" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.attack }}
            </template>
          </Column>

          <Column field="defense" header="Defense" sortable dataType="numeric" style="min-width: 8rem">
            <template #body="{ data }">
              {{ data.defense }}
            </template>
          </Column>


          <Column header="Actions" headerStyle="min-width: 4rem; text-align: center"
                  bodyStyle="text-align: center; overflow: visible">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                      @click="openEditDialog(slotProps.data)"/>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2"
                      @click="openDeleteDialog(slotProps.data)"/>
            </template>
          </Column>
        </data-table>

        <Dialog v-model:visible="showCreateDialog" :style="{width: '450px'}" :header="'Create ' + name" :modal="true"
                class="p-fluid">
          <FormKit
              type="form"
              v-model="createFormData"
              submit-label="Send"
              @submit="createData"
              :config="{
            classes: { wrapper: {'formkit-wrapper' : false } }
        }"
          >
            <FormKitSchema :schema="createSchema"/>
          </FormKit>
        </Dialog>

        <Dialog v-model:visible="showEditDialog" :style="{width: '450px'}" :header="'Edit ' + name" :modal="true"
                class="p-fluid">
          <FormKit
              type="form"
              v-model="editFormData"
              submit-label="Send"
              validation-visibility="blur"
              @submit="editData"
              :config="{
            classes: { wrapper: {'formkit-wrapper' : false } }
        }"
          >
            <FormKitSchema :schema="editSchema"/>
          </FormKit>
        </Dialog>

        <Dialog v-model:visible="deleteDataDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span v-if="dataToDelete">Are you sure you want to delete <b>{{ dataToDelete.name }}</b>?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDataDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteData"/>
          </template>
        </Dialog>

      </div>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import {FilterMatchMode, FilterOperator} from "primevue/api";
import CreatePokemonSchema from "@/forms/Pokemons/CreatePokemonSchema";
import EditPokemonSchema from "@/forms/Pokemons/EditPokemonSchema";
import CRUDService from "@/service/CRUDService";

export default {
  name: 'Pokemons',
  components: {
    DataTable,
  },
  data() {
    return {
      name: 'Pokemon',
      namePlural: 'Pokemons',

      apiService: new CRUDService('pokemons'),

      tableName: 'Manage Pokemons',
      tableData: [],
      tableLoadingMessage: `Loading pokemon. Please wait ... `,
      tableNotFoundMessage: 'No pokemon data found.',

      loading: false,
      selectedData: null,

      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        type: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      },

      showCreateDialog: false,
      createFormData: {},
      createSchema: CreatePokemonSchema(),

      showEditDialog: false,
      editFormData: {},
      editSchema: EditPokemonSchema(),

      deleteDataDialog: false,
      dataToDelete: null,
    }
  },

  created() {
    this.refreshTable();
  },

  methods: {

    async refreshTable() {
      this.loading = true;
      const response = await this.apiService.getAll();

      this.tableData = response.data;
      this.loading = false;
    },

    async createData() {

      try {

        const response = await this.apiService.create(this.createFormData);

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.name} created with success`,
          life: 3000
        });

        this.tableData.push(response.data);

        this.showCreateDialog = false;

      } catch (e) {

        let errorMessage = 'Something went wrong. Please try again. If the problem persists, contact the administrator.';

        if (e.response.status === 422) {
          errorMessage = e.response.data.message;
        }

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }

      this.createHasInverter = false;
    },

    openEditDialog(selectedData) {
      this.editFormData = {...selectedData};
      this.editHasInverter = selectedData.has_inverter === 'yes';
      this.showEditDialog = true;
    },

    async editData() {

      this.editFormData.has_inverter = this.editHasInverter;

      try {

        console.log(this.editFormData);
        const response = await this.apiService.update(this.editFormData.id, this.editFormData);

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.name} edited with success`,
          life: 3000
        });

        response.data.has_inverter = response.data.has_inverter ? 'yes' : 'no';
        response.data.description = response.data.description || 'No description';
        this.tableData.splice(this.tableData.findIndex(item => item.id === response.data.id), 1, response.data);

        this.showEditDialog = false;

      } catch (e) {

        let errorMessage = 'Something went wrong. Please try again. If the problem persists, contact the administrator.';

        if (e.response.status === 422) {
          errorMessage = e.response.data.message;
        }

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    },

    openDeleteDialog(selectedData) {
      this.dataToDelete = selectedData;
      this.deleteDataDialog = true;
    },

    async deleteData() {
      this.loading = true;
      this.deleteDataDialog = false;

      try {
        const response = await this.apiService.delete(this.dataToDelete.id);

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.name} deleted with success`,
          life: 3000
        });

        this.tableData.splice(this.tableData.findIndex(item => item.id === response.data.id), 1);

      } catch (e) {

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error Deleting ' + this.name + ' Try Again if the problem persists contact support',
          life: 3000
        });

      }

      this.loading = false;
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/styles/badges.scss';

.status {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}

.status.status-yes {
  background-color: #C8E6C9;
  color: #256029;
}

.status.status-no {
  background-color: #FFCDD2;
  color: #C63737;
}
</style>
