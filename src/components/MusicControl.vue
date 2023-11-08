<template>
  <div class="container">
    <div class="column column-tabs">
      <!-- Слушаем событие change-panel и вызываем метод changePanel -->
      <CategoryPanel @change-panel="changePanel" />
    </div>
    <div class="column column-content">
      <!-- Динамически изменяемый компонент -->
      <component :is="currentPanel" />
    </div>
    <div class="column column-custom">
      <PlaybackPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryPanel from "@/components/CategoryPanel.vue";
import AlbumPanel from "@/components/AlbumPanel.vue";
import ArtistPanel from "@/components/ArtistPanel.vue";
import PlaybackPanel from "@/components/PlaybackPanel.vue";
import {defineComponent, ref} from "vue";
import DirectoryMain from "@/components/directories/DirectoryMain.vue";

// Определите тип для сопоставления имен с компонентами
type PanelComponents = {
  [key: string]: ReturnType<typeof defineComponent>;
};

// Создайте объект сопоставления с явным типом
const panels: PanelComponents = {
  'Исполнители': ArtistPanel, // Предполагаем, что ArtistPanel это компонент, определенный через defineComponent
  'Альбомы': AlbumPanel, // и так далее для других компонентов
  "Файлы": DirectoryMain,
  // ... остальные компоненты ...
};

const currentPanel = ref<ReturnType<typeof defineComponent>>(AlbumPanel);

function changePanel(panelName: string) {
  // Проверка, что panelName действительно существует в объекте panels
  if (panelName in panels) {
    currentPanel.value = panels[panelName];
  } else {
    throw new Error(`Panel ${panelName} is not defined`);
  }
}

</script>

<style scoped>
.container {
  display: flex;
  height: 100%; /* Задаем высоту */
}

.column {
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
  width: 60%; /* Ширина для столбца с контентом */
}

.column-custom {
  width: 25%; /* Ширина для кастомного столбца */
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

.column:not(:last-child) {
  border-right: 2px solid #F5F1ED; /* Добавляет линию справа от каждого столбца, кроме последнего */
}
</style>
