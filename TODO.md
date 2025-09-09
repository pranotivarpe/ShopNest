# Cart Functionality Implementation Plan

## Backend Tasks

- [x] Add Cart and CartItem models in account/models.py
- [x] Create and run migrations for new models
- [x] Add serializers for cart models in account/serializers.py
- [x] Add views for cart operations (add, remove, get cart) in account/views.py
- [x] Add URLs for cart endpoints in account/urls.py

## Frontend Tasks

- [x] Create cartActions.js for Redux actions
- [x] Create cartReducers.js for Redux state management
- [x] Update store.js to include cart reducer
- [ ] Update ProductDetailsPage.js to add "Add to Cart" button
- [ ] Create CartPage.js to display cart items
- [ ] Update Navbar.js to include cart link
- [ ] Update CheckoutPage.js to handle cart items instead of single product

## Testing

- [ ] Test add to cart functionality
- [ ] Test cart page display
- [ ] Test checkout with multiple items
- [ ] Test payment flow

## CheckoutPage Improvements

- [x] Remove unused handlePlaceOrder function from CheckoutPage.js
- [x] Add address selection validation in CheckoutPage.js
- [x] Add ARIA labels for accessibility in CheckoutPage.js
