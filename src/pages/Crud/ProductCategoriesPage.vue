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
                    v-model:filters="filters" filterDisplay="menu" :globalFilterFields="['name', 'description']"
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

          <Column field="is_immutable" header="Editable" sortable :filterMenuStyle="{ width: '14rem' }"
                  style="min-width: 10rem">
            <template #body="{ data }">
              <span :class="'status status-' + data.is_immutable">{{ data.is_immutable }}</span>
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
import GraphqlService from "@/service/GraphqlService";
import {FilterMatchMode, FilterOperator} from "primevue/api";
import CreateProductCategorySchema from "@/forms/ProductCategory/CreateProductCategorySchema";
import EditProductCategorySchema from "@/forms/ProductCategory/EditProductCategorySchema";
import HandleNullValues from "@/helpers/HandleNullValues";
import HandleBoolean from "@/helpers/HandleBoolean";

export default {
  name: 'Product Categories',
  components: {
    DataTable,
  },
  data() {
    return {
      name: 'Product Category',
      namePlural: 'Product Categories',

      apiService: new GraphqlService(),

      tableName: 'Manage Product Categories',
      tableData: [],
      tableLoadingMessage: `Loading product categories. Please wait ... `,
      tableNotFoundMessage: 'No product category data found.',
      statuses: ['yes', 'no'],

      loading: false,
      selectedData: null,

      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        description: {
          operator: FilterOperator.AND,
          constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
      },

      showCreateDialog: false,
      createFormData: {},
      createSchema: CreateProductCategorySchema(),

      showEditDialog: false,
      editFormData: {},
      editSchema: [],

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
      const query = `query { productCategories { id name description is_immutable } }`;
      const response = await this.apiService.query(query);
      HandleNullValues(response, 'productCategories', 'No Description');
      HandleBoolean(response.data.productCategories, 'is_immutable', this.statuses);
      this.tableData = response.data.productCategories;
      this.loading = false;
    },

    async createData() {

      const query = `mutation { createProductCategory (
        name: "${this.createFormData.name}"
        description: "${this.createFormData.description ?? ''}"
      ) { id name } }`;

      const response = await this.apiService.query(query);

      if (!response.errors) {

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.createProductCategory.name} created with success`,
          life: 3000
        });

        await this.refreshTable();
        this.showCreateDialog = false;

      } else {

        let errors = response.errors.pop();
        let errorMessage = '';

        if (errors.extensions.validation) {
          for (const [key, value] of Object.entries(errors.extensions.validation)) {
            errorMessage += `${key}: ${value} `;
          }

          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 3000
          });

        } else {
          errorMessage = 'Error editing ' + this.name + ' Try Again if the problem persists contact support';
        }
      }

      this.createHasInverter = false;
    },

    openEditDialog(selectedData) {
      let isImmutable = selectedData.is_immutable === 'yes';
      this.editSchema = EditProductCategorySchema(isImmutable);
      this.editFormData = {...selectedData};
      this.showEditDialog = true;
    },

    async editData() {

      delete this.editFormData.is_immutable;

      let query = `mutation { updateProductCategory (
      ) { id name description } }`;

      for (const [key, value] of Object.entries(this.editFormData)) {
        if (value !== '' && value !== null && value !== undefined) {
          if (typeof value === 'boolean') {
            query = query.replace(')', `${key}: ${value})`);
          } else {
            query = query.replace(')', `${key}: "${value}")`);
          }
        }
      }

      const response = await this.apiService.query(query);

      if (!response.errors) {

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.updateProductCategory.name} edited with success`,
          life: 3000
        });

        await this.refreshTable();
        this.showEditDialog = false;

      } else {

        let errors = response.errors.pop();
        let errorMessage = '';

        if (errors.extensions.validation) {
          for (const [key, value] of Object.entries(errors.extensions.validation)) {
            errorMessage += `${key}: ${value} `;
          }

          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 3000
          });

        } else {
          errorMessage = 'Error editing ' + this.name + ' Try Again if the problem persists contact support';
        }
      }
    },

    openDeleteDialog(selectedData) {
      this.dataToDelete = selectedData;
      this.deleteDataDialog = true;
    },

    async deleteData() {
      const query = `mutation { deleteProductCategory (id: "${this.dataToDelete.id}") { id, name } }`;

      this.loading = true;
      const response = await this.apiService.query(query);
      this.loading = false;

      if (!response.errors) {

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.deleteProductCategory.name} deleted with success`,
          life: 3000
        });

        await this.refreshTable();
        this.deleteDataDialog = false;
      } else {

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error Deleting ' + this.name + ' Try Again if the problem persists contact support',
          life: 3000
        });

      }
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
