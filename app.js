document.addEventListener("DOMContentLoaded", function () {
  const planData = {
    monthly: [9, 12, 15],
    yearly: [90, 120, 150],
  };

  const steps = document.querySelectorAll(".step");
  const cardSteps = document.querySelectorAll(".card-step > span  ");

  const nextButtons = document.querySelectorAll(".step .next");
  const prevButtons = document.querySelectorAll(".step .previous");

  const userInputsError = document.querySelectorAll(".step1 [role='error']");
  const userInputInvalidEmail = document.querySelectorAll(
    ".step1 #email-error"
  )[0];
  const userInputs = document.querySelectorAll(".step1 input");

  const figureEls = document.querySelectorAll(".plans__card figure");

  let selectedOption = null;
  let selectedPlanAmount = null;

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
      selectedPlanAmount = this.childNodes[5].textContent;
    });
  });

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      showStep(index + 1); // Show the next step
      // if (verifyData()) {
      // }
    });
  });

  prevButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      showStep(index); // Show the prev step
    });
  });

  function verifyData() {
    let dataState = [];

    userInputs.forEach((input, idx) => {
      // if (validateMail(input)) {
      //   userInputInvalidEmail.classList.remove("error");
      //   dataState.push(true);
      // } else {
      //   userInputInvalidEmail.classList.add("error");
      //   userInputInvalidEmail.innerText = "Invalid email";

      //   dataState.push(false);
      // }

      if (input.value.trim() == "") {
        userInputsError[idx].classList.add("error");
        input.style.borderColor = "hsl(354, 84%, 57%)";

        dataState.push(false);
      } else {
        userInputsError[idx].classList.remove("error");
        input.style.borderColor = "hsl(213, 96%, 18%)";

        dataState.push(true);
      }
    });

    console.log(dataState);
    return dataState.every((data) => data === true);
  }

  // function validateMail(input) {
  //   if (input.type == "email") {
  //     const emailRegex = RegExp(
  //       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //     );
  //     console.log(emailRegex.test(input.value));
  //     return emailRegex.test(input.value);
  //   }
  // }

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

  const toggleContainer = document.querySelector(".toggle__container");
  const stepTwoContainer = document.querySelector(".step2");

  stepTwoContainer.addEventListener("click", (e) => {
    changePlan(e);
  });

  function changePlan(e) {
    figureEls.forEach((figure, idx) => {
      if (e.target.closest(".theme__button") && e.target.checked) {
        changeToggleMonthInfo(
          figure,
          idx,
          "hsl(231, 11%, 63%)",
          "hsl(213, 96%, 18%)",
          "yearly"
        );
      } else {
        changeToggleMonthInfo(
          figure,
          idx,
          "hsl(213, 96%, 18%)",
          "hsl(231, 11%, 63%)",
          "monthly"
        );
      }
    });
  }

  function changeToggleMonthInfo(
    figure,
    idx,
    addElementColor,
    removeElementColor,
    paymentType
  ) {
    toggleContainer.firstElementChild.style.color = addElementColor;
    toggleContainer.lastElementChild.style.color = removeElementColor;

    figure.childNodes[5].textContent =
      paymentType == "monthly"
        ? `$${planData.monthly[idx]}/mo`
        : `$${planData.yearly[idx]}/yr`;
  }
});
