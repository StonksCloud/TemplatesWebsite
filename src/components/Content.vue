<template>
  <div>

    <br><br>
    <vs-row>
      <vs-col offset="4" w="4">
        <vs-input v-model="search.value" @click-icon="downloadBot" border block primary icon-after text-white placeholder="Search...">
          <template #icon><i class="fas fa-robot" /></template>
          <template #message-primary>Search for a Token, Keyword or Platform.</template>
        </vs-input>
      </vs-col>
    </vs-row>
    <br>

    <vs-row justify="center">
      <vs-col :key="count" v-for="(index, count) in search.layouts" offset="1" w="5">

        <vs-card type="1" id="customCard" :class="count % 2 === 1 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft'">
          <template #title>
            <p>
              <span v-if="index.platform === 'DISCORD'" style="color: #4915ff; font-size: 18px" class="no-select"><i class="fab fa-discord"></i> <span class="removeItem">Discord</span></span>
              <span v-if="index.platform === 'TEAMSPEAK'" style="color: #0b4ffa; font-size: 18px" class="no-select"><i class="fab fa-teamspeak"></i> <span class="removeItem">TeamSpeak</span></span>
            </p>
            <h3 class="no-select">{{ index.uniqueId }} <i class="fas fa-copy" style="color: #939393" @click="copy(index.uniqueId)"></i></h3>
          </template>
          <template #img>
            <img src="../assets/image.png" class="no-select" loading="lazy" alt="Image was not found :/">
          </template>
          <template #text>
            <vs-button style="display: inline-block" size="small" v-for="keyword in index.keywords" :key="keyword">{{ keyword }}</vs-button>
          </template>
        </vs-card>

      </vs-col>
    </vs-row>

  </div>
</template>

<script>
import swal from 'sweetalert2'
import '@sweetalert2/theme-dark'
import 'animate.css';

async function getTemplates() {
  let response = await fetch('https://api.vounty.net/route/templates/');
  if (response.ok) {
    const jsonValue = await response.json();
    return Promise.resolve(jsonValue);
  } else return Promise.reject(null);
}

export default {
  name: 'Content',
  mounted() {
    this.loadDefaultLayouts()
  },
  data() {
    return {
      search: {
        value: this.$route.params.id !== undefined ? this.$route.params.id : '',
        layouts: []
      }
    }
  },
  methods: {
    downloadBot: function () {
      window.open('https://github.com/StonksCloud/TemplatesBot/releases', '_blank');
    },
    copy: function (value) {
      const clipboardData = event.clipboardData || window.clipboardData || event.originalEvent?.clipboardData || navigator.clipboard;
      if (clipboardData !== undefined) {
        clipboardData.writeText(value)
        this.notify('success', 'Copied', value, 2000, false)
      } else this.notify('error', 'Oops...', 'Your browser does not support the clipboard function.', 3000, false)
    },
    loadDefaultLayouts: function () {
      this.search.layouts = []
      getTemplates()
          .catch(() => {
            setTimeout(() => {
              this.notify('error', 'Oops...', 'Can not connect to api.vounty.net - Please contact our support team.', 4000, false)
              this.loadDefaultLayouts()
            }, 5000);
          })
          .then(layouts => {
            for (let layoutCount in layouts.templates) this.search.layouts.push(layouts.templates[layoutCount])
          })
    },
    notify: function (icon, title, text, timer, confirm) {
      swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: timer,
        showConfirmButton: confirm,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
  }
}
</script>

<style scoped>
#customCard {
  margin-top: 20px;
  margin-left: 10px;
  text-align: center;
}
</style>