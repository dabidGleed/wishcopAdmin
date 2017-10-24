  /**
   * SUB CATEGORY PAGE SERVICE
   */

  app.factory('subCategoryService', ['$http', 'globalVars', function ($http, globalVars) {
      var subCategoryServiceMethods = {};
      var baseURL = globalVars.baseURL;
      var userId = globalVars.userData.userId;

      //service to get all categroy list
      subCategoryServiceMethods.getCategoryList = function () {

          var finalUrl = baseURL + "subcategory/get/all";
          return $http({
              method: 'GET',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      //service to add category
      subCategoryServiceMethods.addCategory = function (data) {
          var finalUrl = baseURL + "subcategory/"+data.category+"/create";
          var dataObj = {name:data.name};
          return $http({
              method: 'POST',
              url: finalUrl,
              data: dataObj,
              // headers:  
          })
      };
       //service to update category
      subCategoryServiceMethods.updateCategory = function (data) {
          var finalUrl = baseURL + "subcategory/"+data.id+"/update";
          delete data.categoryName;
          return $http({
              method: 'PUT',
              url: finalUrl,
              data: data,
              // headers:  
          })
      };


      //service to Delete category
      subCategoryServiceMethods.deleteCategory = function (data) {
          var finalUrl = baseURL + "subcategory/"+data+"/delete";
        
          return $http({
              method: 'DELETE',
              url: finalUrl 
          })
      };
 
      return subCategoryServiceMethods;
  }])