# Sauce Demo Core User Operations Test Plan

## Application Overview

Sauce Demo (Swag Labs) is a demo e-commerce storefront. Typical shoppers sign in with a provided demo account, browse and sort six products, add products to a cart, complete checkout using customer information, and log out. The plan focuses on those five core operations and includes validation/error paths. Each scenario starts independently from a fresh browser session at https://www.saucedemo.com. The standard account is standard_user with password secret_sauce; the page also lists locked_out_user as an accepted username for testing a blocked login.

## Test Scenarios

### 1. Core Shopper Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. 01 - Sign in and reject invalid or locked-out credentials

**File:** `tests/core-shopper-operations/01-authentication.spec.ts`

**Steps:**
  1. Start from a fresh browser session at https://www.saucedemo.com and inspect the Login form.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Submit the form with a valid listed username (standard_user) and an incorrect password.
    - expect: Authentication is rejected, the user remains on the login page, and an error message is displayed.
  3. Enter standard_user and secret_sauce, then select Login.
    - expect: The user is authenticated and navigated to the Products inventory page.
  4. In a fresh session, try logging in with locked_out_user and secret_sauce.
    - expect: Authentication is blocked, the user remains on the login page, and a locked-out error is displayed.

#### 1.2. 02 - Browse, inspect, and sort the product catalog

**File:** `tests/core-shopper-operations/02-product-catalog.spec.ts`

**Steps:**
  1. From a fresh session, sign in with standard_user and secret_sauce.
    - expect: The Products page displays six product listings and a Sort products dropdown.
  2. Select Price (low to high) in the product sort dropdown.
    - expect: Products are reordered by ascending price; Sauce Labs Onesie ($7.99) is first and Sauce Labs Fleece Jacket ($49.99) is last.
  3. Select Name (Z to A).
    - expect: Products are reordered in descending product-name order and the selected sort mode is shown.
  4. Open the Sauce Labs Backpack product details, then return to the product catalog.
    - expect: The product details show the selected product and its price; the user can return to the catalog without losing the signed-in session.

#### 1.3. 03 - Add, review, and remove items in the cart

**File:** `tests/core-shopper-operations/03-shopping-cart.spec.ts`

**Steps:**
  1. From a fresh session, sign in with standard_user and secret_sauce.
    - expect: The Products page is displayed and the cart is initially empty.
  2. Add Sauce Labs Onesie and Sauce Labs Backpack to the cart.
    - expect: The cart badge indicates two items and each selected product's control changes to Remove.
  3. Open the shopping cart.
    - expect: Your Cart lists Sauce Labs Onesie and Sauce Labs Backpack, each with quantity 1, and offers Continue Shopping and Checkout.
  4. Remove Sauce Labs Onesie from the cart.
    - expect: The Onesie is removed, the cart badge decreases to one, and the Backpack remains in the cart.
  5. Remove Sauce Labs Backpack and verify the empty-cart state.
    - expect: The cart badge is no longer shown and the cart contains no items.

#### 1.4. 04 - Validate checkout details and place an order

**File:** `tests/core-shopper-operations/04-checkout.spec.ts`

**Steps:**
  1. From a fresh session, sign in with standard_user and secret_sauce, then add Sauce Labs Onesie ($7.99) and Sauce Labs Backpack ($29.99) to the cart.
    - expect: The cart badge indicates two items.
  2. Open the cart, select Checkout, then select Continue without entering checkout information.
    - expect: Checkout remains on the Your Information step and displays a required-field validation error; no order is submitted.
  3. Enter Casey as First Name, Tester as Last Name, and 10001 as Zip/Postal Code, then select Continue.
    - expect: The Checkout: Overview page displays the two selected items, SauceCard payment information, free delivery, item total $37.98, tax $3.04, and total $41.02.
  4. Select Finish.
    - expect: The Checkout: Complete! page displays “Thank you for your order!” and the cart is empty.

#### 1.5. 05 - Log out and verify session exit

**File:** `tests/core-shopper-operations/05-logout.spec.ts`

**Steps:**
  1. From a fresh session, sign in with standard_user and secret_sauce.
    - expect: The signed-in Products page is displayed.
  2. Open the navigation menu and select Logout.
    - expect: The user is returned to the Swag Labs login page.
  3. Attempt to navigate directly to https://www.saucedemo.com/inventory.html after logout.
    - expect: Protected inventory is not accessible as a signed-in user; the application returns to the login page or otherwise requires authentication.
