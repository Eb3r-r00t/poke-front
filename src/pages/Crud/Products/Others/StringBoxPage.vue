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
                         @delete-data="openDelete" @configure-data="configureData"></product-table>
        </div>

        <Dialog v-model:visible="saveDialog" :style="{width: '450px'}" :header="name + ' Details'" :modal="true"
                class="p-fluid">
          <FormKit
              type="form"
              v-model="dataToSend"
              submit-label="Send"
              @submit="saveData"
              :config="{
                classes: { wrapper: {'formkit-wrapper' : false },},
              }"
          >
            <FormKit
                name="name"
                label="Name"
                placeholder="Type the name"
                required
                validation-visibility="live"
            />
            <FormKit
                name="description"
                label="Description"
                placeholder="Type the description"
                type="textarea"
            />
            <FormKit
                name="price"
                label="Price"
                placeholder="Type the price"
                type="number"
                required
            />
            <FormKit
                name="stock"
                label="Stock"
                placeholder="Type the stock"
                type="number"
                required
            />
            <FormKit
                name="brand_id"
                label="Brand"
                placeholder="Select a brand"
                type="select"
                :options="brands"
            />
          </FormKit>
        </Dialog>

        <Dialog v-model:visible="configureDialog" :style="{width: '450px'}" :header="name + ' Configs'" :modal="true"
                class="p-fluid">
          <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="dataToSend.name" required="true" autofocus
                       :class="{'p-invalid': submitted && !dataToSend.name}"/>
            <small class="p-invalid" v-if="submitted && !dataToSend.name">Name is required.</small>
          </div>
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

        <Dialog v-model:visible="deleteDataDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span>{{ 'Are you sure you want to delete this ' + name + ' ?' }}</span>
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
import ProductByCategory from "@/service/ProductByCategory";
import CRUDService from "@/service/CRUDService";
import TruncateDescription from "@/helpers/TruncateDescription";
import ProductTable from "@/pages/Crud/Products/ProductTable";
import SelectDataService from "@/service/SelectDataService";

export default {
  name: 'String Box',
  components: {
    ProductTable
  },
  data() {
    return {
      name: 'String Box',
      tableName: 'Manage String Box',
      tableData: null,
      selectedData: null,
      crudService: null,
      selectDataService: null,
      saveDialog: false,
      configureDialog: false,
      deleteDataDialog: false,
      brands: [],
      brand: null,
      productCategory: 4,
      descriptions: [],
      dataToSend: {},
      filters: {},
      submitted: false,
      formData: {},
    }
  },
  async created() {
    this.crudService = new CRUDService('products');
    this.brands = await this.getSelectData('brands');
    this.brands.unshift({value: '', label: 'None'});
    this.productByCategoryService = new ProductByCategory(this.productCategory);
    await this.getDataTable();
  },
  methods: {
    async getDataTable() {
      const response = await this.productByCategoryService.getAll();
      response.data.map((product) => {
        if (product.brand) {
          product.brand = product.brand.name;
        } else {
          product.brand = 'No Pokemons';
        }
      });
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
        this.dataToSend.category_id = this.productCategory;
        await this.crudService.create(this.dataToSend);
        this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + ' Created', life: 3000});
      }
      this.saveDialog = false;
      this.dataToSend = {};
      await this.getDataTable();
    },
    async configureData() {
      this.configureDialog = true;
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
    async deleteData() {
      await this.crudService.delete(this.selectedData.id);
      this.deleteDataDialog = false;
      this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + 'Deleted', life: 3000});
      this.selectedData = null;
      await this.getDataTable();
    },
    async getSelectData(url) {
      let selectDataService = new SelectDataService(url);
      const data = await selectDataService.getAll();
      return selectDataService.formatData(data.data);
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../../assets/demo/styles/badges.scss';
</style>
