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
  min-width: 200px;
}

.column-content {
  width: 80%;
}

.column-custom {
  width: 25%;
  min-width: 280px;
}

.grid button {
  position: relative;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.column:not(:last-child) {
  border-right: 2px solid #F5F1ED;
}
</style>
