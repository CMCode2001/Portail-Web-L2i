# Étape 1: Construire l'application
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2: Servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire approprié de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
