
# Online Shop Frontend


## Langkah-langkah Menjalankan Frontend

1. Instalasi Dependencies
- Buka terminal dan pindah ke direktori project.
- Jalankan perintah berikut untuk menginstal semua dependencies: 
```bash
 yarn install
```

2. Menjalankan Project
- Setelah proses penginstalan selesai, dapat menjalankan project menggunakan perintah berikut: 
```bash
 yarn run dev
```


# Online Shop Backend

## Langkah-langkah Menjalankan Backend
1. Instalasi Dependencie
- Buka terminal dan pindah ke direktori project.
- Jalankan perintah berikut untuk menginstal semua dependencies:
```bash
 npm install
```

2. Konfigurasi Database
- Konfigurasi koneksi database pada file `config/config.json` Sesuaikan informasi seperti nama database, username, dan password dengan pengaturan MySQL. 

contoh:
```js
   {
        "development": {
        "username": "root",
        "password": null,
        "database": "online_shop",
        "host": "127.0.0.1",
        "dialect": "mysql"
        }
    }
```

3. Migrasi dan Seeder Database
- Jalankan migrasi dan seeder untuk menginisialisasi database :
```bash
 npx sequelize-cli db:migrate
 node seeders/seed.js
```

4. Menjalankan project
- Setelah proses penginstalan, migrasi dan seeder selesai, dapat menjalankan project menggunakan perintah berikut:
```bash
 node app.js
```
