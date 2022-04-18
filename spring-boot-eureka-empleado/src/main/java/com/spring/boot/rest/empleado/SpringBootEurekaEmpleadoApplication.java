package com.spring.boot.rest.empleado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SpringBootEurekaEmpleadoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootEurekaEmpleadoApplication.class, args);
	}

}
