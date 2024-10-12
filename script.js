/* General styles */
html {
  scroll-behavior: smooth; /* Enables smooth scrolling across the page */
}

body {
  font-family: 'Tajawal', 'Cairo', sans-serif; /* Arabic sans-serif font */
  direction: rtl; /* Right-to-left direction */
  background-color: #fbfbfe; /* Light background */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  direction: rtl;
  background-color: #fbfbfe; /* Updated background set to light white/blue */
  color: #050316; /* Text set to dark blue */
  font-size: 1.2rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 50px 20px 40px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 20px;
  background-color: #fbfbfe; /* Light white/blue background */
  color: #2f27ce; /* Dark blue text */
  position: relative;
  z-index: 10; /* Ensure the header stays on top of other elements */
  border-radius: 0px; /* Rounded header */
}

/* Logo Styling */
.logo {
  font-weight: 900; /* Bold styling */
  font-size: 2rem; /* Adjust the font size if needed */
  color: blue; /* Adjust the color if needed */
}

.nav {
  display: flex;
  gap: 15px;
}

.nav a {
  color: #050316; /* Dark blue for nav links */
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px; /* Rounded navigation links */
  transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition */
}

.nav a:hover,
.nav a:focus {
  color: #443dff; /* Accent color on hover or focus */
  /* background-color: rgba(68, 61, 255, 0.1); Optional: accent background tint on hover */
}

/* Hamburger Menu */
.hamburger {
  display: none; /* Hidden on larger screens */
  cursor: pointer;
  font-size: 1.5rem;
  color: #050316; /* Dark blue for the hamburger icon */
  transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition */
}

.hamburger:hover,
.hamburger:focus {
  color: #443dff; /* Accent blue on hover or focus */
  background-color: rgba(68, 61, 255, 0.1); /* Optional: Add a light accent background on hover */
}

.hamburger i {
  font-size: 2rem; /* Icon size */
  transition: color 0.3s ease;
}

.hamburger i:hover,
.hamburger i:focus {
  color: #443dff; /* Accent icon color on hover or focus */
}

/* Media Query for Mobile Screens */
@media (max-width: 768px) {
  .nav {
    display: none; /* Hidden by default on mobile */
    flex-direction: column;
    background-color: #fbfbfe; /* Light white/blue background */
    position: absolute;
    top: 60px; /* Position the menu below the header */
    right: 0;
    width: 100%;
    padding: 10px;
    z-index: 999; /* Ensure the menu is above other elements */
  }

  .nav a {
    padding: 10px 0;
    text-align: center;
    color: #050316; /* Dark blue for nav links on mobile */
    transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition */
  }

  .nav a:hover,
  .nav a:focus {
    color: #443dff; /* Accent blue on hover or focus */
    background-color: rgba(68, 61, 255, 0.1); /* Optional background tint on hover */
  }

  .nav.active {
    display: flex; /* Show the menu when active */
  }

  .hamburger {
    display: block; /* Show the hamburger on mobile */
  }
}

/* Login Button Styling */
.login-button {
  background-color: #443dff; /* Deep blue/purple background */
  color: white; /* Button text color */
  border: none; /* Remove default border */
  padding: 2.5px 20px; /* Button padding */
  font-size: 16px; /* Font size */
  font-family: 'Cairo', sans-serif; /* Use the Cairo font */
  font-weight: 600; /* Font weight */
  border-radius: 20px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
}

.login-button:hover {
  background-color: #2f27ce; /* deep blue/purple on hover */
}

.login-button:active {
  background-color: #443dff; /* bright blue/purple on click/active */
}

.login-button:focus {
  outline: none; /* Remove default focus outline */
  box-shadow: 0 0 0 3px rgba(47, 39, 206, 0.5); /* Light blue shadow on focus */
}

/* Hero Section */
.hero {
  background-color: #020029; /* Light purple background */
  padding: 0px 25px 40px;
  text-align: right;
  position: relative;
  z-index: 1; /* Ensure hero is below the header */
  border-radius: 0px; /* Rounded hero section */
}

.hero .hero-content {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 20px;
}

.hero h1 {
  font-size: 2.4rem;
  color: #ffffff; /* Dark blue text */
}

.hero h2 {
  font-size: 1.5rem;
  margin-top: 10px;
  color: #ffffff; /* Dark blue text */
}

.hero .stats {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  text-align: right;
  align-items: right;
}

.hero .stats span {
  font-size: 1.2rem;
  color: #ffffff; /* Dark blue text */
}

.stats i.fa-star {
    color: #FFD700; /* Gold color */
}

.hero img {
  position: relative;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: auto;
  border-radius: 50%; /* Circular image */
}

@media (max-width: 768px) {
  .hero {
    padding: 50px 10px;
  }

  .hero h1 {
    font-size: 1.8rem;
  }

  .hero h2 {
    font-size: 1.2rem;
  }

  .hero .stats {
    flex-direction: column;
  }

  .hero img {
    display: none;
  }
}

/* Main Content Area */
.content {
  width: 70%;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #fbfbfe; /* Light white/blue background */
  border-radius: 10px; /* Rounded tabs */
  padding: 10px;
}

.tab-button {
  background-color: #ffffff; /* Default background color */
  color: #050316; /* Default text color */
  border: none;
  cursor: pointer;
  flex: 1;
  text-align: center;
  margin: 0 5px;
  line-height: 15px;
  padding: 0px 0px 0px 0px;
  border-radius: 100px; /* Rounded tab buttons */
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
  font-family: "Cairo";
}

.tab-button:hover {
  background-color: #dddbff; /* Change background to bright blue/purple on hover */
  color: white; /* Change text color to white on hover */
}

.tab-button.active {
  background-color: #443dff; /* Deep blue/purple for active tab */
  color: white;
}
.tab-button.active:hover {
  background-color: #2f27ce; /* Deep blue/purple for active tab */
  color: white;
}
.tab-content {
  display: none;
  padding-left: 5%;
}

.tab-content.active {
  display: block;
}

@media (max-width: 768px) {
  .content {
    width: 100%;
  }

  .tabs {
    flex-direction: row;
  }

  .tab-button {
    padding: 10px;
    flex: 1;
  }
}

/* Course Details */
.course-details summary {
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
}

.course-details summary::before {
  content: "+"; /* Default plus icon */
  font-size: 24px;
  margin-right: 10px;
  color: #a339ff;
  padding-left: 6px;
}

.course-details[open] summary::before {
  content: "-"; /* Change to minus when opened */
  color: #a339ff;
}

/* Curriculum Section */
.curriculum-section {
  margin-top: 16px;
}

.curriculum-section details {
  border: 0.5px solid #e2e8f0;
  background-color: #f9fafb; /* Matching page background */
  transition: all 0.3s ease;
  text-align: left;
  margin-bottom: 12px;
  border-radius: 6px;
}

.curriculum-section summary {
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 12px;
  justify-content: flex-start;
  background-color: #edf2f7; /* Light gray background */
  border-radius: 6px;
}

/* Module Title */
.module-title {
  font-weight: bold;
  margin-right: auto;
}

/* Toggle Icon */
.toggle-icon {
  font-size: 1.4rem;
  color: #6b46c1; /* Purple color */
  transition: transform 0.3s ease;
  padding: 6px;
  padding-left: 12px;
}

details[open] .toggle-icon {
  transform: rotate(180deg); /* Rotate on open */
}

/* Lesson List */
.lesson-list {
  padding-left: 0; /* Remove default padding */
  list-style: none;
  text-align: left;
  direction: ltr; /* Force LTR for lesson lists */
}

.lesson-list li {
  padding: 0px 12px;
  text-align: left;
  direction: ltr; /* Force LTR for list items */
}

/* Lesson Link */
.lesson-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  direction: ltr; /* Force LTR for links */
}

.lesson-link:hover {
  text-decoration: underline;
  color: #3182ce; /* Blue color on hover */
}

.lesson-link .lesson-name {
  font-weight: bold;
  margin-right: 8px;
}

/* Lesson Icon */
.lesson-icon {
  margin-right: 8px;
  font-size: 1.2rem;
  color: #4a5568; /* Dark gray color */
}

/* Video Container */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background-color: #000; /* Black background */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


/* Instructor Content */
.instructorContent details {
  align-items: center;
}

#instructorContent h2 {
  text-align: center; /* Center the heading text */
}

.instructor {
  display: flex;
  flex-direction: column;
  align-items: center; /* Horizontally center the image */
  text-align: right;   /* Align text content under the image */
}

.instructor h3 {
  text-align: center; /* Center the instructor's name */
}

/* Circular Image */
.instructor-image {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Make it circular */
  object-fit: cover; /* Ensure image fits container */
}

/* Resized Image */
.resized-image {
  width: 300px;
  height: 150px;
  object-fit: cover;
}

/* Reviews Section */
.reviews-container {
  max-height: 400px; /* Limit the height of the reviews container */
  overflow-y: auto; /* Enable vertical scrolling */
  padding-right: 10px; /* Optional padding */
  margin-bottom: 20px; /* Add some space between the container and the next section */
  border: 1px solid #e2e8f0; /* Optional: Add a border to distinguish the scrollable area */
  border-radius: 10px; /* Optional: Rounded corners */
}

/* Individual Review */
.review {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

/* Student Photo */
.student-photo {
  border-radius: 50%; /* Make circular */
  width: 50px;
  height: 50px;
  background-color: #6b46c1; /* Purple background */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-right: 16px;
  margin-top: 10px;
  flex-shrink: 0;
}

.student-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* Ensure image is circular */
  object-fit: cover;
}

.review-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-right: 12px;
}

.student-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.student-title {
  font-size: 0.9rem;
  color: #343434;
  margin-top: 1px;
  margin-bottom: 0;
}

.star-rating {
  color: #FFD700; /* Gold star color */
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.review-text {
  font-size: 1rem;
  line-height: 1.5;
}

.english {
  text-align: left;
  direction: ltr;
}

.arabic {
  text-align: right;
  direction: rtl;
}

/* See More Button */
.see-more {
  background: none;
  color: #6b46c1; /* Purple color */
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 8px;
}

.see-more:hover {
  text-decoration: underline; /* Underline on hover */
}

.reviews-container::-webkit-scrollbar {
  width: 8px;
}

.reviews-container::-webkit-scrollbar-thumb {
  background-color: #6b46c1; /* Purple scrollbar */
  border-radius: 10px;
}

/* FAQ Section */
details {
  position: relative;
}

.faq-content summary {
  font-size: 1.1rem;
  font-weight: bold;
  color: #443dff;
  display: flex;
  line-height: 50px;
  /* justify-content: space-between; */
  /* align-items: right; */
}

.faq-content details[open] summary {
  color: #000;
}

.faq-content summary::before {
  content: "+"; /* Default plus icon */
  font-size: 24px;
  margin-right: 10px;
  /* margin-bottom: 20px; */
  margin-top: 0px;
  color: #a339ff; /* Icon color */
  order: -1;
  padding-left: 6px;
  /* padding: 20px; */
  /* padding-top: -10px; */
}

/* Sidebar */
.sidebar {
  width: 25%;
  border: px #2f27ce; /* Deep blue/purple border */
  padding: 20px;
  background-color: #fbfbfe; /* Light white/blue background */
  border-radius: 10px; /* Rounded sidebar */
  position: sticky;
  top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* All-around shadow */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  height: 0%;
}

/* Course Image Container */
.course-image {
  margin-bottom: 20px; /* Add space below the image */
}

/* Sidebar Image Styles */
.resized-image {
  width: 100%;           /* Make the image responsive to fill the container */
  height: auto;          /* Maintain the aspect ratio */
  border-radius: 10px;   /* Add rounded corners to the image */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Add a subtle shadow around the image */
  object-fit: cover;     /* Ensure the image covers the container without distorting */
  transition: transform 0.3s ease; /* Add a smooth hover effect */
}

/* Lazy Image Placeholder */
.lazy-image {
  opacity: 0;            /* Initially hide the lazy-loaded image */
  transition: opacity 0.5s ease-in-out; /* Fade in the image as it loads */
}

.lazy-image.lazyloaded {
  opacity: 1;            /* Show the image once it has been loaded */
}

/* Optional: Hover Effect for the Image */
.resized-image:hover {
  transform: scale(1.05); /* Slightly enlarge the image on hover for an interactive effect */
}

.course-info {
  list-style: none;
  padding: 10;
  width: 100%;
}

.course-info li {
  margin-bottom: 10px;
  text-align: right; /* Center list items inside the sidebar */
  font-weight: bold;
}

/* Price Styling */
.price {
  padding: 0;
  line-height: 0px;
  margin: 5px;
}

#old-price {
  font-size: 1.2rem;
  color: #999; /* Gray color to indicate it's the old price */
  text-decoration: line-through; /* Strikethrough the old price */
  display: block; /* Ensure it's on a separate line */
}

#new-price {
  font-size: 1.5rem;
  color: #050316; /* Red color to highlight the discount */
  font-weight: bold;
  display: block; /* Ensure it's on a separate line */
  margin-top: 45px; /* Add spacing between old and new price */
}

.subscribtion-time {
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  font-family: 'Tajawal';
}
.subscribe-button {
  background-color: #443dff; /* bright blue/purple background */
  color: white;
  border: none;
  font-weight: bold; /* Make the text bold */
  font-size: 1rem; /* Large text size */
  cursor: pointer;
  width: 180px;
  height: 45px;
  line-height: 1px; /* Vertically center text */
  border-radius: 100px; /* Fully rounded subscribe button */
  text-align: center; /* Ensure text is centered horizontally */
  margin-top: 0px; /* Space between button and other content */
  font-family: "Cairo";
}

.subscribe-button:hover {
  background-color: #2f27ce; /* deep blue/purple on hover */
}

.subscribe-button:active {
  background-color: #443dff; /* bright blue/purple on click/active */
}

.subscribe-button:focus {
  outline: none; /* Remove default focus outline */
  box-shadow: 0 0 0 3px rgba(47, 39, 206, 0.5); /* Light blue shadow on focus */
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    margin-top: 20px;
  }
}

/* Footer */
.footer {
  padding: 20px;
  background-color: #000000; /* Deep blue/purple background */
  color: white;
  text-align: center;
  border-radius: 0px; /* Rounded footer */
}

.footer-logo-text {
  font-size: 1.5rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 10px 0;
}

.social-icon {
  color: white;
  font-size: 1.5rem;
}

.footer-links {
  margin: 10px 0;
}

.footer-links a {
  color: white; /* White footer links */
  text-decoration: none;
  margin: 0 10px;
}

.footer-links span {
  color: #999;
}

.footer p {
  margin: 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .tabs {
    flex-direction: row;
  }

  .content, .sidebar {
    width: 100%;
  }
}
