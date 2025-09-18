# SmartCommute
SmartCommute is a demo web application that simulates a real-time bus tracking and booking system. It is designed as a prototype for smarter public transportation in Tier-2 and Tier-3 cities, helping commuters find buses, check availability, and get live updates on seating and arrival times.

# ✨ Features

🔐 Login with OTP (Demo) – Enter your mobile number, generate an OTP (shown as a demo alert), and log in with your name.

👤 User Profile – Personalized dashboard showing user’s name, phone number, and boarding stop.

🚌 Dynamic Bus Listings – View available buses, driver details, seat availability, ETA, and timings.

⏳ Live Seat & ETA Updates – Seats and ETA values auto-update every few seconds to simulate real-time data.

🔍 Search by Destination – Quickly filter buses by typing or using voice search.

🎤 Voice Search (Web Speech API) – Search destinations hands-free using voice input.

📩 SMS Notification (Demo) – Option to request a notification when the bus is near your stop (simulated with an alert).

🗺️ Route Maps – Embedded Google Maps directions from your boarding point to the bus destination.

📱 Responsive Design – Clean, mobile-friendly UI with a modern look.

# 🛠️ Tech Stack

Frontend: HTML5, CSS3 (custom styling with gradients & shadows), JavaScript (vanilla ES6).

APIs:

Google Maps Embed API
 (for live route maps).

Web Speech API (for voice search).

Demo Data: Static JavaScript array simulating buses, drivers, timings, and live seat updates.

# 🚦 How It Works

1. User logs in using a phone number and OTP (demo OTP shown via alert).

2. Dashboard loads with personalized profile and bus listings.

3. Buses dynamically update ETA and seat availability every 5 seconds.

4. User can filter/search buses by destination (typing or voice).

5. Clicking a bus card expands details (driver, timings, map, etc.).

6. User can request SMS alerts or view live route map
