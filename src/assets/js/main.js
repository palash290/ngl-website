
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  //>=, not <=
  if (scroll >= 300) {
    //clearHeader, not clearheader - caps H
    $("header").addClass("ct_sticky_menu");
  } else {
    $("header").removeClass("ct_sticky_menu");
  }
}); //missing );

$(window).on("load", function () {
  $(".ct_loader_main").fadeOut();
});


var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function showCheckboxes1() {
  var checkboxes = document.getElementById("checkboxes1");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

$(document).ready(function () {
  AOS.init();
})