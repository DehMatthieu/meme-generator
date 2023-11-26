package com.takima.backskeleton.DTO;

import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;

import java.io.IOException;
import java.util.List;

public class MemeMapper {
    public static Meme fromDto(MemeDto dto, Long id) throws IOException {
        return Meme.builder()
                .id(id)
                .image(dto.getImage())
                .build();
    }

    public static MemeDto toDto (Meme meme){
        return MemeDto.builder()
                .image(meme.getImage())
                .build();
    }
}
