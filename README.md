# doiex

A bare-bone Node.js application using Express 4, TypeScript, PostgreSQL and Docker Swarm.

The application is a sample flow which is collecting and persisting input data, persisting the parsed data and present a report. The flow is implemented by using micro-services. Each micro-service is a separate process which is small, single purpose, use messages to communicate, can each have many running instances; and are not guaranteed to remain alive (process death is expected).

The four micro-services are:
  * **Collector**: accept the input data ([input.json](resources/input.json))
  * **Parser**: parse and translate the data (parsed format example: [schema.json](resources/schema.json))
  * **Persister**: store the data in a PostgreSQL database and;
  * **Reporter**: correlate and display the data (report schema example: [result.json](resources/result.json))


#### Implemented functionality:
  * **Collector** application is accepting a JSON payload (sample: [input.json](resources/input.json)) at https://doiex.dev/collector and send it to the **Parser** application. The accepted data should contain both original invoice documents and responses to invoice documents.
  * **Parser** application is accepting data from the **Collector** application, parse it and send it to the **Persister** application as a new, formatted individual entity using the defined schema (see [schema.json](resources/schema.json)).  A new filed is added: *documentType* that is having a value of either `Invoice` or `Response` and the *originalDocumentNumber* and *status* fields will only be populated for response documents.
  * **Persister** application is storing each datum that the **Parser** processed and save it into PostgreSQL storage.
  * **Reporter** application returns the final data as a JSON payload by calling https://doiex.dev/reporter.  Response documents are grouped with their originating invoice (an example result is provided in [result.json](resources/result.json)). Correlation are done by matching the *originalDocumentNumber* field on a response document to the *documentNumber* field on an invoice document.  Response documents are ordered by their date, having the newest response listed first.

#### Authentication

The public services **Collector** and **Reporter** are configured to use Basic Authentication. The username is 'api' and password is 'collector'.

#### Notes

The application is architected as a Docker Swarm Cluster which facilitates a continuous deployment of micro-services where different versions can co-exist without breaking the data integrity.

**Docker**

Docker is a computer program that performs operating-system-level virtualization, also known as "containerization". Docker is used to run software packages called "containers". Containers are isolated from each other and bundle their own application, tools, libraries and configuration files; they can communicate with each other through well-defined channels. All containers are run by a single operating system kernel and are thus more lightweight than virtual machines. Containers are created from "images" that specify their precise contents. Images are often created by combining and modifying standard images downloaded from public repositories.

**Docker Compose**

Compose is a tool for defining and running multi-container Docker applications.
With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

**Docker Swarm**

Current versions of Docker include swarm mode for natively managing a cluster of Docker Engines called a swarm. Use the Docker CLI to create a swarm, deploy application services to a swarm, and manage swarm behaviour.

**Auto scalability**

Docker Swarm services can be scaled with a command, but there are not an automatic way to do that. Out of the box Docker Swarm is a fault-tolerant platform for application hosting with built-in cluster management features. It helps to keep your dockerized services constantly running and available through distributing the workloads across different servers and/or data centres. Moreover, by its original implementation, Docker swarm provides such extra benefits as automatic disaster recovery, zero-downtime updates, etc.

**Debian update vs upgrade**

What is the difference between *apt-get update* and *apt-get upgrade*?

- *apt-get update* updates the list of available packages and their versions, but it does not install or upgrade any packages. The main objectives of update is to provide bug and errors fixes to present existing system.
- *apt-get upgrade* actually installs newer versions of the packages you have. After updating the lists, the package manager knows about available updates for the software you have installed. This is why you first want to update. The main objectives of upgrade is to introducing new features and functionalities to an existing system.

**Debian /var/lib/apt/lists/**

When you run *sudo apt-get update* (or use the Refresh button in a package manager), a list of packages will get downloaded from the Debian/Ubuntu servers. These files are then stored in **/var/lib/apt/lists/**.

You can safely remove the contents of that directory as it is recreated when you refresh the package lists. If you remove the files, but do not run apt-get update to fetch the lists, commands like apt-cache will fail to provide information (since the cache is empty).

**Linux shell restricting access**

By default when you add new user to system (/etc/passwd file) it grant shell access. If you are creating new users for POP3 or SMTP (mail server) or FTP then you do not need to grant shell access to a user. Remember as soon as you add a user he/she can login via telnet or ssh. The best way to put Linux shell access restriction is to use special shell called nologin, which politely refuse a login. It displays a message that an account is not available and exits non-zero. It is intended as a replacement shell field for accounts that have been disabled or have other user level access such as ftp, pop3, smtp etc. This is a very common practice followed by ISP or web hosting service provider’s web, mail and FTP server(s).

Add a new user called tony with no shell access:
    # useradd -d /home/tony -c "the tony user" -s /sbin/nologin tony

Debain / Ubuntu Linux user modify above command as follows:
    # useradd -d /home/tony -c "the tony user" -s /usr/sbin/nologin tony

Explanation:
- -d "path": home directory
- -c "message" : extra information about the user
- -s "path": used for specifying the user’s default shell

**Data integrity**

2 or more instances of same micro-service can co-exist in the same ecosystem, the database configuration is making sure that duplication are not allowed.

#### Deployment

All the deployment configuration and scripts are located in **deployment** folder of the project.

The deployment is automated using a Python3 script to start a Docker Swarm cluster with 4 networks, 2 public (reverse_proxy, log_collector) and 2 private (doiex_services, doiex_database).

- The public **reverse_proxy** network is used for reverse proxy, load balancing, TLS/SSL termination and for better security practices.
- The public **log_collector** network is used just for logging purposes.
- The private **doiex_services** network is used for all services, except the database container, that are hidden from public access. The only way to access these containers is through reverse proxy service.
- The private **doiex_database** network is used for **Persister** and the database containers. Is done this way so no other services than **Persister** can connect to the database.

Update script for each service is present in **deployment/scripts/docker/update** folder.

#### Local setup

Requirements: Python3, Node 10, Docker 18.06+ and openssl.

Run the **./deployment/scripts/docker/swarm/run.py** script.

The default proxy development configuration [ deployment/configuration/reverse-proxy/traefik.toml ] is using "doiex.dev" as the domain, please make sure to change the local DNS entry to point "doiex.dev" to localhost (127.0.0.1)

To use the API with Postman, make sure to disable SSL certificate verification.

To be able to open it in the browser make sure to add the local generated the self-signed certificate that is located at: [ /development/config/reverse-proxy/certificates/doiex.root.crt ] as a Trusted Authority.  

#### Logging

Fluentd is an open source data collector, which lets you unify the data collection and consumption for a better use and understanding of data. All existing containers are configured to use docker "fluentd" logging driver and redirects all the standard output to files located in the **logs** folder.


#### Best practices

For JavaScript and TypeScript code the https://standardjs.com/ is used.
