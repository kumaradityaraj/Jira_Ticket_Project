<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>JIRA TICKET CLONE</title>
  </head>
  <body>
    <!-- Toolbox-->
    <div class="toolbox-cont">
      <div class="toolbox-priority-cont">
        <div class="ligthpink color"></div>
        <div class="lightblue color"></div>
        <div class="lightgreen color"></div>
        <div class="black color"></div>
      </div>
      <div class="action-btn-cont">
        <div class="add-btn">
          <i class="fas fa-plus"></i>
        </div>
        <div class="remove-btn">
          <i class="fas fa-times"></i>
        </div>
        <div class="create-btn">
          <i class="fas fa-pen-square"></i>
        </div>
      </div>
    </div>
    <!-- Main container-->
    <div class="main-cont"></div>
    <div class="modal-cont">
      <textarea
        spellcheck="false"
        class="textarea-cont"
        placeholder="Enter your ticket task..."
      >
      </textarea>
      <div class="priority-colors-cont">
        <div class="lightpink priority-color"></div>
        <div class="lightblue priority-color"></div>
        <div class="lightgreen priority-color"></div>
        <div class="black priority-color border"></div>
      </div>
    </div>
    <script src="https://unpkg.com/shortid-dist@1.0.5/dist/shortid-2.2.13.min.js"></script>
    <script src="./script.js"></script>
  </body>
</html>
