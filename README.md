# Savebite Backend

Savebite Backend is a Node.js-based server for managing and processing backend operations for the Savebite application.

## Features

- User Authentication and Authorization
- CRUD operations for resources
- Integration with third-party services
- Secure environment variable management

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version 22.xx.xx)

## Getting Started

### 1. Clone the repository

```
npm install

```
### 2. Create Env

this is the env


SERVER_KEY_MIDTRANS=SB-Mid-server-WYp0nYf4tVODdSvTHx6Ny4V7
CLIENT_KEY_MIDTRANS=SB-Mid-client-iyeLW8nt_BsB_Ymr


### 3. RUN SERVER



```
npm run start -> for production
npm run dev -> for watch

```


setelah running akan di berikan port 3001 untuk menjadi port server

setelah itu setup ngrok sebagai hosting server agar bisa diakses oleh mobile


download ngrok untuk pertama kali menggunakan windows

lalu unzip dan buka file application yang ada didalam nya


lalu jika pertama kali jalankan command

```

ngrok config add-authtoken 2ieSOmk35zVcuCr3G0j2KL9bmW1_4kDMMK74TFHcJpgrKobjk

```


selanjutnya jalankan command untuk membuat server online



```
ngrok http --url=enormous-mint-tomcat.ngrok-free.app 3001
```





