<template>
  <div class=aboutWrapper>
    <div class="imgContainer1">
      <parallax
        class= 'img'
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <img src="@/assets/img/Oliver+Kiersten-184.jpg" alt="noImg">
      </parallax>
    </div>
    
    <div class = "bioDiv">
      <h1> OLIVER HICKMAN </h1>
      <p class="bioText"> Oliver Hickman is a composer, music technologist, guitarist, and sound designer currently residing in Brooklyn, New York.
        He holds a Bachelor of Music degree in composition from Columbia College Chicago and a Master of Music
        degree in Music Theory and Composition from NYU Steinhardt where he studied under Robert Honstein,
        Julia Wolfe, and Tae Hong Park. Oliver has written works for soloists to large ensembles including
        Dal Niente, the JACK Quartet, Chicago Composers Orchestra, Mocrep, the NYU Contemporary Music Ensemble,
        and the NYU Percussion Ensemble and his compositions have been performed throughout the United States and Europe.
        As a composer, his current interests include timbre, economy of means as it pertains to music,
        and the relationship between composer control and player freedom.
        <br><br>
        As a guitarist, Oliver has played with a variety of ensembles ranging from musical theatre to comtemporary music
        to free improvisation. He is a co-founder of the improv ensemble <em>Consensus</em>. He also has been working within the theatre and dance worlds as a composer and sound designer on various productions
        in Chicago and New York City since 2014.
       </br> </p>
      <h1> <router-link to="/music"> LISTEN TO WORKS >> </router-link> </h1>
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';

export default {
  components: {
    Parallax,
  },
}
</script>


<style>
.bioDiv {
  grid-row: stuff;
  text-align: center;
  padding: 10px 100px 10px 100px;
  background-color: #fff;
  margin-top: -6px;
}
p.bioText {
  text-align: justify;
}
</style>
