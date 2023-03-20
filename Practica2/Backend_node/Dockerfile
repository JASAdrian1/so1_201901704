# Version node
FROM node:18

#Creacion del directorio de trabajo
WORKDIR /servernode

#Copiando archivos con las librerias necesarias
COPY package.json ./
COPY package-lock.json ./

#Comando para instalar dependencias
RUN npm ci --only=production

#Copiar las dependencias y archivos
COPY . .

#Puerto a exponer
EXPOSE 5000

CMD ["node", "index.js"]