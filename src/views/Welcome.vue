<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { websiteTheme } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(pb.authStore.record !== null);

let cName = ref("");
let cUsername = ref("");
let cEmail = ref("");
let cPassword = ref("");
let cConfirmPassword = ref("");

// Sign In
async function signIn(signInData) {
  try {
    const record = await pb.collection('users').authWithPassword(signInData.email, signInData.password);
    router.push('/')
  } catch (error) {
    alert(error.message)
    loadingMsg.value = false;
  }
  loadingMsg.value = false;
}
// Create account
const createAccForm = () => {
  errMsgShow.value = false;
  if (!cName.value || !cEmail.value || !cPassword.value || !cUsername.value) {
    alert('Please fill the form.');
    return;
  }
  if (cPassword.value !== cConfirmPassword.value) {
    errMsgShow.value = true;
    errMsg.value = `Passwords do not match.`
    return;
  }
  loadingMsg.value = true;
  createAccount({ name: cName.value, email: cEmail.value, password: cPassword.value, username: cUsername.value });
}
async function createAccount({ name, username, email, password }) {
  console.log("name value:", name);
  console.log("username value:", username);
  console.log("email value:", email);
  console.log("password value:", password);
  try {
    const data = {
      "name": name,
      "username": username,
      "email": email,
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": password,
      "xp": 0,
      "level": 1
    };
    const record = await pb.collection('users').create(data);
    signIn({ email, password })
  } catch (error) {
    alert(error.message)
    loadingMsg.value = false;
  }
}

let welcomeQuestionnaire = ref([
  {
    question: "How did you hear about LearnTigrigna?",
    answers: [
      { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png", text: "Social media" },
      { icon: "https://1000logos.net/wp-content/uploads/2023/12/Handshake-Emoji.png", text: "Friends/Family" },
      { icon: "https://www.shareicon.net/data/512x512/2016/11/22/854956_search_512x512.png", text: "Search" },
      { icon: "https://cdn-icons-png.flaticon.com/512/3593/3593455.png", text: "Other" },
    ]
  },
  // {
  //   question: "How much Tigrigna do you know?",
  //   answers: [
  //     { icon: "https://encycolorpedia.com/emojis/keycap-1.svg", text: "I am a complete beginner" },
  //     { icon: "https://cdn-0.emojis.wiki/emoji-pics/twitter/keycap-2-twitter.png", text: "I know the alphabet" },
  //     { icon: "https://images.emojiterra.com/twitter/v13.1/512px/33-20e3.png", text: "I can have basic conversations" },
  //     { icon: "https://images.emojiterra.com/twitter/v14.0/1024px/34-20e3.png", text: "I can talk about a variety of topics" },
  //   ]
  // },
  {
    question: "Why do you want to learn Tigrigna?",
    answers: [
      { icon: "https://attic.sh/jo8ztm3xmqgog4wgbh6g6nthmp39", text: "To communicate with family" },
      { icon: "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/2708.png", text: "To travel or live in Ethiopia or Eritrea" },
      { icon: "https://pngimg.com/d/smiley_PNG43.png", text: "For fun" },
      { icon: "https://static-00.iconduck.com/assets.00/school-emoji-2048x2048-37shz5sr.png", text: "For educational purposes" },
      { icon: "https://static-00.iconduck.com/assets.00/clock-emoji-2048x2048-9yn48hap.png", text: "Use free time for good use" },
      { icon: "https://cdn-icons-png.flaticon.com/512/3593/3593455.png", text: "Other" },
    ]
  },
  // {
  //   question: "Where do you want to start?",
  //   answers: [
  //     { icon: "https://static-00.iconduck.com/assets.00/first-place-medal-emoji-2048x2048-qlzi279e.png", text: "From the beginning" },
  //     { icon: "https://images.emojiterra.com/google/android-12l/512px/26f0.png", text: "Find my level" },
  //   ]
  // },
])

let welcomeScreenStage = ref(1); // starts at 1
let loadingMsg = ref(false)
// console.log("james@gmail.com")
let nextButtonDisabled = ref(true)
let currentQuestionIndex = ref(0)
let answerSelected = ref(false)
let selectedAnswer = ref(null);

function nextQuestion() {
  if (currentQuestionIndex.value < welcomeQuestionnaire.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    console.log("No more questions!");
    welcomeScreenStage.value++;
  }
  selectedAnswer.value = null;
  nextButtonDisabled.value = true;
}
function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  } else {
    console.log("No more questions!");
  }
}

let errMsgShow = ref(false)
let errMsg = ref(null)

async function doesEmailExist(_email) {
  try {
    const record = await pb.collection('users').getFirstListItem(`email="${_email}"`);
    return !!record;
  } catch (error) {
    return false;
  }
}

async function goToNextWelcomeScreenStage(_input) {
  if (_input == null) {
    errMsgShow.value = false;
    welcomeScreenStage.value++
    return;
  } else {
    switch (welcomeScreenStage.value) {
      case 2: // email
        if (_input && _input.includes("@") && /^[^@]+@[^@]+\.[^@]+$/.test(_input)) {
          try {
            const emailExists = await doesEmailExist(_input);
            if (emailExists) {
              errMsg.value = `Email already exists.`;
              errMsgShow.value = true;
              return;
            }
            errMsgShow.value = false;
            welcomeScreenStage.value++
            return;
          } catch (error) {
            errMsg.value = `An error occurred while checking the email.`;
            errMsgShow.value = true;
            return;
          }
        }
        if ((_input.includes("@") && /^[^@]+@[^@]+\.[^@]+$/.test(_input)) == false) {
          errMsg.value = `Must be in proper email format (example@gmail.com).`;
          errMsgShow.value = true;
        }
        break;
      case 3: // username !_input.includes(' ')
        if (_input && !_input.includes(' ') && _input.length >= 3) {
          errMsgShow.value = false;
          welcomeScreenStage.value++
          return;
        }
        errMsgShow.value = true;
        errMsg.value = `Must be 3-150 characters long with no spaces`
        break;
      case 4: // name
        if (_input) {
          errMsgShow.value = false;
          welcomeScreenStage.value++
          return;
        }
        errMsgShow.value = true;
        errMsg.value = `Please enter a name.`
        break;
      case 5: // password
        if (_input && _input.length >= 8) {
          errMsgShow.value = false;
          welcomeScreenStage.value++
          return;
        }
        errMsgShow.value = true;
        errMsg.value = `Length must be 8-72 characters long`
        break;
      default:
        errMsgShow.value = false;
        welcomeScreenStage.value++
        return;
    }
  }
}

function processAnswer(_index, _answer) {
  nextButtonDisabled.value = false;
  selectedAnswer.value = _answer;
}

onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.record !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} text-bgPrimary`" -->
<!-- :class="`theme-${websiteTheme} inputCSS w-full placeholder:text-quaternaryText`" -->
<!-- class="greenButtonTheme w-full largeBtn" -->
<!-- :class="`theme-${websiteTheme} text-secondaryText pointer-events-none font-semibold text-xl`" -->
<!-- :class="`theme-${websiteTheme} greenButtonTheme text-white w-72 p-3 px-6 rounded-md  font-semibold`" -->

<template>
  <div class="min-h-[100vh] flex flex-col items-center justify-center">
    <p
      :class="`fadeInOutWelcomeMsg absolute theme-${websiteTheme} text-secondaryText pointer-events-none font-semibold`">
      Selam selam! 😊</p>
    <div v-if="welcomeScreenStage === 1" v-for="(q, index) in welcomeQuestionnaire" :key="index"
      class="firstWelcomeStage w-full">
      <div v-if="index === currentQuestionIndex" class="space-y-5 flex flex-col items-center">
        <div>
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none font-semibold text-lg`">
            {{ q.question }}</p>
        </div>
        <div class="h-[350px] w-[280px] flex flex-col items-center">
          <button
            :class="['quizButtonTheme flex items-center my-1', selectedAnswer === ans.text ? 'quizButtonThemeSelected' : '']"
            @click="processAnswer(index, ans.text)" class="quizButtonTheme flex items-center my-1"
            v-for="ans in q.answers">
            <img class="w-7 h-7 mr-3" :src="ans.icon">
            <p :class="`theme-${websiteTheme} text-secondaryText`" class="flex items-center text-left">{{ ans.text }}
            </p>
          </button>
        </div>
        <div class="space-y-2 w-[280px]">
          <button :class="nextButtonDisabled ? 'disabledButton' : ''" class="orangeButtonTheme largeBtn w-full"
            @click="nextQuestion()">Next</button>
          <a href="/signin"><button class="blueButtonTheme largeBtn w-full my-2">Go back</button></a>
        </div>
      </div>
    </div>
    <div v-if="welcomeScreenStage === 2" class="w-full">
      <div class="space-y-5 flex flex-col items-center">
        <div>
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none font-semibold text-lg`">
            What is your email?</p>
        </div>
        <div class="h-[60px] flex flex-col items-center">
          <input v-model="cEmail" :class="`theme-${websiteTheme} w-[280px] inputCSS placeholder:text-quaternaryText`"
            type="email" placeholder="example@gmail.com">
          <p v-if="errMsgShow" class="text-red-600 text-sm text-center">{{ errMsg }}</p>
        </div>
        <div class="space-y-2 w-[280px]">
          <button @click="goToNextWelcomeScreenStage(cEmail)" class="greenButtonTheme largeBtn w-full">Continue</button>
        </div>
      </div>
    </div>
    <div v-if="welcomeScreenStage === 3" class="w-full">
      <div class="space-y-5 flex flex-col items-center">
        <div>
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none font-semibold text-lg`">
            Enter a username</p>
        </div>
        <div class="h-[60px] flex flex-col items-center">
          <input v-model="cUsername" :class="`theme-${websiteTheme} inputCSS w-[280px] placeholder:text-quaternaryText`"
            type="text" placeholder="Username">
          <p v-if="errMsgShow" class="text-red-600 text-sm text-center">{{ errMsg }}</p>
        </div>
        <div class="space-y-2 w-[280px]">
          <button @click="goToNextWelcomeScreenStage(cUsername)"
            class="greenButtonTheme largeBtn w-full">Continue</button>
        </div>
      </div>
    </div>
    <div v-if="welcomeScreenStage === 4" class="w-full">
      <div class="space-y-5 flex flex-col items-center">
        <div>
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none font-semibold text-lg`">
            What is your name?</p>
        </div>
        <div class="h-[60px] flex flex-col items-center">
          <input v-model="cName" :class="`theme-${websiteTheme} inputCSS w-[280px] placeholder:text-quaternaryText`"
            type="text" placeholder="Name">
          <p v-if="errMsgShow" class="text-red-600 text-sm text-center">{{ errMsg }}</p>
        </div>
        <div class="space-y-2 w-[280px]">
          <button @click="goToNextWelcomeScreenStage(cName)" class="greenButtonTheme largeBtn w-full">Continue</button>
        </div>
      </div>
    </div>
    <div v-if="welcomeScreenStage === 5" class="w-full">
      <div class="space-y-5 flex flex-col items-center">
        <div>
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none font-semibold text-lg`">
            Enter a password</p>
        </div>
        <div class="h-[60px] flex flex-col items-center">
          <input v-model="cPassword" :class="`theme-${websiteTheme} inputCSS w-[280px] placeholder:text-quaternaryText`"
            type="password" placeholder="Password">
          <p v-if="errMsgShow" class="text-red-600 text-sm text-center">{{ errMsg }}</p>
        </div>
        <div class="space-y-2 w-[280px]">
          <button @click="goToNextWelcomeScreenStage(cPassword)"
            class="greenButtonTheme largeBtn w-full">Continue</button>
        </div>
      </div>
    </div>
    <div v-if="welcomeScreenStage === 6" class="w-full">
      <div class="space-y-5 flex flex-col items-center">
        <div>
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none font-semibold text-lg`">
            Confirm your password</p>
        </div>
        <div class="h-[60px] flex flex-col items-center">
          <input v-model="cConfirmPassword"
            :class="`theme-${websiteTheme} inputCSS w-[280px] placeholder:text-quaternaryText`" type="password"
            placeholder="Retype Password">
          <p v-if="errMsgShow" class="text-red-600 text-sm text-center">{{ errMsg }}</p>
        </div>
        <div class="space-y-2 w-[280px]">
          <button @click.prevent="createAccForm(cName, cUsername, cEmail, cPassword, cConfirmPassword)"
            class="greenButtonTheme largeBtn w-full">Create my account</button>
          <button @click="welcomeScreenStage--" class="blueButtonTheme largeBtn w-full">Go back</button>
        </div>
        <div v-if="loadingMsg">
          <p :class="`theme-${websiteTheme} text-center text-primaryText pointer-events-none`">Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.firstWelcomeStage {
  animation-name: fadeInOutWelcomeStage;
  animation-duration: 6s;
}

.fadeInOutWelcomeMsg {
  opacity: 0;
  animation-name: fadeInOutWelcomeMsg;
  animation-duration: 4s;
}

@keyframes fadeInOutWelcomeMsg {
  0% {
    opacity: 0;
    rotate: 15deg;
  }

  25% {
    opacity: 1;
    font-size:xx-large;
    color: rgb(0, 179, 0);
    rotate: -15deg;
  }

  50% {
    opacity: 1;
    font-size:xx-large;
    color: var(--color-ltColor1);
    rotate: 15deg;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fadeInOutWelcomeStage {
  0% {
    opacity: 0;
    pointer-events: none;
  }

  25% {
    opacity: 0;
    pointer-events: none;
  }

  50% {
    opacity: 0;
    pointer-events: none;
  }

  100% {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
