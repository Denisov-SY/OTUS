<template>

  <!-- Окно подтверждениия -->
  <!-- <q-dialog v-model="confirm" persistent> -->
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Подтверждение</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row items-center">
        <div class="row text-body1">
          {{ confirm_text }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn label="Нет" color="primary" @click="onCancelClick" />
        <!-- <q-btn label="Да" color="primary" v-close-popup @click="confirm_function(confirm_function_arg)" /> -->
        <q-btn label="Да" color="primary" @click="onOk1Click" />
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
    // techOpId: Number,
    confirm_text: String,
    // alert_text_error: String,
  },


  emits: [
    // REQUIRED
    'ok1', 'cancel', "hide",
  ],
  data() {
    return {

      show_add: false,
      // show_add_label: "Показать текст ошибки",
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


    // onShowAddClick() {
    //   // we just need to hide the dialog
    //   this.show_add = !this.show_add;
    // },

    onCancelClick() {
      // we just need to hide the dialog
      this.$emit('cancel');
      this.hide();
    },
    onOk1Click() {
      // we just need to hide the dialog
      this.$emit('ok1');
      this.hide();
    },
  },

  setup(props, context) {
    // const isPwd = 
    return {
      // isPwd: ref(true),
    }
  }
}
</script>

<style lang="sass" scoped>
.button-enter-cancel
	width: 10rem
	// padding: 
</style>