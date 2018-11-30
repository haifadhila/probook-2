<?php require 'include/template_top.php';?>
    <link rel='stylesheet' href='<?php es('css/header.css');?>'>
    <link rel='stylesheet' href='<?php es('css/browse.css');?>'>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body ng-app = 'searchBook'>
      <?php require 'views/header.php';?>
    <div ng-controller="SearchCon as result">
      <h1 class='searchheading'>Search Book</h1>
      <form id='searchform' ng-submit="result.search()">
        <input type='text' id='search' ng-model='result.keyword' name='search' placeholder='Input search terms...'>
        <br>
        <input type='submit' id='submitbt' value='Search'>
      </form>
          <div class='loader' style="display: none" id='loader'> </div>

        <div class='resultheading' ng-if="result.books.length>0" id='test'>
          <h1 class='resultsheading'>Search Result</h1>
          <div id='countresult'>
            <span>Found </span><span id='count'>{{(result.books).length}}</span><span> result(s)</span>
          </div>
        </div>

      <div ng-repeat="book in result.books">
        <div class='resultcontent'>
          <div class='bookdetail'>
            <div class='bookimgreview'>
              <img class='image' ng-src='{{book.cover}}'>
            </div>
            <div class='book'>
              <div class='bookname'>{{book.title}}</div>
              <div class='bookscore'>
                <span class='bookauthor'>{{book.saleability}}</span>
                <span>&nbsp;-&nbsp;</span>
                <span class='bookrating'>{{book.rating}}</span>
                <span>/5.0 (</span>
                <span class='bookvotecount'>{{book.ratingCount}}</span>
                <span>&nbsp;votes)</span>
              </div>
              <div class='bookdesc'>{{book.description}}</div>
            </div>
          </div>
          <a href='{{book.idBook}}'>
            <button class='detail'>Detail</button>
          </a>
        </div>
      </div>
       </div>


    <script type='text/javascript' src='<?php es('js/search-book.js');?>'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script type='text/javascript' src='<?php es('js/search-angular.js');?>'></script>
  </div>
  </body>
</html>
