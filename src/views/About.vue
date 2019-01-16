<template>
  <div class=aboutWrapper>
    <div class="imgContainer1">
      <img class="img" src="@/assets/Oliver+Kiersten-184.jpg" alt="noImg">
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
        </br></br>
        As a guitarist, Oliver has played with a variety of ensembles ranging from musical theatre to comtemporary music
        to free improvisation and is a founding member of the electric guitar quartet ICQ. He also has been working within the theatre and dance worlds as a composer and sound designer on various productions
        in Chicago and New York City since 2014.
       </br> </p>
      <h1> <a href="/#/music"> LISTEN TO WORKS >> </a> </h1>
    </div>
  </div>
</template>

<style>
.aboutWrapper {
  display: grid;
  grid-template-columns: [col1] 1fr;
  grid-template-rows: [img1] 1fr [aboutStuff] auto;
}
.img {
  /*max-width: 1024px;*/
  width: 100%;
  object-fit: cover;
}
.imgContainer1 {
  grid-row: img1;
  display: inline-grid;
  position: relative;
}
.bioDiv {
  grid-row: aboutStuff;
  text-align: center;
  padding: 10px 100px 10px 100px;
}
p.bioText {
  text-align: justify;
}
</style>
