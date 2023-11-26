package com.takima.backskeleton.DTO;

import com.takima.backskeleton.models.User;

import java.io.IOException;

public class UserMapper {
    public static User fromDto(UserDto dto, Long id) throws IOException {
        return User.builder()
                .id(id)
                .login(dto.getLogin())
                .password(dto.getPassword())
                .build();
    }

    public static UserDto toDto (User user){
        return UserDto.builder()
                .login(user.getLogin())
                .password(user.getPassword())
                .build();
    }
}
