package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.UserDao;
import com.takima.backskeleton.DTO.MemeDto;
import com.takima.backskeleton.DTO.UserDto;
import com.takima.backskeleton.DTO.UserMapper;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;

    public List<User> findAll() {
        Iterable<User> it = userDao.findAll();
        List <User> users = new ArrayList<>();
        it.forEach(users::add);
        return users ;
    }

    public User getById(Long id) {
        return userDao.findById(id).orElseThrow();
    }

    @Transactional
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }

    @Transactional
    public void addUser(UserDto userDto) {
        User user;
        try {
            user = UserMapper.fromDto(userDto, null);
        } catch (IOException e) {
            throw new RuntimeException("Error with Student image", e);
        }

        userDao.save(user);
    }

    @Transactional
    public void updateUser(UserDto userDto, Long id) {
        userDao.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Student doesn't exist"));
        User user;
        try {
            user = UserMapper.fromDto(userDto, id);
        } catch (IOException e) {
            throw new RuntimeException("Error with Student image", e);
        }
        userDao.save(user);
    }
    public List<Meme> getMemesByUserId(Long id) {
        return userDao.getMemesByUserId(id);
    }

    public Boolean connectTest(String userLogin, String userPassword) {

        if(!userDao.getUsersByCredentials(userLogin, userPassword).isEmpty()){
            return true;
        } else {
            return false;
        }
    }
    public void setCookie(String userLogin, String userPassword, String cookie) {
            userDao.setUserCookie(userLogin, userPassword, cookie);
    }
    public User cookieCheck(String cookie){

        if(!userDao.getUserCookie(cookie).isEmpty()){
            return userDao.getUserCookie(cookie).get(0);
        } else {
            return null;
        }
    }


//    public List<User> searchByMajorAndCourse(int majorId, int courseId) {
//        return userDao.findByMajorIdAndCourseId(majorId, courseId);
//    }
}
