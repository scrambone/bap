# bap

Необхідно:
Node
MongoDB
Mongoose
ExpressJS
PassportJS
<p>
Перед початком роботи створити таблицю з лічильником кількості лотів:

mongo
<p>
use loginapp
<p>
db.counters.insert( { _id: "auctionid", seq:1 } ); //лічильник кількості лотів
