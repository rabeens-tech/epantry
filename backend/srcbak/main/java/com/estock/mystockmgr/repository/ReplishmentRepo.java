package com.estock.mystockmgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.modal.Replishment;

@Repository
public interface ReplishmentRepo extends JpaRepository<Replishment,Integer>{    
}
