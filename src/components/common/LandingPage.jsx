import React from "react";

const LandingPage = () => {
  return (
    <div id="landingpage">
      {/* Include the raw HTML content here */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Your Static Page</title>
        </head>
        <body>
          <header>
          <div class="container">
          <a href="#" class="branding">WiseCare></a>
          <ul>
          <li><a href="#">Seniors</a></li>
          <li><a href="#">Volunteers</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Contact</a></li>
          </ul>
          <div class="logsignup">
          <a href="#" class="whitebut">Login</a>
          <a href="#" class="orgbut">Sign up</a>
          </div>
          </div>
          </header>
          <main>
          <section>
          <div class="container">
          <div class"sectioncont">
          <h2>Hey Seniors! Do you need help?</h2>
          <p>Our Community of reliable Volunteers are committed  to provide help and support for our Seniors as a token of gratitude and caring for elders of the Community.</p>
          <div class="contbox">
          <div class="contbox-left"><i></i></div>
          <div class="contbox-right"><h3>Senior and their relatives,</h3>
          <p>look how we could help Seniors in some daily tasks here.</p>
          </div>
          </div>
          </div>
       <div class="sectionimg">
       <img src="././images/group-seniors-park 1.png" alt="Description of the image"/>
       </div>
       </div>
          </section>
          </main>
        </body>
        </html>
      `
        }}
      />
    </div>
  );
};

export default LandingPage;
