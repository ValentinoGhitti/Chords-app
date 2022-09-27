<template>
  <div class="home" id="welcome">
    <div class="container-fluid">
      <div class="row">
        <Navbar class="mb-5" />
        <div class="prueba text-center text-lg-start text-md-start mt-5">
          <div class="d-flex">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-sm-5 text-white d-flex justify-content-start flex-column">
                <h2 class="fs-1">Vachu's Jukebox</h2>
                <span>Día domingo lejos de la ciudad bajo el sol compartiendo entre amigos; carne asada, pan, agua y vino. ¡Toro y pampa es!.</span>
                <div class="mt-5">
                  <button class="btn btn-success" @click="goToDaybook">
                    Ingresar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../modules/daybook/components/Navbar.vue";
  export default {
    methods: {
        goToDaybook() {
            this.$router.push({ name: "no-entry" });
        }
    },
    components: { Navbar }
}
</script>

<style scoped>
#welcome {
  background-image: url(../../public/img/bg.png);
  background-position: center;
  background-size: cover;
  height: 100vh;
}
.prueba {
  position: absolute;
  top: 300px;
}
</style>