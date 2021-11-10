$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.tease-button').click(clickedTeaseButton);
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Raphael", weight: 0, happiness: 0, angry: 0};

    // Boolean variables to output the correct messages when printStatus is called
    var moodChange = true;
    var teased = false;
    var overweight = false;
    var obese = false;

    function clickedTreatButton() {
      
      // If angry level is NOT 0
      if (pet_info.angry != 0) {
        
        // Decrease angry level
        pet_info.angry--;
      
      } else {

        // Increase pet happiness
        pet_info.happiness++;

      }

      // Increase pet weight
      pet_info.weight++;

      // Update the pet's condition
      moodChange = true;
      teased = false;

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {

      // If angry level is NOT 0
      if (pet_info.angry != 0) {

        // Prevent the action and prompt user to try something else
        moodChange = false;

      } else {

        // Increase pet happiness
        pet_info.happiness++;  

        // Decrease pet weight
        pet_info.weight--;

        // Update the pet's condition
        moodChange = true;

      }

      // Mark teased as false to prevent outputting the wrong message status
      teased = false;

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {


      // If angry level is NOT 0
      if (pet_info.angry != 0) {
        
        // Prevent the action and prompt user to try something else
        moodChange = false;
      
      } else {

        // Decrease pet happiness
        pet_info.happiness--;

        // Decrease pet weight
        pet_info.weight--;

        // Update the pet's condition
        moodChange = true;

      }

      // Mark teased as false to prevent outputting the wrong message status
      teased = false;

      checkAndUpdatePetInfoInHtml();
    }

    function clickedTeaseButton() {

      //increase angry level
      if(pet_info.happiness === 0) {

        // Increase angry level
        pet_info.angry++;

      } else {
        // Decrease pet happiness
        pet_info.happiness--;    
        
      }

      // Update the pet's condition
      teased = true;
      moodChange = true;

      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero, set it back to zero

      if (pet_info.weight === -1)
        pet_info.weight = 0;

      if (pet_info.happiness === -1) 
        pet_info.happiness = 0;

      if (pet_info.angry === -1) 
        pet_info.angry = 0;

    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.tease').text(pet_info['angry']);

      // Changing the image to display whether its angry or not
      if (pet_info.angry != 0)
        $('.pet-image').attr('src', './assets/RavenBigAngry.jpg');
      else
        $('.pet-image').attr('src', './assets/RavenBig.jpg');

      // Increasing the size of the image if the pet gains too much weight
      if (pet_info.weight >= 15 && pet_info.weight < 30) {
        $('.pet-image').css('height', '500px');
        $('.status').css('max-width', '500px');
        overweight = true;
      } 
      else if (pet_info.weight >= 30) {
        $('.pet-image').css('height', '800px');
        $('.status').css('max-width', '800px');
        overweight = false;
        obese = true;
      }
      else {
        $('.pet-image').css('height', '250px');
        $('.status').css('max-width', '250px');
        overweight = false;
        obese = false;
      }

      // Update message status
      printStatus();

      // Gameover if the user teases the pet too much
      if (pet_info.angry === 20 && pet_info.weight < 30)
        gameover();
      else if (pet_info.angry === 20 && pet_info.weight >= 30)
        rampage();
    }

    // Message status conditionals
    function printStatus() {
      if ((pet_info.happiness === 0) && (pet_info.angry === 0))
        $('.mood').text('Pet is sad. :(');
      else if (teased === true)
        $('.mood').text("Pet is getting annoyed");
      else if (moodChange === false)
        $('.mood').text('Pet is still angry and not in the mood. Try something else.');
      else if (pet_info.angry != 0)
        $('.mood').text('Pet is currently Angry. Try to change his mood.');
      else if (overweight === true)
        $('.mood').text('Pet is pretty happy but could lose some weight.');
      else if (obese === true)
        $('.mood').text('Pet is huge. Seriously get him to exercise.');
      else 
        $('.mood').text('Pet is pretty happy. :)');
    }

    // Throws a sound and prevents the user from playing any furthers
    function gameover() {
      const gameover = new Audio('./assets/gameover.mp3');
      gameover.play();
      $('.pet-image').hide();
      $('.dashboard').hide();
      $('.mood').text('GameOver. Your pet ran away.');
      $('.pet-image-container').css({'float': 'none', 'margin': '0 40%'});
    }

    // Throws a sound and prevents the user from playing any furthers
    function rampage() {
      const rampage = new Audio('./assets/rampage.mp3');
      rampage.play();
      $('.pet-image').css('height', '800px');
      $('.dashboard').hide();
      $('.mood').text('GameOver. Your pet went on a rampage trying to destroy the world.');
      $('.status').css('max-width', '800px');
      $('.pet-image-container').css({'float': 'none', 'padding': 'none', 'margin': '0 auto', 'width': '50%'});
    }
  