$(function () {
	
	var columns = [
        { checkbox: true, align: 'center' },
      	{ title: '图片', field: 'picUrl',
			formatter: function (value, row, index) {
				return '<img width="60px" height="80px" src="'+value+'" />';
			}	
		}, 
		{ title: '电影名称', field: 'movieName'},
		{ title: '导演', field: 'director'},
		{ title: '演员', field: 'actor'},
		{ title: '评分', field: 'score'},
		{ title: '分类', field: 'category.categoryName'},
		{ title: '价格', field: 'price'},
		{ title: '状态', field: 'status', formatter: function(value, row){
			if(value == 0){
				return '<span class="label label-default">已下架</span>';
			}else if(value == 1){
				return '<span class="label label-primary">出售中</span>';
			}
			return '';
		}},
		{ title: '创建时间', field: 'createTime'}
		];
	
	$("#table").bootstrapTable({
        url: baseURL + 'movie/list',
        cache: false,
        striped: true,
        pagination: true,
        pageSize: 10,
        pageNumber: 1,
        sidePagination: 'server',
        columns: columns,
        queryParams: function (params) {
        	return {
	        	page: params.offset / params.limit + 1,
	        	limit: params.limit,
	        	movieName: vm.q.movieName
        	}
        }
	});
	
});

var vm = new Vue({
	el:'#app',
	data:{
		showList: true,
		title: null,
		movie: {
			picUrls: []
		},
		categoryList: [],
		q:{
			movieName: ''
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.movie = {
				picUrls: [],
				categoryId : ""
			};
		},
		update: function (event) {
			var id = getSelectedVal("id");
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            vm.movie = {
    			picUrls: []
    		};
            
            vm.getInfo(id);
		},
		saveOrUpdate: function (event) {
			if(vm.validator()){
				return;
			}
			
			var url = vm.movie.id == null ? "movie/save" : "movie/update";
			vm.movie.picUrl = vm.movie.picUrls[0];
			vm.movie.describe = ue.getContent();
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.movie),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedVals("id");
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "movie/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		upper: function(){
			var ids = getSelectedVals("id");
			if(ids == null){
				return ;
			}
			confirm('确定要上架选中的记录？', function(){
			$.ajax({
				type: "POST",
			    url: baseURL + "movie/upper",
                contentType: "application/json",
			    data: JSON.stringify(ids),
			    success: function(r){
					if(r.code == 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
			});
		},
		lower: function(){
			var ids = getSelectedVals("id");
			if(ids == null){
				return ;
			}
			confirm('确定要下架选中的记录？', function(){
			$.ajax({
				type: "POST",
			    url: baseURL + "movie/lower",
                contentType: "application/json",
			    data: JSON.stringify(ids),
			    success: function(r){
					if(r.code == 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "movie/info/"+id, function(r){
                vm.movie = r.movie;
                ue.setContent(r.movie.describe);
            });
		},
		getCategoryList: function(){
			$.get(baseURL + "category/getAll", function(r){
				vm.categoryList = r.categoryList;
			});
		},
		reload: function (event) {
			vm.showList = true;
			$('#table').bootstrapTable('refresh',  {pageNumber: 1});
		},
		validator: function () {
            if(vm.movie.picUrls.length == 0){
                alert("请选择电影图片");
                return true;
            }

            if(isBlank(vm.movie.movieName)){
                alert("请填写电影名称");
                return true;
            }
            
            if(isBlank(vm.movie.price)){
                alert("请填写价格");
                return true;
            }
        }
	},
	created: function(){
		this.getCategoryList();
	}
});