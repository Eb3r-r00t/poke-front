<template>
  <div class="grid crud-demo">
    <div class="col-12">
      <div class="card">
        <Toast/>
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"/>
              <!--              <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />-->
            </div>
          </template>
        </Toolbar>

        <DataTable ref="dt" :value="tableData" v-model:selection="selectedData" dataKey="id" :paginator="true"
                   :rows="10"
                   :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                   responsiveLayout="scroll">
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">{{ tableName }}</h5>
              <!--              <span class="block mt-2 md:mt-0 p-input-icon-left">-->
              <!--                                <i class="pi pi-search" />-->
              <!--                                <InputText v-model="filters['global'].value" placeholder="Search..." />-->
              <!--                            </span>-->
            </div>
          </template>

          <!--          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>-->
          <Column field="code" header="Code" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column field="description" header="Description" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Description</span>
              {{ slotProps.data.description }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                      @click="editData(slotProps.data)"/>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="openDelete(slotProps.data)"/>
            </template>
          </Column>
        </DataTable>

        <div v-if="schema">
          <save-form :save-dialog="saveDialog" :name="name" :schema="schema" :crud-service="crudService"
                     @close-dialog="saveDialog = $event" @refresh-data="getDataTable">
          </save-form>
        </div>

        <Dialog v-model:visible="deleteDataDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span v-if="selectedData">Are you sure you want to delete <b>{{ selectedData.name }}</b>?</span>
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
import CRUDService from "@/service/CRUDService";
import TruncateDescription from "@/helpers/TruncateDescription";
import SaveForm from "@/components/SaveForm";
import {mapActions} from "vuex";
import DefaultConfigSchema from "@/forms/DefaultConfigSchema";

export default {
  name: 'Structure Type',
  components: {
    SaveForm
  },
  data() {
    return {
      name: 'Structure Types',
      tableName: 'Manage Structure Types',
      tableData: null,
      selectedData: null,
      crudService: null,
      saveDialog: false,
      deleteDataDialog: false,
      descriptions: [],
      filters: {},
      formData: {},
      schema: null,
      configureDataToSend: {},
    }
  },
  async created() {
    this.crudService = new CRUDService('structure_types');
    this.schema = DefaultConfigSchema();
    await this.getDataTable();
  },
  methods: {
    ...mapActions(['setFormData']),
    async getDataTable() {
      const response = await this.crudService.getAll();
      this.descriptions = response.data.map(item => {
        return {
          id: item.id,
          description: item.description
        }
      });
      TruncateDescription(response.data);
      this.tableData = response.data;
    },

    openNew() {
      this.setFormData({});
      this.saveDialog = true;
    },

    editData(data) {
      data = {...data, description: this.descriptions.find(item => item.id === data.id).description};
      this.setFormData(data);
      this.saveDialog = true;
    },

    openDelete(data) {
      this.selectedData = data;
      this.deleteDataDialog = true;
    },

    async deleteData() {
      await this.crudService.delete(this.selectedData.id);
      this.deleteDataDialog = false;
      this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + 'Deleted', life: 3000});
      this.selectedData = null;
      await this.getDataTable();
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/styles/badges.scss';
</style>
