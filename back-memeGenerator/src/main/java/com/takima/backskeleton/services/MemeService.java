package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.MemeDao;
import com.takima.backskeleton.DTO.MemeDto;
import com.takima.backskeleton.DTO.MemeMapper;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.models.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class MemeService {
    private final MemeDao memeDao;

    public List<Meme> findAll() {
        return (List<Meme>) memeDao.findAll();
    }
    public void addMeme(MemeDto memeDto) {
        Meme meme;
        try {
            meme = MemeMapper.fromDto(memeDto, null);
        } catch (IOException e) {
            throw new RuntimeException("Error with Student image", e);
        }

        memeDao.save(meme);
    }

    @Transactional
    public void updateMeme (MemeDto memeDto, Long id) {
        memeDao.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Student doesn't exist"));
        Meme meme;
        try {
            meme = MemeMapper.fromDto(memeDto, id);
        } catch (IOException e) {
            throw new RuntimeException("Error with Student image", e);
        }
        memeDao.save(meme);
    }

}
