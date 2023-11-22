<template>
  <div
      class="custom-song-row"
  >
    <button
        class="song-row-button"
    >
      <div class="song-row-left">
        <img
            class="song-cover"
            :src="getSongCover()"
            alt="song-cover">
        <span class="song-description">
          {{ getSongDescription() }}
        </span>
      </div>
      <div class="song-row-right">
        <CustomButton
            class="control-button right-element"
          :button-icon="infoIcon"
          button-padding="4px"
            :size-change-percent="2"
        />
        <CustomButton
            class="control-button right-element"
            :button-icon="addIcon"
            button-padding="4px"
            :size-change-percent="2"
        />
        <CustomButton
            class="control-button right-element"
            :button-icon="playIcon"
            button-padding="4px"
            :size-change-percent="2"
        />
        <span class="song-duration right-element">
          {{ getSongDuration() }}
        </span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import {useSongsStore} from "@/stores/useSongsStore";
import defaultCover from "@/assets/default/cover.svg"
import CustomButton from "@/components/base/CustomButton.vue";
import infoIcon from "@/assets/icons/song-row/info.svg"
import addIcon from "@/assets/icons/song-row/add.svg"
import playIcon from "@/assets/icons/song-row/play.svg"
import type {Song} from "@/services/SongService";
import {useArtistsStore} from "@/stores/useArtistsStore";
import {useAudioFilesStore} from "@/stores/useAudioFilesStore";

const props = defineProps({
  songId: {
    type: Number,
    required: true,
  },
})

const songStore = useSongsStore()
const artistStore = useArtistsStore()
const audioFileStore = useAudioFilesStore()

function getSongCover(): string {
  return defaultCover;
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

function formatDuration(durationMs) {
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
    if (!artistStore.getArtist(song.artistId)) {
      artistStore.fetchAllArtists()
    }
    const artist = artistStore.getArtist(song.artistId)
    description += " - " + artist?.name;
  }

  if ((description === "") && (audioFile)) {
    description = audioFile.filename
  }

  return description
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