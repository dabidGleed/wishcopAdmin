  /**
   * CATEGORY PAGE SERVICE
   */

  app.factory('categoryService', ['$http', 'globalVars', function ($http, globalVars) {
      var categoryServiceMethods = {};
      var baseURL = globalVars.baseURL;
      var userId = globalVars.userData.userId;

      //service to get all categroy list
      categoryServiceMethods.getCategoryList = function () {

          var finalUrl = baseURL + "category/get/all";
          return $http({
              method: 'GET',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      //service to add category
      categoryServiceMethods.addCategory = function (data) {
          var finalUrl = baseURL + "category/"+userId+"/create";
          var dataObj = {name:data.name};
          return $http({
              method: 'POST',
              url: finalUrl,
              data: dataObj,
              // headers:  
          })
      };
       //service to update category
      categoryServiceMethods.updateCategory = function (data) {
          var finalUrl = baseURL + "category/"+data.id+"/update";
          return $http({
              method: 'PUT',
              url: finalUrl,
              data: data,
              // headers:  
          })
      };


      //service to Delete category
      categoryServiceMethods.deleteCategory = function (data) {
          var finalUrl = baseURL + "category/"+data+"/delete";
        
          return $http({
              method: 'DELETE',
              url: finalUrl 
          })
      };
 
      return categoryServiceMethods;
  }])