angular.module('myApp.controllers',[])
	.controller('AdminPagesCtrl', ['$scope','$log','pagesFactory', function($scope,$log,pagesFactory){
		pagesFactory.getPages().then(
			function(res){
				$scope.allPages = res.data;
			},function(err){
				$log.error(err);
			});

		$scope.deletePage = function(id){
			pagesFactory.deletePage(id);
		}
		
	}])
	.controller('AdminLoginCtrl', ['$scope','$location','$cookies','AuthService','flashMessageService','$log', function($scope,$location,$cookies,AuthService,flashMessageService,$log){
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.login = function(credentials){
			AuthService.login(credentials).then(
				function(res,err){
					$cookies.loggedInUser = res.data;
					$location.path('/admin/pages');
				},function(err){
					flashMessageService.setMessage(err.data);
					$log.error(err);
				});
		}
	}])
	.controller('ManagePageCtrl', ['$scope','$location','pagesFactory','$routeParams','$location','flashMessageService','$log','$filter', function($scope,$location,pagesFactory,$routeParams,$location,flashMessageService,$log,$filter){
		$scope.pageContent = {};
		$scope.pageContent._id = ($routeParams.id != 0) ? $routeParams.id : 0; // "0" from $routeParams.id is a "string", we make sure we're converting it to an integer
		$scope.heading = "Add a New Page";

		if($scope.pageContent._id !== 0){
			$scope.heading = "Update Page";
			pagesFactory
				.getAdminPageContent($scope.pageContent._id)
				.then(function(res){
					$scope.pageContent = res.data;
					$log.info($scope.pageContent);
				},function(err){
					$log.error(err);
				});

		} 
		$scope.savePage = function(){
			pagesFactory
				.savePage($scope.pageContent)
				.then(function(){
					flashMessageService.setMessage("Page Saved Successfully");
					$location.path('/admin/pages');
				},function(){
					$log.error("error saving data");
				});
		}
		$scope.updateURL = function(){
			$scope.pageContent.url = $filter('formatURL')($scope.pageContent.title);
		}
	}])
	.controller('AppCtrl', ['$scope','AuthService','flashMessageService','$location','$log',function($scope,AuthService,flashMessageService,$location,$log){
		$scope.site = {
			logo: "http://a.fssta.com/etc/designs/fsdigital/foxsports/styles/src/components/images/site-logo.svg?fsv=2015011401",
			footer: "This is a sample site, for personal use."
		}
		$scope.logout = function(){
			AuthService.logout().then(function(){
				$location.path('/admin/login');
				flashMessageService.setMessage("Successfully logged out");
			},function(err){
				$log.warn('there was an error while trying to logout');
			});
		}
	}])
	.controller('PageCtrl',['$scope','pagesFactory','$routeParams','$sce','$log',function($scope,pagesFactory,$routeParams,$sce,$log){
		var url = $routeParams.url;
		if(!url) url="home"; // too rudimentary, this line needs to be improved
		pagesFactory.getPageContent(url).then(function(res){
			$scope.pageContent = res.data;
			$scope.pageContent.title = res.data.title;
			$scope.pageContent.content = $sce.trustAsHtml(res.data.content);
		},function(){
			$log.warn('error fetching data');
		});
	}])