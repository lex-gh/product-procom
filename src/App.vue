<template>
  <div class="wrapper">
    <div class="product">
      <div class="product__content">
        <p v-if="!products.length">Список пуст...</p>
        <ul class="content__list" v-else>
          <li
            class="content__item"
            v-for="product in products"
            :key="product.id"
          >
            <input
              v-model="product.completed"
              @change="sortByCompleted"
              type="checkbox"
              :id="product.id"
              autocomplete="off"
            />
            <label class="content__text" :for="product.id"></label>
            <p :class="[{ 'is-delete': product.completed }]">
              {{ product.value }}
            </p>
            <i
              @click="deleteProduct(product.id)"
              class="material-icons delete"
            ></i>
          </li>
        </ul>
      </div>
      <div class="product__action">
        <div class="action__input">
          <input
            v-model="inputValue"
            type="text"
            name="input"
            id="input"
            placeholder="Новый продукт"
            @keydown.enter="addProduct"
          />
        </div>
        <button class="button" @click="addProduct" :disabled="!inputValue">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Storage } from "./helpers/storage";
const products = ref(Storage.getStorage() || []);
const inputValue = ref("");

watch(products.value, () => {
  Storage.setStorage(products.value);
});

const addProduct = () => {
  if (!inputValue.value) return;
  products.value.unshift({
    id: Date.now(),
    value: inputValue.value,
    completed: false,
  });

  inputValue.value = "";
};

const sortByCompleted = () => {
  products.value.sort(function (a, b) {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    }
    return 0;
  });
};

const deleteProduct = (id) => {
  const index = products.value.findIndex((item) => item.id === id);
  products.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
$blue: #4193ff;
$blue-hover: #2d7de6;
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product {
  max-width: 400px;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  // .product__content
  &__content {
    min-height: 300px;
  }
  // .product__action
  &__action {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding: 20px 0 10px;
    border-top: 1px solid #3333;
  }
}
.content {
  // .content__list
  &__list {
    max-height: 360px;
    overflow-y: auto;
    list-style: none;

    &::-webkit-scrollbar {
      width: 6px;
      background: #f7f7f7;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #70c6ff69;
      border-radius: 9em;
      box-shadow: inset 1px 1px 10px #70c6ff69;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #68bbff7a;
    }
  }
  // .content__item
  &__item {
    position: relative;
    display: flex;
    padding: 10px;
    gap: 15px;
    &:not(:last-child) {
      border-bottom: 1px dashed #5e5e5e;
    }

    input {
      display: none;
      &:checked ~ .is-delete::after {
        width: 100%;
      }

      &:checked ~ label {
        background: $blue;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          color: #fff;
          pointer-events: none;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 10px;
          left: 16px;
          width: 6px;
          height: 14px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          pointer-events: none;
        }
      }
    }

    p {
      flex: 1;
      font-size: 18px;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid #3333;
    border-radius: 3px;
    font-size: 20px;
    color: #5e5e5e;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      border-color: $blue;
    }

    i {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.action {
  // .action__input
  &__input {
    width: 100%;
    min-height: 40px;
    border: 1px solid #c6c6c6;
    border-radius: 10px;
    overflow: hidden;
    input {
      width: 100%;
      height: 100%;
      outline: none;
      padding: 0 10px;
      border: none;
      font-family: "Fira Code", sans-serif;
      font-size: 16px;
      color: #333;
    }
  }
}
.button {
  width: 100%;
  padding: 10px 20px;
  background: $blue;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: $blue-hover;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.is-delete {
  position: relative;

  &::after {
    content: "";
    width: 0%;
    height: 3px;
    position: absolute;
    top: calc(50% - 3px / 2);
    left: 0;
    background: tomato;
    transition: 300ms ease-in-out;
  }
}

.material-icons {
  color: #3333;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: tomato;
  }
}
</style>
