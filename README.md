# 🛍️ ShopNest — Full-Stack E-Commerce Platform

![Django](https://img.shields.io/badge/Django-3.2-092E20?style=flat-square&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-4.1-764ABC?style=flat-square&logo=redux&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python&logoColor=white)

A production-ready, full-stack e-commerce web application built with **Django REST Framework** on the backend and **React + Redux** on the frontend. Features real payment integration via Stripe and JWT-based authentication.

---

## Features

- **Product Catalog** — Browse, search, and filter products by category
- **Shopping Cart** — Add/remove items, update quantities in real time
- **Secure Checkout** — Integrated Stripe payment processing
- **JWT Authentication** — User registration, login, and protected routes
- **Order Management** — View order history and track status
- **Admin Panel** — Manage products, orders, and users
- **Image Uploads** — Product images stored and served via Django

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Redux, React Router, Bootstrap 5, Axios |
| Backend | Django 3.2, Django REST Framework, Simple JWT |
| Database | SQLite (dev) / MySQL (prod) |
| Payments | Stripe |
| Auth | JWT (djangorestframework-simplejwt) |

---

## Project Structure

```
ShopNest/
├── backend/          # Django REST API
│   ├── product/      # Product models, serializers, views
│   ├── account/      # User auth and profiles
│   ├── payments/     # Stripe payment integration
│   └── my_project/   # Project settings and URLs
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   └── store/    # Redux state management
└── package.json
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL (optional, SQLite used by default)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/pranotivarpe/ShopNest.git
cd ShopNest/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-django-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key
DEBUG=True
```

---

## License

This project is open source and available under the [MIT License](LICENSE).