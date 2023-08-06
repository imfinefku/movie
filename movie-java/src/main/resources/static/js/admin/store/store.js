$(function () {
	var columns = [
		{ checkbox: true, align: 'center' },
		{ title: 'LOGO', field: 'picUrl', formatter: function (value, row, index) {
			return '<img width="60px" height="60px" src="'+value+'" />';
		}}, 			
		{ title: '影院名称', field: 'storeName' }, 			
		{ title: '排序', field: 'sort' }, 			
		{ title: '状态', field: 'status', formatter: function(value, row){
			return value == 1? '在业' : '停业';
		}},
		{ title: '创建时间', field: 'createTime' }
]

$("#table").bootstrapTable({
	        url: baseURL + 'store/list',
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
		        	limit: params.limit,
		        	storeName: vm.q.storeName
	        	}
	        }
	   });
});
var vm = new Vue({
	el:'#app',
	data:{
		showList: true,
		title: null,
		q: {
			storeName: ''
		},
		store: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		downloadQr: function(storeNo){
			window.location.href = baseURL + "store/qr?storeNo="+storeNo+"&token="+token
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.store = {};
		},
		searchMap: function(e){
			local.search(vm.settings.address);
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
		saveOrUpdate: function (event) {
			var url = vm.store.id == null ? "store/save" : "store/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.store),
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
				    url: baseURL + "store/delete",
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
			$.get(baseURL + "store/info/"+id, function(r){
                vm.store = r.store;
            });
		},
		reload: function (event) {
			vm.showList = true;
			$('#table').bootstrapTable('refreshOptions',  {pageNumber: 1});
		}
	}
});