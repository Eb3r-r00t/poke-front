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
          <product-table :table-data="tableData" :table-name="tableName" :configure-button="true" @edit-data="editData"
                         @delete-data="openDelete" @configure-data="configureData"></product-table>
        </div>

        <div v-if="schema">
          <save-form :save-dialog="saveDialog" :name="name" :default-data="[{category_id: productCategory}]"
                     :schema="schema" :crud-service="crudService"
                     @close-dialog="saveDialog = $event" @refresh-data="getDataTable">
          </save-form>
        </div>

        <Dialog v-model:visible="configureDialog" :style="{width: '450px'}" :header="name + ' Configs'" :modal="true"
                class="p-fluid">
          <div class="field">
            <FormKit
                type="form"
                v-model="configureDataToSend"
                submit-label="Send"
                @submit="saveConfig"
                :config="{
                classes: { wrapper: {'formkit-wrapper' : false },},
              }"
            >
              <FormKit
                  name="input_voltage"
                  label="Input Voltage"
                  placeholder="Choose the input voltage"
                  type="select"
                  :options="voltages"
                  required
              />
              <FormKit
                  name="output_voltage"
                  label="Output Voltage"
                  placeholder="Choose the output voltage"
                  type="select"
                  :options="voltages"
                  required
              />
              <FormKit
                  name="power_kva"
                  label="Power KVA"
                  placeholder="Type the power in KVA"
                  type="number"
                  required
              />
            </FormKit>
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
import ProductConfigsService from "@/service/ProductConfigsService";
import ProductTable from "@/pages/Crud/Products/ProductTable";
import {mapActions} from "vuex";
import ProductSchema from "@/forms/Product/CreateProductSchema";
import SaveForm from "@/components/SaveForm";

export default {
  name: 'Transformers',
  components: {
    ProductTable,
    SaveForm
  },
  data() {
    return {
      name: 'Transformers',
      tableName: 'Manage Transformers',
      tableData: null,
      selectedData: null,
      crudService: null,
      selectDataService: null,
      productConfigsService: null,
      saveDialog: false,
      configureDialog: false,
      deleteDataDialog: false,
      brands: [],
      brand: null,
      productCategory: 7,
      descriptions: [],
      filters: {},
      submitted: false,
      formData: {},
      configureDataToSend: {},
      schema: null,
      voltages: [220, 380, 480, 600],
    }
  },
  async created() {
    this.crudService = new CRUDService('products');
    this.productConfigsService = new ProductConfigsService('transformer_configs');
    this.productByCategoryService = new ProductByCategory(this.productCategory);
    this.schema = await ProductSchema();
    await this.getDataTable();
  },
  methods: {
    ...mapActions(['setFormData']),

    async getDataTable() {
      const response = await this.productByCategoryService.getAll();
      response.data.map((product) => {
        if (product.brand) {
          product.brand = product.brand.name;
        } else {
          product.brand = 'No Brand';
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
      this.setFormData({});
      this.saveDialog = true;
    },

    async configureData(data) {
      this.configureDialog = true;
      this.selectedData = data;
      const response = await this.productConfigsService.get(this.selectedData.id);
      this.configureDataToSend = response.data ? response.data : {};
    },

    async saveConfig() {
      if (this.configureDataToSend.id) {
        await this.productConfigsService.update(this.selectedData.id, this.configureDataToSend);
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: this.name + ' Config Updated',
          life: 3000
        });
      } else {
        await this.productConfigsService.create(this.selectedData.id, this.configureDataToSend);
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: this.name + ' Config Created',
          life: 3000
        });
      }
      this.configureDialog = false;
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
@import '../../../assets/demo/styles/badges.scss';
</style>
