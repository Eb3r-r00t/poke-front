<template>
  <DataTable ref="dt" :value="tableData" dataKey="id" :paginator="true"
             :rows="10"
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
    <Column field="brand" header="brand" :sortable="true">
      <template #body="slotProps">
        <span class="p-column-title">Brand</span>
        {{ slotProps.data.brand }}
      </template>
    </Column>
    <Column class="truncate" field="description" header="Description" :sortable="true">
      <template #body="slotProps">
        <span class="p-column-title">Description</span>
        {{ slotProps.data.description }}
      </template>
    </Column>
    <Column field="price" header="Price" :sortable="true">
      <template #body="slotProps">
        <span class="p-column-title">Price</span>
        {{ slotProps.data.price }}
      </template>
    </Column>
    <Column field="Stock" header="Stock" :sortable="true">
      <template #body="slotProps">
        <span class="p-column-title">Stock</span>
        {{ slotProps.data.stock }}
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                @click="$emit('editData', slotProps.data)"/>
        <Button v-if="configureButton" icon="pi pi-cog" class="p-button-rounded p-button-primary mr-2" @click="$emit('configureData', slotProps.data)"/>
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2"
                @click="$emit('deleteData', slotProps.data)"/>
      </template>
    </Column>
  </DataTable>
</template>

<script>
export default {
  name: "ProductTable",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableName: {
      type: String,
      default: "Products"
    },
    configureButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.truncate {
  max-width: 120px;
}
</style>