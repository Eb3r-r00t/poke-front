<template>
  <Dialog v-model:visible="computedVisible" :style="{width: '450px'}" :header="name + ' Details'" :modal="true"
          class="p-fluid">
    <FormKit
        type="form"
        v-model="localData"
        submit-label="Send"
        @submit="saveData"
        :config="{
            classes: { wrapper: {'formkit-wrapper' : false } }
        }"
    >
      <FormKitSchema :schema="schema"/>
    </FormKit>
  </Dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SaveProductForm",
  props: {
    saveDialog: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    defaultData: {
      type: Array,
      default: () => {
        return []
      }
    },
    crudService: {
      type: Object
    },
    schema: {
      type: Object
    }
  },
  computed: {
    computedVisible: {
      get() {
        return this.saveDialog
      },
      set() {
        this.$emit('closeDialog', false)
      }
    }
  },
  watch: {
    saveDialog() {
      if (this.saveDialog) {
        this.updateFormData()
      }
    }
  },
  data() {
    return {
      localData: {},
      brands: [],
    };
  },
  methods: {
    ...mapGetters(['getFormData']),
    async updateFormData() {
      this.localData = this.getFormData();
    },
    async saveData() {
      console.log(this.crudService);
      // this.defaultData.forEach((item) => {
      //   this.localData = {...this.localData, ...item}
      // })
      // this.submitted = true;
      // if (this.localData.id) {
      //   await this.crudService.update(this.localData.id, this.localData);
      //   this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + ' Updated', life: 3000});
      // } else {
      //   await this.crudService.create(this.localData);
      //   this.$toast.add({severity: 'success', summary: 'Successful', detail: this.name + ' Created', life: 3000});
      // }
      // this.localData = {};
      // this.$emit('closeDialog', false)
      // this.$emit('refreshData')
    },
  }
}
</script>

<style scoped>

</style>