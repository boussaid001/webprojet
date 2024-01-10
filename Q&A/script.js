

const items = document.querySelectorAll(".accordion button");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-expanded', 'false');
    }

    if (itemToggle == 'false') {
      this.setAttribute('aria-expanded', 'true');
    }
  }

  items.forEach(item => item.addEventListener('click', toggleAccordion));

  // Add event listener for the "Ajouter élément" button
  const addElementButton = document.getElementById('addElementButton');
  addElementButton.addEventListener('click', addElement);

  // Prevent form submission when "Submit Question" is clicked
  addElementButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Call the addElement function
    addElement();

    // Add your additional logic for handling the form submission
    // For example, you can submit the form data to a server using AJAX.
    // Replace the following line with your actual form submission logic.
    console.log('Form submitted!');
  });

  function addElement() {
    const accordionList = document.querySelector('.accordion-item');
    var Question = document.getElementById('userQuestion').value;
    Question = Question+ "?";
  
    if (!accordionList) {
      console.error("Error: accordion-item element not found.");
      return;
    }

    
  
    const newAccordionItem = document.createElement('li');
    newAccordionItem.innerHTML = `
    <li class="accordion-item">
    <button id="accordion-button-1" aria-expanded="false"><span class="accordion-title">`+Question+`</span><span class="icon" aria-hidden="true"></span></button>
    <div class="accordion-content">
      <p>Because we live in a sim</p>
    </div>
  </li>
    `;
  
    accordionList.appendChild(newAccordionItem);
  
  }
  