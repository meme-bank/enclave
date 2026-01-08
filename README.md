<p align="center">
  <img src="docs/images/icon.svg" alt="Octopus Project Logo" width="250" style="padding: 20px">
</p>

<div align="center">

[![License](https://img.shields.io/badge/license-AGPL--3.0-orange?style=for-the-badge)](LICENSE)
![Last Commit](https://img.shields.io/github/last-commit/meme-bank/enclave?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/meme-bank/enclave?style=for-the-badge)
![.NET](https://img.shields.io/badge/NodeJS-25-green?style=for-the-badge)
![Build Status](https://img.shields.io/github/check-runs/meme-bank/enclave/main?style=for-the-badge)

[![Мы ВКонтукле](https://img.shields.io/badge/Мы_ВКонтукле-4680C2?style=for-the-badge&logo=vk&logoColor=white)](https://vk.com/membank_mm)
[![Website](https://img.shields.io/badge/Сайтик-333333?style=for-the-badge&logo=link&logoColor=white)](https://membank.ru)

</div>

# <p align="center">Сервер авторизации НБМ Enclave (Проект Octopus)</p>

Исходный код сервера авторизации Народного Банка Мемов, сердца экономики Мемного мира

## Лицензия
Этот проект распространяется под лицензией [GNU Affero General Public License v3.0 (GNU AGPLv3)](LICENSE). Согласно условиям, если вы используете это ПО для предоставления сетевых услуг (SaaS), вы обязаны предоставить исходный код своей версии пользователям.

Проще говоря: Пиздить разрешается, закрывать нельзя

## 

## Технологический стек
| Для чего? | Технология |
| :--- | :--- |
| **Язык программирования** | TypeScript |
| **Runtime** | NodeJS 25 (может быть использован и новее) |
| **Backend** | NestJS 11 с Fastify |
| **Frontend** | Vite |
| **База данных** | PostgreSQL через MicroORM |
| **Архитектура** | Монолитная, основанная на сервисах |
| **Лицензия** | GNU AGPLv3 |

## !!! Предупреждение о безопасности !!!
При публикациях форков, не оставляйте, пожалуйста секретных ключей и прочих штук, которые должны оставаться конфидициальными. Используйте для этого Переменные окружение, они же Environment Variables

### Environment Variables
| Название | Описание | Тип | По умолчанию |
| :--- | :--- | :--- | :--- |
| **NODE_ENV** | Окружение, в котором работает приложение | "production"\|"development" | "development" |
| **DB_NAME** | Имя базы данных | string | "octopus_auth" |
| **DB_PASSWORD** | Пароль от базы данных | string | "octopus_auth" |
| **DB_HOSTNAME** | Хост базы данных | string | "127.0.0.1" |
| **DB_PORT** | Порт базы данных | integer | 5432 |
| **APPLICATION_HOST** | Хост, которое прослушивает приложение | string | "127.0.0.1" |
| **APPLICATION_PORT** | Порт, которое прослушивает приложение | integer | 3000 |
| **VK_CLIENT_ID** | ID приложения в ВК | integer | 51716242 |
| **VK_CLIENT_SECRET** | Секрет приложения в ВК | string |  |

Задайте, пожалуйста, эти переменные при разврёртке

## Развёртка
1. Для начала убедитесь, что у вас скачан NodeJS. Скачать можно через пакетный менеджер Вашего дистрибутива, либо [отсюда](https://nodejs.org/en/download). Также при развёртке нам понадобится [git](https://git-scm.com/install). Также понадобится PostgreSQL
2. Клонируйте репозиторий:
```sh
git clone git@github.com:meme-bank/enclave.git membank-enclave # Клонируем из github.com:meme-bank/enclave.git в папку membank-enclave
```
3. Перейдите в директорию:
```sh
cd membank-enclave # Переходим в директорию membank-enclave
```
4. Установите все зависимости
```
yarn install
```
5. Выполните миграции
```
yarn migration:up
```
6.1. Запустите приложение (режим разработчика)
```
yarn start # yarn start:dev - для динамического изменения
```
6.2. Запустите приложение (реальный режим)
```
yarn build && NODE_ENV=production yarn start:prod
```

## Спасибы:
- Прошлые проекты-реализации Народного Банка Мемов (раннее Банка Мемного Социалистического Интернационала):
  - [Urtyom-Alyanov/bank_msi](https://github.com/Urtyom-Alyanov/bank_msi)
  - [Urtyom-Alyanov/pbm-project](https://github.com/Urtyom-Alyanov/pbm-project)
  - [Urtyom-Alyanov/nbm-1.1s](https://github.com/Urtyom-Alyanov/nbm-1.1s)
  - [Urtyom-Alyanov/octopus-bank](https://github.com/Urtyom-Alyanov/octopus-bank)
  - И потерянные навсегда версии...
- Системы Автоматизированной Бюрократии (онги же бот-банки, боты-паспортисты):
  - [Urtyom-Alyanov/lovuschkinsk-bot](https://github.com/Urtyom-Alyanov/lovuschkinsk-bot)
  - [Urtyom-Alyanov/umsr-bot](https://github.com/Urtyom-Alyanov/umsr-bot)
  - А также боты созданные на всяких проприетарных платформах (Бот-банк Гардернии, ранние версии бота Ловушниского)
- И, конечно же, Торговой Мемной Лиге (ренне Банк Кекляндии)
  - [rival-politics/tml-classic](https://github.com/rival-politics/tml-classic)
    - Ну и, конечно же, новым банкам от этого же разработчика, которые тоже утеряны и заброшены...