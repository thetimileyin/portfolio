(function () {
  var loaderEl = document.getElementById('loader');
  if (loaderEl && document.body.classList.contains('loading')) {
    var loaderNameEl = document.getElementById('loaderName');
    var loaderCountEl = document.getElementById('loaderCount');
    var loaderAvatarEl = document.getElementById('loaderAvatar');

    var TARGET_NAME = 'Oladimeji Bamidele';
    var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*';
    var AVATAR_POOL = 10;
    var LOAD_DURATION = 2000;

    function randomScrambleChar() {
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }

    function renderScrambledName(progress) {
      var lockedCount = Math.floor(progress * TARGET_NAME.length);
      var out = '';
      for (var i = 0; i < TARGET_NAME.length; i++) {
        if (TARGET_NAME[i] === ' ') out += ' ';
        else if (i < lockedCount) out += TARGET_NAME[i];
        else out += randomScrambleChar();
      }
      loaderNameEl.textContent = out;
    }

    var avatarIdx = 1;
    var avatarTimer = setInterval(function () {
      avatarIdx = (avatarIdx % AVATAR_POOL) + 1;
      loaderAvatarEl.src = 'assets/stories/' + avatarIdx + '.jpg';
    }, 120);

    var loaderStart = null;
    function loaderTick(ts) {
      if (!loaderStart) loaderStart = ts;
      var elapsed = ts - loaderStart;
      var progress = Math.min(elapsed / LOAD_DURATION, 1);
      loaderCountEl.textContent = Math.floor(progress * 100) + '%';
      renderScrambledName(progress);

      if (progress < 1) {
        requestAnimationFrame(loaderTick);
      } else {
        loaderNameEl.textContent = TARGET_NAME;
        loaderCountEl.textContent = '100%';
        clearInterval(avatarTimer);
        finishLoader();
      }
    }
    requestAnimationFrame(loaderTick);

    function finishLoader() {
      setTimeout(function () {
        loaderEl.classList.add('done');
        document.body.classList.add('revealed');
        setTimeout(function () {
          document.body.classList.remove('loading');
        }, 1000);
      }, 200);
    }
  }

  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var stored = localStorage.getItem('theme');

  var sunIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.673 2.06272C11.412 2.14272 11.14 2.42072 11.061 2.68972C10.974 2.98272 10.976 4.07472 11.064 4.33372C11.188 4.69672 11.613 4.99972 12 4.99972C12.402 4.99972 12.827 4.68772 12.939 4.30972C13.024 4.02572 13.024 2.97372 12.939 2.68972C12.8895 2.5436 12.807 2.41084 12.698 2.30176C12.5889 2.19267 12.4561 2.11019 12.31 2.06072C12.104 1.98689 11.8786 1.9876 11.673 2.06272ZM5.211 4.73972C4.824 4.93672 4.617 5.28972 4.65 5.69872C4.661 5.83272 4.701 6.00472 4.74 6.08072C4.779 6.15572 5.01 6.42072 5.252 6.66872C5.806 7.23572 5.985 7.33572 6.409 7.31372C6.652 7.30172 6.73 7.27872 6.879 7.17872C6.978 7.11172 7.112 6.97772 7.179 6.87872C7.279 6.72972 7.302 6.65172 7.314 6.40872C7.336 5.98472 7.236 5.80572 6.669 5.25172C6.421 5.00972 6.155 4.77872 6.079 4.73972C5.95186 4.68813 5.81702 4.65805 5.68 4.65072C5.458 4.63572 5.39 4.64872 5.211 4.73972ZM18.033 4.69572C17.834 4.76672 17.65 4.91872 17.197 5.38572C16.741 5.85572 16.663 6.01572 16.686 6.42772C16.705 6.75572 16.84 6.98972 17.121 7.17872C17.27 7.27872 17.348 7.30172 17.591 7.31372C18.015 7.33572 18.194 7.23572 18.748 6.66872C19.237 6.16772 19.317 6.04472 19.348 5.74472C19.3706 5.54346 19.3305 5.34014 19.2334 5.16245C19.1362 4.98476 18.9866 4.84134 18.805 4.75172C18.6872 4.68955 18.5577 4.65247 18.4249 4.64283C18.292 4.6332 18.1586 4.6512 18.033 4.69572ZM11.38 6.04272C9.082 6.26972 7.078 7.86272 6.329 10.0597C5.90897 11.3189 5.90897 12.6805 6.329 13.9397C6.919 15.6707 8.329 17.0807 10.06 17.6707C11.29 18.0907 12.71 18.0907 13.94 17.6707C15.671 17.0807 17.081 15.6707 17.671 13.9397C18.168 12.4827 18.068 10.7487 17.41 9.41972C17.1244 8.82037 16.7385 8.27419 16.269 7.80472C14.98 6.49072 13.23 5.85972 11.38 6.04272ZM12.773 8.08272C14.947 8.52572 16.355 10.6247 15.918 12.7717C15.734 13.6717 15.265 14.4717 14.584 15.0457C14.1025 15.4538 13.5311 15.742 12.9167 15.8867C12.3023 16.0314 11.6624 16.0284 11.0494 15.8781C10.4363 15.7277 9.86767 15.4342 9.38995 15.0217C8.91222 14.6092 8.53905 14.0893 8.301 13.5047C7.738 12.1447 7.991 10.5607 8.954 9.41572C9.41447 8.87393 10.0111 8.46478 10.6824 8.23046C11.3537 7.99615 12.0754 7.94514 12.773 8.08272ZM2.673 11.0627C2.31 11.1747 2 11.6057 2 11.9997C2 12.4047 2.309 12.8257 2.69 12.9387C2.974 13.0237 4.026 13.0237 4.31 12.9387C4.688 12.8267 5 12.4017 5 11.9997C5 11.5977 4.688 11.1727 4.31 11.0607C4.035 10.9787 2.941 10.9807 2.673 11.0627ZM19.673 11.0627C19.31 11.1747 19 11.6057 19 11.9997C19 12.4047 19.309 12.8257 19.69 12.9387C19.974 13.0237 21.026 13.0237 21.31 12.9387C21.688 12.8267 22 12.4017 22 11.9997C22 11.5977 21.688 11.1727 21.31 11.0607C21.035 10.9787 19.941 10.9807 19.673 11.0627ZM5.896 16.7777C5.666 16.8937 4.857 17.6927 4.74 17.9187C4.69026 18.0406 4.6599 18.1695 4.65 18.3007C4.617 18.7157 4.827 19.0697 5.223 19.2627C5.412 19.3557 5.478 19.3677 5.693 19.3507C5.831 19.3397 6.005 19.2987 6.081 19.2597C6.156 19.2207 6.421 18.9897 6.669 18.7477C7.236 18.1937 7.336 18.0147 7.314 17.5907C7.302 17.3477 7.279 17.2697 7.179 17.1207C7.09591 17.0051 6.99459 16.9038 6.879 16.8207C6.726 16.7177 6.656 16.6977 6.4 16.6877C6.142 16.6767 6.072 16.6887 5.896 16.7777ZM17.219 16.7637C16.854 16.9567 16.68 17.2417 16.68 17.6467C16.68 18.0307 16.793 18.2217 17.332 18.7487C17.832 19.2367 17.955 19.3167 18.255 19.3477C18.675 19.3907 19.048 19.1857 19.252 18.7987C19.354 18.6057 19.366 18.5487 19.35 18.3197C19.3419 18.1827 19.3115 18.0479 19.26 17.9207C19.142 17.6917 18.335 16.8937 18.106 16.7807C17.84 16.6477 17.454 16.6407 17.219 16.7637ZM11.673 19.0627C11.412 19.1427 11.14 19.4207 11.061 19.6897C10.974 19.9827 10.976 21.0747 11.064 21.3337C11.188 21.6967 11.613 21.9997 12 21.9997C12.402 21.9997 12.827 21.6877 12.939 21.3097C13.024 21.0257 13.024 19.9737 12.939 19.6897C12.8895 19.5436 12.807 19.4108 12.698 19.3018C12.5889 19.1927 12.4561 19.1102 12.31 19.0607C12.104 18.9869 11.8786 18.9876 11.673 19.0627Z" fill="currentColor"/></svg>';
  var moonIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.1214 3.15742C12.9304 3.21642 12.7724 3.31742 12.6424 3.46542C12.3434 3.80642 12.3204 4.15042 12.5584 4.74642C13.0016 5.83856 13.1131 7.03707 12.879 8.19221C12.6449 9.34735 12.0756 10.4079 11.2422 11.2414C10.4089 12.0748 9.3484 12.6443 8.19329 12.8785C7.03818 13.1127 5.83965 13.0014 4.74745 12.5584C4.17045 12.3274 3.81045 12.3484 3.47945 12.6314C3.12745 12.9324 3.06645 13.2394 3.21945 13.9404C3.46003 14.9991 3.88374 16.0076 4.47145 16.9204C5.90045 19.0934 8.11045 20.5014 10.7274 20.9064C11.3534 21.0034 12.6474 21.0034 13.2814 20.9064C15.2414 20.6064 16.9904 19.7294 18.3604 18.3594C19.9253 16.7914 20.8573 14.7015 20.9781 12.4895C21.099 10.2775 20.4002 8.09858 19.0154 6.36942C17.7474 4.78942 15.9014 3.64142 13.9524 3.22142C13.4704 3.11742 13.2964 3.10442 13.1214 3.15742ZM15.2125 5.78542C16.0347 6.20699 16.7632 6.79033 17.3545 7.50042C18.1336 8.42347 18.6596 9.53307 18.881 10.7205C19.1024 11.908 19.0116 13.1326 18.6174 14.2744C18.0206 16.0084 16.7671 17.439 15.1264 18.2584C12.0434 19.8014 8.30945 18.8664 6.29345 16.0484C6.05245 15.7114 5.61645 14.9324 5.64945 14.8984C5.73472 14.8945 5.82012 14.9019 5.90345 14.9204C6.34345 14.9924 7.16745 15.0124 7.68145 14.9634C8.66206 14.8819 9.61864 14.617 10.5014 14.1824C13.4464 12.7444 15.2294 9.64342 14.9694 6.41342C14.9546 6.18483 14.9303 5.95697 14.8965 5.73042C14.8835 5.68042 14.8834 5.64042 14.8974 5.64042C14.9114 5.64042 15.0535 5.70542 15.2125 5.78542Z" fill="currentColor"/></svg>';

  function iconFor(theme) {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = theme || (prefersDark ? 'dark' : 'light');
    return current === 'dark' ? sunIcon : moonIcon;
  }

  if (stored) root.setAttribute('data-theme', stored);
  toggle.innerHTML = iconFor(stored);

  toggle.addEventListener('click', function () {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.innerHTML = iconFor(next);
  });

  var timeEl = document.getElementById('localTime');
  if (timeEl) {
    var fmt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Lagos'
    });
    function tick() { timeEl.textContent = fmt.format(new Date()); }
    tick();
    setInterval(tick, 30000);
  }

  var stripEl = document.getElementById('aboutStrip');
  if (stripEl) {
    for (var s = 1; s <= 10; s++) {
      var img = document.createElement('img');
      img.src = 'assets/stories/' + s + '.jpg';
      img.alt = '';
      img.loading = 'lazy';
      img.onerror = function () { this.remove(); };
      stripEl.appendChild(img);
    }
  }

  var tocEl = document.getElementById('caseToc');
  if (tocEl) {
    var sections = Array.from(document.querySelectorAll('.case-section'));
    var links = sections.map(function (sec, i) {
      var label = sec.querySelector('.section-label');
      if (!label) return null;
      sec.id = sec.id || 'section-' + i;
      var a = document.createElement('a');
      a.href = '#' + sec.id;
      a.textContent = label.textContent;
      tocEl.appendChild(a);
      return { a: a, sec: sec };
    }).filter(Boolean);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links.find(function (l) { return l.sec === entry.target; });
        if (!link || !entry.isIntersecting) return;
        links.forEach(function (l) { l.a.classList.remove('active'); });
        link.a.classList.add('active');
      });
    }, { rootMargin: '-15% 0px -70% 0px' });

    links.forEach(function (l) { observer.observe(l.sec); });
  }

  var avatarBtn = document.getElementById('avatarBtn');
  var viewer = document.getElementById('storyViewer');
  if (avatarBtn && viewer) {
    var progressEl = document.getElementById('storyProgress');
    var imageEl = document.getElementById('storyImage');
    var closeBtn = document.getElementById('storyClose');
    var prevZone = document.getElementById('storyPrev');
    var nextZone = document.getElementById('storyNext');

    var stories = [];
    var current = 0;
    var advanceTimer = null;
    var slideStartTime = 0;
    var remainingMs = 0;
    var SLIDE_MS = 4000;

    function checkImage(src) {
      return fetch(src, { method: 'HEAD' })
        .then(function (res) { return res.ok ? src : null; })
        .catch(function () { return null; });
    }

    function detectStories() {
      var exts = ['jpg', 'jpeg', 'png', 'webp'];
      var i = 1;
      function tryIndex() {
        return Promise.all(exts.map(function (ext) {
          return checkImage('assets/stories/' + i + '.' + ext);
        })).then(function (results) {
          var found = results.filter(Boolean)[0];
          if (found) {
            stories.push(found);
            i++;
            if (i <= 150) return tryIndex();
          }
        });
      }
      return tryIndex();
    }

    detectStories().then(function () {
      if (stories.length > 0) {
        avatarBtn.classList.add('has-story');
        avatarBtn.addEventListener('click', openViewer);
      }
    });

    function buildProgress() {
      progressEl.innerHTML = '';
      stories.forEach(function () {
        var bar = document.createElement('div');
        bar.className = 'bar';
        var fill = document.createElement('span');
        fill.className = 'bar-fill';
        bar.appendChild(fill);
        progressEl.appendChild(bar);
      });
    }

    function setBarStates() {
      var bars = progressEl.querySelectorAll('.bar');
      bars.forEach(function (bar, idx) {
        bar.classList.remove('active', 'done', 'paused');
        if (idx < current) bar.classList.add('done');
        if (idx === current) bar.classList.add('active');
      });
    }

    function showSlide(idx) {
      current = idx;
      clearTimeout(advanceTimer);
      imageEl.onload = imageEl.onerror = null;

      function begin() {
        imageEl.onload = imageEl.onerror = null;
        setBarStates();
        remainingMs = SLIDE_MS;
        startTimer();
      }

      if (imageEl.src.endsWith(stories[current]) && imageEl.complete && imageEl.naturalWidth > 0) {
        begin();
      } else {
        imageEl.onload = begin;
        imageEl.onerror = begin;
        imageEl.src = stories[current];
      }

      if (stories[current + 1]) {
        var pre = new Image();
        pre.src = stories[current + 1];
      }
    }

    function startTimer() {
      clearTimeout(advanceTimer);
      slideStartTime = Date.now();
      advanceTimer = setTimeout(next, remainingMs);
    }

    function pauseTimer() {
      clearTimeout(advanceTimer);
      remainingMs -= (Date.now() - slideStartTime);
      if (remainingMs < 0) remainingMs = 0;
      var fill = progressEl.querySelector('.bar.active .bar-fill');
      if (fill) fill.style.animationPlayState = 'paused';
    }

    function resumeTimer() {
      slideStartTime = Date.now();
      advanceTimer = setTimeout(next, remainingMs);
      var fill = progressEl.querySelector('.bar.active .bar-fill');
      if (fill) fill.style.animationPlayState = 'running';
    }

    function next() {
      if (current < stories.length - 1) showSlide(current + 1);
      else closeViewer();
    }

    function prev() {
      showSlide(current > 0 ? current - 1 : 0);
    }

    function openViewer() {
      viewer.hidden = false;
      buildProgress();
      showSlide(0);
      document.addEventListener('keydown', onKeydown);
    }

    function closeViewer() {
      viewer.hidden = true;
      clearTimeout(advanceTimer);
      imageEl.src = '';
      document.removeEventListener('keydown', onKeydown);
    }

    function onKeydown(e) {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }

    closeBtn.addEventListener('click', closeViewer);
    prevZone.addEventListener('click', prev);
    nextZone.addEventListener('click', next);

    [prevZone, nextZone, imageEl].forEach(function (el) {
      el.addEventListener('pointerdown', pauseTimer);
      el.addEventListener('pointerup', resumeTimer);
      el.addEventListener('pointerleave', resumeTimer);
    });
  }
})();
