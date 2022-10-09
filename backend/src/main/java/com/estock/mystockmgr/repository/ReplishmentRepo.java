package com.estock.mystockmgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.modal.Replishment;

@Repository
public interface ReplishmentRepo extends JpaRepository<Replishment,Integer>{    

	// @Query("select * from (select *, rank() over (partition by inventory_id order by added_date desc ) as rnk from replishment) as a where rnk = 1;")
	// void getyAll();
}
