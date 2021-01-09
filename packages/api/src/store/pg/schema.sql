CREATE TABLE IF NOT EXISTS "public".user_accounts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "public".recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR (500) NOT NULL
);

CREATE TABLE IF NOT EXISTS "public".recipe_ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL,
    measure_type VARCHAR (100) NOT NULL,
    form VARCHAR (100) NULL,
    quantity INT NULL,
    weight DECIMAL NULL,
    weight_type VARCHAR (100) NULL,
    volume DECIMAL NULL,
    volume_type VARCHAR (100) NULL,
    recipe_id SERIAL ,
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id)
        REFERENCES "public".recipes(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "public".recipe_steps (
    id SERIAL PRIMARY KEY,
    steps VARCHAR (10000) NULL,
    recipe_id SERIAL,
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id)
        REFERENCES "public".recipes(id)
        ON DELETE CASCADE
);
