package com.takima.backskeleton.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "memes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Meme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstPrompt;
    private String secondPrompt;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;
    @OneToOne
    @JoinColumn(name = "images_id", referencedColumnName = "id")
    @JsonIgnore
    private Image image;

//    private Meme(Builder builder) {
//        this.id = builder.id;
//        this.firstPrompt = builder.firstPrompt;
//        this.secondPrompt = builder.secondPrompt;
//        this.bytes = builder.bytes;
//    }
//
//    public static class Builder {
//        private Long id;
//        private String firstPrompt;
//        private String secondPrompt;
//        private byte[] bytes;
//
//        public Builder id (Long id) {
//            this.id = id;
//            return this;
//        }
//
//        public Builder firstPrompt(String firstPrompt) {
//            this.firstPrompt = firstPrompt;
//            return this;
//        }
//        public Builder secondPrompt(String secondPrompt) {
//            this.secondPrompt = secondPrompt;
//            return this;
//        }
//        public Meme build() {
//            return new Meme(this);
//        }
//
//        public Builder bytes(byte[] bytes) {
//            this.bytes = bytes;
//            return this;
//        }
//    }
}
