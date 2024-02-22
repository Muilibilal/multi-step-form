document.addEventListener("DOMContentLoaded", function () {
  const planData = {
    monthly: [9, 12, 15],
    yearly: [90, 120, 150],
  };

  const stepsEls = document.querySelectorAll(".step");
  const cardStepsEls = document.querySelectorAll(".card-step > span  ");

  const nextButtons = document.querySelectorAll(".step .next");
  const prevButtons = document.querySelectorAll(".step .previous");

  const userInputsError = document.querySelectorAll(".step1 [role='error']");
  const userInputInvalidEmail = document.querySelectorAll(
    ".step1 #email-error"
  )[0];
  const userInputs = document.querySelectorAll(".step1 input");

  const figureEls = document.querySelectorAll(".plans__card figure");

  const stepTwoContainer = document.querySelector(".step2");
  const toggleContainer = document.querySelector(".toggle__container");

  stepTwoContainer.addEventListener("click", (e) => {
    changePlan(e);
  });

  let selectedOption = null;
  let selectedPlanAmount = null;

  const allAmount = [];
  const switchState = Array.from({ length: stepsEls.length }).fill(0);

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
      allAmount[0] = selectedPlanAmount;
    });
  });

  nextButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      console.log(allAmount);

      if (verifyInputData() && switchState[0] == 0) {
        switcher(0, index);
      }
      if (selectedPlanAmount && switchState[1] == 0) {
        switcher(1, index);
      }
      if (getChecked() > 0 && switchState[2] == 0) {
        switcher(2, index);
      }
      if (allAmount.length > 1) {
        getTotal();
        useSwitcher(3, index);
      }
    });
  });

  // show step and also control step state
  const switcher = (value, index) => {
    switchState[value] = 1;
    showStep(index + 1); // Show the next step
  };

  prevButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      showStep(index); // Show the prev step
      switchState[index] = 0;
    });
  });

  function verifyInputData() {
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
    stepsEls.forEach((step, index) => {
      if (index === stepIndex) {
        step.style.display = "flex"; // Show the selected step
      } else {
        step.style.display = "none"; // Hide other stepsEls
      }
    });

    cardStepsEls.forEach((cardstep, index) => {
      if (index === stepIndex) {
        cardstep.setAttribute("role", "active");
      } else {
        cardstep.removeAttribute("role", "active");
      }
    });
  }

  // Show the first step initially
  showStep(0);

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
      } else if (e.target.closest(".theme__button") && !e.target.checked) {
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

    let updatedData = null;

    updatedData =
      paymentType == "monthly"
        ? `$${planData.monthly[idx]}/mo`
        : `$${planData.yearly[idx]}/yr`;

    figure.childNodes[5].textContent = updatedData;

    if (figure.style.backgroundColor == "rgb(240, 246, 255)") {
      allAmount[0] = updatedData;
    }
  }

  // Get all checkbox containers
  const checkboxContainers = document.querySelectorAll(".add-ons__card > div");

  // Add click event listener to each container
  checkboxContainers.forEach((container) => {
    container.addEventListener("click", () => {
      // Toggle checkbox state
      const checkbox = container.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;

      // Toggle background color
      container.classList.toggle("checked");
    });
  });

  function getChecked(forFinishing) {
    const checkedCheckboxes = [];
    const addOnValueEls = [];

    // Iterate over all checkboxes
    checkboxContainers.forEach((container, idx) => {
      const checkbox = container.querySelector('input[type="checkbox"]');
      const checkboxMirroed = document.querySelector(
        `[data-checkbox='${checkbox.getAttribute("role")}']`
      );

      if (checkbox.checked) {
        let addOnValueEl = checkboxMirroed.querySelector("span");

        let addOnValue = addOnValueEl.textContent;

        checkboxMirroed.style.display = "flex";
        checkedCheckboxes.push(checkbox.getAttribute("role"));

        allAmount[idx + 1] == addOnValue
          ? allAmount
          : allAmount.push(addOnValue);

        addOnValueEls.push(addOnValueEl);
      } else {
        checkboxMirroed.style.display = "none";
      }
    });

    if (forFinishing) {
      return addOnValueEls;
    }

    return checkedCheckboxes.length;
  }

  function getTotal() {
    const finishingUpEl = document.querySelector(".arcade__card");
    const totalAmountEl = document.querySelector("[role='total-amount']");

    finishingUpEl.querySelector("[role='data-plan']").textContent =
      allAmount[0];

    [...getChecked(true)].forEach((val, idx) => {
      val.textContent = allAmount[idx + 1];
    });

    const allAmountSum = allAmount
      .join(" ")
      .match(/\d+/g)
      .reduce((acc, curr) => acc + parseInt(curr), 0);

    console.log(allAmount.join(" ").match(/\d+/g));

    let anountType = allAmount[0].slice(-2);
    totalAmountEl.textContent = `+$${allAmountSum} ${
      anountType == "mo" ? "/mo" : "/yr"
    }`;
  }

  const confirmFormButton = document.querySelector("[data-submit='confirm']");

  function useSwitcher(value, idx) {
    if (value) {
      switcher(value, idx);
    }
    confirmFormButton.addEventListener("click", () => {
      document.querySelector("form").style.display = "none";
      document.querySelector(".confirmation__page").style.display = "flex";
    });
  }
});
