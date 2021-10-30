<template>
  <div>

    <br><br>
    <vs-row>
      <vs-col offset="4" w="4">
        <vs-input v-model="search.value" @click-icon="botInterface.value = true" border block primary icon-after text-white placeholder="Search...">
          <template #icon><i class="fas fa-robot" /></template>
          <template #message-primary>Search for a Token, Keyword or Platform.</template>
        </vs-input>
      </vs-col>
    </vs-row>
    <br>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5" :key="count" v-for="(index, count) in search.layouts">

          <vs-card type="1" id="customCard" :class="count % 2 === 1 ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft'">
            <template #title>
              <p>
                <span v-if="index.platform === 'DISCORD'" style="color: #937af3; font-size: 18px" class="no-select"><i class="fab fa-discord"></i> <span class="removeItem">Discord</span></span>
                <span v-if="index.platform === 'TEAMSPEAK'" style="color: #4473fc; font-size: 18px" class="no-select"><i class="fab fa-teamspeak"></i> <span class="removeItem">TeamSpeak</span></span>
              </p>
              <h3 class="no-select">{{ index.uniqueId }} <i class="fas fa-copy" style="color: #939393" @click="copy(index.uniqueId)"></i></h3>
            </template>
            <template #img>
              <img src="https://vounty.net/Logo.png" class="no-select" loading="lazy" alt="Image was not found :/">
            </template>
            <template #text>
              <vs-button style="display: inline-block" size="small" v-for="keyword in index.keywords" :key="keyword" @click="searchByKeyword(keyword)">{{ keyword }}</vs-button>
            </template>
          </vs-card>

        </div>
      </div>
    </div>

    <vs-dialog blur square v-model="botInterface.value" v-on:close="botInterface.value = false" class="no-select">
      <template #header>
        <h4 class="not-margin">
          Select a <b>Bot</b>
        </h4>
      </template>
      <vs-row justify="space-around" class="botSelectBox">
        <vs-col w="6">
          <i class="fab fa-discord" @click="downloadBot('discord')"></i>
        </vs-col>
        <vs-col w="6">
          <i class="fab fa-teamspeak" @click="downloadBot('teamspeak')"></i>
        </vs-col>
      </vs-row>
    </vs-dialog>

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

    let oldSearch = '';
    setInterval(() => {
      if (oldSearch !== this.search.value) {
        oldSearch = this.search.value;
        if (oldSearch === '') {
          this.loadDefaultLayouts()
        } else this.startSearch()
      }
    }, 100);

  },
  data() {
    return {
      search: {
        value: '',
        layouts: []
      },
      botInterface: {
        value: false
      }
    }
  },
  methods: {
    downloadBot: function (platform) {
      if (platform.toLowerCase() === "teamspeak") window.open('https://github.com/StonksCloud/TemplatesBot/releases', '_blank');
      if (platform.toLowerCase() === "discord") window.open('https://discord.com/api/oauth2/authorize?client_id=891367704865427507&permissions=8&scope=bot', '_blank');
    },
    searchByKeyword: function (keyword) {
      this.search.value = this.search.value === '' ? this.search.value = keyword : this.search.value += " " + keyword
    },
    containsInArray: function (value, array) {
      for (let count = 0; count < array.length; count++) {
        let tag = array[count].toLowerCase();
        let newValue = value.toLowerCase();
        if (tag === newValue || tag.startsWith(newValue) || tag.endsWith(newValue) || tag.includes(newValue)) {
          return true;
        }
      }
      return false;
    },
    startSearch: function () {
      this.search.layouts = [];
      let newArray = [];
      getTemplates().then(format => {
        let searchArray = this.search.value.split(" ");
        searchArray.forEach(search => {

          search = search.toLowerCase();
          if (search !== '' || search !== ' ') {

            format.templates.forEach(template => {

              let uniqueId = template.uniqueId.toLowerCase();
              let name = template.name.toLowerCase();
              let platform = template.platform.toLowerCase();

              if (uniqueId === search || uniqueId.startsWith(search) || uniqueId.endsWith(search) || uniqueId.includes(search) ||
                  name === search || name.startsWith(search) || name.endsWith(search) || name.includes(search) ||
                  platform === search || platform.startsWith(search) || platform.endsWith(search) || platform.includes(search) ||
                  this.containsInArray(search, template.keywords)) {
                if (!newArray.includes(template)) newArray.push(template);
              }

            });

          }

        });
      });
      this.search.layouts = newArray;
    },
    copy: function (value) {
      const clipboardData = event.clipboardData || window.clipboardData || event.originalEvent?.clipboardData || navigator.clipboard;
      if (clipboardData !== undefined) {
        clipboardData.writeText(value)
        this.notify('success', 'Copied', 'You successfully copied<br>' + value, 2000, false)
      } else this.notify('error', 'Oops...', 'Your browser does not support the clipboard function.', 3000, false)
    },
    loadDefaultLayouts: function () {
      this.search.layouts = []
      getTemplates().catch(() => {
            this.notify('error', 'Oops...', 'Can not connect to api.vounty.net<br>Please contact our support team.', 4000, false)
            setTimeout(() => {
              this.loadDefaultLayouts()
            }, 5000);
          }).then(layouts => {this.search.layouts = layouts.templates;})
    },
    notify: function (icon, title, text, timer, confirm) {
      swal.fire({
        icon: icon,
        title: title,
        html: text,
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
.botSelectBox * {
  text-align: center;
}
.botSelectBox i:hover {
  border: 2px solid #989898;
  color: #646464;
}
.botSelectBox i {
  padding: 20px 20px;
  border: 2px solid #444444;
  border-radius: 10px;
  transition: 0.4s all;
  cursor: pointer;
  font-size: 40px;
}
</style>