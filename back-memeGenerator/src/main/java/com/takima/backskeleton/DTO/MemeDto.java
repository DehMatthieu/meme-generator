package com.takima.backskeleton.DTO;
import com.takima.backskeleton.models.Image;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
    @Builder
    @Getter

    public class MemeDto {
        private Long id;
        private User user;
        private Image image;
    }
