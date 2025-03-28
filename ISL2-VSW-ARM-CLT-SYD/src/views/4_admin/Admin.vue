<template>
  <div>
    <div>
      admin -&gt; Admin
    </div>
    <div>
      <!-- <q-tree :nodes="routesDetail" node-key="name" v-model:selected="pageSelected" :filter="pageFilter" :filter-method="treeFilter" selected-color="blue" dark default-expand-all /> -->
    </div>
    <div>
      <q-list>
        <!-- <q-expansion-item expand-separator icon="perm_identity" label="Account settings 1" caption="John Doe 1" /> -->
        <template v-for="(r1, idx) in routesDetail" :key="(routesDetail?.name + '-' + r1.name)">
          <q-expansion-item v-if="!!r1.label?.trim()" :class="(routesDetail?.name + '-' + r1.name)" :label="r1.label" :header-inset-level="0" :content-inset-level="0.5"
            :default-opened="true">
            <template v-if="r1.children">

              <template v-for="(r2, idx) in r1.children" :key="(r1?.name + '-' + r2.name)">
                <q-expansion-item :class="(r1?.name + '-' + r2.name)" :label="r2.label" :header-inset-level="0" :content-inset-level="0.5" :hide-expand-icon="!r2.children">
                  <template v-if="r2.children">

                    <template v-for="(r3, idx) in r2.children" :key="(r1?.name + '-' + r2?.name + '-' + r3.name)">
                      <q-expansion-item :class="(r1?.name + '-' + r2?.name + '-' + r3.name)" :label="r3.label" :header-inset-level="0" :content-inset-level="0.5"
                        :hide-expand-icon="!r3.children">
                        <template v-if="r3.children">

                          <template v-for="(r4, idx) in r3.children" :key="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name)">
                            <q-expansion-item :class="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name)" :label="r4.label" :header-inset-level="0"
                              :content-inset-level="0.5" :hide-expand-icon="!r4.children">
                              <template v-if="r4.children">

                                <template v-for="(r5, idx) in r4.children" :key="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name + '-' + r5.name)">
                                  <q-expansion-item :class="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name + '-' + r5.name)" :label="r5.label" :header-inset-level="0"
                                    :content-inset-level="0.5" :hide-expand-icon="!r3.children">
                                    <template v-if="r5.children">
                                    </template>
                                  </q-expansion-item>
                                </template>


                              </template>
                            </q-expansion-item>
                          </template>


                        </template>
                      </q-expansion-item>
                    </template>

                  </template>
                </q-expansion-item>
              </template>

            </template>
          </q-expansion-item>
        </template>


        <!-- <q-expansion-item v-for="(r1, idx) in routesDetail" :key="(routesDetail?.name + '-' + r1.name)" :class="(routesDetail?.name + '-' + r1.name)" :label="r1.label"
          :header-inset-level="0" :content-inset-level="0.5" :default-opened="true">
          <template v-if="r1.children">
            <q-expansion-item v-for="(r2, idx) in r1.children" :key="(r1?.name + '-' + r2.name)" :class="(r1?.name + '-' + r2.name)" :label="r2.label"
              :header-inset-level="0" :content-inset-level="0.5" :hide-expand-icon="!r2.children">

              <template v-if="r2.children">
                <div v-for="(r3, idx) in r2.children" :key="(r2?.name + '-' + r3.name)" :class="(r2?.name + '-' + r3.name)">
                  <q-expansion-item :label="r3.label" :header-inset-level="0" :content-inset-level="0.5" :hide-expand-icon="!r3.children">

                  </q-expansion-item>
                </div>
              </template>
            </q-expansion-item>
          </template>
        </q-expansion-item> -->


      </q-list>


    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { QTree, QList, QExpansionItem, QItem, useQuasar } from "quasar";

import routes from "../../router/routes";
import access from '../../components/access';

const routesDetail = ref(routes[0].children); //ref([{ name: "test01", label: "t1" }, { name: "test02", label: "t2", children: [{name: "k1", label: "k1"}] }, { name: "test03", label: "t3" }, { name: "test04", label: "t4" }]);
const pageSelected = ref(false);
const pageFilter = ref('1');

function treeFilter(node, filter) {
  // console.log('node: ', node);
  // return node.visible !== false;
  return access.check(node.meta?.permission?.visible) ?? true;
}



</script>
