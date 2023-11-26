package com.takima.backskeleton.DTO;

import com.takima.backskeleton.models.Meme;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;
@Builder
@Getter
public class UserDto {
    private Long id;
    private String login;
    private String password;
    private List<Meme> memes;
}
