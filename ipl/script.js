// --- Animated Background ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', initCanvas);
initCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        // 50% red, 50% gold
        this.color = Math.random() > 0.5 ? 'rgba(236, 28, 36, 0.4)' : 'rgba(230, 184, 116, 0.4)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Add hover effect to clickable elements
document.querySelectorAll('a, button, .player-card, .news-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
});

// --- Navigation & SPA Logic ---
const navLinks = document.querySelectorAll('.nav-links a');
const pageSections = document.querySelectorAll('.page-section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all
        navLinks.forEach(l => l.classList.remove('active'));
        pageSections.forEach(s => s.classList.remove('active', 'hidden'));
        pageSections.forEach(s => s.classList.add('hidden'));

        // Add active class to clicked
        link.classList.add('active');
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');

        // Close mobile menu if open
        navMenu.classList.remove('active');

        window.scrollTo(0, 0);
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// --- Scroll Animations (Intersection Observer) ---
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// --- Back to Top Button ---
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
if(backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
}


// --- Mock Data ---

const players = [
    { name: "Virat Kohli", role: "Batter", jersey: 18, img: "images/kohli.jpg" },
    { name: "Faf du Plessis", role: "Batter", jersey: 13, img: "images/faf.jpg" },
    { name: "Rajat Patidar", role: "Batter", jersey: 17, img: "images/patidar.jpg" },
    { name: "Anuj Rawat", role: "Batter", jersey: 19, img: "images/anuj.jpg", profileUrl: "https://www.gujarattitansipl.com/players/anuj-rawat-67752-profile" },
    { name: "Mohammed Siraj", role: "Bowler", jersey: 73, img: "images/siraj.jpg" },
    { name: "Josh Hazlewood", role: "Bowler", jersey: 38, img: "images/hazlewood.jpg" },
    { name: "Harshal Patel", role: "Bowler", jersey: 8, img: "images/harshal.jpg", profileUrl: "https://www.iplt20.com/players/harshal-patel/157" },
    { name: "Swapnil Singh", role: "Bowler", jersey: 55, img: "images/swapnil.jpg", profileUrl: "https://www.iplt20.com/players/swapnil-singh/3180" },
    { name: "Glenn Maxwell", role: "All-rounder", jersey: 32, img: "images/maxwell.jpg" },
    { name: "Cameron Green", role: "All-rounder", jersey: 20, img: "images/green.jpg" },
    { name: "Shahbaz Ahmed", role: "All-rounder", jersey: 21, img: "images/shahbaz.jpg", profileUrl: "https://www.lucknowsupergiants.in/team/shahbaz-ahamad-58223-profile" },
    { name: "Dinesh Karthik", role: "Wicketkeeper", jersey: 21, img: "images/karthik.jpg" },
    { name: "Suyash Prabhudessai", role: "Wicketkeeper", jersey: 26, img: "images/prabhudessai.jpg" }
];

const matches = [
    { date: "Apr 5", opp: "Mumbai Indians", venue: "Chinnaswamy", result: "Won", score: "189/4 vs 176/8" },
    { date: "Apr 12", opp: "Chennai Super Kings", venue: "Chepauk", result: "Lost", score: "154/9 vs 158/6" },
    { date: "Apr 19", opp: "Kolkata KR", venue: "Chinnaswamy", result: "Won", score: "201/5 vs 185/7" },
    { date: "Apr 27", opp: "Sunrisers Hyderabad", venue: "Hyderabad", result: "Won", score: "287/3 vs 210/8" },
    { date: "May 5", opp: "Gujarat Titans", venue: "Chinnaswamy", result: "Won", score: "176/6 vs 172/9" },
    { date: "May 14", opp: "Punjab Kings", venue: "Mohali", result: "Won", score: "198/4 vs 183/6" },
    { date: "May 22", opp: "CSK (Semi-Final)", venue: "Chinnaswamy", result: "Won", score: "210/5 vs 190/8" },
    { date: "May 26", opp: "GT (Final)", venue: "Narendra Modi Stadium", result: "Won", score: "201/6 vs 198/8" }
];

const newsArticles = [
    { title: "Kohli smashes 100th T20 fifty in style", date: "May 30, 2026", tag: "Highlight", img: "", url: "#", content: "Kohli reached another milestone with an incredible knock." },
    { title: "RCB crowned IPL 2026 Champions!", date: "May 26, 2026", tag: "Match Report", img: "", url: "#", content: "RCB secures the IPL 2026 trophy with a stunning win over GT." },
    { title: "Siraj takes 5-wicket haul in semi-final", date: "May 22, 2026", tag: "Highlight", img: "", url: "#", content: "Siraj dismantles the CSK batting lineup in a masterclass." }
];

// --- Render Home Page Data ---
function renderHome() {
    // Next Match Countdown (mock target date)
    const targetDate = new Date("May 31, 2026 19:30:00").getTime();
    const countdownEl = document.getElementById('countdown');
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            countdownEl.innerHTML = "MATCH STARTED";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m`;
    }, 1000);

    // Latest News Slider
    const sliderContainer = document.getElementById('news-slider');
    const controlsContainer = document.getElementById('slider-controls');
    let currentSlide = 0;
    
    // Create slides
    newsArticles.slice(0, 3).forEach((news, idx) => {
        const slide = document.createElement('div');
        slide.className = `slide-item ${idx === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <a href="${news.url}" target="_blank" style="text-decoration:none;">
                <img src="${news.img}" alt="${news.title}" class="slide-img" loading="lazy" onerror="this.src='https://via.placeholder.com/800x400?text=News+Image'">
                <div class="slide-content">
                    <span class="news-tag">${news.date}</span>
                    <h4>${news.title}</h4>
                    <span style="color:var(--gold); font-size:0.9rem; margin-top:5px; display:inline-block;">Read Article <i class="fas fa-external-link-alt"></i></span>
                </div>
            </a>
        `;
        sliderContainer.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentSlide = idx;
            updateSlider();
        });
        controlsContainer.appendChild(dot);
    });

    function updateSlider() {
        document.querySelectorAll('.slide-item').forEach((el, i) => {
            el.classList.toggle('active', i === currentSlide);
        });
        document.querySelectorAll('.dot').forEach((el, i) => {
            el.classList.toggle('active', i === currentSlide);
        });
    }

    // Auto rotate every 40s (40000ms)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % 3;
        updateSlider();
    }, 40000);

    // Top Players (Star Performers)
    const starsGrid = document.getElementById('home-stars-grid');
    starsGrid.innerHTML = `
        <div class="star-card">
            <h4>🧡 Orange Cap</h4>
            <p style="font-weight:bold; margin-top:10px;">Virat Kohli – 741 runs</p>
        </div>
        <div class="star-card">
            <h4>💜 Purple Cap</h4>
            <p style="font-weight:bold; margin-top:10px;">Mohammed Siraj – 21 wickets</p>
        </div>
        <div class="star-card">
            <h4>💥 Most Sixes</h4>
            <p style="font-weight:bold; margin-top:10px;">Glenn Maxwell – 28 sixes</p>
        </div>
    `;
}

// --- Render Squad Page ---
function renderSquad(filter = "all") {
    const squadGrid = document.getElementById('squad-grid');
    squadGrid.innerHTML = '';

    const filteredPlayers = filter === "all" ? players : players.filter(p => p.role === filter);

    filteredPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card fade-in';
        card.innerHTML = `
            <div class="jersey-badge">#${player.jersey}</div>
            <div class="player-img-wrapper">
                ${player.profileUrl ? `<a href="${player.profileUrl}" target="_blank">` : ''}
                <img src="${player.img || `https://placehold.co/250x300/222/FFF?text=${player.name.split(' ').join('+')}`}" alt="${player.name}" class="player-img" loading="lazy">
                ${player.profileUrl ? `</a>` : ''}
            </div>
            <div class="player-info">
                <h3 class="player-name">${player.profileUrl ? `<a href="${player.profileUrl}" target="_blank" style="color:inherit;text-decoration:none;">${player.name}</a>` : player.name}</h3>
                <p class="player-role" style="color:var(--text-dark);">${player.role}</p>
            </div>
        `;
        squadGrid.appendChild(card);
    });

    // Re-observe new elements
    document.querySelectorAll('#squad .fade-in').forEach(el => fadeObserver.observe(el));
}

// --- Render Schedule Page ---
function renderSchedule(filter = "all") {
    const tbody = document.getElementById('schedule-tbody');
    tbody.innerHTML = '';

    const filteredMatches = matches.filter(m => {
        if (filter === "all") return true;
        if (filter === "won") return m.result === "Won";
        if (filter === "lost") return m.result === "Lost";
        if (filter === "home") return m.venue === "Chinnaswamy";
        if (filter === "away") return m.venue !== "Chinnaswamy";
        return true;
    });

    filteredMatches.forEach(m => {
        const tr = document.createElement('tr');
        const resClass = `result-${m.result.toLowerCase()}`;
        tr.className = resClass;
        tr.innerHTML = `
            <td>${m.date}</td>
            <td><strong>${m.opp}</strong></td>
            <td>${m.venue}</td>
            <td>${m.result}</td>
            <td>${m.score}</td>
        `;
        tbody.appendChild(tr);
    });
}

let currentNewsSlide = 0;
let newsSliderInterval;

function goToNewsSlide(index) {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!track || !dots.length) return;
    
    currentNewsSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

function startNewsSlider() {
    clearInterval(newsSliderInterval);
    newsSliderInterval = setInterval(() => {
        currentNewsSlide = (currentNewsSlide + 1) % newsArticles.length;
        goToNewsSlide(currentNewsSlide);
    }, 5000);
}

// --- Render News Page ---
function renderNews() {
    const newsGrid = document.getElementById('news-grid');
    const trendingList = document.getElementById('trending-news');
    const modal = document.getElementById('news-modal');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselIndicators = document.getElementById('carousel-indicators');
    
    newsGrid.innerHTML = '';
    trendingList.innerHTML = '';
    if(carouselTrack) carouselTrack.innerHTML = '';
    if(carouselIndicators) carouselIndicators.innerHTML = '';

    newsArticles.forEach((article, index) => {
        // Carousel Slide
        if(carouselTrack) {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${article.img}" alt="${article.title}" loading="lazy" onerror="this.src='https://placehold.co/400x220/C8102E/FFFFFF?text=RCB+News'">
                <div class="carousel-caption">
                    <span class="news-tag" style="background:var(--rcb-red); padding:2px 8px; border-radius:4px; font-size:0.8rem; margin-bottom:10px; display:inline-block;">${article.tag}</span>
                    <a href="${article.url}" target="_blank" style="color: white; text-decoration: none;"><h3>${article.title}</h3></a>
                </div>
            `;
            carouselTrack.appendChild(slide);

            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToNewsSlide(index));
            carouselIndicators.appendChild(dot);
        }
        // Main Grid
        const card = document.createElement('div');
        card.className = 'news-card fade-in';
        card.innerHTML = `
            <img src="${article.img}" alt="${article.title}" class="news-img" loading="lazy" onerror="this.src='https://placehold.co/400x220/C8102E/FFFFFF?text=RCB+News'">
            <div class="news-content">
                <span class="news-tag">${article.tag}</span>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-date">${article.date}</p>
                <a href="${article.url}" target="_blank" class="read-more-link">Read Full Article <i class="fas fa-external-link-alt"></i></a>
            </div>
        `;
        newsGrid.appendChild(card);

        // Trending Sidebar
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${article.url}" target="_blank" style="color:var(--text-dark); text-decoration:none; display:block; margin-bottom:5px;">
                <strong>${article.title}</strong>
            </a>
            <small style="color:#888;">${article.date}</small>
            <br>
            <a href="${article.url}" target="_blank" style="color:var(--gold); font-size:0.85rem; text-decoration:none; font-weight:bold;">Read Article <i class="fas fa-external-link-alt"></i></a>
        `;
        trendingList.appendChild(li);
    });

    if(document.getElementById('carousel-track')) {
        goToNewsSlide(0);
        startNewsSlider();
    }

    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });
}



// --- Fan Zone Logic ---
function initFanZone() {
    // 1. Poll Logic
    // Clear storage once so you can test voting directly
    localStorage.removeItem('rcb_poll_vote');
    
    const pollOptions = ['Virat Kohli', 'Will Jacks', 'Cameron Green'];
    const pollContainer = document.getElementById('poll-options');
    const pollMsg = document.getElementById('poll-message');
    
    const savedVote = localStorage.getItem('rcb_poll_vote');
    let votes = { 'Virat Kohli': 65, 'Will Jacks': 25, 'Cameron Green': 10 };

    function renderPoll() {
        pollContainer.innerHTML = '';
        const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

        pollOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'poll-btn';
            const percent = Math.round((votes[opt] / totalVotes) * 100) || 0;
            
            btn.innerHTML = `
                <span style="pointer-events: none;">${opt} ${savedVote ? `(${percent}%)` : ''}</span>
                <div class="progress" style="width: ${savedVote ? percent : 0}%; pointer-events: none;"></div>
            `;
            
            if (!savedVote) {
                btn.addEventListener('click', () => {
                    localStorage.setItem('rcb_poll_vote', opt);
                    votes[opt]++;
                    pollMsg.classList.remove('hidden');
                    // Re-init the fan zone so the saved vote applies
                    initFanZone(); 
                });
            } else if (savedVote === opt) {
                btn.style.border = '2px solid var(--rcb-red)';
            }
            pollContainer.appendChild(btn);
        });
    }
    renderPoll();
    if(savedVote) pollMsg.classList.remove('hidden');

    // 2. Trivia Quiz
    const quizContainer = document.getElementById('quiz-options');
    const questionText = document.getElementById('question-text');
    const quizResult = document.getElementById('quiz-result');
    
    const quiz = {
        question: "In which year did RCB win their first IPL title?",
        options: ["2009", "2016", "2024", "2026"],
        answer: "2026"
    };

    questionText.textContent = quiz.question;
    quiz.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            // Disable all buttons
            document.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
            if(opt === quiz.answer) {
                btn.classList.add('correct');
                quizResult.textContent = "Correct! We are the 2026 Champions! 🏆";
                quizResult.style.color = "#28a745";
                
                // Fire Confetti!
                if(typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            } else {
                btn.classList.add('wrong');
                quizResult.textContent = "Incorrect! The answer is 2026! 🏆";
                quizResult.style.color = "var(--rcb-red)";
            }
            quizResult.classList.remove('hidden');
        });
        quizContainer.appendChild(btn);
    });

    // 3. Form Submit
    document.getElementById('fan-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for your message! Ee Sala Cup Namde!");
        e.target.reset();
    });
}

// --- Event Listeners for Filters ---
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderSquad(e.target.getAttribute('data-filter'));
    });
});

document.querySelectorAll('.filter-btn[data-schedule-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn[data-schedule-filter]').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderSchedule(e.target.getAttribute('data-schedule-filter'));
    });
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json');
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            newsArticles.length = 0; // Clear mock data
            data.articles.slice(0, 10).forEach(article => {
                newsArticles.push({
                    title: article.title || 'Sports News',
                    date: new Date(article.publishedAt).toLocaleDateString(),
                    tag: article.source.name || 'News',
                    img: article.urlToImage || 'https://placehold.co/400x220/C8102E/FFFFFF?text=News',
                    url: article.url || '#',
                    content: article.description || 'Read more for full article.'
                });
            });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }

    renderHome();
    renderSquad();
    renderSchedule();
    renderNews();
    initFanZone();
});
