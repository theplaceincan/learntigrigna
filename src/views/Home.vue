<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { darkTheme, websiteTheme, changeTheme } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(pb.authStore.record !== null);

let helloMsgPop = ref(false);

// Handling welcome screen
let welcomeScreen = ref()
const currentTime = new Date()
const creationTime = new Date(model.value.created)
if (currentTime - creationTime < 30000) {
  welcomeScreen.value = true
} else {
  welcomeScreen.value = false
}
setTimeout(() => {
  welcomeScreen.value = false;
}, 2500);

// Rewards
const titles = ([
  { level: 0, title: "Beginner" },
  { level: 2, title: "Tigrigna Apprentice" },
  { level: 4, title: "Tigrigna Learner" },
  { level: 6, title: "Tigrigna Enthusiast" },
  { level: 8, title: "Tigrigna Explorer" },
  { level: 10, title: "Tigrigna Scholar" },
])
let rewardLevelShow = ref(
  Array(model.value.level)
    .fill(model.value.level)
    .map((_, i) => model.value.level - i)
);

// Function for fetching data
let LessonsList = ref([]);
let ChaptersList = ref([]);
let PhrasesAndWords = ref([]);
let Games = ref([]);
let LearningPlanJSON = ref({
  "chapters": []
});
async function findLessonByID(_id) {
  const lessonData = await pb.collection('lessonplan').getOne(_id, {});
  return {
    lesson_name: lessonData.lesson_name,
    url: lessonData.url,
    description: lessonData.description,
    chapter_id: lessonData.chapter_id,
    chapter_num: lessonData.chapter_num,
  };
}
async function getData() {
  const recById = await pb.collection('chaptersplan').getFullList({ sort: '-created' });
  for (let chapter of recById) {
    LearningPlanJSON.value.chapters.push({
      chapter: chapter.chapter,
      color: "red",
      chapter_num: chapter.chapter_num,
      lessons: [],
    });
    const chapterIndex = LearningPlanJSON.value.chapters.length - 1;
    const lessonPromises = chapter.lessons.map(async lessonId => {
      const lessonData = await findLessonByID(lessonId);
      LearningPlanJSON.value.chapters[chapterIndex].lessons.push(lessonData);
    });
    await Promise.all(lessonPromises);
  }
  PhrasesAndWords.value = await pb.collection("wordslist").getFullList({ sort: "-created" });
  Games.value = await pb.collection("gameCards").getFullList({ sort: "-created" });
}

// Authentication-related functions
function logOut() {
  pb.authStore.clear()
  router.push('/')
  open = false
}

// Calculating levels, hearts

onMounted(() => {
  getData();
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.record !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} p-4`" -->
<!-- 58.67 -->
<!-- <div :class="`theme-${websiteTheme} bg-bgSecondary rounded-xl p-2 w-full`"> -->
<!-- :class="`theme-${websiteTheme} `" -->
<!-- :href="`/${e.ref}`" -->
<!-- disabledLesson -->
<!-- <p :class="`theme-${websiteTheme} text-primaryText`"> </p> -->

<template>
  <div v-if="welcomeScreen"
    :class="`fadeInOutWelcomeMsg theme-${websiteTheme} h-[100vh] w-full bg-bgPrimary absolute flex items-center justify-center`">
    <p :class="`theme-${websiteTheme} text-primaryText text-xl font-semibold`">Selam {{ model.username }}!</p>
  </div>
  <div :class="`fadeInOutMainPage pt-[58.67px]`">
    <div class="flex flex-col md:flex-row h-[100vh]">
      <div class="border border-red-300 p-2">
        <p :class="`theme-${websiteTheme} text-primaryText text-lg`">Kemey {{ model.username }}!</p>
        <div>
          <p :class="`theme-${websiteTheme} text-primaryText`">Level: {{ model.level }}</p>
          <div :class="`theme-${websiteTheme} bg-secondary w-[200px] flex justify-start rounded-full`"><div :style="`width: ${levelPercentage}%`" class="p-1 rounded-full bg-green-500"></div></div>
        </div>
        <div>
          <p :class="`theme-${websiteTheme} text-primaryText`">Lives</p>
          <div class="">
            <img class="absolute w-32" src="/src/assets/images/rewardicons/riphearts.png">
            <img :class="`relative ml-6 w-32`" src="/src/assets/images/rewardicons/hearts.png">
          </div>
        </div>
      </div>
      <div class="overflow-y-scroll border border-blue-300 p-2">

      </div>
      <div class="border border-green-300 p-2">

      </div>
    </div>
  </div>
</template>

<style scoped>
.menuButton {
  padding: 3px;
  padding-left: 9px;
  padding-right: 9px;
  border-radius: 6px;
  font-weight: 700;
  transition: background-color 0.2s ease;
  color: var(--color-secondaryText);
  background-color: var(--color-tertiary);
}

.menuButton:hover {
  background-color: var(--color-quaternary);
}

.menuButton:active {
  background-color: var(--color-quinary);
}

.alphabetButton {
  animation-name: alphabetButtonA;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  transition: background-color 0.2s ease;
}

.alphabetButton:hover {
  animation: none;
  background-color: var(--color-quaternary);
}

.alphabetButton:active {
  animation: none;
  background-color: var(--color-quinary);
}

@keyframes alphabetButtonA {
  0% {
    background-color: rgba(226, 0, 0, .5);
  }

  25% {
    background-color: rgba(238, 155, 0, .5);
  }

  50% {
    background-color: rgba(0, 148, 0, .5);
  }

  75% {
    background-color: rgba(42, 81, 255, .5);
  }

  100% {
    background-color: rgba(226, 0, 0, .5);
  }
}

.rewardDimensions {
  height: 6rem;
  width: 6rem;
}

@media (min-width: 640px) {
  .---homeBorder--- {
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 0.75rem;
    background-color: var(--color-secondary)
  }
}

.helloMessageAnimate {
  animation: popOutText 1s ease;
}

@keyframes popOutText {
  0% {
    scale: 1;
    text-decoration: none !important;
  }

  50% {
    transform: rotate(-3deg);
    scale: 1.3;
    background: linear-gradient(-15deg, #ffbf00, #ff820e, #0eff32);
    color: white;
    border-radius: 7px;
    padding: 9px;
    text-decoration: none !important;
  }

  100% {
    scale: 1;
    text-decoration: none !important;
  }
}


.fadeInOutWelcomeMsg {
  opacity: 0;
  animation-name: fadeInOutWelcomeMsg;
  animation-duration: 6s;
}

@keyframes fadeInOutWelcomeMsg {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.mainPage {
  opacity: 1;
  animation-name: fadeInOutMainPage;
  animation-duration: 8s;
}

@keyframes fadeInOutMainPage {
  0% {
    opacity: 0;
    pointer-events: none;
  }

  25% {
    opacity: 0;
    pointer-events: auto;
  }

  50% {
    opacity: 0;
    pointer-events: auto;
  }

  100% {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
