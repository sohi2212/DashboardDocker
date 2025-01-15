# Указываем базовый образ с Node.js
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Указываем порт, который будет открыт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]