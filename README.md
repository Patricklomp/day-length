# Day length app
## Description
Application that calculates day lengths. Web application in which the user can choose location and date to see day length in given location. Also possible to choose location from the map by dragging the marker and instead of one day choose date range, which shows graphical information about how day length changes over time.  
## Installation:
### Code usage order:



#1 Clone repo - 
```
git clone https://github.com/Patricklomp/day-length.git
```
#2 Start backend - 
```
cd day-length/day-length-backend
npm install
npm run start
```
#3 Start frontend - 
```
cd day-length/day-length-app
npm install
npm run start
```
Open http://localhost:3000 to view it in the browser.

## Questions(in Estonian):
#### Tööks kulunud aeg:
Tööks võis kuluda umbkaudu 7-8h.  
#### Mis oli lihtne?
Algne Etapp 1 ehk päeva pikkuse kuvamine koordinaatide ja kuupäeva alusel. Leidsin kergesti kasutava API https://sunrise-sunset.org/api, mida selle jaoks kasutada. 
#### Mis oli raske?
Kõige raskem osa oli minu jaoks Etapp 3 ehk päeva pikkuse kujutamine graafiliselt. Selleks leidsin React'i package'i, mida graafika kujundamiseks kasutada. Raske oli back-endis kõikide päevade, mis jäid küsitud vahemiku andmete korrektselt saamine. 
#### Mida tegin ja kuidas tegin?
Rakenduse tegemiseks jaotasin töö kahte ossa - front-end ja back-end. 

Front-end on tehtud kasutades React'i ja stiili jaoks on kasutatud Material-ui'd. Graafilise osa jaoks kasutasin devextreme'i React Chart'i.

Back-end on tehtud kasutades NodeJS'i. Informatsioon päevapikkuse ja muude andmete kohta saadakse https://sunrise-sunset.org/api API-lt.


