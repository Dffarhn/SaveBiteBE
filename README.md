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
  "private_key_id": "9397226abeeee16cd147b7d485d34c1e3d47b987",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOTTXeo/j0kzUw\n1tXp/VqC018gbet59qpJ07aUl26sfKxUSt68ZkZJW8sB8eq1Ue1JYt/VXNgc3+HE\nTknaulHUer99Ks7wdNNpvseiJ3RT/A9ctE/a4KMXGNGQRZgbz5GXcWZ1TADWg7jp\nYjwLsdvFB0DFmtnuxFYxtc/5iDpDnFJm7bgf2DdeO/OMoAHf+jHjuO6eU4hiadXc\nIgC1bSAi6luJWewpA/twNJCQgmix3KJCS+Vgxt+nnAZ5+78FfVJa9+LAqTmij8K+\noYVHiBaRc21CGwkCTdIqeOhQkldEs1/RGUz1A0Db0RWuhInvWYVZGEWzb+rIlgRm\nxzAIz7KLAgMBAAECggEANhj+GtNxyaS+in+TmafTr8HAzK62VIWv0us/EgkBvx50\nTChT7yB8puj4u5pV+1Uv/ZH9cyRFEZFN0R3cdQxtv+OuSiLLIDfqZmzeSbHB6fIL\njzpDRHiqm7ho38W4JPbRzV4xyWl0QMxK1XxqlYB+ylRkEk1Qf7GhjqiIEH2+FZM0\nWAUTNhUmXgLUFUlLqS6z4d31iSyZt3P85iO5r2G7hpRmQpLzgBbFz78UXg7DhVXQ\njj4lvHEf96z2kmIoYX+G69kIAUnVJa0GJLBHCCWHVZhjRdaf3ZfsVdEQG/a9+yoq\nciwlbzFY0ytKug7kUobN5ybTeX4xUJOAacIS2aau3QKBgQDuKMgEtgmLVW/QZhu9\n7tjDhOaZbqzEwVKlnz+BqnrsTUMGAydS/gE/NbwDGtKtXL267tMJiNDMoaeUS7Fv\nMi7lXKpHnIOcPxN40Fq4nFi/NAL+FTLAg0mC5fi1/okOSd7rHS+6odkb2dnb2W8q\nEcOjAyhOMXrOqNelCOL5/Z2QZwKBgQDdwX0tAHhojURg8EI+8c2OghGN08bOxVhW\n6gPQfI+uC+RhpInI/e4zxVA0Ta4399uJbTAAWmFWGMMwEsu4JEitT1bw08ivcVn0\nn8JroMWCzPquYICMxwdR2yBCGF//RFdCKYCS1W+Tay0o0MqmKY37khXLRp2awr3Q\nZz8bSWMmPQKBgBGQHlgCmKeW0F0c+pTCJWgdx+euurzzyMV//e3xBYmhlPy/hMnh\nA3SG4OuVsc2pFjDP5e5BEazViwcrodUibUTq1X/ccfQ2zpfNPbN5jC3lhwb3xztd\nMzGdBf9d2vubxP2vtFJeFyWvphpJaaI/lx7RX8qMaZMN7oE0K5Dl/BWnAoGBAIKw\nCDRgRZXgQz8Z+QCdgnYM44mBGHY9SW2XZn4VGpwI+CQvUuB3/kzWaQkaCqWDVgds\nqNBcc2bJGycWvKaeA5LX4jX1qhzzIX+QM4U4b45BfS8NQlU06nRsPluVf+WxgfdE\n/DgMvz/S9v9J5VP9w2ZSVrPAvxs4z6KlZkSPgHZFAoGAUuMsBoKT/deL1ibXwrEK\nyoS1ba1O2sdD7ftUyuKj4N2+V57mRNIhCuc7dLfnAn+J+6T0XSuUU3xDYfUd2NUn\n4YKLrKf9WFr3fWZco+1IHB+WT6vHLiTDgcGWrPxcAlVoCJCx+1M5rDDLMZrbCD7E\n4OE/vSIeOmVEcimSFVCYgvg=\n-----END PRIVATE KEY-----\n",
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
  "private_key_id": "a5652b63f81e9ac54f8c26621bef29627d021bcf",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDOQeOLMYzMMD9L\nFb4AABYgAM3g+Qtr8RDm7WJWhlbI14UzmDRZtmzY+UOeIm4x91bc+CdkqOn2YowD\nOVBnATE1ZKkwVMGFZrxMsyEcgx/urqKD63mEicwUd0qR5HaAo5MGTWuj2U7Lm+VG\nVTVgHE5vrpGsPcPb+AeXA89KR54oYQqWTytKPo6O0AVC86hPZS7by0bYfvpbzJZy\nmujnAig0TvbsuOuxNlCBcCOXyLdyn0XasLEoi+m5k//sBDkNC89k9Pskk0yuIC/H\nTT93bGZtpL2MiBiLcMlNV8BtgYIamKq1+gOzLyjo6NMVLgF1MNY0RYdgmSQiuGVu\nF3QDouL3AgMBAAECggEABiO/oRGWW4T7eqyI2C7TJHG8WdGKram33eqRY6T3vrPC\nUyED50Bpvg2xcxVwSqF5CaEuFFjThLzgkRSq2DNuDQ+phPbzlG5/SsMxnaEo7q3D\nyFcr6gOWD8KQoDDOTDxSReeWaC1cTe2ekLjm8AJNCBWzYA6t9AV5PbK51Wq2Alqk\nvsTGtQ9VUkPnx2E9z7kyX34I96gRoN+ooUhMTb/e4qdsH8vQXxi6KImxlMP4UtMd\nOKxxqPQruUFiko4HUX3f3UjAWe0puvqfsdf2ldGY9SJijWXJ1Loc/C2tcjPo6jPa\npAGgGaLFQ+jCGbdExXpV867LHlzUhJdP35uYAjZQWQKBgQD6sH/di/It6+gvz0Wh\nb1t3sAOnYr5nfSEiskSFaoZOT0NjwpdhRnobe4/j3yXv8TWyxvspW2Pvbcq2fRG9\nCF0AJuUO+TPslooVX47VHtPp/fYSJvqJOXiWIAG15Tq6NGkVIzXXZWdwQvfAsBHY\n49Gm8LM7zN9n20D7S2Hkw2Qs+QKBgQDSoG6jFWe7WCSFIELbEnitIRjQNQf9JgTc\nPJ4uBv3md6DDn7e08iW+tbdg1trYSR/oLtnm41VsmoHxwq2QT9mbq/Lhx3xgqfzw\njGaXQQRAgE2U4FBbTxcCm2nRa8aOweNzNd39HZ2F8xPeCgjTgEbJKu81GFYKkNgW\ny7XwHwY7bwKBgDyVNvF1hptubXhQYQV4geRU1y02gclExiM6bbDIY5i9Mw4C0s6h\nV5UYsVdicCqiYlXIHJ6MBYSxRdIAO68xPDhzLdwGgXPllY1AwKXkg1YDF9qfLODI\n0MmHBqLMuPqS++otzi81xF+u72zToByIQfxUIxyKkFrq87NHLms4hRcRAoGAShOE\ndbTMg7YPOgbLnJKVgIY4XNmZ0q1xXievlg59c3W1Q7fDe08CeV0dfmByHUkygI0h\ns7NWUtjQRL+sHSoIJVjHFiL7ml+OhudKGX4TScAWCPsPJ93cAN25zJ5z+bc1EErs\npN2qjfackSXETuY5fvyrnmfNsu+YIARLG4U9wt8CgYBmnY6DtbJsRqNq4CANvwDX\nT4xmbeBuFs06T1FHv/RvBcwSZ1NuConyR7uhkTjKEngtE2pcmYKw6R8I29sX7OI5\nj3R5hsteFaMvBN5OJLNFcoyA4mgrfZw1CUddXGrv/ubbV2RyOl2HrAIMpiDIdkNQ\nlwgOOIpe2JU7KH7dDopyAg==\n-----END PRIVATE KEY-----\n",
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
   ngrok http --url=enormous-mint-tomcat.ngrok-free.app 3001
   ```

Ngrok akan memberikan URL yang dapat diakses secara online.




