<?php require 'include/template_top.php';?>
        <link rel='stylesheet' href='<?php es('css/register.css');?>'>
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    </head>
    <body>
        <div class="grid-container">
            <div class="polkadot">
                <p class="nunito">REGISTER</p>
                <div class='columncontainer'>
                    <form method='POST' id='registerform'>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop '>
                            <div class='mediumfont mediumflex textalignright nunito'>Name</div>
                            <input type='text' placeholder="Input name" class='smallmarginleft mediumfont largeflex verylargemarginright' id='profile-name' name='name'>
                        </div>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop '>
                            <div class='mediumfont mediumflex textalignright nunito'>Username</div>
                            <input type='text' placeholder="Input username" class='smallmarginleft mediumfont mediumflex' id='profile-username' name='username'>
                            <img class='checkmark small-margin verysmallmarginleft' id='usercheck' src='<?php es('img/clear.png');?>'>
                        </div>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop nunito'>
                                <div class='mediumfont mediumflex textalignright'>Email</div>
                                <input type='text' placeholder="Input email" class='smallmarginleft mediumfont mediumflex' id='profile-email' name='email'>
                                <img class='checkmark small-margin verysmallmarginleft' id='emailcheck' src='<?php es('img/clear.png');?>'>
                        </div>

                        <div class='rowcontainer flexstart mediummarginleft smallmargintop nunito'>
                                <div class='mediumfont mediumflex textalignright'>Password</div>
                                <input type='password' placeholder="Input password" class='smallmarginleft mediumfont largeflex verylargemarginright' id='profile-password' name='password'>
                        </div>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop nunito'>
                                <div class='mediumfont mediumflex textalignright'>Confirm Password</div>
                                <input type='password' placeholder="Confirm password" class='smallmarginleft mediumfont largeflex verylargemarginright' id='profile-confirm-password' name='confirm-password'>
                        </div>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop nunito'>
                            <div class='mediumfont mediumflex textalignright'>Address</div>
                            <textarea placeholder="Input address" class='smallmarginleft mediumfont largeflex verylargemarginright' rows='4' id='profile-address' name='address'></textarea>
                        </div>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop nunito'>
                            <div class='mediumfont mediumflex textalignright'>Phone Number</div>
                            <input placeholder="Input phone number" class='smallmarginleft mediumfont largeflex verylargemarginright' id='profile-phone' name='phone' />
                        </div>
                        <div class='rowcontainer flexstart mediummarginleft smallmargintop nunito'>
                            <div class='mediumfont mediumflex textalignright'>Card Number</div>
                            <input placeholder="Input card number" class='smallmarginleft mediumfont largeflex' id='card-number' name='cardnumber' />
                            <img class='checkmark small-margin verysmallmarginleft' id='' src='<?php es('img/clear.png');?>'>
                        </div>
                        <div class='rowcontainer mediummarginleft smallmargintop mediumfont largeflex '>
                                <a href="<?php eu('login')?>" class="nunito">
                                        Already have an account?
                                </a><br/>
                            </div>
                        <div class="smallmargintop">
                                <input id='registerbt' type = "submit" value ="REGISTER"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      <script type='text/javascript' src='<?php es('js/user-register.js');?>'></script>
    </body>
</html>
