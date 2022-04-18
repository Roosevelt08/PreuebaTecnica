package com.spring.boot.rest.empleado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
//@OpenAPIDefinition(info=@Info(title="Product API", version="2.0",description="Empleados"))
public class SpringBootRestEmpleadoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootRestEmpleadoApplication.class, args);
	}

}
