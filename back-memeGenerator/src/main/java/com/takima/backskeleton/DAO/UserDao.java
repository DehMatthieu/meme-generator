package com.takima.backskeleton.DAO;

import com.takima.backskeleton.DTO.UserDto;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    @Query("SELECT u.memes FROM User u WHERE u.id= :userId")
    List<Meme> getMemesByUserId(Long userId);

    @Query("SELECT u FROM User u WHERE u.login= :userLogin AND u.password= :userPassword ")
    List<User> getUsersByCredentials(String userLogin, String userPassword);

    @Query("SELECT u FROM User u WHERE u.cookie= :userCookie")
    List<User> getUserCookie(String userCookie);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.cookie = :userCookie WHERE u.login= :userLogin AND u.password= :userPassword ")
    void setUserCookie(String userLogin, String userPassword, String userCookie);
}