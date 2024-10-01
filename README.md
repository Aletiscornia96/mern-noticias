# PARA PODER INICIAR LA APP
Para poder iniciar la app debemos crear en la carpeta noticias un archivo de nombre .env con 3 valiables:
```
> MONGO_URL
> PORT
> JWT_SECRET
```
Luego debemos entrar a la carpeta client y crear otro archivo con nombre .env que contenga lo siguiente:
```
VITE_FIREBASE_API_KEY
```

Habiendo creado las variables de entorno debemos inicializar el front y el back usando el comando npm run dev.
