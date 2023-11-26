package com.takima.backskeleton.controllers;

import com.takima.backskeleton.DAO.ImageDao;
import com.takima.backskeleton.DAO.MemeDao;
import com.takima.backskeleton.DTO.*;
import com.takima.backskeleton.models.Image;
import com.takima.backskeleton.models.Meme;
import com.takima.backskeleton.services.MemeService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RequestMapping("memes")
@RestController
@RequiredArgsConstructor
public class MemeController {
    private final MemeService memeService;
    private final MemeDao memeDao;
    private final ImageDao imageDao;

    @PostMapping("/{id}")
    public void updateMeme(@RequestBody MemeDto memeDto, @PathVariable Long id) {
        memeService.updateMeme(memeDto, id);
    }

    @PostMapping(value ="/file", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public void addFileToMeme(@RequestBody  AddFileToMemeRequest addFileToMemeRequest) {
        Image image = Image.builder().DataURL(addFileToMemeRequest.DataURL()).userId(addFileToMemeRequest.id()).build();
        imageDao.save(image);
    }


    @RequestMapping(value = "{id}/image",  method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getImage(@PathVariable Long id) throws Exception {

        String base64 = this.memeDao.findById(id)
                .map(Meme::getImage)
                .map(Image::getDataURL).get();

        return Base64.decodeBase64(base64);

    }

    @RequestMapping(value = "all",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getAllImages() throws Exception {

        return new ResponseEntity<>(imageDao.getAllImages(),HttpStatus.OK);
    }

    @RequestMapping(value = "userimages",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getUserImages(@RequestBody UserId userId)throws Exception {
        return new ResponseEntity<>(imageDao.getUserImages(userId.id()),HttpStatus.OK);
    }

    @PostMapping(value ="/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public void addFileToMeme(@RequestBody DeleteFileRequest request) {
        imageDao.deleteFile(request.DataURL());
    }

}