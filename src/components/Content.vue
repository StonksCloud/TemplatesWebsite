<template>
  <div>

    <br><br>
    <vs-row>
      <vs-col offset="4" w="4">
        <vs-input v-model="search.value" @click-icon="botInterface.value = true" border block primary icon-after text-white placeholder="Search...">
          <template #icon>
            <vs-tooltip style="display: inline-block">
              <i class="fas fa-robot" />
              <template #tooltip>Click here, to select a Bot.</template>
            </vs-tooltip>
          </template>
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
              <h2 class="no-select">{{ index.name }}</h2>
              <h4 class="no-select" style="font-size: 15px">{{ index.uniqueId }}
                <vs-tooltip style="display: inline-block">
                  <i class="fas fa-copy" style="color: #939393" @click="copy(index.uniqueId)"></i>
                  <template #tooltip>Copy</template>
                </vs-tooltip>
              </h4>
            </template>
            <template #img>
              <img :src="search.gifLayouts.includes(index.uniqueId) ? index.icon.replace('.png', '.gif') : index.icon" class="no-select" loading="lazy" alt="Image was not found :/">
            </template>
            <template #text>
              <vs-button style="display: inline-block" size="small" v-for="keyword in index.keywords" :key="keyword" @click="searchByKeyword(keyword)">{{ keyword }}</vs-button>
            </template>
            <template #interactions>
              <vs-button success border icon @click="openPreview(index)">Preview</vs-button>
            </template>
          </vs-card>

        </div>
      </div>
    </div>

    <vs-dialog scroll width="500px" blur square not-close v-model="preview.value" class="no-select">
      <template #header>
        <div class="not-margin">
          <h1>Preview of <b>{{ preview.layout.uniqueId }}</b></h1>
          <h2 style="text-align: center"><b>{{ preview.layout.channels.length }}</b> Channels and <b>{{ preview.layout.roles.length }}</b> Roles</h2>
        </div>
      </template>
      <div v-if="preview.layout.platform === 'DISCORD'" class="discordPreview">
        <div class="content-3YMskv">

          <div :class="getType(channel) === 'category' ? 'containerDefault-3tr_sE' : 'containerDefault--pIXnN'" :data-dnd-name="channel.name" :key="channel" v-for="channel in preview.layout.channels">

            <div v-if="getType(channel) === 'category'" class="iconVisibility-fhcwiH wrapper-PY0fhH" role="listitem">
              <div class="mainContent-2h-GEV" tabindex="-1" :aria-label="channel.name + ' (category)'" aria-expanded="true" role="button">
                <svg class="arrow-gKvcEx icon-2yIBmh" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>
                </svg>
                <h2 class="name-3l27Hl container-2ax-kl">
                  <div class="overflow-WK9Ogt">{{ channel.name }}</div>
                </h2>
              </div>
              <div class="children-L002ao"></div>
            </div>

            <div v-if="getType(channel) === 'announcement'" class="iconVisibility-sTNpHs wrapper-2jXpOf" role="listitem">
              <div class="content-1x5b-n">
                <a role="link" class="mainContent-u_9PKf" tabindex="-1" :aria-label="channel.name + '(announcement)'">
                  <div aria-label="Announcements" class="iconContainer-1BBaeJ">
                    <svg class="icon-1DeIlz" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                      <path d="M3.9 8.26H2V15.2941H3.9V8.26Z" fill="currentColor"></path>
                      <path d="M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div class="name-23GUGE overflow-WK9Ogt" aria-hidden="true">
                    <div class="channelName-2YrOjO">{{ channel.name }}</div>
                  </div>
                </a>
              </div>
            </div>

            <div v-if="getType(channel) === 'text channel'" class="iconVisibility-sTNpHs wrapper-2jXpOf" role="listitem">
              <div class="content-1x5b-n">
                <a role="link" class="mainContent-u_9PKf" tabindex="-1" :aria-label="channel.name + '(text channel)'">
                  <div aria-label="Text" class="iconContainer-1BBaeJ">
                    <svg width="24" height="24" viewBox="0 0 24 24" class="icon-1DeIlz">
                      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>
                    </svg>
                  </div>
                  <div class="name-23GUGE overflow-WK9Ogt" aria-hidden="true">
                    <div class="channelName-2YrOjO">{{ channel.name }}</div>
                  </div>
                </a>
              </div>
            </div>

            <div v-if="getType(channel) === 'voice channel'" class="iconVisibility-sTNpHs wrapper-2jXpOf" role="listitem">
              <div class="content-1x5b-n">
                <a role="button" class="mainContent-u_9PKf" tabindex="-1" :aria-label="channel.name + '(voice channel), ' + channel.userLimit > 0 ? '0 of ' + channel.userLimit + ' users' : ''">
                  <div aria-label="Voice" class="iconContainer-1BBaeJ">
                    <svg class="icon-1DeIlz" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z" aria-hidden="true"></path>
                    </svg>
                  </div>
                  <div class="name-23GUGE overflow-WK9Ogt" aria-hidden="true">
                    <div class="channelName-2YrOjO">{{ channel.name }}</div>
                  </div>
                </a>
                <div class="children-3rEycc">
                  <div v-if="channel.userLimit > 0" class="userLimit-3aerPX">
                    <div class="wrapper-2tAnRe">
                      <span class="users-3kndPl">00</span>
                      <span class="total-i6us2n" style="background: #a1a1a1;"><span style="color: #fff;">{{ 10 > channel.userLimit ? '0' + channel.userLimit : channel.userLimit }}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </vs-dialog>

    <vs-dialog blur square v-model="botInterface.value" class="no-select">
      <template #header>
        <h4 class="not-margin">
          Select a <b>Bot</b>
        </h4>
      </template>
      <vs-row justify="space-around" class="botSelectBox">
        <vs-col w="6">
          <vs-tooltip>
            <i class="fab fa-discord" @click="downloadBot('discord')"></i>
            <template #tooltip>Discord</template>
          </vs-tooltip>
        </vs-col>
        <vs-col w="6">
          <vs-tooltip>
            <i class="fab fa-teamspeak" @click="downloadBot('teamspeak')"></i>
            <template #tooltip>TeamSpeak</template>
          </vs-tooltip>
        </vs-col>
      </vs-row>
      <br>
      <div class="botDescription">
        <div>
          <h3>Discord</h3>
          <ul class="list">
            <li>1. Add the Bot to your Discord server.</li>
            <li>2. Write now '_templates' for more help.</li>
          </ul>
          <h3>TeamSpeak</h3>
          <ul class="list">
            <li>1. Download the TeamSpeak Bot.</li>
            <li>
              2. Run the Bot with 'java -jar TeamSpeakTemplates.jar'.
              <vs-tooltip style="display: inline-block">
                <i class="fas fa-copy" style="color: #939393" @click="copy('java -jar TeamSpeakTemplates.jar')"></i>
                <template #tooltip>Copy</template>
              </vs-tooltip>
            </li>
            <li>3. Write your <strong><i class="fas fa-exclamation-triangle"></i> ServerAdmin <i class="fas fa-exclamation-triangle"></i></strong> Query data into the config.</li>
            <li>4. Set the <strong>enabled</strong> value to <strong>true</strong>.</li>
            <li>5. Do <strong>Step 2.</strong> again.</li>
            <li>6. Write your Nickname in the command prompt.</li>
            <li>7. Write now '_templates' for more help.</li>
          </ul>
        </div>
        <p style="color: #fc1e1e; text-align: center"><i style="font-size: 30px" class="fas fa-exclamation-triangle"></i><br>If there is any suggestion of racism, violence or bullying, <br>we will delete this template as soon as possible. </p>
      </div>
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
        layouts: [],
        gifLayouts: []
      },
      botInterface: {
        value: false
      },
      preview: {
        value: false,
        layout: {}
      }
    }
  },
  methods: {
    downloadBot: function (platform) {
      if (platform.toLowerCase() === "teamspeak") window.open('https://github.com/StonksCloud/TemplatesBot/releases', '_blank');
      if (platform.toLowerCase() === "discord") window.open('https://discord.com/api/oauth2/authorize?client_id=891367704865427507&permissions=8&scope=bot', '_blank');
    },
    getType: function (channel) {
      return channel.isNews ? 'announcement' : channel.channelType === 0 ? 'text channel' : channel.channelType === 1 ? 'voice channel' : channel.channelType === 2 ? 'category' : channel.channelType === 3 ? 'stage channel' : 'category';
    },
    openPreview: function (layout) {
      this.preview.layout = layout;
      this.preview.value = true;
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
          }).then(layouts => {
            this.search.layouts = layouts.templates;

            layouts.templates.forEach(value => {
              fetch(value.icon.slice().replace('.png', '.gif'))
                  .then(test => {
                    if (test.status === 200) this.search.gifLayouts.push(value.uniqueId);
                  })
            })

          })
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
.discordPreview {
  color: #a4a4a4;
}
.discordPreview a {
  text-decoration: none;
  color: #a4a4a4;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
}
.discordPreview a:hover {
  background: rgba(80, 80, 80, 0.2);
}
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
.botDescription h3 {
  text-align: center;
}
.botDescription .list {
  list-style: none;
  font-family: "Comic Sans MS", cursive;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>