package com.spring.boot.rest.empleado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SpringBootGatewayEmpleadoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootGatewayEmpleadoApplication.class, args);
	}

}
