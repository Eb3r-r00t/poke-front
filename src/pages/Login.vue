<template>
  <div class="login-body">

    <div class="login-panel"></div>

    <div class="login-content">
      <img src="layout/images/logo-black.png" alt="babylon-layout"/>

      <h1><span>SIGN IN</span> TO MINER MANAGER</h1>
      <p>Welcome, please use the form to sign-in.</p>

      <div v-if="loginError" class="mb-2">
        <small class="p-error">Wrong user or password</small>
      </div>

      <div class="login-input-wrapper">
        <InputText v-model="username" placeholder="Username or Email" :class="loginError ? 'p-invalid' : ''"/>
        <i class="pi pi-user"></i>
      </div>

      <div class="login-input-wrapper">
        <div>
          <InputText v-model="password" type="password" placeholder="Password" :class="loginError ? 'p-invalid' : ''"/>
          <i class="pi pi-lock"></i>
        </div>
      </div>
      <div v-if="!loading">
        <Button label="Sign In" @click="singIn"/>
      </div>
      <div v-else>
        <Button class="justify-content-center"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></Button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      username: 'superadmin@email.com',
      password: 'password',
      loginError: false,
      loading: false,
    }
  },
  methods: {
    ...mapActions(['login']),

    async singIn() {
      this.loading = true;
      await this.login({
        username: this.username,
        password: this.password
      });
      if (this.$store.state.auth.authenticated) {
        this.$router.push('/');
      } else {
        this.loginError = true;
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>