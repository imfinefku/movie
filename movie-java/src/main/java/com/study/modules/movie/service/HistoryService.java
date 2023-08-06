package com.study.modules.movie.service;

import com.study.modules.movie.entity.HistoryEntity;

import java.util.List;
import java.util.Map;

/**
 * 浏览记录
 * 
 * @author lizhengle
 * @email tttxas123
 */
public interface HistoryService {
	
	HistoryEntity queryObject(Integer id);
	
	List<HistoryEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(HistoryEntity history);
	
	void update(HistoryEntity history);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
