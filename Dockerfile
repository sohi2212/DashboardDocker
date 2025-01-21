# Указываем базовый образ с Node.js
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install &&\ 
    apt-get update && \
    apt-get install -y iputils-ping
    

# Копируем весь проект в контейнер
COPY . .


# Указываем порт, который будет открыт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
