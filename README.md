# ToDo-lista-with-jQuery
Projekti nimi "ToDo-lista-with-jQuery" ja tekijä on Jasper Huhtala.

## Demo link:
Tässä löytyy lyhyt demo video, kuinka tämä sovellus toimii.



https://github.com/user-attachments/assets/31477166-a7f5-4ee9-80e4-22cd55e6bbb6



## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Status](#status)
- [Credits](#credits)

## About The App
[ToDo-lista-with-jQuery] on tehty aiemman projektin pohjasta [ToDo-lista] ja se toimii samalla tavalla eli yksinkertainen sovellus, johon voit kirjoittaa tehtäviä joita aiot tehdä ja merkitä ne valmiiksi tai poistaa.
Tähän myös versioon on lisätty muutamia toimintoja, joita aikaisemmassa projekttissa ei ollut, kuten suodattaa "aktiiviset" ja "valmiit" tehtävät, sekä poistaa kaikki "valmiit" tehtävät.

## Screenshots
![image](https://github.com/user-attachments/assets/1e4f1225-7a31-4d0d-b2b7-c9c2394baced)


Picture by Jasper Huhtala.

## Technologies

Html oli käytetty sovelluksen rakenteen määrittämiseksi.

Bootstrappia oli käytetty antamaan valmiita tyylityksiä ja responsiivisuutta, kuten syöttökenttä ja lomakkeet.

CSS oli käyttetty omia tyylityksiä, joita bootstrap ei tarjoa suoraan, mukautetut värit ja varjostukset.

Javascript on se ohjelmointikieli, joka antaa interaktiivisuuden sovellukseen.

jQuery oli käytetty tekemään DOM-manipulointia ja tapahtumankäsittelyä.
 - Dom-elementtien hakeminen ja muokkaaminen esim. $('#todo-input').
 - Fade-in/fade-out -efektien toteuttaminen.
 - Tapahtumankäsittely, kuten (on('click')).


## Setup
Kaksi tapaa käyttää tätä sovellusta.

- Lataa kaikki tiedostot ja avaa index.html selaimeesi

tai

- voit myös käyttää tätä linkkiä, jos et halua ladata tiedostoja. ([https://todo-lista-with-jquery-e1df41.netlify.app/](https://todo-lista-with-jquery-e1df41.netlify.app/))

## Status
ToDo-lista on tällä hetkellä valmis.

## Credits
- ChatGPT:ä Käytin aputyökaluna selvittää ongelmia, kun tuli ongelma saada fadeOut() toiminta toimimaan, kun tehtävät oli suodatettu "aktiiveset" tai "valmiit" tehtäviin.
