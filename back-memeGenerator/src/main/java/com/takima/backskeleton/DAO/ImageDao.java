package com.takima.backskeleton.DAO;

import com.takima.backskeleton.models.Image;
import com.takima.backskeleton.models.Meme;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageDao extends JpaRepository<Image, Long> {

    @Query("SELECT i.DataURL FROM Image i ORDER BY i.id DESC")
    List<String> getAllImages();

    @Query("SELECT i.DataURL FROM Image i WHERE i.userId= :userId ORDER BY i.id DESC ")
    List<String> getUserImages(long userId);

    @Modifying
    @Query("DELETE FROM Image i WHERE i.DataURL= :dataurl")
    void deleteFile(String dataurl);
}
