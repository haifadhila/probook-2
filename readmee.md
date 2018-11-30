# Tugas 2 IF3110 Pengembangan Aplikasi Berbasis Web

## Garis Besar Aplikasi
<<<<<<< HEAD
Pada Tugas Besar 2 Pengembangan Aplikasi Berbasis Web ini kami melakukan peningkatan fitur dan pembaruan pada Pro Book dimana kami menggunakan arsitektur REST dan SOAP. Aplikasi ini menggunakan webservice bank dan webservice buku. Pada tugas ini juga digunakan Google Books API yang menyediakan data-data buku. Pada aplikasi ini juga terdapat tiga basis data yang digunakan yaitu basis data probook, bankservice, dan bookservice.
=======
Pada Tugas Besar 2 Pengembangan Aplikasi Berbasis Web ini kami melakukan peningkatan fitur dan pembaruan pada Pro Book dimana kami menggunakan arsitektur REST dan SOAP. Aplikasi ini menggunakan webservice bank dan webservice buku. Pada tugas ini juga digunakan Google Books API yang menyediakan data-data buku. Pada aplikasi ini juga terdapat tiga basis data yang digunakan yaitu basis data probook, bankservice, dan bookservice. 
>>>>>>> b39ec120657bc58506a826bfc007d4ef3468e21b

### Basis Data
Basis Data ProBook : Basis data ini terdiri dari lima tabel yaitu **authtokens**, **books**, **reviews**, **transactions**, dan **users**. Tabel **authtokens** memiliki atribut clientlp, expiry, idToken, idUser, userAgentHash. Tabel **books** memiliki atribut cover, idBook, dan title. Tabel **reviews** memiliki atribut comment, idTransaction, dan rating. Tabel **transactions** memiliki atribut idBook, idTransaction, idUser, orderDate, dan quantity. Tabel **users** memiliki atribut address, card_number, email, idUser, name, password, phone, picture, dan username.

Basis Data Bank Service : Basis data ini terdiri dari dua tabel yaitu **accounts** dan **transactions**. Tabel **accounts** memiliki atribut balance, card_number, id, dan name. Tabel **transactions** memiliki atribut acct, amount, id, remarks, time, dan type.

Basis Data Book Service : Basis data ini terdiri dari dua tabel yaitu **books** dan **transactions**. Tabel **books** memiliki atribut category, idBook, dan price. Tabel **transactions** memiliki atribut idBook, idTransaction, idUser, orderDate, dan quantity.

### Konsep Shared Session REST
Konsep dari shared session REST adalah pengguna yang diberikan token untuk melakukan login atau register. Token yang dimiliki oleh pengguna asli aplikasi dapat diambil dan digunakan oleh pengguna lain yaitu pengguna yang mengetahui token miliki pengguna asli tersebut. Pengguna lain dapat menggunakan token tersebut untuk mendapatkan session yang sama di tempat yang berbeda.

### Mekanisme Pembangkitan Token dan Expiry Time

Token dibangkitkan sebagai 18 byte dari CSPRNG, kemudian di-encode dalam base64. Dibuat tabel database untuk mengasosiasikan token dengan data session, salah satunya adalah expiry time. Expiry time dicek setiap kali token dipakai, yaitu pada setiap request. Agar token lama tidak memenuhi database, setiap kali dilakukan manipulasi token (grant new token, erase token), aplikasi menjalankan query untuk menghapus semua row token yang expiry time-nya sudah lewat.

### Kelebihan dan Kekurangan Aplikasi
Arsitektur pada Tugas 2 ini cukup berbeda dengan Tugas 1 yang sebelumnya dimana Tugas 1 menggunakan arsitektur monolitik yang menyatukan order, searching, dan penyimpanan data buku dalam satu aplikasi. Pada Tugas 2 ini dilakukan pemisahan antara order, searching, dan peyimpanan data buku karena menggunakan webservice. Webservice yang digunakan adalah webservice buku dana webservice bank. Kelebihan dari arsitektur ini adalah modularitas sedangkan kekurangannya adalah kompleksitas yang lebih tinggi dalam pembuatan aplikasi.

### Pembagian Tugas

REST :
1. Create API Definition : 13516103
2. Implement Skeleton : 13516022, 13516103
3. Create Database Schema : 13516022
4. Create Validation Service : 13516103
5. Create Transfer Service : 13516076

SOAP :
1. Create API Definition : 13516076
2. Implement Skeleton : 13516076
3. Create Configuration : 13516076
4. Create Search Book Function : 13516076
4. Create Google Books API Connector : 13516076
5. Create Database Schema : 13516103
6. Create Book Detail : 13516022
7. Create Book Purchase : 13516022
8. Create Book Recommender : 13516103

Perubahan Web app :
<<<<<<< HEAD
1. Halaman My Profile : 13516022
2. Halaman Edit Profile : 13516022
3. Halaman Register : 13516022
4. Penambahan Access Token : 13516103
5. Halaman Browse : 13516076
6. Tampilan Search Result (AngularJS) : 13516076
7. Halaman Detail Buku : 13516076
=======
1. Halaman My Profile : 13516022 
2. Halaman Edit Profile : 13516022
3. Halaman Register : 13516022
4. Halaman Browse : 13516103

>>>>>>> b39ec120657bc58506a826bfc007d4ef3468e21b
