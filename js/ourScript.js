document.getElementById('registerUser').addEventListener('submit', function(nope) {
  nope.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var email = document.getElementById('email').value;
  
  var missingFields = 0;

  if (!username || !password || !email){
      missingFields = 1;
  }

  
  if (missingFields == 0) {
      //if there are no missing fields
      window.location.href = "homepage.htm";
      displayName(username);

  } else {
      //if there are missing fields
      var modal = document.getElementById('missingFieldsModal');
      modal.style.display = 'block';

      var modalCloseBtn = document.getElementById('modalCloseBtn');
      modalCloseBtn.addEventListener('click', function() {
          modal.style.display = 'none';
      });
  }

// this is the function that should display the the name in a div element with id="output" in it
  function displayName(x) {
    var outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = 'Hello, ' + x + ', today you will learn about';
  }

});

document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Navigation Bar Highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.siteNavBar li a').forEach(li => {
            li.classList.remove('active');
            if (li.href.includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // Scroll-to-Top Button
    const topButton = document.createElement('button');
    topButton.innerText = 'Top';
    topButton.style.position = 'fixed';
    topButton.style.bottom = '20px';
    topButton.style.right = '20px';
    document.body.appendChild(topButton);
    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Lightbox
    document.querySelectorAll('.lightbox-trigger').forEach(image => {
        image.addEventListener('click', function() {
            const modal = document.getElementById('lightbox-modal');
            const modalImg = document.querySelector('.lightbox-content');
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });
    
    // Close Lightbox
    const close = document.querySelector('.lightbox .close');
    close.onclick = function() {
        const modal = document.getElementById('lightbox-modal');
        modal.style.display = "none";
    };
    
});

function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  //Quiz 
  const correctAnswers = ["The Telesphere Mask", "1946", "The Ultimate Display", "VPL Research, Inc.", "All of the above"];

  function submitQuiz() {
    const correctAnswers = ["The Telesphere Mask", "1946", "The Ultimate Display", "VPL Research, Inc.", "All of the above"];
    let results = { correct: 0, incorrect: 0 };

    for (let i = 1; i <= correctAnswers.length; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        
        if (selectedOption) {
            if (selectedOption.value === correctAnswers[i - 1]) {
                results.correct++;
            } else {
                results.incorrect++;
            }
        } else {
            // Handle the case where a question is not answered
            results.incorrect++;
        }
    }

    displayResults(results);
}



function displayResults(results) {
    const ctx = document.getElementById('resultsChart').getContext('2d');

    // Check if the chart instance exists and is a Chart instance
    if (window.resultsChart instanceof Chart) {
        window.resultsChart.destroy(); // Destroy the previous instance of the chart
    }

    window.resultsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                label: 'Quiz Results',
                data: [results.correct, results.incorrect],
                backgroundColor: [
                    'rgba(0, 233, 191, 0.5)',
                    'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(0, 233, 191, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('quiz-results').style.display = 'block';
    document.getElementById('quiz-results').style.width = '50vw';
    document.getElementById('quiz-results').style.height = 'auto';
}


window.submitQuiz = submitQuiz;

