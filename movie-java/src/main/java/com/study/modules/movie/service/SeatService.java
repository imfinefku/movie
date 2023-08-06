package com.study.modules.movie.service;


import java.util.List;
import java.util.Map;

import com.study.modules.movie.entity.SeatEntity;

/**
 * 座位
 * 
 * @author lizhengle
 * @email tttxas123
 */
public interface SeatService {
	
	SeatEntity queryObject(Integer id);
	
	List<SeatEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SeatEntity seat);
	
	void update(SeatEntity seat);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
