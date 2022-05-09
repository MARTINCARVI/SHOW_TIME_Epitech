<template>
  <div class="bg-gray-50">
    <form>
      <input type="text" @click="addConcertToFavorite()" v-model="QRValue" />
    </form>
    <qrcode-vue v-if="QRValue" :value="QRValue" size="300" level="H" />
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      QRValue: null,
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    AddConcertToFavorite: async function () {
      console.log("CONCERT CHOISI: ", this.concert.title);
      console.log(
        "UTILISATEUR FAISANT LA DEMANDE:",
        this.userConnected?.username,
        this.userConnected?.id
      );
      this.store.dispatch("AddConcertToFavorite", {
        id: this.concert.id,
      });
    },
  },
};
</script>
