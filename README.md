# doiex

A barebone Node.js application using Express 4, TypeScript, Postgresql and Docker Swarm.

The application is a sample flow which is collecting and parsisting input data, persisting the parsed data and present a report. The flow is implemented by using micro-services. Each micro-service is a separate process which is small, single purpose, use messages to communicate, can each have many running instances; and are not guaranteed to remain alive (process death is expected).

The four micro-services are:
  * **Collector**: read the input data ([input.json](resources/input.json))
  * **Parser**: parse and translate the data (parsed format example: [schema.json](resources/schema.json))
  * **Persister**: store the data in a Postgresql database and;
  * **Reporter**: correlate and display the data (report schema example: [result.json](resources/result.json))


#### Implemented functionality:
  * __Collector__ application is accepting a JSON payload (sample: [input.json](resources/input.json)) at https://doiex.dev/collector and send it to the __Parser__ application. The accepted data should contain both original invoice documents and responses to invoice documents.
  * __Parser__ application is accepting data from the __Collector__ application, parse it and send it to the __Persister__ application as a new, formatted individual entity using the defined schema (see [schema.json](resources/schema.json)).  A new filed is added: *documentType* that is having a value of either `Invoice` or `Response` and the *originalDocumentNumber* and *status* fields will only be populated for response documents.
  * __Persister__ application is storing each datum that the __Parser__ processed and save it into Postgresql storage.
  * __Reporter__ application returns the final data as a JSON payload by calling https://doiex.dev/reporter.  Response documents are grouped with their originating invoice (an example result is provided in [result.json](resources/result.json)). Correlation are done by matching the *originalDocumentNumber* field on a response document to the *documentNumber* field on an invoice document.  Response documents are ordered by their date, having the newest response listed first.

#### Notes

The application is architected as a Docker Swarm Cluster which facilitates a continuous deployment of micro-services where different versions can co-exist without breaking the data integrity? Update script for each service is presend in __deployment/scripts/docker/update__ folder.

__Auto-scalability__:
Docker Swarm services can be scaled with a command, but there are not an automatic way to do that. Out of the box Docker Swarm is a fault-tolerant platform for application hosting with built-in cluster management features. It helps to keep your dockerized services constantly running and available through distributing the workloads across different servers and/or data centers. Moreover, by its original implementation, Docker swarm provides such extra benefits as automatic disaster recovery, zero-downtime updates, etc.

__Data integrity__:
2 or more instances of same micro-service can co-exist in the same ecosystem, the database configuration is making sure that duplication are not allowed.

__TODO__

Add unit tests for the main project to achieve 100% code coverage for each micro-service.

#### Deployment

All the deployment configuration and scripts are located in __deployment__ folder of the project.

The deployment is automated using a Python3 script to start a Docker Swarm cluster with 4 networks, 2 public (reverse_proxy, log_collector) and 2 private (doiex_services, doiex_database).

- The public __reverse_proxy__ network is used for reverse proxy, load balancing, TLS/SSL termination and for better security practices.
- The public __log_collector__ network is used just for logging purposes.
- The private __doiex_services__ network is used for all services, except the database container, that are hidden from public access. The only way to access these containers is through reverse proxy service.
- The private __doiex_database__ network is used for __Persister__ and the database containers. Is done this way so no other services than __Persister__ can connect to the database.

#### Local setup

Requirements: Python3, Node 10, Docker 18.06+ and openssl.

Run the __./deployment/scripts/docker/swarm/run.py__ script.

The default proxy development configuration [ deployment/configuration/reverse-proxy/traefik.toml ] is using "doiex.dev" as the domain, please make sure to change the local DNS entry to point "doiex.dev" to localhost (127.0.0.1)

To use the API with Postman, make sure to disable SSL certificate verification.

To be able to open it in the browser make sure to add the local generated the self-signed certificate that is located at: [ /development/config/reverse-proxy/certificates/doiex.root.crt ] as a Trusted Authority.  

#### Logging

Fluentd is an open source data collector, which lets you unify the data collection and consumption for a better use and understanding of data. All existing containers are configured to use docker "fluentd" logging driver and redirects all the standard output to files located in the __logs__ folder.


#### Best practices

For JavaScript and TypeScript code the https://standardjs.com/ is used.
