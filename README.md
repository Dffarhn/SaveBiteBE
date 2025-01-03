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

### 2.1 Buat File didalam src/databases `database.json`

Berikut adalah konfigurasi file `database.json`:

```
{
  "type": "service_account",
  "project_id": "unityhub-recyclefood",
  "private_key_id": "0f504f43c21b1063d0d37f5a8b13a9a4a9575dd1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkMJrOOCxDJhwM\nNUD+hQLxJzafZ6476Awf6t0oRKfhfCRZO5rjqkgo+3mM6SVs+qW70L51tTPdbCch\nmgriLUHc3mVlGQh3eEjoXU3E7DeOdS37zWubLt4NrOyBGPwpH1LszqzzaAXAOEKn\nQFLm0Z2Ht9s1sVJFw0+0RA0Gw3jy6TuDBgOtuaho7mIMuFxNkMROtvRjkFCqsp9f\nCYxmQgDSV7mVL3paZ7c7eblzLBkxMpe8edc480C5hJzJYU4kM1QDNVHQL2JqDh2N\nW+fLJEMJ4/K4+s8jVh2eMyST6N69I1qGO8Zf7aavx+91ftkCIBmBK8bHkDOuoQI/\nDGQi+5/LAgMBAAECggEAbqgXWiupY0LG1TC5/PM5swImHfUkbA6iWpQFfXKVyuXt\npoweF4tLBPy2PBwPtyJxXnvi8KfXp+e7rjLKVlZGGzqKBxW1omHlUTF19inq4x12\nGCbMqOt4aT9TTWN1XOfAye+LtVnbeBSQVhT+XsqFzvvcxNPhps0JCMz7WC1QqNKB\nCS11NlsKALnAfSzoVV7UQZWqQIrzbTs2y+SMb/uPTlvQkPFDNvFbqmhoJ8YO9Dho\ntX5ES1qByMtji18Q1DEcWzwkIRfM1+J9S8QzejSZHQQBcPgMgJuuM6pFC4ZzZxdR\nDzJDEUYKzD64V8SyJNld+3H86AfPYjPedW/473BFeQKBgQD9ZcfWZE25WPPPjmKI\nOiAaSSxlrKMA4BVEy5Li3bqcU4ewSixh5Aj6v5vKyei4+B4Wgsqh9v11HNh5f3lb\nhv4e036SPJpLAIf4uEbGPWe/GUVUjC1JpAOlPIXBhV/flUVoQX1Qf3QfTce6HMUB\nUApo7j1dN2LpwAnvLgGgDS/JdQKBgQDmiIyfZbFuOwkR2owTWtLFQsC2olQSOYMy\n1teFwZdnYTeV58AJDSAN7l62jkbbngIG4oUjSBuY0m5R8BgyQW2fF6hBFb7qCDtD\nD6nZ1ejjdfJ1wzyGf7tCy8qvjtddmQUFRDWyyRDNtbatK7SdkMGtFmxmV0s8Azu/\niE2ECydcPwKBgQCxmlrca2UGmdAZE6T/8i15/vt9L+j3vhdqJn0HQX2AABPEfdhp\nrBiXFyEsmyPgMRd1k6pOpvyyzsrzLWNzwUPvezDlclB6bR7gNth0Lam/iQjM34sG\naEydzbO6Fa9C2C7TicM5XnuXTT7FtVBnQSBqt0CPSziquQy9dTNyaIur2QKBgAQH\nFLXgN/ZeD62BLPtVleMeZHGMan2bBaDIwiEzHasPtsHmt6Mw2IOFy5/S4ogJva1T\nHdJc+yZzXrwNvs55+ClUZ3sjnx9Fn4tvZZ9JrnTy5ZaLH66V4rarCtKAY2DeQIk0\nBOAnxSRi7VsfLVunYMreXmx3T/gvckbJYdlRvJFPAoGAZiV3c3AcKQ7q0D7IZyyz\n01FA/TVS6sZrZXeHFStbPypYwTs6jcE757G4qwmqbIQRqpRoBZPhfqUS0parkCUv\n4MpA3MJ0DXEStHeFC6lTamuveifrcX4dvOdla5YqXOWzc8qgOJonmUmeq4VIWFjg\n0sK3anUFdTf2EnNFUE3/JOU=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-4b91b@unityhub-recyclefood.iam.gserviceaccount.com",
  "client_id": "108363808333848312332",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4b91b%40unityhub-recyclefood.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

```
### 2.2 Buat File didalam src/databases `storage.json`

Berikut adalah konfigurasi file `storage.json`:

```
{
  "type": "service_account",
  "project_id": "bekaspakaistorage",
  "private_key_id": "cc0f2b78e3136ca3ed8a83e12832d8f4c921f186",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCwSiRJGv8ORTAv\n5yBlsXyL2l8n176VJQqb4OR1iycf0TCwQGxY04NKum3e3cjH4RkbLgLLR5qyY26f\nYKMTEK2s43irN3kiFPhl1u6g3d5qUU0ydmBZfhsL0VWUEHiXGfREuQMi0Ss0h4bH\nBpyQBrKY39NE90LEliSI5GXXThmAA4lg4yT6QQpNF5AMIek1F194nu/HCGQsCXz1\nhNiSZTb1r6Vxz2NdKZcqImuuAUcpCbGU5NXN5N5NJ416MulT+VA5O3UezAc1JzCK\nAjS5w//ZelKrZj6SMFE1MhYb2j+yVW+MF9D5DAR/eEWSN1s2xDkqZqe5SbppCcRJ\npXPPeYqxAgMBAAECgf8jZGnZ2MxRVnKmK1twZIGsp4VoalfzeXb3yd6+pSvlp18v\nA2q9Ko8L9wG34gQ9R2PS9m8j1exThBg2xx/2OT2k8sYhxFv9YQMS7w5ZctxZsUOJ\nA1sJ8ddcOAVbrzLb+HSh7MLvFS9SDHjH3FFHrmXiFeLvJZ+x+AgTCPJT7MoRzk4f\npCmxZnun3rL/wP9PGd57rHBVOlpFMHKCBZsBwxpzF9YqyzDJkQU858Pc4bnd71vF\nUdxMlozVFBO7DJ4vHpUVpCzlHXVlutNj0q1YnQrYEJDlD60+O+Xld/F/WcgN5nwh\nIb95P+Gn/yKmhn4yEIFhMPAjqA3OUot3oKoZgEECgYEA7a9D3M9KPc7+xbmhZ3F4\n7HfaRMlS2L6CRr5n/tCWF6Qo5bmNlyBnXd30UDey9fWNVi5NEoa+8z3Yuv/tePuw\nl8i3ztAVUMLB84gktQCkT77qfCNKKJH4mQNgbiyARp+CcGxCEgqEKr8TJa+F+35q\nIlju/NahxASe1AxBSQNpS8ECgYEAvd/BWCTWlWxBJx9el6hbQODNW8hEcgNe5zLN\n1ftVk/Bad3Hf7NUOubN9RMaeZmByNM+nZom2fmTmd0fvpi43abMpbKNlXDV6b/wK\nM3CyqZIXFU6BobcxhEh7mV56GexAEixusNAI735hzeaqbulbRHGkku3OvnCn3kwZ\nG6gPuvECgYBQnlMBUVoYLt6hiD4jzQw8AMcK79Jm6+9aOXkip/NQ34BzswVAjmAh\nKYiVsN7FqF0hLyE7OHMKJB8gBnCwyYXzZcRapJ+mPfj1Nmdk8WvKFLKKGporup88\nnzWVCQkVa0MeCMo8Pk7oBNlkve1PCWjMb6fYIKDL0NliiSmXr02GwQKBgG5Sl2We\nqevSJZ0UtgKKeNMei1O77kEMwlS1iTG+wj+eFQJ38PML7G1r4+pVOW4ktdcHnK2Q\ncK/J8rr12kIFcn8A8Z3E5r0H+acdm9O9tKGgV7cykVGkPqos71vysCFlyuiEVqB3\nj+mP1kYrs3WUM0p2eXhBorG2hWM9dg1CvjkRAoGANn2lhE5P+XA/WacYeX358/21\nOLrTBCRI75eceSFnwE5CBzok7iaQeDcieDkBUP1ElUdLHe4YX+mJCbo1GYx+zqaw\ns9x1BR+VvcaXJufj1/H6twWkwgp/S8ZVaLJ6QKjbX3AIAHXKUPtSJkd1f85A03Ok\nCE+KTWZu1s9sFMy+fM8=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-hedsy@bekaspakaistorage.iam.gserviceaccount.com",
  "client_id": "111053875341594707558",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hedsy%40bekaspakaistorage.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}



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

   ngrok tunnel --label edge=edghts_2pJtZGT8dKkQ2hp4saDf20SbhOM http://localhost:3001
   ```

Ngrok akan memberikan URL yang dapat diakses secara online.




