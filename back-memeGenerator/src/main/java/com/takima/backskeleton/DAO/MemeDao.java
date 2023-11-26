package com.takima.backskeleton.DAO;

import com.takima.backskeleton.models.Meme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemeDao extends CrudRepository<Meme, Long> {

}
