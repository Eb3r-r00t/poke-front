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
                    :globalFilterFields="['name', 'description', 'brand']"
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

          <Column field="description" header="Description" sortable style="max-width: 28rem">
            <template #body="{ data }">
              {{ data.description }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name"/>
            </template>
          </Column>

          <Column field="brand" header="Brand" sortable style="max-width: 28rem">
            <template #body="{ data }">
              {{ data.brand }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name"/>
            </template>
          </Column>

          <Column field="is_available" header="Status" sortable :filterMenuStyle="{ width: '14rem' }"
                  style="min-width: 10rem">
            <template #body="{ data }">
              <span :class="'status status-' + (data.is_available === statuses[0] ? 'yes' : 'no') ">{{
                  data.is_available
                }}</span>
            </template>
          </Column>

          <Column field="is_configured" header="Configured" sortable :filterMenuStyle="{ width: '14rem' }"
                  style="min-width: 10rem">
            <template #body="{ data }">
              <span :class="'status status-' + (data.is_configured === defaultStatuses[0] ? 'yes' : 'no') ">{{
                  data.is_configured
                }}</span>
            </template>
          </Column>

          <Column header="Actions" headerStyle="min-width: 4rem; text-align: center"
                  bodyStyle="overflow: visible">
            <template #body="slotProps">
              <Button v-if="configureButton" icon="pi pi-cog" class="p-button-rounded p-button-primary mr-2"
                      @click="openConfigureDialog(slotProps.data)"/>
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
              validate-on="blur"
              :config="{
            classes: { wrapper: {'formkit-wrapper' : false } }
        }"
          >
            <FormKitSchema :schema="createSchema"/>
            <h6 class="mt-1 mb-1 text-black-alpha-80 "> Is Available </h6>
            <div class="mt-0 mb-2">
              <InputSwitch v-model="createIsAvailable"/>
            </div>
          </FormKit>
        </Dialog>

        <Dialog v-model:visible="showEditDialog" :style="{width: '450px'}" :header="'Edit ' + name" :modal="true"
                class="p-fluid">
          <FormKit
              type="form"
              v-model="editFormData"
              submit-label="Send"
              @submit="editData"
              validate-on="blur"
              :config="{
            classes: { wrapper: {'formkit-wrapper' : false } }
        }"
          >
            <FormKitSchema :schema="editSchema"/>
            <h6 class="mt-1 mb-1 text-black-alpha-80 "> Is Available </h6>
            <div class="mt-0 mb-2">
              <InputSwitch v-model="editIsAvailable"/>
            </div>
          </FormKit>
        </Dialog>


        <Dialog v-model:visible="showConfigureDialog" :style="{width: '450px'}" :header="'Configure ' + name" :modal="true"
                class="p-fluid">
          <FormKit
              type="form"
              v-model="configureFormData"
              submit-label="Send"
              @submit="editData"
              validate-on="blur"
              :config="{
            classes: { wrapper: {'formkit-wrapper' : false } }
        }"
          >
            <FormKitSchema :schema="configureSchema"/>
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
import GraphqlService from "@/service/GraphqlService";
import {FilterMatchMode, FilterOperator} from "primevue/api";
import CreateProductSchema from "@/forms/Product/CreateProductSchema";
import EditProductSchema from "@/forms/Product/EditProductSchema";
import ConfigureInverterSchema from "@/forms/Product/ConfigureInverterSchema";
import Products from "@/Graphql/ProductQueries";
import SelectQuery from "@/Graphql/SelectQuery";
import ErrorHandling from "@/Error/ErrorHandling";

export default {
  name: 'Inverters',
  components: {
    DataTable,
  },
  data() {
    return {
      name: 'Inverters',
      namePlural: 'Inverters',

      apiService: new GraphqlService(),
      graphQlQuery: new Products(1),

      tableName: 'Manage Inverters',
      tableData: [],
      tableLoadingMessage: `Loading inverters. Please wait ... `,
      tableNotFoundMessage: 'No inverter data found.',
      statuses: ['Available', 'Not Available'],
      defaultStatuses: ['Yes', 'No'],

      loading: false,
      selectedData: null,

      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        description: {
          operator: FilterOperator.AND,
          constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        brand: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      },

      showCreateDialog: false,
      createFormData: {},
      createSchema: {},
      createIsAvailable: true,

      showEditDialog: false,
      editFormData: {},
      editSchema: [],
      editIsAvailable: true,

      showConfigureDialog: false,
      configureFormData: {},
      configureSchema: [],

      deleteDataDialog: false,
      dataToDelete: null,

      brands: {},

      configureButton: true,
    }
  },

  async created() {
    this.loading = true;
    await this.refreshTable();
    this.brands = await SelectQuery('brands');
    this.createSchema = CreateProductSchema(this.brands);
    this.configureSchema = ConfigureInverterSchema();
    this.loading = false;
  },

  methods: {

    async refreshTable() {
      this.isLoading = true;
      const response = await this.apiService.query(this.graphQlQuery.getProductByCategory(1));

      response.data.products.map((item) => {
        item.brand = item.brand ? item.brand.name : 'No brand';
        item.description = item.description ? item.description : 'No description';
        item.is_available = item.is_available ? this.statuses[0] : this.statuses[1];
        item.is_configured = item.is_configured ? this.defaultStatuses[0] : this.defaultStatuses[1];
      });

      this.tableData = response.data.products;
      this.isLoading = false;
    },

    async createData() {

      this.createFormData.is_available = this.createIsAvailable;
      const query = this.graphQlQuery.createProduct(this.createFormData);

      let response = await this.apiService.query(query);
      let product = response.data.createProduct;

      product.brand = product.brand ? product.brand.name : 'No brand';
      product.description = product.description ? product.description : 'No description';
      product.is_available = product.is_available ? 'Available' : 'Not available';
      product.is_configured = product.is_configured ? this.defaultStatuses[0] : this.defaultStatuses[1];

      this.tableData.push(product);

      let error = ErrorHandling(response, this.$toast);

      if (!error) {
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.createProduct.name} create with success`,
          life: 3000
        });
        this.showCreateDialog = false;
      }

      this.createHasInverter = false;
      this.createIsAvailable = true;
    },

    async openEditDialog(selectedData) {
      this.editSchema = EditProductSchema(this.brands);

      this.editFormData = {...selectedData};
      this.editIsAvailable = this.editFormData.is_available === this.statuses[0];
      if (selectedData.brand) {
        const brand = this.brands.find(brands => brands.label === selectedData.brand);
        this.editFormData.brand_id = brand ? brand.value : null;
      }

      this.showEditDialog = true;
    },

    async editData() {

      this.editFormData.is_available = this.editIsAvailable;

      const query = this.graphQlQuery.updateProduct(this.editFormData);

      const response = await this.apiService.query(query);
      let product = response.data.updateProduct;

      product.brand = product.brand ? product.brand.name : 'No brand';
      product.description = product.description ? product.description : 'No description';
      product.is_available = product.is_available ? 'Available' : 'Not available';
      product.is_configured = product.is_configured ? this.defaultStatuses[0] : this.defaultStatuses[1];

      let error = ErrorHandling(response, this.$toast);

      if (!error) {
        this.tableData = this.tableData.map(item => item.id === product.id ? product : item);
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.updateProduct.name} updated with success`,
          life: 3000
        });
        this.showEditDialog = false;
      }
    },

    openDeleteDialog(selectedData) {
      this.dataToDelete = selectedData;
      this.deleteDataDialog = true;
    },

    async deleteData() {
      const query = this.graphQlQuery.deleteProduct(this.dataToDelete.id);

      this.loading = true;
      this.deleteDataDialog = false;
      const response = await this.apiService.query(query);

      let error = ErrorHandling(response, this.$toast);

      if (!error) {
        this.tableData = this.tableData.filter(item => item.id !== this.dataToDelete.id);
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.deleteProduct.name} deleted with success`,
          life: 3000
        });
        this.loading = false;
      } else {
        this.loading = false;
      }
    },

    openConfigureDialog(selectedData) {
      this.showConfigureDialog = true;
      console.log(selectedData);
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/demo/styles/badges.scss';

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
