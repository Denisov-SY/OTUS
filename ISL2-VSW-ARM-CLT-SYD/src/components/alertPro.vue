<template>

  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Внимание!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row text-body1">
          {{ alert_text }}
        </div>
      </q-card-section>

      <q-card-section v-if="alert_text_error && show_add" class="q-pt-none">
        <q-separator />
          <div class="row text-body2 text-italic">
             {{ alert_text_error }}
          </div>
        <!-- <q-separator /> -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-if="alert_text_error" color="secondary"  :label="`${!show_add ? 'Показать текст ошибки' : 'Скрыть текст ошибки'}`" @click="onShowAddClick" flat  />
        <q-btn color="primary" label="OK" @click="onCancelClick" />
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
    alert_text: String,
    alert_text_error: String,
  },


  emits: [
    // REQUIRED
    'ok', 'hide'
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


    onShowAddClick() {
      // we just need to hide the dialog
      this.show_add = !this.show_add;
    },

    onCancelClick() {
      // we just need to hide the dialog
      this.hide()
    }
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