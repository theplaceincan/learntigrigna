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

let loading_LessonsList = ref(true);
let loading_ChaptersList = ref(true);
let loading_PhrasesAndWords = ref(true);
let loading_Games = ref(true);

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

  loading_LessonsList.value = true;
  loading_ChaptersList.value = true;
  loading_PhrasesAndWords.value = true;
  loading_Games.value = true;

  const recById = await pb.collection('chaptersplan').getFullList({ sort: '-created' });
  loading_ChaptersList.value = false;

  for (let chapter of recById) {
    LearningPlanJSON.value.chapters.push({
      chapter: chapter.chapter,
      color: chapter.color,
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
  loading_LessonsList.value = false;

  PhrasesAndWords.value = await pb.collection("wordslist").getFullList({ sort: "-created" });
  loading_PhrasesAndWords.value = false;
  Games.value = await pb.collection("gameCards").getFullList({ sort: "-created" });
  loading_Games.value = false;
}

// Authentication-related functions
function logOut() {
  pb.authStore.clear()
  router.push('/')
  open = false
}

// Calculating levels
let levelPercentage = ref(model.value.level);
// levelPercentage.value = 50;

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
    <div class="flex flex-col justify-center md:flex-row md:h-[100vh]">
      <!-- ----- User info section ----- -->
      <div class="text-center md:w-[33%] p-2">
        <p :class="`theme-${websiteTheme} text-primaryText text-xl mb-3`">Kemey {{ model.username }}!</p>
        <div class="flex flex-col justify-center"
          :class="`theme-${websiteTheme} bg-secondaryTransparent rounded-lg p-2 mx-3`">
          <div class="flex justify-center">
            <div>
              <p :class="`theme-${websiteTheme} text-green-500`">Level: {{ model.level }}</p>
              <div :class="`theme-${websiteTheme} bg-tertiary w-[200px] flex justify-start rounded-full`">
                <div :style="`width: ${levelPercentage}%`" class="p-1 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div class="my-2 space-x-3 flex justify-center">
            <div class="flex items-center space-x-[2px]">
              <img class="w-6" src="/src/assets/images/rewardicons/heart.png">
              <p :class="`theme-${websiteTheme} text-red-500 font-bold`">{{ model.lives }}</p>
            </div>
            <div class="flex items-center space-x-[2px]">
              <img class="w-6" src="/src/assets/images/rewardicons/coins.png">
              <p :class="`theme-${websiteTheme} text-yellow-500`">{{ model.coins }}</p>
            </div>
            <div class="flex items-center space-x-[2px]">
              <img class="w-6" src="/src/assets/images/rewardicons/xp.png">
              <p :class="`theme-${websiteTheme} text-yellow-500`">{{ model.xp }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- ----- Lessons section ----- -->
      <div class="md:w-[33%] p-2">
        <p :class="`theme-${websiteTheme} text-primaryText text-center text-xl mb-5`">Lessons</p>
        <div class="md:w-[100%]">
          <div v-if="loading_LessonsList">Loading...</div>
          <!-- :style="{ backgroundColor: `rgba(${chapter.color})`}" -->
          <div v-if="!loading_LessonsList" :class="`theme-${websiteTheme} my-5`"
            v-for="chapter in [...LearningPlanJSON.chapters].reverse()">
            <div :class="`theme-${websiteTheme} text-primaryText font-semibold text-xl`">
              <p class="text-center my-2">{{ chapter.chapter }}</p>
            </div>
            <div>
              <div v-for="(lesson, index) in chapter.lessons">
                <a :href="lesson.url">
                  <button :class="`theme-${websiteTheme} hover:border-ltColor1 hover:bg-yellow-500/20 active:bg-yellow-500/50 transition ease-in-out w-full rounded-full border border-tertiary p-2`">
                    <p :class="`theme-${websiteTheme} text-primaryText text-lg`">{{ lesson.lesson_name }}</p>
                  </button>
                </a>
                <div v-if="index != chapter.lessons.length - 1" class="w-full flex justify-center">
                  <div :class="`theme-${websiteTheme} bg-tertiary w-[2px] h-5`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ----- Games and Words section ----- -->
      <div class="md:w-[33%] p-2">
        <p :class="`theme-${websiteTheme} text-primaryText text-center text-xl mb-5`">Phrases and Words</p>
        <div class="flex flex-wrap justify-center">
          <div
            :class="`flex md:w-[400px] w-[100%] items-center theme-${websiteTheme} bg-primary border border-tertiary hover:border-ltColor1 transition ease-in-out m-2 p-2 rounded-md`"
            v-for="e in PhrasesAndWords.slice(0,5)">
            <div class="w-[50%]">
              <p :class="`theme-${websiteTheme} text-primaryText font-semibold text-lg`">{{ e.tigrignaWord }}</p>
              <p :class="`theme-${websiteTheme} text-tertiaryText`">"{{ e.tigrignaSound }}"</p>
              <p :class="`theme-${websiteTheme} text-secondaryText`">{{ e.tigrignaEnglish }}</p>
              <button class="audioButton">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              </button>
            </div>
            <div class="w-[50%] flex justify-center">
              <img class="w-28"
                :src="`https://learntigrigna.pockethost.io/api/files/${e.collectionId}/${e.id}/${e.tigrignaImage}`">
            </div>
          </div>
        </div>
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
