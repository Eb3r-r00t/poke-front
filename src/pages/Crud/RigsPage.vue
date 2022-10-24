<template>
  <div class="grid crud-demo">
    <div class="col-12">
      <div class="card">
        <Toast/>
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"/>
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
            </div>
          </template>

          <Column field="code" header="Code" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column field="name" header="name" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column field="total_cost" header="total_cost" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Total Cost</span>
              {{ slotProps.data.total_cost }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                      @click="editData(slotProps.data)"/>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="openDelete(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="saveDialog" :style="{width: '450px'}" :header="name+' Details'" :modal="true"
                class="p-fluid">
          <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="dataToSend.name" required="true" autofocus
                       :class="{'p-invalid': submitted && !dataToSend.name}"/>
            <small class="p-invalid" v-if="submitted && !dataToSend.name">Name is required.</small>
          </div>
          <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveData"/>
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteDataDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="selectedData">Are you sure you want to delete <b>{{selectedData.name}}</b>?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDataDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteData" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>

</template>

<script>
import CRUDService from "@/service/CRUDService";

export default {
  name: 'RigsPage',
  data() {
    return {
      name: 'Rigs',
      tableName: 'Manage Rigs',
      tableData: null,
      selectedData: null,
      crudService: null,
      saveDialog: false,
      deleteDataDialog: false,
      // deleteTargetsDialog: false,
      dataToSend: {},
      filters: {},
      submitted: false,
    }
  },
  created() {
    this.crudService = new CRUDService('/rigs');
  },
  async mounted() {
    await this.getDataTable();
  },
  methods: {
    async getDataTable() {
      const response = await this.crudService.getAll();
      this.tableData = response.data.data;
    },
    openNew() {
      this.dataToSend = {};
      this.submitted = false;
      this.saveDialog = true;
    },
    cancelDialog() {
      this.saveDialog = false;
      this.submitted = false;
    },
    async saveData() {
      this.submitted = true;
      if (this.dataToSend.id) {
        await this.crudService.update(this.dataToSend.id, this.dataToSend);
        this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + ' Updated', life: 3000});
      } else {
        await this.crudService.create(this.dataToSend);
        this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + ' Created', life: 3000});
      }
      this.saveDialog = false;
      this.dataToSend = {};
      await this.getDataTable();
    },
    removeKeyWithNullValue(){
      for (const key in this.dataToSend) {
        if (this.dataToSend[key] === null) {
          delete this.dataToSend[key];
        }
      }
    },
    editData(data) {
      this.dataToSend = {...data};
      this.removeKeyWithNullValue();
      this.saveDialog = true;
    },
    openDelete(data) {
      this.selectedData = data;
      this.deleteDataDialog = true;
    },
    async deleteData() {
      await this.crudService.delete(this.selectedData.id);
      this.deleteDataDialog = false;
      this.$toast.add({severity:'success', summary: 'Successful', detail:this.name + 'Deleted', life: 3000});
      this.selectedData = null;
      await this.getDataTable();
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/styles/badges.scss';
</style>
