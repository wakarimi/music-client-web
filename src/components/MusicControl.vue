<template>
  <div class="container">
    <div class="column column-tabs">
      <!-- Компоненты вкладок - вертикальный список кнопок -->
      <ul class="tabs-list">
        <li>
          <GroupGategory buttonText="Сейчас играет">
              <template #image>
                <img src="@/assets/cover.png" alt="Описание изображения" class="slot-image">
              </template>
          </GroupGategory>
          <GroupGategory buttonText="Последние">
            <template #image>
              <img src="@/assets/cover.png" alt="Описание изображения" class="slot-image">
            </template>
          </GroupGategory>
          <GroupGategory buttonText="Альбомы">
            <template #image>
              <img src="@/assets/cover.png" alt="Описание изображения" class="slot-image">
            </template>
          </GroupGategory>
          <GroupGategory buttonText="Исполнители">
            <template #image>
              <img src="@/assets/cover.png" alt="Описание изображения">
            </template>
          </GroupGategory>
          <GroupGategory buttonText="Жанры">
            <template #image>
              <img src="@/assets/cover.png" alt="Описание изображения">
            </template>
          </GroupGategory>
          <GroupGategory buttonText="Дорожки">
            <template #image>
              <img src="@/assets/cover.png" alt="Описание изображения">
            </template>
          </GroupGategory>
          <GroupGategory buttonText="Файлы">
            <template #image>
              <img src="@/assets/cover.png" alt="Описание изображения">
            </template>
          </GroupGategory>
        </li>
      </ul>
    </div>
    <div class="column column-content">
      <!-- Компоненты сетки - сетка кнопок -->
      <div class="grid">
        <button type="button">Обложка 1</button>
        <button type="button">Обложка 2</button>
        <button type="button">Обложка 3</button>
        <button type="button">Обложка 1</button>
        <button type="button">Обложка 2</button>
        <button type="button">Обложка 3</button>
        <button type="button">Обложка 1</button>
        <button type="button">Обложка 2</button>
        <button type="button">Обложка 3</button>
        <button type="button">Обложка 1</button>
        <button type="button">Обложка 2</button>
        <button type="button">Обложка 3</button>
        <!-- ... Добавьте больше кнопок, они автоматически выстроятся в сетку -->
      </div>
    </div>
    <div class="column column-custom">
      <!-- Кастомные компоненты - вертикальный список кнопок -->
      <ul class="custom-list">
        <li><button type="button">Пользовательская кнопка 1</button></li>
        <li><button type="button">Пользовательская кнопка 2</button></li>
        <li><button type="button">Пользовательская кнопка 3</button></li>
        <!-- ... Добавьте больше кнопок по мере необходимости -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Здесь TypeScript логика, если она вам понадобится
import GroupGategory from "@/components/GroupGategory.vue";
</script>

<style scoped>
.container {
  display: flex;
  height: 100%; /* Задаем высоту */
}

.column {
  padding: 10px; /* Отступы внутри каждого столбца */
  overflow: auto; /* Прокрутка при переполнении */
}

.column-tabs,
.column-custom {
  display: flex;
  flex-direction: column; /* Для вертикального списка кнопок */
}

.tabs-list,
.custom-list {
  list-style: none; /* Убираем маркеры списка */
  padding: 0; /* Убираем внутренние отступы */
}

.tabs-list li,
.custom-list li {
  margin-bottom: 5px; /* Отступ между кнопками */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* Сетка с авто-заполнением и минимальной шириной для кнопок */
  grid-gap: 10px; /* Отступы между кнопками в сетке */
}

.button {
  text-align: center; /* Выравнивание текста внутри кнопки */
  padding: 5px; /* Отступ внутри кнопки */
  border: 1px solid #ccc; /* Рамка вокруг кнопки */
  background-color: #f8f8f8; /* Фон кнопки */
  cursor: pointer; /* Курсор в виде руки при наведении */
}

.button:hover {
  background-color: #e8e8e8; /* Фон кнопки при наведении */
}

.column-tabs {
  width: 15%; /* Ширина для столбца вкладок */
}

.column-content {
  width: 55%; /* Ширина для столбца с контентом */
}

.column-custom {
  width: 30%; /* Ширина для кастомного столбца */
}

.grid button {
  position: relative; /* Для позиционирования псевдоэлемента */
  width: calc(300% / 3); /* 2 раза шире, делённое на количество кнопок в ряду */
  padding: 0; /* Убираем стандартные отступы кнопки */
  overflow: hidden; /* Обрезаем содержимое, если выйдет за рамки */
}

.grid button::before {
  content: '';
  display: block;
  padding-top: 100%; /* Соотношение сторон 1:1 для высоты */
}

.grid button > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Ваш текст или содержимое будет здесь */
}

</style>
