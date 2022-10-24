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

        <DataTable ref="dt" :value="products" v-model:selection="selectedProduct" dataKey="id" :paginator="true" :rows="10"
                   :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                   responsiveLayout="scroll">
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">Manage Products</h5>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
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
          <Column field="price" header="Price" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ slotProps.data.price }}
            </template>
          </Column>
          <Column field="quantity" header="Quantity" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Quantity</span>
              {{ slotProps.data.quantity }}
            </template>
          </Column>
          <Column field="description" header="Description" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Description</span>
              {{ slotProps.data.description }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ slotProps.data.category.name }}
            </template>
          </Column>
          <Column field="brand" header="Brand" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Brand</span>
              {{ slotProps.data.brand.name }}
            </template>
          </Column>
          <Column>
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                      @click="editProductCategory(slotProps.data)"/>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProductCategory(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Brand Details" :modal="true"
                class="p-fluid">
          <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="product.name" required="true" autofocus
                       :class="{'p-invalid': submitted && !product.name}"/>
            <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20"/>
          </div>
          <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProductCategory"/>
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductCategoryDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductCategoryDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProductCategory" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>

</template>

<script>
import ProductService from "@/service/ProductService";

export default {
  name: 'Products',
  data() {
    return {
      products: null,
      productsService: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProduct: null,
      filters: {},
      submitted: false,
    }
  },
  created() {
    this.ProductCategoryService = new ProductService();
  },
  async mounted() {
    this.products = Object.assign({}, await this.ProductCategoryService.getProducts()).data.data;
  },
  methods: {
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
      console.log('openNew');
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    async saveProductCategory() {
      this.submitted = true;
      if (this.product.id) {
        await this.ProductCategoryService.updateProductCategory(this.product);
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      } else {
        await this.ProductCategoryService.createProductCategory(this.product);
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }
      this.productDialog = false;
      this.product = {};
      await this.updateTable();
    },
    async updateTable() {
      this.products = Object.assign({}, await this.ProductCategoryService.getProductCategories()).data.data;
    },
    editProductCategory(product) {
      this.product = {...product};
      this.productDialog = true;
    },
    confirmDeleteProductCategory(product) {
      this.product = product;
      this.deleteProductCategoryDialog = true;
    },
    async deleteProductCategory() {
      await this.ProductCategoryService.deleteProductCategory(this.product.id);
      this.deleteProductCategoryDialog = false;
      this.$toast.add({severity:'success', summary: 'Successful', detail: 'Brand Deleted', life: 3000});
      await this.updateTable();
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/styles/badges.scss';
</style>
