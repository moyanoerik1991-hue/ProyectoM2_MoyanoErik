-- Seed data for authors and checks for existing entries to avoid duplicates
INSERT INTO authors (name, email, bio) VALUES
  ('Ana Garcia', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor tecnico especializado en bases de datos'),  
  ('Maria Lopez', 'maria@example.com', 'Ingeniera de software con foco en APIs REST')
ON CONFLICT (email) DO NOTHING; -- Evitar duplicados por email

-- Seed data for posts and checks for existing entries to avoid duplicates
INSERT INTO posts (title, content, author_id, published) 
SELECT 'Introducción a Node.js', 'Node.js es un runtime de JavaScript...', a.id, true
FROM authors a WHERE a.email = 'ana@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO posts (title, content, author_id, published)
SELECT 'PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', a.id, true
FROM authors a WHERE a.email = 'carlos@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO posts (title, content, author_id, published)
SELECT 'APIs RESTful', 'REST es un estilo arquitectónico...', a.id, true
FROM authors a WHERE a.email = 'ana@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO posts (title, content, author_id, published)
SELECT 'Manejo de errores en Express', 'El manejo apropiado de errores...', a.id, false
FROM authors a WHERE a.email = 'maria@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO posts (title, content, author_id, published)
SELECT 'Async/Await explicado', 'Las promesas simplifican el codigo asincrono...', a.id, false
FROM authors a WHERE a.email = 'ana@example.com'
ON CONFLICT DO NOTHING;

-- Seed data for comments and checks for existing entries to avoid duplicates
INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, 'Excelente introducción, muy clara.'
FROM posts p
JOIN authors a ON a.email = 'carlos@example.com'
WHERE p.title = 'Introducción a Node.js'
ON CONFLICT DO NOTHING;

INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, 'Buen resumen de diferencias entre bases de datos.'
FROM posts p
JOIN authors a ON a.email = 'ana@example.com'
WHERE p.title = 'PostgreSQL vs MySQL'
ON CONFLICT DO NOTHING;

INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, 'Me gusta el enfoque práctico en APIs REST.'
FROM posts p
JOIN authors a ON a.email = 'maria@example.com'
WHERE p.title = 'APIs RESTful'
ON CONFLICT DO NOTHING;

INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, 'Podrias profundizar más en los eventos de Node.js.'
FROM posts p
JOIN authors a ON a.email = 'maria@example.com'
WHERE p.title = 'Introducción a Node.js'
ON CONFLICT DO NOTHING;

INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, 'El manejo de errores es crucial, gracias por el artículo.'
FROM posts p
JOIN authors a ON a.email = 'carlos@example.com'
WHERE p.title = 'Manejo de errores en Express'
ON CONFLICT DO NOTHING;

INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, 'Muy util la explicación de Async/Await.'
FROM posts p
JOIN authors a ON a.email = 'ana@example.com'
WHERE p.title = 'Async/Await explicado'
ON CONFLICT DO NOTHING;
