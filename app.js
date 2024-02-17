document.addEventListener("DOMContentLoaded", function () {
  const planData = {
    monthly: [9, 12, 15],
    yearly: [90, 120, 150],
  };

  const cardSteps = document.querySelectorAll(".card-step > span  ");
  const steps = document.querySelectorAll(".step");

  const nextButtons = document.querySelectorAll(".step .next");
  const prevButtons = document.querySelectorAll(".step .previous");

  const userInputsLabel = document.querySelectorAll(".step1 label");
  const userInputs = document.querySelectorAll(".step1 input");

  const figureEls = document.querySelectorAll(".plans__card figure");
  let selectedOption = null;

  // Event listener for options
  figureEls.forEach((figure) => {
    figure.addEventListener("click", function () {
      // Reset background color of previously selected option
      if (selectedOption) {
        selectedOption.style.backgroundColor = "";
      }

      // Set background color of clicked option
      this.style.backgroundColor = "hsl(217, 100%, 97%)";
      selectedOption = this;
      console.log(this.childNodes[5].textContent);
    });
  });

  // // Event listener for clicks outside of options div
  // document.addEventListener("click", function (event) {
  //   if (!event.target.closest(".plans__card figure")) {
  //     // Reset background color of previously selected option
  //     if (selectedOption) {
  //       selectedOption.style.backgroundColor = "";
  //       selectedOption = null;
  //     }
  //   }
  // });

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      if (verifyData(data)) {
        showStep(index + 1); // Show the next step
      }
    });
  });

  prevButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      showStep(index); // Show the prev step
    });
  });

  function verifyData(...data) {
    return true;
  }

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.style.display = "flex"; // Show the selected step
      } else {
        step.style.display = "none"; // Hide other steps
      }
    });

    cardSteps.forEach((cardstep, index) => {
      if (index === stepIndex) {
        cardstep.setAttribute("role", "active");
      } else {
        cardstep.removeAttribute("role", "active");
      }
    });
  }

  // Show the first step initially
  showStep(0);
});
