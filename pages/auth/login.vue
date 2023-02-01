<template>
  <v-app>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-form ref="form" @submit.prevent="submit">
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Admin panel</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-account"
                    name="Email"
                    label="Email"
                    type="text"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
import {Auth} from "@/service/user";

export default {
  name: "login",
  layout: "auth",
  data() {
    return {
      email: '',
      password: '',
      emailRules: [(v) => !!v || 'Введите email'],
      passwordRules: [(v) => !!v || 'Введите пароль'],
    }
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return
      }
      try {
        const authData = await Auth(this.email, this.password)
        this.$toast.open({
          message: authData.message,
          type: authData.success ? 'success' : 'error',
        })
        await this.$store.dispatch('user/setUser', {
          // user: authData['user'],
          access_token: authData['access_token'],
        })
        await this.$router.push('/')
      }catch (e) {
        console.log(e)
      }
    }
  }
};
</script>

<style scoped></style>
