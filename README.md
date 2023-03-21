# DRAUX
Draux es una plataforma web destinada a conectar a profesionales y aficionados del diseño UX. Ofrece un espacio para que los usuarios compartan contenido relacionado con el diseño UX, como ideas, noticias, recursos y herramientas, y todos pueden comentar y discutir sobre el contenido, creando una comunidad amigable

---
## Tecnologías usadas en este proyecto
![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  ![](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) 


**Autenticación**

![](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

**Documentación**

![](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)

**Despliegue en:**
Fly.io


## Secciones de DRAUX API

### Autenticación
Luego de haber creado la cuenta, se puede iniciar sesión de la siguiente forma:
- Email y contraseña

## Administrador
Un usuario con el rol de administrador puede realizar las siguientes acciones:
- Crear una cuenta.
- Obtener todos los administradores registrados.
- Obtener un solo administrador.
- Actualizar su información.
- Eliminar su cuenta.
- Crear, eliminar y actualizar una categoría.

## Usuarios
En usuarios puedes realizar distintas acciones como:
- Crear una cuenta.
- Obtener todos los usuarios registrados.
- Obtener un solo usuario.
- Actualizar su información.
- Eliminar su cuenta.
- Publicar posts.
- Comentar posts.

## Categoría
En el enpoint de categoría, solo un adminitrador puede modificar, eliminar o crear información para que después partan posts del mismo.

## Posts
Los posts solo pueden ser creados por los usuarios, estos contienen una imagen, titulo, contenido y a que categoría pertenece. Todos los campos son obligatorios. Se pueden eliminar y editar.

## Comentarios
Al igual que los posts, son acciones realizadas únicamente por los usuarios, puede comentar sobre algún post, solo requiere contenido. Se pueden eliminar y editar.

** Para publicar un post o un comentario es necesario tener una cuenta.**

--- 

## ¿Deseas saber más?
Ve la documentación: 
[Documentación](https://infinite-meadow-99672.herokuapp.com/api/docs/ "Documentación")

Repositorio de gitHub: [Draux](https://github.com/wil-ixcoy/DraUX_API)


## Licencia
[MIT](https://choosealicense.com/licenses/mit/)
