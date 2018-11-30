// ANGULAR FOR SEARCH RESULTS

angular.module('searchBook',[]).controller('SearchCon', function($scope){
  var result = this;
  console.log(result);
  result.books = [];
  result.keyword = "";

  result.search = function(){
    while (result.books.length > 0){
      result.books.pop();
    }
    document.getElementById("loader").style.display = "block";
    document.getElementById("test").style.display = "none";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.responseText);
        angular.forEach(json.item, function(book){
          result.books.push(book);
        });
        $scope.$apply();
        console.log(result.books);
        document.getElementById("loader").style.display = "none";
        document.getElementById("test").style.display = "flex";
      }

    };
    console.log(result.keyword);
    xhttp.open("POST", "search?search="+result.keyword, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("keyword="+result.keyword);
  }
});
