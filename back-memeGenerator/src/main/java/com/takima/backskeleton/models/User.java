package com.takima.backskeleton.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.awt.*;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "login")
    private String login;
    @Column(name = "password")
    private String password;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Meme> memes;

    @Column(name = "cookie")
    private String cookie;

//    @ManyToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "user_id")
//    private Major major;

//    private User(Builder builder) {
//        this.id = builder.id;
//        this.login = builder.login;
//        this.password = builder.password;
//    }
//
//    public static class Builder {
//        private Long id;
//        private String login;
//        private String password;
//        public Builder id (Long id) {
//            this.id = id;
//            return this;
//        }
//
//        public Builder login(String login) {
//            this.login = login;
//            return this;
//        }
//        public Builder password(String password) {
//            this.password = password;
//            return this;
//        }
//
//        public User build() {
//            return new User(this);
//        }
//    }
}
