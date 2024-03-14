CREATE TABLE CATEGORIES (
    CODE SERIAL PRIMARY KEY,
    NAME VARCHAR(255),
    TAX NUMERIC(10,2)
);

CREATE TABLE PRODUCTS (
    CODE SERIAL PRIMARY KEY,
    NAME VARCHAR(255),
    AMOUNT INTEGER,
    PRICE NUMERIC(10,2),
    CATEGORY_CODE INTEGER,
    CONSTRAINT FK_CATEGORY FOREIGN KEY (CATEGORY_CODE) REFERENCES CATEGORIES(CODE)
);

CREATE TABLE USERS(
    CODE SERIAL PRIMARY KEY,
    USERNAME VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL
);

CREATE TABLE ORDERS (
    CODE SERIAL PRIMARY KEY,
    USER_CODE INTEGER,
    TOTAL NUMERIC(10,2),
    TAX NUMERIC(10,2),
    CONSTRAINT FK_USER FOREIGN KEY (USER_CODE) REFERENCES USERS(CODE)
);

CREATE TABLE ORDER_ITEM(
    CODE SERIAL PRIMARY KEY,
    ORDER_CODE INTEGER,
    PRODUCT_CODE INTEGER,
    NAME VARCHAR(255),
    AMOUNT INTEGER,
    PRICE NUMERIC(10,2),
    TAX NUMERIC(10,2),
    CONSTRAINT FK_PRODUCT FOREIGN KEY (PRODUCT_CODE) REFERENCES PRODUCTS(CODE),
    CONSTRAINT FK_ORDER FOREIGN KEY (ORDER_CODE) REFERENCES ORDERS(CODE)
);
