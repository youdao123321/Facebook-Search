/*jslint white:true */
/*global angular */
/*global console,$, jQuery, alert, FB*/


angular.element(document).ready(function () {
    "use strict";
    $('#firstPage').hide();
    $('#albumsData').hide();
    $('#postsData').hide();
    
    
});
var app = angular.module('myApp', ['ngAnimate']);
app.controller('animationsCtrl', function ($scope, $http, $log, $window) {
    "use strict";
    //localStorage.clear();
    
    $scope.mainPageShow = true;
    $scope.detailPageShow = false;
    
    $scope.isReset = false;
    if(localStorage.getItem('favoriteIndex') === null){
        localStorage.setItem('favoriteIndex',JSON.stringify([]));
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            //alert($scope.latitude);
            //alert($scope.longitude);
        });
    }
    
    $scope.ngSwitchItems = ['item1', 'item2', 'item3'];
    $scope.tabs = [
        {
            title: 'Users'
            , content: $scope.users
        }
        , {
            title: 'Pages'
            , content: $scope.pages
        }
        , {
            title: 'Events'
            , content: $scope.events
        }
        , {
            title: 'Places'
            , content: $scope.places
        }
        , {
            title: 'Groups'
            , content: $scope.groups
        }
        , {
            title: 'Favorites'
            , content: $scope.favorites
        }
    ];
    //$scope.currentTab = 'one.tpl.html';
 
    $scope.myTable = $scope.users;
    $scope.flag = 'users';

    
    //////////////////////////////////////////////////////////////////////////////////////////////////Reset////////////////////////
    $scope.Reset = function(){
        
        $('[data-toggle="tooltip"]').tooltip('destroy');
        if ($scope.isDetail) {
            //$scope.ngSwitchSelected = 'item1';
            
            $scope.mainPageShow = true;
            $scope.detailPageShow = false;
        
            $scope.isDetail = false;
        }
        $scope.isReset = true;
        $scope.keyword = '';
        $scope.myTable = {};
        $scope.users = {};
        $scope.pages = {};
        $scope.events = {};
        $scope.places = {};
        $scope.groups = {};
        $scope.flag  = 'users';
        $('#firstPage').hide();
        $('#albumsData').hide();
        $('#postsData').hide();

        //$window.location.reload();
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////inputValid////////////////////////
    $scope.inputValid = function(){
        console.log($scope.flag);
        
        if($scope.keyword === '' || $scope.keyword === undefined){
            
            $('[data-toggle="tooltip"]').tooltip('enable');
            $('[data-toggle="tooltip"]').tooltip("show");
            return false;
            
        } else {
            //$('[data-toggle="tooltip"]').tooltip('disable');
            $('[data-toggle="tooltip"]').tooltip('destroy');
            return true;
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////Search////////////////////////
    $scope.Search = function () {
        
        
        
                if ($scope.isDetail) {
            //$scope.ngSwitchSelected = 'item1';
            $scope.mainPageShow = true;
            $scope.detailPageShow = false;
            $scope.isDetail = false;
        }
        
        $('#firstPage').hide();
        $('#firstProgress').show();
        //$('#initialPage').show();
        
        $scope.isReset = false;
        var data = {
            params: {
                keyword: $scope.keyword
                , latitude: $scope.latitude
                , longitude: $scope.longitude
            }
        };
        $http.get("main.php", data).then(function (response) {
            //alert(response.data);
            $scope.users = response.data.users;
            $scope.pages = response.data.pages;
            $scope.events = response.data.events;
            $scope.places = response.data.places;
            $scope.groups = response.data.groups;
            $('#firstProgress').hide();
            $('#firstPage').show();
            console.log($('#firstPage'));
            
            if ($scope.flag === 'users') {
                $scope.myTable = $scope.users;
            }
            else if ($scope.flag === 'pages') {
                $scope.myTable = $scope.pages;
            }
            else if ($scope.flag === 'events') {
                $scope.myTable = $scope.events;
            }
            else if ($scope.flag === 'places') {
                $scope.myTable = $scope.places;
            }
            else if ($scope.flag === 'groups') {
                $scope.myTable = $scope.groups;
            }
        


            
        if($scope.myTable!==undefined && $scope.myTable.paging!==undefined){
                    if ($scope.myTable.paging.previous === undefined) {
                        //alert(1);
                        //$('#goNext').show();
                        $('#goPrevious').hide();
                    } else {
                        $('#goPrevious').show();
                    }
                    if ($scope.myTable.paging.next === undefined || $scope.myTable.data.length < 25) {
                        //alert(2);
                        $('#goNext').hide();
                        //$('#goPrevious').show();
                    } else {
                        $('#goNext').show();
                    }
                    
                
        } else {
            $('#goPrevious').hide();
            $('#goNext').hide();
        }
            
            
        }, function errorCallback(response) {

            alert(response.data);
            

            
        });
        
        

        
        
        
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////isInputNull//////////////////////////
    $scope.isInputNull = function (){
        console.log('////////////////////////////isInputNull///////////////////');
        console.log($scope.flag);
       
        if($scope.flag === 'favorites'){
            console.log('false');
            return false;
        } else {
            console.log($scope.myTable);
            console.log(Object.keys($scope.myTable).length);
            if( $scope.myTable !== undefined && Object.keys($scope.myTable).length > 0){
                console.log('false');
                return false;
            } else {
                console.log('true');
                return true;
            }
        }
    };
        ////////////////////////////////////////////////////////////////////////////////////////////////Click Tab ////////////////////////////
    $scope.isActiveTab = function(tab){
       // alert(tab.title);
        //console.log($scope.flag);
        //console.log(tab.title.toLowerCase() === $scope.flag);
        return tab.title.toLowerCase() === $scope.flag;
    };
    $scope.onClickTab = function (tab) {
        $('[data-toggle="tooltip"]').tooltip('destroy');
        $scope.isReset = false;
        
        
        if ($scope.isDetail) {
            //$scope.ngSwitchSelected = 'item1';
            $scope.mainPageShow = true;
            $scope.detailPageShow = false;
            $scope.isDetail = false;
        }
        // $scope.currentTab = tab.url;
        //var temp2222 = 'true';
        //console.log(tab.title === $scope.flag.toLowerCase());
        //if($scope.inputValid() === false && tab.title !== 'Favorites'){
            //$('[data-toggle="tooltip"]').tooltip('enable');
            //$('[data-toggle="tooltip"]').tooltip("show");
           // $('#firstPage').hide();
        //} else {
//        if($scope.keyword === '' || $scope.keyword === undefined ){
//            $('#firstPage').hide();
//        } else {
//            $('#firstPage').show();
//        }
        if (tab.title === 'Users') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.users;
            $scope.flag = 'users';
        }
        else if (tab.title === 'Pages') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.pages;
            $scope.flag = 'pages';
        }
        else if (tab.title === 'Events') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.events;
            $scope.flag = 'events';
        }
        else if (tab.title === 'Places') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.places;
            $scope.flag = 'places';
        }
        else if (tab.title === 'Groups') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.groups;
            $scope.flag = 'groups';
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////Favorite Page ////////////////////////////
        else if (tab.title === 'Favorites') {
            //$('.type').show();
            
            
            $scope.activeFavorite = true;
            var favorList = []
                , temp = []
                , tempPair = {}
                ,favoriteIndex =[];
            
            $scope.favorites = [];

            //$.each(localStorage, function (key, value) {
                //temp = JSON.parse(value);
                //alert(key);
                //alert(value);
                //$scope.favorites.push(temp);
                //tempPair = { picture : temp[0],name:temp[1],type:temp[2]};
                //favorList.push(tempPair);
                //var temp2 = JSON.parse(localStorage.getItem(id));
                //alert(temp[0]);
                //alert(tempPair.picture);
                // key magic
                // value magic
            //});
                //console.log(localStorage);
                favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
                //console.log(favoriteIndex);
                $.each(favoriteIndex, function (key,value) {
                    //console.log(key,value);
                    temp = JSON.parse(localStorage.getItem(value));
                    $scope.favorites.push(temp);
                });
//                favoriteIndex.forEach(function(key) {
//                console.log(key);
//                temp = JSON.parse(localStorage.getItem(key));
//                $scope.favorites.push(temp);
//                //console.log(element);
//                
//            });
            //$scope.myTable = $scope.favorites;
            $scope.flag = 'favorites';
            $('#firstPage').show();
            
        }
        console.log('1111111');
         console.log($scope.myTable);
        if($scope.myTable===undefined && $scope.flag !== 'favorites'){
            $('#firstPage').hide();
        }
        if($scope.myTable!==undefined && $scope.myTable.paging!==undefined){
                   
                    if ($scope.myTable.paging.previous === undefined) {
                        //alert(1);
                        //$('#goNext').show();
                        $('#goPrevious').hide();
                    } else {
                        $('#goPrevious').show();
                    }
                    if ($scope.myTable.paging.next === undefined || $scope.myTable.data.length < 25) {
                        //alert(2);
                        $('#goNext').hide();
                        //$('#goPrevious').show();
                    } else {
                        $('#goNext').show();
                    }
                    
        } else {
            $('#goPrevious').hide();
            $('#goNext').hide();
        }

        //}

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Details////////////////////////
    $scope.Details = function (itemId, portrait, flag, name) {
        
        $scope.mainPageShow = false;
        $scope.detailPageShow = true;
        //$scope.currentTab = 'page-Detail.html';
        $scope.isDetail = true;
        $scope.detailFlag = flag;
        //$scope.ngSwitchSelected = 'item2';
        
        
        
        
        $('#albumsData').hide();
        $('#postsData').hide();
        $('#favorite-and-facebook').hide();
        $('#loadingAlbum').show();
        $('#loadingPosts').show();
        
        
        
//        $('#albumsData').hide();
//        $('#postsData').hide();
//        $('#loadingAlbum').show();
//        $('#loadingPosts').show();
        
        

        if(flag !== 'events'){
            
        

        $scope.portrait = portrait;
        var config = {
            params: {
                id: itemId
            }
        };
        
        
        $http.get("main.php", config).then(function (response) {
            $('#loadingAlbum').show();
            $('#loadingPosts').show();
            $scope.detail = response.data;
            $scope.test = $scope.detail;
            //alert($scope.detail.albums.data.length);
            if($scope.detail.albums !== undefined && $scope.detail.albums.data !== undefined && $scope.detail.albums.data.length > 0){
                $scope.albumNums = true;
            } else {
                $scope.albumNums = false;
            }
            
            if($scope.detail.posts !==undefined && $scope.detail.posts.data !== undefined && $scope.detail.posts.data.length > 0){
                $scope.postsNums = true;
            } else {
                $scope.postsNums = false;
            }
            
            $('#loadingAlbum').hide();
            $('#loadingPosts').hide();
            $('#albumsData').show();
            $('#postsData').show();
            $('#favorite-and-facebook').show();
            
        }, function errorCallback(response) {
            $('#loadingAlbum').show();
            $('#loadingPosts').show();
            $scope.albumNums = false;
            $scope.postsNums = false;
            $('#loadingAlbum').hide();
            $('#loadingPosts').hide();
            $('#albumsData').show();
            $('#postsData').show();
            $('#favorite-and-facebook').show();
        });} else {
            console.log('/////////////////////EventDetail////////////////');
            $scope.detail = {id:itemId,name:name};
            console.log($scope.detail);
            $('#loadingAlbum').hide();
            $('#loadingPosts').hide();
            $scope.albumNums = false;
            $scope.postsNums = false;
            $('#albumsData').show();
            $('#postsData').show();
            $('#favorite-and-facebook').show();
        }
        //$rootScope.$emit("CallParentMethod", {path:'/page4',pageAnimationClass:'slideLeft'});
    };
    
    $scope.timeFormat = function(created_time){
        return created_time;
    };
    
    
    $scope.postFB = function(portrait, name){
        FB.ui({
                  method: 'feed',
                  picture: portrait,
                  name: name,
                  display: 'popup',
                  caption: 'FB SEARCH FROM USC CSCI571'
                }, function(response){ 
            if(response && (!response.error_message)){
                alert("Posted Successfully");
            } else {
                alert("Not Posted");
              }
        });
           
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Back/////////////////////
    $scope.Back = function () {
        
        
        //$scope.ngSwitchSelected = 'item1';
        $scope.mainPageShow = true;
        $scope.detailPageShow = false;
        //$('#firstPage').show();
        console.log($('#firstPage'));
        
        $scope.onClickTab({
            title: 'Users'
        });
        
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////FavoriteStyle/////////////////
    $scope.activeStarStyle = function (id) {
        var temp = {};
        if (localStorage.getItem(id) === null) {
            temp = {
                "color": 'black'
            };
        }
        else {
            temp = {
                'color': '#FED800'
            };
        }
        return temp;
    };
    $scope.activeStarClass = function (id) {
        var temp = [];
        if (localStorage.getItem(id) === null) {
            temp.push('glyphicon');
            temp.push('glyphicon-star-empty');
        }
        else {
            temp.push('glyphicon');
            temp.push('glyphicon-star');
        }
        return temp;
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Delete Favorite/////////////////
    $scope.DelFavorite = function (id) {
        var favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
        favoriteIndex.splice(favoriteIndex.indexOf(id),1);
        localStorage.setItem('favoriteIndex',JSON.stringify(favoriteIndex));
        localStorage.removeItem(id);
        $scope.onClickTab({
            title: 'Favorites'
        });
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Favorite/////////////////
    $scope.Favorite = function (id, url, name, flag) {
        var a, temp = [],favoriteIndex = [];
        if (localStorage.getItem(id) === null) {
            //console.log(localStorage);
            favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
            //console.log(favoriteIndex);
            favoriteIndex.push(id);
            localStorage.setItem('favoriteIndex',JSON.stringify(favoriteIndex));
            //a = '#'+id;
            //$(a).removeClass( "glyphicon-star-empty" ).addClass( "glyphicon-star" ).css('color', '#FED800');
            temp.push(url, name, flag, id);
            localStorage.setItem(id, JSON.stringify(temp));
        }
        else {
            favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
            //console.log(favoriteIndex);
            favoriteIndex.splice(favoriteIndex.indexOf(id),1);
            //console.log(favoriteIndex);
            localStorage.setItem('favoriteIndex',JSON.stringify(favoriteIndex));
            localStorage.removeItem(id);
            
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PageChanging/////////////////////
    $scope.PageChanging = function (Flag, Url) {
        var config = {
            params: {
                url: Url
            }
        };
        $http.get(Url).then(function (response) {
            $scope.myTable = response.data;
            if (Flag === 'users') {
                $scope.users = $scope.myTable;
            }
            else if (Flag === 'pages') {
                $scope.pages = $scope.myTable;
            }
            else if (Flag === 'events') {
                $scope.events = $scope.myTable;
            }
            else if (Flag === 'places') {
                $scope.places = $scope.myTable;
            }
            else if (Flag === 'groups') {
                $scope.groups = $scope.myTable;
            }
//            else if (Flag === 'favorites') {
//                $scope.favorites = $scope.favorites;
//            }
            
            if($scope.myTable!==undefined && $scope.myTable.paging!==undefined){
        if ($scope.myTable.paging.previous === undefined) {
                        //alert(1);
                        $('#goNext').show();
                        $('#goPrevious').hide();
                    }
                    else if ($scope.myTable.paging.next === undefined || $scope.myTable.data.length < 25) {
                        //alert(2);
                        $('#goNext').hide();
                        $('#goPrevious').show();
                    }
                    else {
                        //alert(3);
                        $('#goNext').show();
                        $('#goPrevious').show();
                    }
        }
        });
    };
});