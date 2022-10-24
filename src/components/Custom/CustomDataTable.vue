<template>
  <div>
  <DataTable ref="dt" :value="tableData" dataKey="id" :paginator="false" :rows="10" responsiveLayout="scroll">
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

    <div v-for="structure in tableStructure" :key="structure">
      <Column :field="structure.label" :header="structure.label" :sortable="true">
        <template #body="slotProps">
          <span class="p-column-title">structure.label</span>
          {{ slotProps.data[structure.info] }}
        </template>
      </Column>
    </div>

  </DataTable>
    <slot name="paginator"></slot>
  </div>
</template>

<script>
export default {
  name: "ProductTable",
  components: {
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableStructure: {
      type: Array,
      default: () => []
    },
    tableName: {
      type: String,
      default: "Table"
    },
  }
}
</script>

<style scoped>
.truncate {
  max-width: 120px;
}
</style>