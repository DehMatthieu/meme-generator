package com.takima.backskeleton.DTO;

import org.springframework.web.multipart.MultipartFile;

public record AddFileToMemeRequest(
        String DataURL,
        long id
) {
}
