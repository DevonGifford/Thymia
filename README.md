<!-- Introduction Text -->
<div align="center">
    <h1>Take-Home Assaignment</h1>
    <h3>React app 2-Back Game  <h3>
    <h3> 
      <a href='https://n-game-technical-assignment.vercel.app/', target='_blank'>
        <h5>live demo</h5>
      <a/>
    </h3>
        <h6>
            built with <a href="https://nextjs.org/" >NextJS</a> &
            hosted by <a href="https://vercel.com/">Vercel</a> 
        </h6>
</div>

---

<h3 align='center'>
Tech Used in this Project
<h3>
<p align='center'>
    <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=ts,nextjs,tailwind" /><br>
        <img src="https://img.stackshare.io/service/40157/default_ac6bddce398a038cb30e3dfd23eaab10c84cfc78.jpg" width=50 alt="React-Hot-Toast" >
        <img src="https://skillicons.dev/icons?i=vercel,github" />
    </a>
</p>

---

<!-- DEMO IMAGE  -->
<div align=center>
    <a href='https://n-game-technical-assignment.vercel.app/', target='_blank'>
        <img src="./src/assets/GitHub/HomePageDemo.png" alt='Demo-Home-Page' title="DemoImage-HomePage" width='400'>
        <img src="./src/assets/GitHub/GamePageDemo.png" alt="Demo-Game-Page" title="DemoImage-GamePage" width="402"> 
        <img src="./src/assets/GitHub/ResultsPageDemo.png" alt="Demo-DemoMobile" title="DemoImage-ResultsPage" width="400">    
    </a>
</div>
<br>

<!-- -------------------------------------------------------------------------- -->

<h1 align='center'> Welcome & Introductory </h1>

<!-- -------------------------------------------------------------------------- -->

### Introduction:
<hr/>
<!-- -------------------------------------------------------------------------- -->

Build a gamified version of the 2-back task, which measures working memory.
The task involves presenting a sequence of letters and asking the user to identify if the current letter matches the one presented 2 trials before.

<h4><strong>⚠ Note for reviewer: </strong> </h4> 

🎯🎯🎯


<!-- -------------------------------------------------------------------------- -->
<br>
<hr>

### 🔑 Key-Required Features of this project:

<hr>
<!-- -------------------------------------------------------------------------- -->

#### REQUIRED FEATURES: 


✅  **Repository Setup & Version Control**<br>
<em>Setup GitHub with ReadMe</em>

✅  **User Interaction:**<br>
<em>Create a React app where the user can input their name before starting the 2-back task.</em>


✅  **Task Completion Conditions - end task after either:**<br>
<em>- two errors are made</em> <br>
<em>- a fixed number of letters are displayed (15)</em>

✅  **Event Logging:**<br>
<em>Capture user interactions as events, mimicking the interaction with an "event API" in the backend.</em>


✅  **Fully Responsive & Mobile Compatibility:** <br>
<em>Ensure that the UI is responsive and mobile-friendly.</em>


 <br>

#### STRETCH FEATURES: 


✅  **Hosting App / Deployment:** <br>
<em>Deploy the solution online for easy testing.</em>

✅ **Error Handling and Form Validation:** <br>
<em>Implement proper error handling and validation to ensure the application handles edge cases gracefully.</em>

✅ **Unit & Integration Testing:** <br>
<em>If time allows, consider including unit tests or integration tests to verify the functionality of your code.</em>

</br>
<!-- -------------------------------------------------------------------------- -->
<hr>

### 🎯 Known issues & potential improvements:  

<hr>
<!-- -------------------------------------------------------------------------- -->
<!-- Small container -->
<details>
<summary> Click here to expand</summary>
<br/>

#### Known issues & Things I didn't have time for: 

💥  Implement a restriction to prevent users from clicking the same letter more than once per new stimulus, ensuring task integrity.

💥  Implement a system to accurately record instances where a user misses a correct answer.

💥  Establish a separate state for users who did not complete the test (DNF) due to more than two mistakes.

💥  Ensure that the same letter does not appear consecutively to enhance task validity.

💥  Improve Test Coverage and add E2E testing 
</br>

#### Future Features & Improvements: 

💥  Incorporate a brief interval between each letter presentation. Display the letter for a duration of 10 seconds, followed by a 10-second blank screen before transitioning to the next stimulus.

💥  Develop a comprehensive history feature to document correct answers for each instance a user provides an incorrect or missed response, enabling a detailed performance review.

💥  Integrate a user-friendly redirect mechanism on the /game and /results pages if no user is currently authenticated, providing a seamless user experience.

💥  Allow users to customize the game difficulty by enabling the transition between 2-back, 3-back, or 1-back modes (n-back), providing a tailored cognitive training experience.

💥  Introduce a timer display for each presented letter, enhancing user engagement and performance tracking.

💥  Provide immediate visual feedback for correct and incorrect answers, beyond a simple error count, to enhance the user's experience.

💥  Enhance the visual appeal and user experience of loading and error states to create a more engaging interface.

<!-- CLOSING DIV -->
</details>
<!-- SECTION CLOSING DIV -->
</details>
<br><br>