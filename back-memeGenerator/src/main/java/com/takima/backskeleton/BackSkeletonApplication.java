package com.takima.backskeleton;

import com.takima.backskeleton.DTO.UserDto;
import com.takima.backskeleton.controllers.UserController;
import com.takima.backskeleton.models.Image;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;
import com.takima.backskeleton.services.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackSkeletonApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackSkeletonApplication.class, args);
		List<Meme> a = new ArrayList<>();
		UserDto userDto = UserDto.builder().id(4L).login("1").password("1").memes(a).build();
		//UserController userController = new UserController();
		System.out.println(userDto);
		//userController.addUser(userDto);


//		Path filePath = Paths.get("img-readme/img.png");
//		byte[] imageData = new byte[0];
//		try {
//			imageData = Files.readAllBytes(filePath);
//		} catch (IOException e) {
//			throw new RuntimeException(e);
//		}
//
//		Image image = Image.builder().id(1L).DataURL(imageData).build();
//		Meme meme =  Meme.builder().id(1L).firstPrompt("1").secondPrompt("2").image(image).build();
	}

}
