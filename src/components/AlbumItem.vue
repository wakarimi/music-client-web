<template>
  <div class="album-container">
    <button class="album-item">
      <div class="button-image">
        <button class="extra-button play">
          <img :src="playIcon" alt="Воспроизвести" />
        </button>
        <button class="extra-button add">
          <img :src="addIcon" alt="Добавить в плейлист" />
        </button>
        <slot name="image"></slot>
      </div>
      <span class="button-text">{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import playIcon from "@/assets/album-control/play.svg"
import addIcon from "@/assets/album-control/add.svg"

defineProps({
  buttonText: String
});
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.album-item {
  width: 100%;
  height: 100%;
  cursor: pointer;

  border-radius: 1vh;
  border-color: #F0EAE4;
  border-style: solid;

  background-color: #FAF8F6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Добавляем плавные переходы для трансформации и тени */
  box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* Начальное состояние тени: прозрачная */
}

.album-item:hover {
  transform: scale(1.02); /* Увеличиваем размер компонента на 5% */
  box-shadow: 0 0.3rem 15px rgba(0, 0, 0, 0.3); /* Добавляем тень при наведении */
}

.album-item:active {
  transform: scale(0.98); /* Уменьшаем кнопку до 98% от исходного размера */
  box-shadow: 0 0.2rem 10px rgba(0, 0, 0, 0.2); /* Уменьшаем тень, чтобы создать эффект вдавливания */
}

.button-image {
  width: 100%; /* Ширина обложки равна 100% родителя */
  padding-top: 100%; /* Верхний отступ равный ширине делает элемент квадратным */
  position: relative; /* Для позиционирования изображения */
}

.button-image >>> img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  border-radius: 1vh;
}

.button-text {
  margin: 0.5vh;

  font-size: 1em;
  text-align: center;

  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 2.4em;
  line-height: 1.2em;
}

.album-container {
  position: relative; /* Это позволит позиционировать дополнительные кнопки относительно этого контейнера */
}

.extra-button {
  position: absolute;
  bottom: 10px; /* Располагаем кнопки внизу картинки */
  right: 50px; /* С отступом справа */
  width: 30px; /* Установите желаемый размер кнопок */
  height: 30px;
  background-color: rgba(255, 255, 255, 0); /* Полупрозрачный фон */
  border: none;
  border-radius: 0vh; /* Можно сделать кнопки круглыми */
  opacity: 0; /* Изначально кнопки скрыты */
  transition: opacity 0.3s ease; /* Плавное изменение прозрачности */
  z-index: 10; /* Убедитесь, что кнопки находятся над другими элементами */
}

.extra-button img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Гарантируем, что изображения подгоняются по размеру кнопки */
}

.album-container:hover .extra-button {
  opacity: 1; /* При наведении на контейнер кнопки становятся видными */
}

.play {
  bottom: 10px;
  right: 10px; /* Расположение кнопки "Воспроизвести" слева от кнопки "Добавить в плейлист" */
}

.add {
  /* Кнопка "Добавить в плейлист" будет в правом нижнем углу */
}

/* Стили для изображений внутри кнопок */
.extra-button img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Убедитесь, что изображения подгоняются по размеру кнопки */
}

</style>
