# Savebite Backend

Savebite Backend adalah server berbasis Node.js untuk mengelola dan memproses operasi backend aplikasi Savebite.

## Fitur

- Autentikasi dan Otorisasi Pengguna
- Operasi CRUD untuk sumber daya
- Integrasi dengan layanan pihak ketiga
- Pengelolaan variabel lingkungan yang aman

## Prasyarat

Sebelum menjalankan proyek, pastikan Anda sudah menginstal:

- Node.js (versi 22.xx.xx)

## Langkah Memulai

### 1. Clone Repository

Jalankan perintah berikut untuk menginstal dependensi:

```
npm install
```

### 2. Buat File `.env`

Berikut adalah konfigurasi file `.env`:

```
SERVER_KEY_MIDTRANS=SB-Mid-server-WYp0nYf4tVODdSvTHx6Ny4V7
CLIENT_KEY_MIDTRANS=SB-Mid-client-iyeLW8nt_BsB_Ymr
```

### 3. Jalankan Server

Gunakan perintah berikut untuk menjalankan server:

```
npm run start -> untuk produksi
npm run dev -> untuk mode pengembangan
```

### 4. Jalankan Antarmuka Web

Lakukan instalasi **Live Server** pada ekstensi VS Code. Setelah terinstal, tombol **Go Live** akan muncul di pojok kanan bawah.

Browser akan terbuka secara otomatis dan antarmuka akan tersedia di:

```
/public/qrCode.html
```

### 5. Hosting Menggunakan Ngrok

Setelah server berjalan, port **3001** akan digunakan sebagai port server.

Langkah selanjutnya adalah mengatur **Ngrok** sebagai hosting server agar dapat diakses oleh perangkat mobile.

#### Langkah-Langkah

1. **Unduh Ngrok**  
   Unduh Ngrok untuk sistem operasi Windows dari situs resminya, lalu ekstrak file dan buka aplikasi yang ada di dalamnya.

2. **Tambahkan Token Autentikasi**  
   Jalankan perintah berikut untuk menambahkan token autentikasi:

   ```
   ngrok config add-authtoken 2ieSOmk35zVcuCr3G0j2KL9bmW1_4kDMMK74TFHcJpgrKobjk
   ```

3. **Jalankan Server Online**  
   Jalankan perintah berikut untuk membuat server online:

   ```
   ngrok http --url=enormous-mint-tomcat.ngrok-free.app 3001
   ```

Ngrok akan memberikan URL yang dapat diakses secara online.
