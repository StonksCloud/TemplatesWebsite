<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  color: #ffff;
  background: #101010 url('https://studios.vounty.net/images/background.svg') no-repeat fixed top center;
  background-size: cover;
  width: 100%;
  height: auto;
  overflow-x: hidden;
}
.vs-card .vs-card__text .active {
  border-left: 1px solid orange;
  border-right: 1px solid orange;
}
.vs-card .vs-card__text {
  border-top: 2px solid rgb(38, 38, 38);
}
.vs-card .vs-card__img, .vs-card .vs-card__img * {
  border-radius: 7px 7px 0 0;
}
.vs-card .vs-button {
  border-radius: 7px;
}
.vs-card .vs-card__text, .vs-card .vs-card__img {
  background: rgb(30, 30, 30);
  color: #ffff;
}
.vs-dialog, .vs-dialog .vs-dialog__close, .vs-dialog .vs-dialog__header, .vs-dialog .vs-dialog__content, .vs-dialog .vs-dialog__footer, .vs-dialog .vs-dialog__content {
  background: rgb(30, 30, 30);
  text-align: center;
  color: #ffff;
}
.vs-card .vs-card__text {
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
@media only screen and (max-width: 1000px) {
  .removeItem, .fab-bottom-right {
    display: none;
    visibility: hidden;
  }
}
body br, .no-select {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
