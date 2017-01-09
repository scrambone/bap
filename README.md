# bap

Необхідно:
Node
MongoDB
Mongoose
ExpressJS
PassportJS
<p>
Встановити з файла package.json необхідні елементи за допомогою npm install
<p>
в папку node_modules встановити "npm install passport-oauth"
<p>
Перед початком роботи створити таблицю з лічильником кількості лотів:

mongo
<p>
use loginapp
<p>
db.counters.insert( { _id: "auctionid", seq:1 } ); //лічильник кількості лотів
