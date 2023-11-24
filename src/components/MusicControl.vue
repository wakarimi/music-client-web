<template>
  <div class="container">
    <div class="column column-tabs">
      <CategoryPanel @change-category="changeCategory"/>
    </div>
    <div class="column column-content">
      <component
          :is="currentPanel"
          :key="componentKey"
          @addClick="handleEventAdd"
          @infoClick="handleEventInfo"
          @playClick="handleEventPlay"
      />
    </div>
    <div class="column column-custom">
      <PlaybackPanel/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoryPanel from "@/components/panels/CategoryPanel.vue";
import PlaybackPanel from "@/components/panels/current-state/CurrentStatePanel.vue";
import {defineComponent, ref} from "vue";
import SongPanel from "@/components/panels/songs/SongsPanel.vue";
import NowPlayingPanel from "@/components/panels/NowPlayingPanel.vue";
import LastSongsPanel from "@/components/panels/LastSongsPanel.vue";
import FilesPanel from "@/components/panels/files/FilesPanel.vue";
import PlaylistsPanel from "@/components/panels/PlaylistsPanel.vue";
import AlbumsPanel from "@/components/panels/albums/AlbumsPanel.vue";
import GenresPanel from "@/components/panels/genres/GenresPanel.vue";
import ArtistsPanel from "@/components/panels/artists/ArtistsPanel.vue";

type PanelComponents = {
  [key: string]: ReturnType<typeof defineComponent>;
};

const panels: PanelComponents = {
  "controlNow": NowPlayingPanel,
  "controlLast": LastSongsPanel,
  "controlAlbums": AlbumsPanel,
  "controlArtists": ArtistsPanel,
  "controlGenres": GenresPanel,
  "controlPlaylist": PlaylistsPanel,
  "controlSongs": SongPanel,
  "controlFiles": FilesPanel,
};

const currentPanel = ref<ReturnType<typeof defineComponent>>(AlbumsPanel);
const componentKey = ref(0);

function changeCategory(panelName: string) {
  if (panelName in panels) {
    currentPanel.value = panels[panelName];
    componentKey.value++;
  } else {
    throw new Error(`Panel ${panelName} is not defined`);
  }
}

const handleEventInfo = (songId: number) => {
  console.log(`handleEventInfo. Песня:${songId}`);
};

const handleEventAdd = (songIds: number[]) => {
  const number = songIds.length;
  console.log(`handleEventAdd Количество песен: ${number}, Сами песни: ${songIds}`);
};

const handleEventPlay = (songIds: number[]) => {
  const number = songIds.length;
  console.log(`handleEventPlay Количество песен: ${number}, Сами песни: ${songIds}`);
};

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
  min-width: 200px;
  width: 11%;
}

.column-content {
  width: 65%; /* Ширина для столбца с контентом */
}

.column-custom {
  width: 24%; /* Ширина для кастомного столбца */
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
