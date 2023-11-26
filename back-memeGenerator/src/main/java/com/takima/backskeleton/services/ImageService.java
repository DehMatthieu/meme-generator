package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.ImageDao;
import com.takima.backskeleton.models.Meme;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ImageService {
    private final ImageDao imageDao;

    public List<String> getAllImages() {
        return imageDao.getAllImages();
    }

}
