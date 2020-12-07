INSERT INTO public.recipes (name)
VALUES ('Garlic Lime Shrimp Tacos');

INSERT INTO public.recipe_ingredients (name, form, measure_type, quantity, weight, weight_type, volume, volume_type, recipe_id)
VALUES
    ('Canola Oil', null, 'volume', null, null, null, 1.0, 'tablespoon', 1),
    ('Corn Tortillas', null, 'quantity', 6, null, null, null, null, 1),
    ('Medium Shrimp', 'Cleaned', 'weight', null, 1.0, 'pounds', null, null, 1),
    ('Garlic Cloves', 'Minced', 'quantity', 2, null, null, null, null, 1),
    ('Salt', null, 'none', null, null, null, null, null, 1),
    ('Black pepper', 'Ground', 'none', null, null, null, null, null, 1),
    ('Fresh lime', 'Zested', 'quantity', 2, null, null, null, null, 1);
