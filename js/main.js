const busData = [
  { busNo: "KA-01-AB-1234", driver: "Ravi Kumar", seats: 12, eta: 7, destination: "Central Station", timings: ["10:00 AM", "10:30 AM", "11:00 AM"] },
  { busNo: "KA-02-CD-5678", driver: "Sita Sharma", seats: 5, eta: 10, destination: "Amritsar", timings: ["10:15 AM", "10:45 AM", "11:15 AM"] },
  { busNo: "KA-03-EF-9012", driver: "Ajay Singh", seats: 0, eta: 15, destination: "Market", timings: ["10:20 AM", "10:50 AM", "11:20 AM"] },
  { busNo: "KA-04-GH-3456", driver: "Anil Kumar", seats: 8, eta: 7, destination: "Patiala", timings: ["10:10 AM", "10:40 AM", "11:10 AM"] },
  { busNo: "KA-05-IJ-7890", driver: "Meena Patel", seats: 6, eta: 12, destination: "Ludhiana", timings: ["10:05 AM", "10:35 AM", "11:05 AM"] },
  { busNo: "KA-06-KL-2345", driver: "Rohan Das", seats: 3, eta: 9, destination: "Kapurtala", timings: ["10:25 AM", "10:55 AM", "11:25 AM"] },
  { busNo: "KA-07-MN-6789", driver: "Sunita Rao", seats: 10, eta: 8, destination: "City Hospital", timings: ["10:12 AM", "10:42 AM", "11:12 AM"] },
  { busNo: "KA-08-OP-0123", driver: "Vikram Singh", seats: 4, eta: 14, destination: "Barnala", timings: ["10:18 AM", "10:48 AM", "11:18 AM"] }
];

function sid(x) { return String(x).replace(/[^a-zA-Z0-9_-]/g, '_'); }

let otp = null;
let loggedUser = { name: null, phone: null };

function generateOTP() {
  const phoneEl = document.getElementById('phone');
  const phone = phoneEl.value.trim();
  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    alert('Enter a valid 10-digit number');
    return;
  }
  if (document.getElementById('otp')) return;
  otp = Math.floor(1000 + Math.random() * 9000);
  alert('Demo OTP: ' + otp);

  const genBtn = document.getElementById('gen-btn');
  const container = document.getElementById('login-container');

  const otpInput = document.createElement('input');
  otpInput.id = 'otp';
  otpInput.placeholder = 'Enter OTP';
  container.insertBefore(otpInput, genBtn);

  const nameInput = document.createElement('input');
  nameInput.id = 'username-input';
  nameInput.placeholder = 'Enter your name';
  container.insertBefore(nameInput, genBtn);

  genBtn.innerText = 'Login with OTP';
  genBtn.onclick = login;
}

function login() {
  const entered = Number(document.getElementById('otp')?.value || 0);
  if (entered !== otp) { alert('Incorrect OTP'); return; }

  const name = document.getElementById('username-input')?.value || 'User';
  const phone = document.getElementById('phone')?.value || '';
  loggedUser = { name, phone };

  document.getElementById('login-container').style.display = 'none';
  document.getElementById('dashboard-container').style.display = 'block';

  document.getElementById('user-name').innerText = name;
  document.getElementById('user-phone').innerText = phone;
  document.getElementById('avatar').innerText = name.trim().charAt(0).toUpperCase() || 'U';

  updateBoardingHeading();
  loadBuses();
  startSeatUpdate();
}

// Update heading based on boarding stop
function updateBoardingHeading() {
  const boarding = document.getElementById('boarding-dashboard').value || 'Boarding Stop';
  document.getElementById('user-boarding').innerText = boarding;
  document.getElementById('bus-heading').innerText = `Buses: Comes from ${boarding} → Goes to Destination`;
}

// Load buses on the page
function loadBuses(data = busData) {
  const container = document.getElementById('buses');
  container.innerHTML = '';

  const boardingInput = document.getElementById('boarding-dashboard').value || 'Boarding Stop';
  const originParam = encodeURIComponent(boardingInput);

  data.forEach(bus => {
    const card = document.createElement('div');
    const id = sid(bus.busNo);
    card.className = 'bus-card';
    card.id = 'card-' + id;

    const fullBadgeHTML = bus.seats === 0 ? `<div class="full-badge">FULL</div>` : '';

    card.innerHTML = `
      ${fullBadgeHTML}
      <div class="bus-summary">
        <div class="bus-title">🚌 ${bus.busNo} → ${bus.destination}</div>
        <div class="summary-meta">${bus.seats} seats • ETA ${bus.eta}m</div>
        <div class="chev">▶</div>
      </div>
      <div class="bus-details">
        <div class="bus-info">
          <p><strong>Driver:</strong> ${bus.driver}</p>
          <p><strong>Seats Available:</strong> <span id="seats-${id}">${bus.seats}</span></p>
          <p><strong>ETA:</strong> <span id="eta-${id}" class="eta ${bus.seats>0 ? 'available' : 'full'}">${bus.eta} min</span></p>
          <p><strong>Timings:</strong> ${bus.timings.join(', ')}</p>
        </div>
        <button onclick="event.stopPropagation(); notifySMS('${bus.busNo}')">Notify Me via SMS</button>
        <button class="map-btn" onclick="toggleMap('${id}', event)">View Route Map</button>
        <div class="map-container" id="map-${id}">
          <iframe src="https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${originParam}&destination=${encodeURIComponent(bus.destination)}" loading="lazy"></iframe>
        </div>
      </div>`;

    card.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      this.classList.toggle('active');
    });

    container.appendChild(card);
  });
}

// Toggle map display
function toggleMap(id, evt) {
  if(evt && evt.stopPropagation) evt.stopPropagation();
  const mapDiv = document.getElementById(`map-${id}`);
  if (!mapDiv) return;
  mapDiv.style.display = mapDiv.style.display === 'block' ? 'none' : 'block';
}

// Notify SMS
function notifySMS(busNo) {
  alert(`📩 SMS Notification activated for Bus ${busNo}.`);
}

// Live seat updates
function startSeatUpdate() {
  setInterval(() => {
    busData.forEach(bus => {
      if (bus.seats > 0 && Math.random() < 0.45) bus.seats = Math.max(0, bus.seats - Math.floor(Math.random()*2));
      if (Math.random() < 0.5) bus.eta = Math.max(1, bus.eta + (Math.random() < 0.5 ? -1 : 1));

      const id = sid(bus.busNo);
      const seatsEl = document.getElementById(`seats-${id}`);
      const etaEl = document.getElementById(`eta-${id}`);
      const card = document.getElementById(`card-${id}`);

      if (seatsEl) seatsEl.innerText = bus.seats;
      if (etaEl) etaEl.innerText = bus.eta + ' min';
      if (etaEl) etaEl.className = 'eta ' + (bus.seats>0 ? 'available' : 'full');

      if (card) {
        const existingBadge = card.querySelector('.full-badge');
        if (bus.seats === 0 && !existingBadge) {
          const badge = document.createElement('div');
          badge.className = 'full-badge';
          badge.innerText = 'FULL';
          card.appendChild(badge);
        } else if (bus.seats > 0 && existingBadge) {
          existingBadge.remove();
        }
      }
    });
  }, 5000);
}


// Search by destination
document.getElementById('search-dest').addEventListener('input', () => {
  const searchValue = document.getElementById('search-dest').value.trim().toLowerCase();
  if (!searchValue) { loadBuses(busData); updateBoardingHeading(); return; }
  const filtered = busData.filter(b => b.destination.toLowerCase().includes(searchValue));
  loadBuses(filtered);
  const boarding = document.getElementById('boarding-dashboard').value || 'Boarding Stop';
  document.getElementById('bus-heading').innerText = `Buses from ${boarding} → "${searchValue}"`;
});

// Show all buses
function showAllBuses() {
  document.getElementById('search-dest').value = '';
  loadBuses(busData);
  updateBoardingHeading();
}

// Update heading if boarding stop changes
document.getElementById('boarding-dashboard').addEventListener('input', updateBoardingHeading);

// 🎤 Voice Search (Microphone)
function startVoiceSearch() {
  try {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('search-dest').value = transcript;
      // trigger the search immediately
      document.getElementById('search-dest').dispatchEvent(new Event('input'));
    };

    recognition.onerror = function(event) {
      alert('Voice search error: ' + event.error);
    };

    recognition.onend = function() {
      console.log('Voice recognition ended');
    };
  } catch (e) {
    alert('Voice search failed: ' + e.message);
  }
}

// Attach the microphone button
document.querySelectorAll('.voice-btn').forEach(btn => {
  btn.addEventListener('click', startVoiceSearch);
});
