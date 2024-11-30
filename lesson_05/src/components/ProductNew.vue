<template>
  <div class="container">

    <!-- форма ввода данных по продукту -->
    <Form :validation-schema="schema" @submit="addProduct">
      <div class="product-card">
        <div class="row product-title input-group-lg mb-3">
          <div class="col-3">
            <label for="product-title" class="input-group-text cell-title">Название</label>
          </div>
          <div class="col-9 cell-value">
            <Field type="text" name="productVee.title" id="product-title" class="form-control" v-model="productVee.title" v-bind="productVeeAttrs"/>
            <div class="validation-error">
              <ErrorMessage :name="`productVee.title`" />
            </div>
          </div>
        </div>
        <div class="row product-description input-group-lg mb-3">
          <div class="col-3">
            <label for="product-description" class="input-group-text cell-title">Описание</label>
          </div>
          <div class="col-9 cell-value">
            <Field type="text" name="productVee.description" id="product-description" class="form-control" v-model="productVee.description" />
          </div>
        </div>
        <div class="row product-price input-group-lg mb-3">
          <div class="col-3">
            <label for="product-price" class="input-group-text cell-title">Цена</label>
          </div>
          <div class="col-9 cell-value">
            <Field type="number" name="productVee.price" id="product-price" class="form-control" v-model="productVee.price" />
            <div class="validation-error">
              <ErrorMessage :name="`productVee.price`" />
            </div>
          </div>
        </div>
        <div class="row product-rating-rate input-group-lg mb-3">
          <div class="col-3">
            <label for="product-rating-rate" class="input-group-text cell-title">Рейтинг</label>
          </div>
          <div class="col-9 cell-value">
            <Field type="number" name="productVee.rating.rate" id="product-rating-rate" class="form-control" v-model="productVee.rating.rate" />
            <div class="validation-error">
              <ErrorMessage :name="`productVee.rating.rate`" />
            </div>
          </div>
        </div>
        <div class="row product-rating-count input-group-lg mb-3">
          <div class="col-3">
            <label for="product-rating-count" class="input-group-text cell-title">Рейтинг (кол-во)</label>
          </div>
          <div class="col-9 cell-value">
            <Field type="number" name="productVee.rating.count" id="product-rating-count" class="form-control" v-model="productVee.rating.count" />
            <div class="validation-error">
              <ErrorMessage :name="`productVee.rating.count`" />
            </div>
          </div>
        </div>
        <div v-if="true">
          <div> productVeeAttrs: {{ productVeeAttrs }} </div>
          <div> valuesVee: {{ values }} </div>
          <div> errorsVee: {{ errors }} </div>
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary">Добавить</button>
        </div>
      </div>
    </Form>
    <div v-show="informWindow.show" :class="['infom-window']" :style="[informWindow.show ? 'opacity: 1' : 'opacity: 0']">
      <div :class="['infom-window-' + informWindow.type]">
        <h3>
          {{ informWindow.message }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useForm, Form, Field, ErrorMessage } from 'vee-validate';
// import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const schema = yup.object({
  productVee: yup.object({
    title: yup.string().required('Заполните название товара'),
    price: yup.number().required('Заполните цену товара').positive('Цена должна быть больше 0').max(99999),
    rating: yup.object({
      rate: yup.number().required('Заполните рейтинг товара').min(0, "Рейтинг должен быть между 0 и 5").max(5, "Рейтинг должен быть между 0 и 5"),
      count: yup.number().required('Заполните кол-во оценок товара'),
    }),
  }),
}, {

});

const { errors, values, defineField, handleSubmit } = useForm({ validationSchema : schema,});
const [productVee, productVeeAttrs] = defineField('productVee');

const emit = defineEmits(['saving', 'new-prod']);

productVee.value = { title: '', price: 0, rating: { rate: 0, count: 0, } }
const informWindow = ref({ show: false, type: '', message: "", });
// const product = ref({ title: '', price: 0, rating: { rate: 0, count: 0, } });

// watch(product, (val) => {
//   const PROC_NAME = 'ProductNew.watch(product)> ';
//   console.log(PROC_NAME, val);


// }, { deep: true });
async function addProduct(ev) {
  const PROC_NAME = 'ProductNew.addProduct> ';
  // ev.preventDefault();
  console.log(PROC_NAME + 'ev: ', ev);
  

  console.log(PROC_NAME + 'product: ', productVee.value);
  showMessage('wait', 'Сохранение нового товара ("' + productVee.value.title + '")');
  await setTimeoutPromise(Math.random() * 1000 + 5000);

  // emit('saving', true);       // отправляем событие в родительский компонент о том, что производится сохранение нового товара
  fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(productVee.value)
  })
    .catch(async (err) => {
      console.error(PROC_NAME, err)
      showMessage('err', 'Ошибка сохранения нового товара ("' + productVee.value.title + '")');
    })
    .then((res) => res.json())
    .then(async (res) => {

      console.log(PROC_NAME + 'Сохранён новый товар: ', res);
      showMessage('ok', 'Новый товар "' + res.title + '" успешно сохранён.');  // отображаем сообщение об успешном сохранении товара
      await setTimeoutPromise(1000);
      // emit('saving', false);
      emit('new-prod', res);
    })
    .finally(() => {
      // loading.value = false; 
      console.log(PROC_NAME + 'Сохранение нового товара завершено');
      // emit('saving', false);
      informWindow.value.show = false; // скрываем окно сообщения
    });

}

function showMessage(type, message) {
  const PROC_NAME = 'ProductNew.showMessage> ';
  informWindow.value.type = type;
  informWindow.value.message = message;
  informWindow.value.show = true; // показываем окно сообщения
  console.log(PROC_NAME + 'type: ', type);
  console.log(PROC_NAME + 'message: ', message);
}

async function setTimeoutPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

</script>


<style lang="scss" scoped>
// .product-card {
//   background-color: #fff;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   border: 1px solid #ccc;
//   padding: 10px;
//   // width: 300px;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 60px;
//   color: darkblue;
//   border-radius: 4px;
//   height: 380px;
//   position: relative;
// }

.cell-title {
  text-align: right;
  justify-content: right;
}

.cell-value {
  text-align: left;
}

.infom-window {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition-duration: 1s;
  transition-property: opacity;
  transition-delay: 0.3s;
}

.infom-window>div {
  width: 500px;
  height: 600px;
  // background-color: #aaa;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-left: 3rem;
  padding-right: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: 0.5s;
}

.infom-window-wait {
  background-color: rgb(255, 254, 170);
}

.infom-window-ok {
  background-color: #afa;
}

.infom-window-err {
  background-color: #faa;
}

.validation-error {
  color: red;
  font-size: 12px;
  margin-top: 0;
}
</style>
