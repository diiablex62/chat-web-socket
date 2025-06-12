# Chat web socket - Application de chat en temps réel

Une application de chat moderne et interactive construite avec React, Node.js et Socket.IO, permettant aux utilisateurs de communiquer en temps réel avec des fonctionnalités avancées.

## 📦 Repositories

- Backend : [https://github.com/winstoncda/web_socket_chat](https://github.com/winstoncda/web_socket_chat)
- Frontend : [https://github.com/winstoncda/web-socket-chat-client](https://github.com/winstoncda/web-socket-chat-client)

## 🚀 Fonctionnalités

- 💬 Chat en temps réel
- 👥 Gestion des utilisateurs en ligne
- 📸 Partage d'images
- 🔒 Authentification sécurisée

## 🛠️ Technologies utilisées

### Frontend

- [React](https://reactjs.org/) - Bibliothèque UI
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [DaisyUI](https://daisyui.com/) - Composants UI
- [Socket.IO Client](https://socket.io/docs/v4/client-api/) - Communication en temps réel
- [Zustand](https://github.com/pmndrs/zustand) - Gestion d'état
- [Axios](https://axios-http.com/) - Client HTTP
- [React Hot Toast](https://react-hot-toast.com/) - Notifications
- [Lucide Icons](https://lucide.dev/) - Icônes

### Backend

- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express](https://expressjs.com/) - Framework web
- [Socket.IO](https://socket.io/) - Communication en temps réel
- [MongoDB](https://www.mongodb.com/) - Base de données
- [Mongoose](https://mongoosejs.com/) - ODM pour MongoDB
- [JWT](https://jwt.io/) - Authentification
- [Cloudinary](https://cloudinary.com/) - Stockage d'images
- [Bcrypt](https://github.com/dcodeIO/bcrypt.js/) - Hachage des mots de passe

## 🔒 Variables d'environnement

### Backend (.env)

```env
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5001/api
```
