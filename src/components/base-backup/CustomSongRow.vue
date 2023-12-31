<template>
  <div
      class="custom-song-row"
  >
    <button
        class="song-row-button"
    >
      <div class="song-row-left">
        <img
            :src="getSongCover()"
            alt="song-cover"
            class="song-cover">
        <span class="song-description">
          {{ getSongDescription() }}
        </span>
      </div>
      <div class="song-row-right">
        <div class="control-button-wrapper">
          <CustomButton
              :button-icon="infoIcon"
              :size-change-percent="2"
              button-padding="4px"
              class="control-button right-element"
              @click="handleInfoClick($event, songId)"
          />
          <CustomButton
              :button-icon="addIcon"
              :size-change-percent="2"
              button-padding="4px"
              class="control-button right-element"
              @click="handleAddClick($event, [songId])"
          />
          <CustomButton
              :button-icon="playIcon"
              :size-change-percent="2"
              button-padding="4px"
              class="control-button right-element"
              @click="handlePlayClick($event, [songId])"
          />
        </div>
        <span class="song-duration right-element">
          {{ getSongDuration() }}
        </span>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {useSongsStore} from "@/stores/useSongsStore";
import defaultCover from "@/assets/default/cover.svg"
import CustomButton from "@/components/base-backup/CustomButton.vue";
import infoIcon from "@/assets/icons/playback-control/info.svg"
import addIcon from "@/assets/icons/playback-control/add.svg"
import playIcon from "@/assets/icons/playback-control/play.svg"
import type {Song} from "@/services/SongService";
import {useArtistsStore} from "@/stores/useArtistsStore";
import {useAudioFilesStore} from "@/stores/useAudioFilesStore";
import type {AudioFile} from "@/services/AudioFileService";
import {useCoversStore} from "@/stores/useCoversStore";

const props = defineProps({
  songId: {
    type: Number,
    required: true,
  },
})

const songStore = useSongsStore()
const artistStore = useArtistsStore()
const audioFileStore = useAudioFilesStore()
const coverStore = useCoversStore()

function getSongCover(): string {
  let song: Song | null;
  song = null;

  if (!songStore.getSong(props.songId)) {
    songStore.fetchAllSongs();
  }
  if (songStore.getSong(props.songId)) {
    song = songStore.getSong(props.songId);
  }
  if (!song) {
    return defaultCover;
  }

  if (!coverStore.getCoverIdByAudioFileId(song.audioFileId)) {
    coverStore.fetchAudioFileCover(song.audioFileId)
  }
  const coverId = coverStore.getCoverIdByAudioFileId(song.audioFileId)
  if (coverId) {
    return coverStore.getCoverByCoverId(coverId);
  } else {
    return defaultCover;
  }
}

function getSongDuration(): string {
  let song: Song | null;
  song = null;
  let audioFile: AudioFile | null;
  audioFile = null;

  if (!songStore.getSong(props.songId)) {
    songStore.fetchAllSongs();
  }
  if (songStore.getSong(props.songId)) {
    song = songStore.getSong(props.songId);
  }
  if (!song) {
    return "00:00";
  }

  if (!audioFileStore.getAudioFile(song.audioFileId)) {
    audioFileStore.fetchAllAudioFiles();
  }
  if (audioFileStore.getAudioFile(song.audioFileId)) {
    audioFile = audioFileStore.getAudioFile(song.audioFileId);
  }

  if (audioFile) {
    return formatDuration(audioFile.durationMs);
  } else {
    return "00:00";
  }
}

function formatDuration(durationMs: number) {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedHours = hours < 10 ? '0' + hours : hours;

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

function getSongDescription(): string {
  let song: Song | null;
  song = null;
  let audioFile: AudioFile | null;
  audioFile = null;
  let description = "";

  if (!songStore.getSong(props.songId)) {
    songStore.fetchAllSongs();
  }
  if (songStore.getSong(props.songId)) {
    song = songStore.getSong(props.songId);
  }
  if (!song) {
    return ""
  }

  if (!audioFileStore.getAudioFile(song.audioFileId)) {
    audioFileStore.fetchAllAudioFiles();
  }
  if (audioFileStore.getAudioFile(song.audioFileId)) {
    audioFile = audioFileStore.getAudioFile(song.audioFileId)
  }

  if (song.songNumber) {
    description += song.songNumber + ". "
  }

  if (song.title) {
    description += song.title;
  }

  if (song.artistId) {
    if (!artistStore.getArtistById(song.artistId)) {
      artistStore.fetchArtists()
    }
    const artist = artistStore.getArtistById(song.artistId)
    description += " - " + artist?.name;
  }

  if ((description === "") && (audioFile)) {
    description = audioFile.filename
  }

  return description
}

const emit = defineEmits([
  'info-click',
  'add-click',
  'play-click',
]);

function handleInfoClick(event: MouseEvent, songId: number) {
  event.stopPropagation()
  emit('info-click', songId);
}

function handleAddClick(event: MouseEvent, songIds: number[]) {
  event.stopPropagation()
  emit('add-click', songIds);
}

function handlePlayClick(event: MouseEvent, songIds: number[]) {
  event.stopPropagation()
  emit('play-click', songIds);
}
</script>

<style scoped>
.song-row-button {
  width: 100%;
  height: 100%;

  background-color: #FAF8F6;
  border-color: #F0EAE4;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: transform 0.2s ease,
  box-shadow 0.2s ease;
}

.song-row-button:hover {
  transform: scale(1.005);
  box-shadow: 1px 1px 3px #25232344;
}

.song-row-button:active {
  transform: scale(0.995);
  box-shadow: 1px 1px 2px #25232344;
}

.song-row-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  position: relative;
  height: 100%;
}

.song-row-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 100%;
}

.control-button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.song-row-button:hover .control-button-wrapper {
  opacity: 1;
  pointer-events: auto;
}

.song-cover {
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  position: relative;
  border-radius: 10px;
}

.song-cover >>> img {
  height: 100%;
}

.song-description {
  padding-left: 10px;
  font-size: 15px;
}

.control-button {
  height: 80%;
}

.right-element {
  padding-left: 4px;
}

.song-duration {
  padding: 8px;
  font-size: 15px;
}
</style>