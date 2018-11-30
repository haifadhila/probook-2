<!-- SEARCH RESULTS -->
<?php  if (isset($_REQUEST['search'])){ ?>
</div>
  <div class='resultheading'>
    <h1 class='searchheading'>Search Result</h1>
    <div id='countresult'>
      <span>Found </span><span id='count'><?php e(sizeof(result.books)-1);?></span><span> result(s)</span>
    </div>
  </div>

<?php for ($i = 0;  $i < count($results)-1; $i++) { ?>
  <div class='resultcontent'>
    <div class='bookdetail'>
      <div class='bookimgreview'>
        <img class='image' src='<?php e($results[$i]->cover);?>'>
      </div>
      <div class='book'>
        <div class='bookname'><?php e($results[$i]->title);?></div>
        <div class='bookscore'>
          <span class='bookauthor'><?php e($results[$i]->author);?></span>
          <span>&nbsp;-&nbsp;</span>
          <span class='bookrating'><?php e(number_format($results[$i]->rating));?></span>
          <span>/5.0 (</span>
          <span class='bookvotecount'><?php e("review count");?></span>
          <span>&nbsp;votes)</span>
        </div>
        <div class='bookdesc'><?php e($results[$i]->description);?></div>
      </div>
    </div>
    <a href='<?php eu('detail', $results[$i]->idBook);?>'>
      <button class='detail'>Detail</button>
    </a>
  </div>

<?php } } ?>
