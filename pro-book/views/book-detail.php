<?php require 'include/template_top.php';?>
    <link rel='stylesheet' href='<?php es('css/header.css');?>'>
    <link rel='stylesheet' href='<?php es('css/browse.css');?>'>
  </head>
  <body>
    <div class='hiddencontent' id='orderpopup'>
      <div class='popup'>
        <div class='popupcontainer'>
          <button class='exit' onclick="removePopUp()"><img src='<?php es("img/x-button.png");?>'></button>
          <div class='checkorder'>
            <img class='check' src='<?php es("img/check.png");?>'>
            <div class='ordermsg'>
              <div class='successmsg'>Pemesanan Berhasil!</div>
              <div class='ntransaction' id='ntransactionmsg'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='hiddencontent' id='errorpopup'>
      <div class='popuperr'>
        <div class='popupcontainer'>
          <button class='exiterr' onclick="removeErrPopUp()"><img id='exit2' src='<?php es("img/x-button.png");?>'></button>
          <div class='ordermsg'>
            <div class='successmsgerr'>Pemesanan Gagal! :(</div>
          </div>
        </div>
      </div>
    </div>
    <div class='backdrop hiddencontent' id='orderbackdrop'>
    </div>
    <?php include 'views/header.php';?>
    <div>
      <div class='bookdetaileddesc'>
        <div class='bookauthordesc'>
          <h1 class='searchheading'><?php e($detail->title);?></h1>
          <div class='author'><?php e($detail->author);?></div>
          <div class='desc'><?php e($detail->description);?></div>
        </div>
        <div class='bookimgrating'>
          <div class='bookimg'>
            <img class='imagereview' src='<?php e($detail->cover) ?>'>
          </div>
          <div class='bookstar'>
  <?php     for ($i = 1; $i <= 5; $i++) {
              if ($detail->rating >= $i) { ?>
            <img class='star' src='<?php es('img/filledstar.png');?>'>
  <?php       } else { ?>
            <img class='star' src='<?php es('img/emptystar.png');?>'>
  <?php       }
            }
  ?>
          </div>
          <div class='bookrating'><?php e(number_format($detail->rating,1));?>&nbsp;/ 5.0</div>
        </div>
      </div>
<!-- ORDER -->
    <?php if ($detail->saleability == 'FOR_SALE' || $detail->saleability == 'FREE'){ ?>
      <div>
        <div class='harga'>Harga: Rp<?php e($detail->price);?>;</div>

        <h2 class='h2heading'>Order</h2>
        <div class='numberorder'>
          <div class='number'>Jumlah :
          <select class='pickn' id='norder'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          </div>

          <input type='hidden' id='idBook' value='<?php e($detail->idBook);?>'>
          <?php $orderurl = json_encode(make_url('order'), JSON_HEX_TAG|JSON_HEX_AMP);?>
          <button class='order' onclick="addOrder(<?php e($orderurl);?>)">Order</button>
        </div>
      </div>
<!-- ORDER -->
<!-- REVIEW -->
      <div class='review'>
        <h2 class='h2heading'>Reviews</h2>
  <?php foreach ($reviews as $review) { ?>
        <div class='reviewcontent'>
          <img class='profilepicture' src='<?php es("uploadimg/${review['picture']}");?>'>
          <div class='atreview'>
            <div class='at'><?php e("@${review['username']}");?></div>
            <div class='reviewdesc'><?php e($review['comment']);?></div>
          </div>
          <div class='ratingstar'>
            <img class='bigstar' src='<?php es("img/filledstar.png");?>'>
            <div class='rating'><?php e(number_format($review['rating'],1));?>&nbsp;/ 5.0</div>
          </div>
        </div>
  <?php } ?>
      </div>
<?php }
      else{ ?>
        <div>
          <h2 class='h3heading'>Not for sale</h2>
        </div>
  <?php    } ?>
<!-- REVIEW -->
    </div>
    <script type='text/javascript' src='<?php es('js/book-detail.js');?>'></script>
  </body>
</html>
