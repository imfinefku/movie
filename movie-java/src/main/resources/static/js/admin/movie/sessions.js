$(function () {
	var columns = [

			{ checkbox: true, align: 'center' },
			{ title: '影院', field: 'store.storeName' }, 			
			{ title: '影厅', field: 'cinema' }, 			
			{ title: '电影', field: 'movie.movieName' }, 			
			{ title: '时间', field: 'releaseDate' }, 			
			{ title: '价格', field: 'price' }, 			
			{ title: '创建时间', field: 'createTime' },
			{ title: '操作', field: 'opt', formatter: function (value, row) {
				return '<a onClick="vm.showSeat('+row.id+')">详情</a>';
			}}
]

$("#table").bootstrapTable({
	        url: baseURL + 'sessions/list',
	        cache: false,
	        striped: true,
	        pagination: true,
	        pageSize: 10,
	        pageNumber: 1,
	        sidePagination: 'server',
	        pageList: [10, 25, 50],
	        columns: columns,
	        queryParams: function (params) {
	        	return {
		        	page: params.offset / 10 + 1,
		        	limit: params.limit
	        	}
	        }
	   });
});
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sessions: {},
		storeList: [],
		movieList: [],
		seatList: []
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sessions = {
					movieId: '',
					storeId: ''
			};
		},
		update: function (event) {
			var id = getSelectedVal("id");
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		initSeat(seatList){
	        var s = []
	        for(var i = 0; i < seatList[seatList.length-1].ycoord; i++){
	          var a = [];
	          for(var j = 0; j < seatList[seatList.length-1].xcoord; j++){
	            a.push(seatList[seatList[seatList.length-1].xcoord * i + j]);
	          }
	          s.push(a);
	        }
	        this.seatList = s;
	    },
		showSeat(id){
			$.get(baseURL + "sessions/info/"+id, function(r){
                vm.initSeat(r.sessions.seatList)
                //页面层
    			$('#seat').modal('show')
            });
		},
		saveOrUpdate: function (event) {
			var url = vm.sessions.id == null ? "sessions/save" : "sessions/update";
			vm.sessions.releaseDate = $("#releaseDate").val();
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sessions),
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
				    url: baseURL + "sessions/delete",
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
			$.get(baseURL + "sessions/info/"+id, function(r){
                vm.sessions = r.sessions;
            });
		},
		getStore: function(id){
			$.get(baseURL + "store/listAll", function(r){
                vm.storeList = r.storeList;
            });
		},
		getMovie: function(id){
			$.get(baseURL + "movie/listAll", function(r){
                vm.movieList = r.movieList;
            });
		},
		reload: function (event) {
			vm.showList = true;
			$('#table').bootstrapTable('refreshOptions',  {pageNumber: 1});
		}
	},
	created(){
		this.getStore();
		this.getMovie();
	}
});