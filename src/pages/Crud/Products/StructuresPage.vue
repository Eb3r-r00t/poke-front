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

        <div v-if="tableData">
          <product-table :table-data="tableData" :table-name="tableName" @edit-data="editData"
                         @delete-data="deleteData"></product-table>
        </div>

        <Dialog v-model:visible="saveDialog" :style="{width: '450px'}" header="Brand Details" :modal="true"
                class="p-fluid">
          <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="dataToSend.name" required="true" autofocus
                       :class="{'p-invalid': submitted && !dataToSend.name}"/>
            <small class="p-invalid" v-if="submitted && !dataToSend.name">Name is required.</small>
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="dataToSend.description" required="true" rows="3" cols="20"/>
          </div>
          <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveData"/>
          </template>
        </Dialog>

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

        <!--        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">-->
        <!--          <div class="flex align-items-center justify-content-center">-->
        <!--            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />-->
        <!--            <span v-if="product">Are you sure you want to delete the selected products?</span>-->
        <!--          </div>-->
        <!--          <template #footer>-->
        <!--            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>-->
        <!--            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />-->
        <!--          </template>-->
        <!--        </Dialog>-->
      </div>
    </div>
  </div>

</template>

<script>
import ProductByCategory from "@/service/ProductByCategory";
import CRUDService from "@/service/CRUDService";
import TruncateDescription from "@/helpers/TruncateDescription";
import ProductTable from "@/pages/Crud/Products/ProductTable";

export default {
  name: 'Structures',
  components: {
    ProductTable
  },
  data() {
    return {
      name: 'Structures',
      tableName: 'Manage Structures',
      tableData: null,
      selectedData: null,
      crudService: null,
      saveDialog: false,
      deleteDataDialog: false,
      descriptions: [],
      // deleteTargetsDialog: false,
      dataToSend: {},
      filters: {},
      submitted: false,
    }
  },
  async created() {
    this.crudService = new CRUDService('products');
    this.productByCategoryService = new ProductByCategory('3');
    await this.getDataTable();
  },
  methods: {
    async getDataTable() {
      const response = await this.productByCategoryService.getAll();
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
    removeKeyWithNullValue() {
      for (const key in this.dataToSend) {
        if (this.dataToSend[key] === null) {
          delete this.dataToSend[key];
        }
      }
    },
    editData(data) {
      data = {...data, description: this.descriptions.find(item => item.id === data.id).description};
      this.dataToSend = {...data};
      this.removeKeyWithNullValue();
      this.saveDialog = true;
    },
    openDelete(data) {
      this.selectedData = data;
      this.deleteDataDialog = true;
    },
    async deleteData(data) {
      await this.crudService.delete(data.id);
      this.deleteDataDialog = false;
      this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + 'Deleted', life: 3000});
      await this.getDataTable();
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/demo/styles/badges.scss';
</style>
