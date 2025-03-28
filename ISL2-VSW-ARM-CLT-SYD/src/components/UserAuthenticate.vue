<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-grey-5" bordered style="padding: 1rem;">

      <q-card-section align="center">
        <div class="row">
          <div class="col-12 q-py-lg">
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input outlined v-model="username" type="text" label="Пользователь:" class="q-py-sm " input-class="input1" bg-color="grey-3" label-color="grey-7"
              style="min-width: 15rem;" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input outlined v-model="password" :type="isPwd ? 'password' : 'text'" label="Пароль:" @keyup.enter="onOKClick" class="col-8 q-py-sm " input-class="input1"
              label-color="grey-7" style="min-width: 15rem;" bg-color="grey-3">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Войти" @click="onOKClick" no-caps size="lg" class="button-enter-cancel" :loading="loadingData" />
        <q-btn color="secondary" label="Отмена" @click="onCancelClick" no-caps size="lg" class="button-enter-cancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref, watch, computed } from "vue";

import { Notify } from 'quasar';

import { loadData } from './serverData';
import access from './access';

export default {
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  data() {
    return {
      username: '',
      password: '',
      loadingData: false,
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    async onOKClick() {
      const PROC_NAME = "UserAuthenticate.onOKClick> ";
      let authenticate = false;
      // console.log(`${PROC_NAME}username: "${this.username}"; password: "${this.password}"`);

      this.loadingData = true;
      try {
        console.log(PROC_NAME + `username: ${this.username}; password: ${this.password} `);
        // const ret = await loadData({ url: loadLoginUrl, params: { username: this.username, password: this.password, }, });
        const ret = await access.user.login({ username: this.username, password: this.password });


        console.log(PROC_NAME + "after loadData ret=", ret);
        if (ret && !ret.error) {
          await access.create({ username: ret.username, permissions: ret.permissions, });
          authenticate = { username: ret.username, permissions: ret.permissions, };
        } else {
          throw new Error(ret ? ret.error.status : "ret is undefined!!!");
        }
        // if (this.username === 'prn' && this.password === 'prn') {
        // 	routes[0].children[1].children[4].visible = true;
        // 	authenticate = true;
        // } else {
        // 	routes[0].children[1].children[4].visible = false;
        // 	authenticate = true;
        // }

        // on OK, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog
        this.$emit('ok', authenticate);
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      } catch (err) {
        console.error(err);
        this.password = "";
        Notify.create({
          message: 'Ошибка аутентификации пользователя на сервере! \r\n' + err.message,
          color: 'negative',
          icon: 'warning'
        })

      } finally {
        this.loadingData = false;
      }
    },

    onCancelClick() {
      // we just need to hide the dialog
      this.hide()
    }
  },

  setup(props, context) {
    // const isPwd = 
    return {
      isPwd: ref(true),
    }
  }
}
</script>

<style lang="sass" scoped>
.button-enter-cancel
	width: 10rem
	// padding: 
</style>