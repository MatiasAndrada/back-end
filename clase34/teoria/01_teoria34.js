/*
!PLATAFORMA AWS

*Amazon Web Services (AWS) es una plataforma en la nube muy adoptada y completa.
*Ofrece más de 200 servicios integrales de centros de datos a nivel global. Muchas empresas lo utilizan y con esto reducen los costos, aumentan su agilidad e innovan de forma más rápida.

En esta clase utilizaremos la plataforma Elastic Beanstalk de AWS para implementar aplicaciones NodeJS en la nube.

Usaremos también Amazon DynamoDB que es un servicio de base de datos NoSQL rápido y flexible, completamente administrado en la nube, compatible con modelos de almacenamiento de valor de clave y de documentos.
Tambien exite RDS que es una base relacional.



!CREAR NUESTRA APP EN ELASTIC BEANSTALK

1)Para comenzar la implementación debemos iniciar sesión en la consola de AWS entrando a Consola AWS
2)Luego, elegimos la opción de usuario raíz, ponemos mail y contraseña e ingresamos.
3)En la consola de AWS elegimos la opción de Elastic Beanstalk y luego vamos al botón de crear aplicación.
4)Elegimos el nombre de la aplicación, en este caso serveraws-ch y luego la plataforma que se corresponde al lenguaje utilizado, que es NodeJs.
5)En código de aplicación seleccionamos aplicación de prueba y luego vamos a configurar más opciones y elegimos la configuración personalizada.
6)Luego, modificamos la capacidad, configurando el tipo de entorno como carga balanceada. En el balanceador de carga configuramos las instancias con un mínimo de 2 y un máximo de 4.
7)Vamos hasta abajo de la página y clickeamos el botón de crear una aplicación con estos cambios que hicimos en la configuración.
*Elastic Beanstalk suele tardar unos minutos en crear el entorno y cada uno los recursos que administra.
8)Una vez finalizada la instalación, haciendo click en el link seleccionado ya podemos ir a nuestra aplicación, donde veremos una ventana como la mostrada en la imagen.

!Configuración de nuestra App
1)Vamos a Servicios > IAM > Roles, seleccionamos el rol asociado a instancias EC2, y le asociamos las siguientes políticas para usar base de datos y servicios de mensajería:
AmazonDynamoDBFullAccess
AmazonSNSFullAccess
?Configuración de nuestra App - DynamoDB
2)Luego, ingresamos a Servicios > DynamoDB > Tablas. Ahí creamos las tablas que vamos a necesitar en nuestra base de datos para la aplicación. Elegimos el nombre (en este caso: ‘product-inventory’), la clave primaria (‘productId’) que figura como partition key, y clickeamos el botón de crear.
3)Una vez creada la tabla, ya está lista para crear elementos en ella.
?Configuración de nuestra App - SNS
1)Luego vamos Servicios -> SNS -> Tópicos y creamos un tópico nuevo: notificaciones
2)Elegimos la configuración estándar y aceptamos al final de la página.
3)Debería aparecer una confirmación de la creación del tópico, con un ARN asociado. Debemos copiar ese código para usarlo más adelante:
4)Luego vamos a suscripciones, y creamos una nueva suscripción. Esto nos permitirá recibir notificaciones cada vez que se publique un nuevo evento en el tópico creado:
5)Seleccionamos el tópico al cual suscribirnos, el medio de suscripción (email en este caso) e ingresamos el destinatario (nuestra dirección de mail).
6)La suscripción está creada pero para que esté activa debemos confirmarla mediante un link enviado a la dirección de la suscripción:
&)De esta forma, con esta página que se nos abre queda confirmada nuestra suscripción.
    











?Elastic Branstalk cuenta con una serie de recursos:

*Instancia EC2:
Máquina virtual de Amazon Elastic Compute Cloud (Amazon EC2) configurada para ejecutar aplicaciones web en la plataforma que elija. Cada plataforma ejecuta un conjunto específico de software, archivos de configuración y scripts compatibles con una determinada versión de lenguaje, marco de trabajo y contenedor web (o una combinación de estos). La mayoría de las plataformas utilizan Apache o nginx como un proxy inverso que se sitúa delante de la aplicación web, reenvía las solicitudes a esta, administra los recursos estáticos y genera registros de acceso y errores.

*Grupo de seguridad de la instancia:
Grupo de seguridad de Amazon EC2 configurado para permitir el tráfico entrante en el puerto 80. Este recurso permite que el tráfico HTTP procedente del balanceador de carga llegue a la instancia EC2 en la que se ejecuta la aplicación web. De forma predeterminada, el tráfico no está permitido en otros puertos.
*Balanceador de carga:
Balanceador de carga de Elastic Load Balancing que está configurado para distribuir solicitudes a las instancias que se ejecutan en la aplicación. También permiten que las instancias no estén expuestas directamente a Internet.
*Grupo de seguridad del balanceador de carga:
Grupo de seguridad como el de la instancia. 
*Grupo de Auto Scaling:
Está configurado para reemplazar una instancia si termina o deja de estar disponible.
*Bucket de Amazon S3:
Ubicación de almacenamiento para el código fuente, los registros y otros artefactos que se crean al utilizar Elastic Beanstalk.
*Alarmas de Amazon CloudWatch:
Dos alarmas de CloudWatch que monitoriean la carga recibida por las instancias y que se activan si la carga es demasiado alta o demasiado baja. Cuando se activa una alarma, en respuesta, el grupo de Auto Scaling aumenta o reduce los recursos.
*Plataforma de AWS CloudFormation:
Elastic Beanstalk utiliza AWS CloudFormation para lanzar los recursos del entorno y propagar los cambios de configuración.
*Nombre de dominio:
Nombre de dominio que direcciona el tráfico a la aplicación web con el formato subdominio.region.elasticbeanstalk.com.



























👉 Ten en cuenta que al crearnos una cuenta en AWS nos piden una tarjeta de crédito.
Sin embargo, si hacemos las pruebas y luego lo borramos será sin cargo.


*/