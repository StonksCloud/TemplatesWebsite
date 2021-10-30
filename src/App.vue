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
.vs-card .vs-card__img, .vs-card .vs-card__img * {
  border-radius: 7px 7px 0 0;
}
.vs-card .vs-button {
  border-radius: 7px;
}
.vs-card .vs-card__text, .vs-card .vs-card__img {
  background: rgb(23, 23, 23);
  color: #ffff;
  -webkit-box-shadow: 11px 7px 17px 1px rgba(0,0,0,0.80);
  box-shadow: 11px 7px 17px 1px rgba(0,0,0,0.80);
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
