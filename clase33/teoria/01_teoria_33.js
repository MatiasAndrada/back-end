/*
*Explorar y aplicar el concepto de control de versiones.
*Utilizar Git para tu proyecto.
*Conocer PaaS y Heroku y sus funciones.
*Implementar un proyecto de Node en Heroku.
 
?CONTROL DE VERSIONES
?¿De qué se trata?

Su idea parte de que cada desarrollador de un proyecto tenga una copia local de todo el proyecto. De esta manera se construye una red distribuida de repositorios, en la que cada desarrollador puede trabajar de manera aislada pero teniendo un mecanismo de resolución de conflictos mucho mejor que en versiones anteriores.

*Podemos volver a cualquier estado anterior de nuestro proyecto.
*Podemos tener una historia de cuáles fueron los cambios en el tiempo.
*Sobre estos podremos saber cuándo, cómo y quién los realizó.
*Permite la colaboración en un proyecto.
*Permite desarrollar versiones de un mismo proyecto a la vez.

!GIT
?¿Qué es Git?

Git es un sistema de control de versiones distribuido, diseñado para manejar todo, desde proyectos pequeños a muy grandes, con velocidad y eficiencia.

?Conceptos básicos

*Repositorio remoto:  Es el lugar centralizado donde se guardan los archivos.
*Repositorio local: Es el lugar dentro de la computadora donde se guardan los archivos.
*Working directory: Copia del repositorio local (donde voy a empezar a trabajar).
*Versión: Captura del repositorio en un determinado momento.
*Commit: Modificaciones que le hacemos a los archivos del repositorio en nuestra computadora.
*Tag:  Es una versión a la que le damos cierta importancia. Ej.: 1.0.2.
*Push: Registrar los commits en el repositorio REMOTO.
*Pull: Obtener los cambios en el repositorio REMOTO.
*Conflictos: Cuando dos o más personas modifican la misma línea de un archivo.
*Resolución de conflicto: Decidir cuál es la mejor versión que queremos del archivo modificado.
*Branch: secuencia de commits sucesivos, que conforman una ramificación en la línea temporal de un proyecto. Por convención tenemos una llamada ‘master’, aunque actualmente se está reemplazando por ‘main’, y puede haber otras más.
* Merge: Realizar una fusión entre dos branches.
*Pull request: Es una solicitud de que se haga un merge entre dos branches.
*Fork: Es una copia de un repositorio.
*git stash: 
*git stash apply:

?Comandos básicos

*git init: Inicializa un repositorio local.
*git status: Muestra el estado de los archivos.
*git add: Agrega los archivos al staging area.
*git commit: Guarda los cambios en el repositorio local.
*git log: Muestra el historial de commits.
*git checkout -b name: Crea una branch.
*git branch: Permite ver las branches
*git checkout name: Permite cambiar de branch.
*git merge name: Permite hacer un merge entre dos branches.
*git push: Sube los cambios al repositorio remoto.
*git pull: Trae los cambios del repositorio remoto.
*git clone: Clona un repositorio remoto.
*git stash: Guarda los cambios en un stash.
*git stash apply: Aplica los cambios de un stash.
Cuando se esta en una rama para usar el push debemos poner el nombre de la rama $ git push origin branch, si no definir como predeterminado una salida del push con --set-upstream 
$ git push --set-upstream origin branch


?Esquema de git
working directory -> staging area -> localrepo -> remote repoo
   git add     ->      git commit   ->    git push ->
            <   -   -   -  -  - - -  git checkout             <-  git pull
                                             
?Ramas 
Las ramas (branches) son utilizadas para desarrollar funcionalidades aisladas unas de otras.
La rama master es la rama principal y "por defecto" cuando creas un repositorio. Es la rama de producción que se suele usar solo para lo que ya esté listo.
Luego, se suele tener una rama llamada dev, en la cual se van fusionando las nuevas funcionalidades una vez que se desarrollan y se aprueba su correcto funcionamiento. Es la rama de desarrollo.
Finalmente, se van creando otras ramas para ir desarrollando las distintas funcionalidades y no tener problemas por posibles errores que puedan surgir de estos cambios (se hace de forma aislada).




!PAAS
*Paas (plataforma como servicio) es un entorno de desarrollo e implementación completo en la nube.
*Cuenta con recursos que permiten generar “de todo”: desde aplicaciones sencillas basadas en la nube hasta aplicaciones empresariales sofisticadas habilitadas para la nube.
*Se compran los recursos que necesitamos a un proveedor de servicios en la nube, a los que accedemos a través de internet, pero solo pagamos por el uso que hacemos de ellos.
*PaaS incluye infraestructura (servidores, almacenamiento y redes), tanto como middleware, herramientas de desarrollo, servicios de inteligencia empresarial (BI), sistemas de administración de bases de datos, etc. 
*Está diseñado para sustentar el ciclo de vida completo de las aplicaciones web: compilación, pruebas, implementación, administración y actualización.
*Nos permite evitar el gasto y la complejidad que suponen la compra y la administración de licencias de software, la infraestructura de aplicaciones y el middleware subyacentes, los orquestadores de contenedores o las herramientas de desarrollo y otros recursos. 
*Administramos las aplicaciones y los servicios que desarrollamos y, normalmente, el proveedor de servicios en la nube administra todo lo demás.

?Escenarios habituales de uso de PaaS

*Framework de desarrollo. PaaS proporciona un framework que los desarrolladores pueden ampliar para desarrollar o personalizar aplicaciones basadas en la nube. Permite a los desarrolladores crear aplicaciones usando componentes de software integrados.

*Análisis o inteligencia empresarial. Las herramientas que se proporcionan en PaaS permiten a las empresas realizar análisis de datos, obtener cierta información y entonces poder predecir los resultados para mejorar las previsiones de la empresa.

*Servicios adicionales. Los proveedores de PaaS pueden ofrecer otros servicios que mejoren las aplicaciones, como flujo de trabajo, 
directorios, seguridad y programación.

?Ventajas de PaaS
*Reducir el tiempo de programación. Las herramientas de desarrollo de PaaS pueden reducir el tiempo que se tarda en programar aplicaciones nuevas con componentes de aplicación preprogramados.

*Agregar más funcionalidad de desarrollo sin incorporar más personal. Los componentes de plataforma como servicio pueden aportar al equipo de desarrollo nuevas características sin necesidad de contratar personal especializado.

*Desarrollar para varias plataformas con más facilidad. Algunos proveedores de servicios ofrecen opciones de desarrollo para varias plataformas, lo que agiliza y facilita el desarrollo de aplicaciones multiplataforma.

*Usar herramientas sofisticadas a un precio asequible. Gracias a un modelo de pago por uso, personas y empresas podemos usar software de desarrollo sofisticado y herramientas de inteligencia empresarial y análisis cuya compra no se podrían permitir.

*Colaboración en equipos de desarrollo distribuidos geográficamente. Como se accede a través de Internet, los equipos de desarrollo pueden colaborar en proyectos estando en países diferentes.

*Administrar el ciclo de vida de las aplicaciones con eficacia. PaaS proporciona todas las características necesarias para sustentar el ciclo de vida completo de las aplicaciones web: compilación, pruebas, implementación, administración y actualización, dentro del mismo entorno integrado.



!HEROKU
*Es una plataforma como servicio (PaaS) que soporta varios lenguajes de programación.
*Las aplicaciones se corren desde un servidor Heroku usando Heroku DNS Server para apuntar al dominio de la aplicación (nombreaplicacion.herokuapp.com). 
*Cada aplicación corre sobre un motor a través de una “red de bancos de prueba” que consta de varios servidores. El servidor Git de Heroku maneja los repositorios de las aplicaciones que son subidas por los usuarios.
*Es una de las plataformas PaaS más populares y se utiliza para desplegar aplicaciones web.


















*/