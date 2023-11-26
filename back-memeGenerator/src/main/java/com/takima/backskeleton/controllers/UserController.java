package com.takima.backskeleton.controllers;

import com.takima.backskeleton.DAO.MemeDao;
import com.takima.backskeleton.DTO.CookieRequest;
import com.takima.backskeleton.DTO.UserDto;
import com.takima.backskeleton.DAO.UserDao;
import com.takima.backskeleton.models.Image;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;
import com.takima.backskeleton.services.MemeService;
import com.takima.backskeleton.services.UserService;
import com.takima.backskeleton.utils.RandomStringGenerator;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@CrossOrigin
@RequestMapping("users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserDao userDao;
    private final MemeDao memeDao;
    private final MemeService memeService;

    // Default constructor without arguments

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @PostMapping(value ="/adduser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addUser(@RequestBody UserDto userDto) {
        User user = User.builder().login(userDto.getLogin()).password(userDto.getPassword()).build();
        userDao.save(user);
    }

    @PostMapping("/{id}")
    public void updateUser(@RequestBody UserDto userDto, @PathVariable Long id) {
        userService.updateUser(userDto, id);
    }

    @GetMapping("")
    public List<Meme> getMemes() {
        Iterable<Meme> it = memeDao.findAll();
        List<Meme> memes = new ArrayList<>();
        it.forEach(memes::add);
        return memes;
    }
    @GetMapping("/{id}/memes")
    public List<Meme> getMemesByUserId(@PathVariable Long id) {
        return userService.getMemesByUserId(id);
    }


    @PostMapping(value ="/connect", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> connect(@RequestBody UserDto userDto) {
        if(userService.connectTest(userDto.getLogin(), userDto.getPassword())){
            String response = "valid credentials\n";
            String cookie = RandomStringGenerator.generateRandomString(200);
            response+="cookie :"+cookie;
            userService.setCookie(userDto.getLogin(), userDto.getPassword(),cookie);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("invalid credentials", HttpStatus.OK);
        }
    }

    @PostMapping(value ="/checkcookie", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> checkcookie(@RequestBody CookieRequest cookie) {
        if(userService.cookieCheck(cookie.cookie()) != null){
            String response = "valid cookie\n";
            User currentUser= userService.cookieCheck(cookie.cookie());
            response+="id :"+currentUser.getId();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("invalid credentials", HttpStatus.OK);
        }
    }
}
