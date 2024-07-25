// Prevent a resubmit on refresh and back button
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  

AOS.init();