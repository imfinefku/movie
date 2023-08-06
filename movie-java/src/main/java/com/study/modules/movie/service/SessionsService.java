package com.study.modules.movie.service;

import com.study.modules.movie.entity.SessionsEntity;

import java.util.List;
import java.util.Map;

/**
 * 场次
 * 
 * @author lizhengle
 * @email tttxas123
 */
public interface SessionsService {
	
	SessionsEntity queryObject(Integer id);
	
	List<SessionsEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SessionsEntity sessions);
	
	void update(SessionsEntity sessions);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
