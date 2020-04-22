# Day length app
### Code usage order:



#1 Clone repo - 
```
git clone https://github.com/Patricklomp/day-length.git
```
#2 Start backend - 
```
cd day-length/day-length-backend
npm run start
```
#3 Start frontend - 
```
cd day-length/day-length-app
npm run start
```
Open http://localhost:3000 to view it in the browser.

### Questions(in Estonian):
#### Tööks kulunud aeg:
Tööks võis kuluda umbkaudu 6-7h.  
#### Mis oli lihtne?
Algne Etapp 1 ehk päeva pikkuse kuvamine koordinaatide ja kuupäeva alusel. Leidsin kergesti kasutava API https://sunrise-sunset.org/api, mida selle jaoks kasutada. 
#### Mis oli raske?
Kõige raskem osa oli minu jaoks Etapp 3 ehk päeva pikkuse kujutamine graafiliselt. Selleks leidsin React'i package'i, mida graafika kujundamiseks kasutada. Raske oli back-endis kõikide päevade, mis jäid küsitud vahemiku andmete korrektselt saamine. 
