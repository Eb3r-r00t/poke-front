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
                    v-model:filters="filters" filterDisplay="menu" :globalFilterFields="['name', 'email']"
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

          <Column field="email" header="Email" sortable style="min-width: 14rem">
            <template #body="{ data }">
              {{ data.email }}
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name"/>
            </template>
          </Column>

          <Column header="Actions" headerStyle="min-width: 4rem; text-align: center"
                  bodyStyle="text-align: center; overflow: visible">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                      @click="openEditDialog(slotProps.data)"/>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2"
                      @click="deleteData(slotProps.data)"/>
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

      </div>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import GraphqlService from "@/service/GraphqlService";
import {FilterMatchMode, FilterOperator} from "primevue/api";
import CreateUserSchema from "@/forms/User/CreateUserSchema";
import EditUserSchema from "@/forms/User/EditUserSchema";

export default {
  name: 'Users',
  components: {
    DataTable,
  },
  data() {
    return {
      name: 'User',
      namePlural: 'Users',

      apiService: new GraphqlService(),

      tableName: 'Manage Users',
      tableData: [],
      tableLoadingMessage: `Loading users. Please wait ... `,
      tableNotFoundMessage: 'No user data found.',

      loading: false,
      selectedData: null,

      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        email: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      },

      showCreateDialog: false,
      createFormData: {},
      createSchema: CreateUserSchema(),

      showEditDialog: false,
      editFormData: {},
      editSchema: EditUserSchema(),
    }
  },

  created() {
    this.getUsers();
  },

  methods: {

    async getUsers() {
      this.loading = true;
      const query = `query { users { id name email } }`;
      const response = await this.apiService.query(query);
      this.tableData = response.data.users;
      this.loading = false;
    },

    async createData() {

      const query = `mutation { createUser (
        name: "${this.createFormData.name}"
        email: "${this.createFormData.email}"
        password: "${this.createFormData.password}"
      ) { id name email } }`;

      const response = await this.apiService.query(query);

      if (!response.errors) {

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.createUser.name} created with success`,
          life: 3000
        });

        this.tableData.push(response.data.createUser);
        this.showCreateDialog = false;

      } else {

        let errors = response.errors.pop();
        let errorMessage = '';

        if (errors.extensions.validation.email) {
          errorMessage = errors.extensions.validation.email.pop();
        } else {
          errorMessage = 'Error Creating ' + this.name + ' Try Again if the problem persists contact support';
        }

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });

      }
    },

    openEditDialog(selectedData) {
      this.editFormData = {...selectedData};
      this.editFormData.email = '';
      this.showEditDialog = true;
    },

    async editData() {

      let query = `mutation { updateUser (
      ) { id name email } }`;

      for (const [key, value] of Object.entries(this.editFormData)) {
        if (value !== '' && value !== null && value !== undefined) {
          query = query.replace(')', `${key}: "${value}" )`);
        }
      }

      const response = await this.apiService.query(query);

      if (!response.errors) {

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.updateUser.name} edited with success`,
          life: 3000
        });

        this.tableData = this.tableData.map((item) => {
          if (item.id === response.data.updateUser.id) {
            return response.data.updateUser;
          }
          return item;
        });

        this.showEditDialog = false;

      } else {

        let errors = response.errors.pop();
        let errorMessage = '';

        if (errors.extensions.validation.email) {
          errorMessage = errors.extensions.validation.email.pop();
        } else {
          errorMessage = 'Error editing ' + this.name + ' Try Again if the problem persists contact support';
        }

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });

      }
    },

    async deleteData(selectedData) {
      const query = `mutation { deleteUser (id: "${selectedData.id}") { id, name } }`;

      this.loading = true;
      const response = await this.apiService.query(query);
      this.loading = false;

      if (!response.errors) {

        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: `${this.name} ${response.data.deleteUser.name} deleted with success`,
          life: 3000
        });


        this.tableData = this.tableData.filter((item) => item.id !== selectedData.id);

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
</style>
