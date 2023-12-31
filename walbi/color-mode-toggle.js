function colorModeToggle() {
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    }

  
    const htmlElement = document.documentElement;
    const computed = getComputedStyle(htmlElement);
    let toggleEl;
    let togglePressed = "false";
  
    const scriptTag = document.querySelector("[tr-color-vars]");
    if (!scriptTag) {
      console.warn("Script tag with tr-color-vars attribute not found");
      return;
    }
  
    let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));
    let colorModeEase = attr("power1.out", scriptTag.getAttribute("ease"));
  
    const cssVariables = scriptTag.getAttribute("tr-color-vars");
    if (!cssVariables.length) {
      console.warn("Value of tr-color-vars attribute not found");
      return;
    }
  
    let lightColors = {};
    let darkColors = {};
    cssVariables.split(",").forEach(function (item) {
      let lightValue = computed.getPropertyValue(`--color--${item}`);
      let darkValue = computed.getPropertyValue(`--dark--${item}`);
      if (lightValue.length) {
        if (!darkValue.length) darkValue = lightValue;
        lightColors[`--color--${item}`] = lightValue;
        darkColors[`--color--${item}`] = darkValue;
      }
    });
  
    if (!Object.keys(lightColors).length) {
      console.warn("No variables found matching tr-color-vars attribute value");
      return;
    }
  
    function setColors(colorObject, animate) {
      if (typeof gsap !== "undefined" && animate) {
        gsap.to(htmlElement, {
          ...colorObject,
          duration: colorModeDuration,
          ease: colorModeEase,
        });
      } else {
        Object.keys(colorObject).forEach(function (key) {
          htmlElement.style.setProperty(key, colorObject[key]);
        });
      }
    }
  
    function goDark(dark, animate) {
      if (dark) {
        localStorage.setItem("dark-mode", "true");
        htmlElement.classList.add("dark-mode");
        setColors(darkColors, animate);
        togglePressed = "true";
      } else {
        localStorage.setItem("dark-mode", "false");
        htmlElement.classList.remove("dark-mode");
        setColors(lightColors, animate);
        togglePressed = "false";
      }
      if (typeof toggleEl !== "undefined") {
        toggleEl.forEach(function (element) {
          element.setAttribute("aria-pressed", togglePressed);
        });
      }
    }
  
    function checkPreference(e) {
      goDark(e.matches, false);
    }
    const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
    colorPreference.addListener(checkPreference);
  
    let storagePreference = localStorage.getItem("dark-mode");
    if (storagePreference !== null) {
      storagePreference === "true" ? goDark(true, false) : goDark(false, false);
    } else {
      checkPreference(colorPreference);
    }
  
    window.addEventListener("DOMContentLoaded", (event) => {
      toggleEl = document.querySelectorAll("[tr-color-toggle]");
      checkDarkModePreference();
      changeIconInSwitcher();

      toggleEl.forEach(function (element) {
        element.setAttribute("aria-label", "View Dark Mode");
        element.setAttribute("role", "button");
        element.setAttribute("aria-pressed", togglePressed);
      });
      toggleEl.forEach(function (element) {
        element.addEventListener("click", function () {
          let darkClass = htmlElement.classList.contains("dark-mode");
          darkClass ? goDark(false, true) : goDark(true, true);
          checkDarkModePreference();
          changeIconInSwitcher();
        });
      });
    });
  }
  colorModeToggle();

//   CHANGE IMAGES
  function checkDarkModePreference() {
    var isDarkMode = localStorage.getItem("dark-mode");
    var images = document.querySelectorAll('img[dark]'); // Выбираем только изображения с атрибутом darkMode
    var iconMoon = document.querySelector('.icon-moon');
    var iconSun = document.querySelector('.icon-sun');
  
    images.forEach(function(image) {
      var darkModeAttr = image.getAttribute('dark');
      if ((isDarkMode === "false" && darkModeAttr === 'true') || (isDarkMode !== "false" && darkModeAttr !== 'true')) {
        image.style.display = 'block';
        // iconMoon.style.display = 'block';
        // iconSun.style.display = 'none';
      } else {
        image.style.display = 'none';
        // iconMoon.style.display = 'none';
        // iconSun.style.display = 'block';
      }
    });
  }

// ChANGE COLOR SWITCH ICON
function changeIconInSwitcher(){
  var isDarkMode = localStorage.getItem("dark-mode");
  var iconMoons = document.querySelectorAll('.icon-moon');
  var iconSuns = document.querySelectorAll('.icon-sun');

  if (isDarkMode === 'true') {
      iconMoons.forEach(function(iconMoon) {
          iconMoon.style.display = 'none';
      });
      iconSuns.forEach(function(iconSun) {
          iconSun.style.display = 'block';
      });
  } else {
      iconMoons.forEach(function(iconMoon) {
          iconMoon.style.display = 'block';
      });
      iconSuns.forEach(function(iconSun) {
          iconSun.style.display = 'none';
      });
  }
}