<template>
  <Paginator :rows="10" :totalRecords="100" @page="onPage($event)"></Paginator>
</template>

<script>
import GraphqlService from "@/service/GraphqlService";

export default {
  name: "CustomPaginator",
  async created() {
    let query = `query {
      usersPaginated {
        data{
          id
          name
          email
        }
        paginatorInfo{
           count
           currentPage
           lastPage
        }
      }
    }`;

    let apiService = new GraphqlService();
    const response = await apiService.query(query);
    console.log('test', response);
  },
  methods: {
    onPage(event) {
      console.log(event);
    }
  },
}
</script>

<style scoped>

</style>