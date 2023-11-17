$(document).ready(function () {
    $(".link-cart-case").click(function () {
      var linkElement = $(this);
      var popupImage = $("#pop-up");
      var pImageWrapper = $(".p-image-wrapper");
  
      if (linkElement.attr("popup") !== undefined) {
        popupImage.css("display", "flex").show();
        linkElement.find("a").removeAttr("href");
  
        var textElement = linkElement.find(".text-24-in");
        var text = textElement.text();
  
        var linkValue = linkElement.attr("link");
  
        var descValue = linkElement.attr("desc");
  
        var currentImageSrc = linkElement.find("img").attr("src");
  
        var pHeader = popupImage.find(".p-header").text(text);
        var pLink = popupImage.find(".p-link").hide();
        var pDesc = popupImage.find(".p-desc").text(descValue);
  
        pImageWrapper.empty(); //clear image wrapper
  
        if ($(this).find("video").length > 0) {
          var videoElement = linkElement.find("video");
          var clonedVideo = videoElement.clone().attr("width", "100%");
          pImageWrapper.append(clonedVideo);
        } else {
          var imgElement = $("<img>").attr("src", currentImageSrc);
          pImageWrapper.append(imgElement);
        }
  
        if (linkValue !== undefined) {
          pLink
            .text(linkValue)
            .attr("href", linkValue)
            .attr("target", "_blank")
            .show();
        }
      }
    });
  });
  