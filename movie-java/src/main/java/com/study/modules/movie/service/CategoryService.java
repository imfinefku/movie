package com.study.modules.movie.service;

import java.util.List;
import java.util.Map;

import com.study.modules.movie.entity.CategoryEntity;

/**
 * 分类
 * 
 * @author Java十点半
 * @email tttxas123
 * @date 2017-07-14 13:43:12
 */
public interface CategoryService {
	
	CategoryEntity queryObject(Integer id);
	
	List<CategoryEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(CategoryEntity category);
	
	void update(CategoryEntity category);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

}
