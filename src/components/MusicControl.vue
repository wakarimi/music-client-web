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
import CategoryPanel from "@/components/panels/categories/CategoryPanel.vue";
import PlaybackPanel from "@/components/panels/current-state/CurrentStatePanel.vue";
import {defineComponent, ref} from "vue";
import SongPanel from "@/components/panels/static/songs/SongsPanel.vue";
import NowPlayingPanel from "@/components/panels/static/NowPlayingPanel.vue";
import LastSongsPanel from "@/components/panels/static/LastSongsPanel.vue";
import FilesPanel from "@/components/panels/static/files/FilesPanel.vue";
import PlaylistsPanel from "@/components/panels/static/PlaylistsPanel.vue";
import AlbumsPanel from "@/components/panels/static/albums/AlbumsPanel.vue";
import GenresPanel from "@/components/panels/static/genres/GenresPanel.vue";
import ArtistsPanel from "@/components/panels/static/artists/ArtistsPanel.vue";

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
  height: 100%;
}

.column {
  overflow: auto;
}

.column-tabs,
.column-custom {
  display: flex;
  flex-direction: column;
}

.tabs-list,
.custom-list {
  list-style: none;
  padding: 0;
}

.tabs-list li,
.custom-list li {
  margin-bottom: 5px;
}

.button {
  text-align: center;
  padding: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
}

.button:hover {
  background-color: #e8e8e8;
}

.column-tabs {
  width: 20%;
}

.column-content {
  width: 60%;
}

.column-custom {
  width: 20%;
}

.grid button {
  width: calc(300% / 3);
  padding: 0;
  overflow: hidden;
}

.grid button::before {
  content: '';
  display: block;
  padding-top: 100%;
}

.grid button > span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.column:not(:last-child) {
  border-right: 2px solid #F5F1ED;
}
</style>
