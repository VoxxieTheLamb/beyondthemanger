document.addEventListener('DOMContentLoaded', () => {
    //#region Config and stuff
    const CONFIG = {
        classOfficers: {
            "tridanio": "Vice President",
            "tan": "Class President",
            "uba": "Secretary",
            "tulaylay": "Vice Secretary",
            "ibarra": "Treasurer",
            "abrena": "Auditor",
            "angeles": "Presidential Advisor",
            "san agustin": "Class Director"
        },
        factionMap: {
            batumbakal: ['arles', 'amadora', 'tan', 'mantal'],
            artists: ['ibarra', 'tulaylay', 'uba', 'angeles', 'dela cruz'],
            media: ['del rosario', 'barcenas', 'abrena', 'pagarigan', 'tesoro', 'pinpin'],
            security: ['operana', 'operaña', 'sevilla', 'san andres', 'gapasin'],
            fans: ['clariza', 'de guzman', 'mallari', 'olores', 'san agustin', 'suzon', 'tridanio']
        },
        factionLabels: {
            batumbakal: 'Batumbakal & Friends',
            artists: 'Celebrity Artists',
            media: 'Vloggers & Hosts',
            security: 'Security & Police',
            fans: 'Fans Club'
        },
        playRoster: {
            "abrena": { character: "Cosmos Baterbonia (Vlogger 3)", team: "Research Team", displayTeam: "Research Head", bio: "Vlogger 3: Cosmos Baterbonia !  Energetic vlogger showcasing the Burj Khalifa. Also serves as Research Head." },
            "amadora": { character: "Mics Baterbonia Batumbakal (Father of Jenn)", team: "Tech Team", displayTeam: "Asst. Tech Head / Editor", bio: "Plays Mics Baterbonia Batumbakal, Jenn's warm and calm father. Also serves as Asst. Tech Head, Editor, and Documentation." },
            "angeles": { character: "Nakano Hazumake (Artist 4 - Manga Artist)", team: "Tech Team", displayTeam: "Asst. Choreographer / Asst. Tech", bio: "Plays Nakano Hazumake, an incredibly chill manga artist from Japan. Also serves as Asst. Head Choreographer & Asst. Tech Head." },
            "barcenas": { character: "Lloyd Barell (Vlogger 2)", team: "Shadow Team", displayTeam: "Shadow Head", bio: "Plays Lloyd Barell (Vlogger 2). Also part of the Shadow Head team." },
            "dela cruz": { character: "Kei Boberx/Bobby Kiefer (Artist 5 - Chess Grandmaster)", team: "Tech Team", displayTeam: "Asst. Tech Head / Editor", bio: "Plays Kei Boberx, an energetic 2823-rated Chess Grandmaster. Also serves as Asst. Tech Head, Editor, and Documentation." },
            "gapasin": { character: "Theo (Police Officer 2)", team: "Directors", displayTeam: "Head Choreographer", bio: "Plays Police Officer Theo. Also serves as Head Choreographer." },
            "ibarra": { character: "Zach Xander (Artist 1 - Cuber)", team: "Directors", displayTeam: "Asst. Director / Shadow Head", bio: "Plays Zach Xander, a fun and energetic Rubik's cube performer from Canada. Also serves as Asst. Director & Shadow Head." },
            "operaña": { character: "Bobby Dridger (Security Guard 1)", team: "Tech Team", displayTeam: "Tech Head", bio: "Plays Security Guard Bobby Dridger. Also serves as Tech Head and Documentation." },
            "operana": { character: "Bobby Dridger (Security Guard 1)", team: "Tech Team", displayTeam: "Tech Head", bio: "Plays Security Guard Bobby Dridger. Also serves as Tech Head and Documentation." },
            "pagarigan": { character: "Kyle Tucker (Vlogger 4)", team: "Shadow Team", displayTeam: "Shadow Head", bio: "Plays Kyle Tucker (Vlogger 4), an energetic explorer and live vlogger. Also part of the Shadow Head team." },
            "san andres": { character: "Ryo (Police Officer 1)", team: "Shadow Team", displayTeam: "Shadow Head", bio: "Plays Police Officer Ryo. Also part of the Shadow Head team." },
            "sevilla": { character: "Vollow (Security Guard 2)", team: "Shadow Team", displayTeam: "Shadow Head", bio: "Plays Security Guard Vollow, quiet and serious about his work. Also part of the Shadow Head team." },
            "arles": { character: "Jenn V. Batumbakal (Lead)", team: "Costume Team", displayTeam: "Costume Head", bio: "Plays Jenn V. Batumbakal, a middle-class Christian teen. Also serves as Costume Head." },
            "clariza": { character: "Fans Club (Ensemble)", team: "Script Team", displayTeam: "Asst. Script Head", bio: "Part of the Fans Club ensemble and serves as Asst. Script Head." },
            "de guzman": { character: "Fans Club (Ensemble)", team: "Costume Team", displayTeam: "Costume Head", bio: "Part of the Fans Club ensemble and serves as Costume Head." },
            "del rosario": { character: "Hazel Sallow (Vlogger 1 - Mukbanger)", team: "Props Team", displayTeam: "Prop Head", bio: "Plays Hazel Sallow (Vlogger 1), famous for her mukbang videos. Also serves as Prop Head." },
            "mallari": { character: "Fans Club (Ensemble)", team: "Props Team", displayTeam: "Prop Head", bio: "Part of the Fans Club ensemble and serves as Prop Head." },
            "mantal": { character: "Scarlet Hernandez", team: "Research Team", displayTeam: "Research Head", bio: "Plays Scarlet Hernandez, a wealthy, spoiled, and expressive friend of Jenn. Also serves as Research Head." },
            "olores": { character: "Fans Club (Ensemble)", team: "Props Team", displayTeam: "Prop Head", bio: "Part of the Fans Club ensemble and serves as Prop Head." },
            "pinpin": { character: "Ace Rosehearts (Host 2)", team: "Research Team", displayTeam: "Research Head", bio: "Plays Ace Rosehearts, the energetic and humorous co-host of the Burj Khalifa Christmas Meet & Greet. Also serves as Research Head." },
            "san agustin": { character: "Fans Club (Ensemble)", team: "Directors", displayTeam: "Director", bio: "Serves as the Play Director and performs in the Fans Club ensemble." },
            "suzon": { character: "Fans Club (Ensemble)", team: "Props Team", displayTeam: "Prop Head", bio: "Part of the Fans Club ensemble and serves as Prop Head." },
            "tan": { character: "Jolianne Vinuya Batumbakal (Mother of Jenn)", team: "Directors", displayTeam: "Stage / Floor Director", bio: "Plays Jolianne Vinuya Batumbakal, Jenn's kind and loving mother. Also serves as Stage/Floor Director." },
            "tesoro": { character: "Lydia Phileo (Host 1)", team: "Props Team", displayTeam: "Prop Head", bio: "Plays Lydia Phileo, the kind and energetic main host of the event. Also serves as Prop Head." },
            "tridanio": { character: "Fans Club (Ensemble)", team: "Script Team", displayTeam: "Script Head", bio: "Serves as Script Head and performs in the Fans Club ensemble." },
            "tulaylay": { character: "Ella Brooks (Artist 2 - Actress)", team: "Directors", displayTeam: "Stage / Floor Director", bio: "Plays Ella Brooks, a rising actress from London visiting Dubai for a meet-and-greet. Also serves as Stage/Floor Director." },
            "uba": { character: "Virelle Valdez (Artist 3)", team: "Tech Team", displayTeam: "Head Lighting", bio: "Plays Virelle Valdez, an outspoken and composed artist. Also serves as Head Lighting." },
            "eulogio": { character: "", team: "Directors", displayTeam: "Class Adviser / Co-Director", bio: "Grade 7 – Psalms Class Adviser and Co-Director for Beyond The Manger." }
        },
        milestones: [
            { date: '2026-11-03', shortDate: 'Nov 3', title: 'Kickoff & Casting', pos: 'bottom', detail: 'Nov 3, 2026 !  Official kickoff, theme selection ("Jesus Christ, Our Cornerstone"), and initial cast & crew assignments.' },
            { date: '2026-11-09', shortDate: 'Nov 9', title: 'Script & Blocking', pos: 'top', detail: 'Nov 9, 2026 !  Full Taglish script table read, Burj Khalifa lockdown pacing, and stage entrance blocking.' },
            { date: '2026-11-14', shortDate: 'Nov 14', title: 'Dances & Positions', pos: 'bottom', detail: 'Nov 14, 2026 !  Finalizing choreography, stage positions, voice line edits, and launching this digital showcase.' },
            { date: '2026-11-17', shortDate: 'Nov 17', title: 'Costume & Shoot', pos: 'top', detail: 'Nov 17, 2026 !  Official cast costume photoshoot and behind-the-scenes trailer filming.' },
            { date: '2026-11-26', shortDate: 'Nov 26', title: 'Poster & Trailer', pos: 'bottom', detail: 'Nov 26, 2026 !  Official promotional poster reveal and teaser trailer launch for Paskong AFCS 2026.' },
            { date: '2026-12-15', shortDate: 'Dec 15', title: 'Faculty Presentation', pos: 'top', detail: 'Dec 15, 2026 !  Faculty presentation for Paskong AFCS 2026.' },
            { date: '2026-12-17', shortDate: 'Dec 17', title: 'Presentation!', pos: 'top', detail: 'Dec 17, 2026 !  Live stage premiere at the AFCS Covered Court Stage for Paskong AFCS 2026!' }
        ],
        venueFacts: [
            'Burj Khalifa, Dubai, UAE',
            '828 meters (2,717 ft) tall',
            'Inspired by the Spider Lily',
            'Buttressed-Core Y-Floor Plan',
            'Opened January 4, 2010',
            '330,000 m³ of concrete used'
        ],
        scriptures: [
            {
                ref: 'Ephesians 2:20 (NIV)',
                tag: 'Our Cornerstone',
                text: '“Built on the foundation of the apostles and prophets, with Christ Jesus himself as the chief cornerstone.”'
            },
            {
                ref: '1 Peter 2:6 (NIV)',
                tag: 'Unshakable Foundation',
                text: '“See, I lay a stone in Zion, a chosen and precious cornerstone, and the one who trusts in him will never be put to shame.”'
            },
            {
                ref: 'Luke 2:10–11 (NIV)',
                tag: 'Beyond The Manger',
                text: '“Do not be afraid. I bring you good news that will cause great joy for all the people. Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.”'
            },
            {
                ref: 'Hebrews 11:1 (NIV)',
                tag: 'When Faith Becomes the Key',
                text: '“Now faith is confidence in what we hope for and assurance about what we do not see.”'
            },
            {
                ref: 'John 1:14 (NIV)',
                tag: 'Word Made Flesh',
                text: '“The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.”'
            },
            {
                ref: 'Psalm 118:22–23 (NIV)',
                tag: 'Grade 7 – Psalms',
                text: '“The stone the builders rejected has become the cornerstone; the Lord has done this, and it is marvelous in our eyes.”'
            },
            {
                ref: '1 Corinthians 3:11 (NIV)',
                tag: 'The Only Foundation',
                text: '“For no one can lay any foundation other than the one already laid, which is Jesus Christ.”'
            },
            {
                ref: 'Matthew 7:24–25 (NIV)',
                tag: 'Built on the Rock',
                text: '“Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock. The rain came down, the streams rose, and the winds blew and beat against that house; yet it did not fall, because it had its foundation on the rock.”'
            },
            {
                ref: 'Isaiah 28:16 (NIV)',
                tag: 'A Tested Stone',
                text: '“So this is what the Sovereign Lord says: ‘See, I lay a stone in Zion, a tested stone, a precious cornerstone for a sure foundation; the one who relies on it will never be stricken with panic.’”'
            },
            {
                ref: 'Proverbs 3:5–6 (NIV)',
                tag: 'Trust & Guidance',
                text: '“Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.”'
            },
            {
                ref: 'Jeremiah 29:11 (NIV)',
                tag: 'Hope and a Future',
                text: '“‘For I know the plans I have for you,’ declares the Lord, ‘plans to prosper you and not to harm you, plans to give you hope and a future.’”'
            },
            {
                ref: 'Philippians 4:13 (NIV)',
                tag: 'Strength in Christ',
                text: '“I can do all this through him who gives me strength.”'
            },
            {
                ref: 'Joshua 1:9 (NIV)',
                tag: 'Strong and Courageous',
                text: '“Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.”'
            },
            {
                ref: 'Romans 15:13 (NIV)',
                tag: 'Overflowing Hope',
                text: '“May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.”'
            },
            {
                ref: 'Psalm 46:1 (NIV)',
                tag: 'Ever-Present Help',
                text: '“God is our refuge and strength, an ever-present help in trouble.”'
            },
            {
                ref: '2 Corinthians 5:7 (NIV)',
                tag: 'Walk by Faith',
                text: '“For we live by faith, not by sight.”'
            },
            {
                ref: 'Colossians 2:6–7 (NIV)',
                tag: 'Rooted and Built Up',
                text: '“So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.”'
            },
            {
                ref: 'John 14:6 (NIV)',
                tag: 'The Way, Truth, and Life',
                text: '“Jesus answered, ‘I am the way and the truth and the life. No one comes to the Father except through me.’”'
            },
            {
                ref: 'Romans 8:28 (NIV)',
                tag: 'All Things for Good',
                text: '“And we know that in all things God works for the good of those who love him, who have been called according to his purpose.”'
            },
            {
                ref: 'Isaiah 41:10 (NIV)',
                tag: 'Do Not Fear',
                text: '“So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.”'
            },
            {
                ref: 'Psalm 119:105 (NIV)',
                tag: 'Light for My Path',
                text: '“Your word is a lamp for my feet, a light on my path.”'
            }
        ],
        faqs: [
            {
                q: "When and where is the live performance?",
                a: "The live stage premiere is on December 17, 2026 at the AFCS Stage in the Covered Court."
            },
            {
                q: "What is the play about?",
                a: "At a meet and greet, something happens that shifts someone's worldview..."
            },
            {
                q: "What language is the play performed in?",
                a: "Beyond The Manger is a 6-part Taglish stage play blending action-thriller mystery with drama."
            },
            {
                q: "Who is presenting this production?",
                a: "Presented by Grade 7 – Psalms (S.Y. 2026–2027) of Antipolo Faith Christian School Inc. for Paskong AFCS 2026."
            },
            {
                q: "How did you make this?",
                a: "I created the baseline and the functions, and used Artificial Intelligence to sharpen my work."
            },
            {
                q: "Is there a price for attending?",
                a: "Currently, no, there is not a price for the Show. We will keep you informed."
            },
            {
                q: "What time is the performance?",
                a: "At 6pm on December 17."
            },
            {
                q: "Where can I request features?",
                a: "Request your features below."
            }
        ],
        web3formsKey: "e5782444-af9b-4d75-818a-d50163048ed9"
    };
    function navBarThing() {
        const layout = document.querySelector('.main-content-layout') || document.body;
        if (!layout) return;
        
        const nav = document.createElement('nav');
        nav.className = 'site-navbar';
        nav.innerHTML = [
            '<div class="nav-brand-wrap">',
            '<img class="nav-logo" src="mainPics/AFCS.jpg" alt="AFCS Logo" onerror="this.style.display=\'none\'">',
            '<div class="nav-brand">',
            '<span class="nav-school-title">Antipolo Faith Christian School</span>',
            '<span class="nav-school-motto">CALLED FOR A PURPOSE • GRADE 7 PSALMS</span>',
            '</div>',
            '</div>',
            '<div class="nav-links">',
            '<button type="button" class="nav-link-btn" data-target="trailer">Trailer &amp; Poster</button>',
            '<button type="button" class="nav-link-btn" data-target="about">About the Play</button>',
            '<button type="button" class="nav-link-btn" data-target="roadmap">Roadmap</button>',
            '<button type="button" class="nav-link-btn" data-target="cast">Cast &amp; Crew</button>',
            '</div>',
            '<button type="button" class="nav-cta-btn" id="navPlaybillBtn"> Playbill →</button>'
        ].join('');
        
        layout.prepend(nav);
        
        nav.querySelectorAll('.nav-link-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                if (target === 'trailer') document.querySelector('.video')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                else if (target === 'about') document.querySelector('.synopsis-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                else if (target === 'roadmap') document.querySelector('.timeline-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                else if (target === 'cast') document.querySelector('.filter-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                playBeep(580, 0.05, 'sine', 0.03);
            });
        });
        
        const playbillTrigger = nav.querySelector('#navPlaybillBtn');
        if (playbillTrigger) {
            playbillTrigger.addEventListener('click', () => {
                document.getElementById('openPlaybillBtn')?.click();
            });
        }
    }
    function startPraiseBGM() {
        const praiseAudio = new Audio('Praise.mp3');
        praiseAudio.loop = true;
        
        function syncMusicVolume() {
            const effectiveVol = (STATE.masterMuted || STATE.musicMuted)
            ? 0
            : Math.max(0, Math.min(1, STATE.masterVol * STATE.musicVol));
            praiseAudio.volume = effectiveVol;
            praiseAudio.muted = effectiveVol === 0;
            
            if (effectiveVol > 0 && praiseAudio.paused) {
                praiseAudio.play().catch(() => {});
            }
        }
        
        function tryPlayPraise() {
            if (STATE.masterMuted || STATE.musicMuted || STATE.masterVol === 0 || STATE.musicVol === 0) return;
            praiseAudio.play().then(() => {
                window.removeEventListener('pointerdown', tryPlayPraise);
                window.removeEventListener('keydown', tryPlayPraise);
            }).catch(() => {});
        }
        
        syncMusicVolume();
        window.syncPraiseAudio = syncMusicVolume;
        
        tryPlayPraise();
        window.addEventListener('pointerdown', tryPlayPraise);
        window.addEventListener('keydown', tryPlayPraise);
    }
    //#endregion 
    //#region Core stuff
    const STATE = {
        masterMuted: localStorage.getItem('afcsMasterMuted') === 'true',
        musicMuted: localStorage.getItem('afcsMusicMuted') === 'true',
        sfxMuted: localStorage.getItem('afcsSfxMuted') === 'true',
        masterVol: parseFloat(localStorage.getItem('afcsMasterVol') ?? '0.8'),
        musicVol: parseFloat(localStorage.getItem('afcsMusicVol') ?? '0.15'),
        sfxVol: parseFloat(localStorage.getItem('afcsSfxVol') ?? '0.7'),
        activeRole: 'all',
        activeFaction: null,
        particles: [],
        onOpenCard: [],
        onClosePanel: [],
        onFilterCards: [],
        onSearchInput: [],
        ldmActive: localStorage.getItem('afcs_ldm') === 'true'
    };
    // states
    const DOM = {
        container: document.querySelector('.People'), // people
        panel: document.getElementById('sidePanel'), // panel
        overlay: document.getElementById('panelOverlay'), // how the panel is shown
        panelImageContainer: document.getElementById('panelImageContainer'), // the image inside
        panelBody: document.getElementById('panelBody'), // the body itself
        closeBtn: document.querySelector('.close-btn'), // the X button
        prevCardBtn: document.getElementById('prevCardBtn'), // last person
        nextCardBtn: document.getElementById('nextCardBtn'), // next person
        searchInput: document.getElementById('searchInput'), // search pill
        clearBtn: document.getElementById('clearSearch'), // clearer
        matchCountEl: document.getElementById('matchCount'), //matching type (They have a match I dont )
        verity: document.getElementById('verity'), // HEY ITS ME ITS VERITY
        filterBtns: document.querySelectorAll('.filter-btn[data-filter]'), // the filter buttons and stuff
        factionBtns: document.querySelectorAll('.faction-btn[data-faction]') // the teams and stf
    }; // Dom from Church??
    function getCards() {
        return Array.from(document.querySelectorAll('.PeoplePics'));
    } // all it does it GET the CARDS and stf
    function getVisibleCards() {
        return getCards().filter(card => !card.classList.contains('is-filtered-out'));
    } // the same but ONLY visible
    function spawnBurst(x, y, colors, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.5 + Math.random() * 5;
            STATE.particles.push({
                type: 'FRAGMENT',
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2.5 + Math.random() * 3.5,
                alpha: 1.0,
                decay: 0.02 + Math.random() * 0.015,
                color: colors[i % colors.length]
            });
        }
    } // mouse click
    function updateSplitGridLayout() {
        const dock = document.body.dataset.panelDock;
        const wrappers = Array.from(document.querySelectorAll('.People > .PersonWrapper'));
        if (!wrappers.length) return;
        
        if (!document.body.classList.contains('panel-is-open') || (dock !== 'center' && dock !== 'bottom') || window.innerWidth <= 768) {
            document.body.classList.remove('has-custom-drop');
            document.documentElement.style.removeProperty('--split-cols');
            document.documentElement.style.removeProperty('--split-gap');
            document.documentElement.style.removeProperty('--drop-grid-template');
            wrappers.forEach(w => { w.style.gridColumn = ''; });
            return;
        }
        
        if (dock === 'center' && DOM.panel && DOM.panel.classList.contains('is-custom-pos')) {
            const rect = DOM.panel.getBoundingClientRect();
            const pad = 20;
            const leftSpace = Math.max(0, rect.left - pad);
            const rightSpace = Math.max(0, window.innerWidth - rect.right - pad);
            const minColWidth = 135;
            
            const leftCols = Math.floor(leftSpace / minColWidth);
            const rightCols = Math.floor(rightSpace / minColWidth);
            
            if (leftCols === 0 && rightCols === 0) {
                document.body.classList.remove('has-custom-drop');
                wrappers.forEach(w => { w.style.gridColumn = ''; });
                return;
            }
            
            const gapWidth = Math.round(rect.width + 32);
            const leftPart = leftCols > 0 ? `repeat(${leftCols}, minmax(115px, 1fr)) ` : '';
            const rightPart = rightCols > 0 ? ` repeat(${rightCols}, minmax(115px, 1fr))` : '';
            const template = `${leftPart}${gapWidth}px${rightPart}`.trim();
            
            document.body.classList.add('has-custom-drop');
            document.documentElement.style.setProperty('--drop-grid-template', template);
            
            const totalPerRow = leftCols + rightCols;
            const gapColIndex = leftCols + 1;
            
            wrappers.forEach((w, idx) => {
                const posInRow = idx % totalPerRow;
                const col = posInRow < leftCols ? posInRow + 1 : posInRow + 2;
                w.style.gridColumn = String(col === gapColIndex ? col + 1 : col);
            });
            return;
        }
        
        document.body.classList.remove('has-custom-drop');
        document.documentElement.style.removeProperty('--drop-grid-template');
        
        const panelWidth = dock === 'bottom'
        ? Math.min(560, window.innerWidth - 24)
        : Math.min(520, window.innerWidth - 28);
        const gapWidth = panelWidth + 36;
        const availableSideSpace = Math.max(260, window.innerWidth - gapWidth - 48);
        const colsPerSide = Math.max(1, Math.min(4, Math.floor(availableSideSpace / 2 / 145)));
        const totalPerRow = colsPerSide * 2;
        
        document.documentElement.style.setProperty('--split-cols', String(colsPerSide));
        document.documentElement.style.setProperty('--split-gap', `${gapWidth}px`);
        
        wrappers.forEach((w, idx) => {
            const posInRow = idx % totalPerRow;
            const col = posInRow < colsPerSide ? posInRow + 1 : posInRow + 2;
            w.style.gridColumn = String(col);
        });
    }
    function startDynamicTabPanel() {
        if (!DOM.panel) return;
        
        const snapPreview = document.createElement('div');
        snapPreview.className = 'dock-snap-preview';
        snapPreview.innerHTML = '<span class="dock-snap-label" id="dockSnapLabel">Hold 2s to Dock</span><div class="dock-snap-fill"></div>';
        document.body.appendChild(snapPreview);
        const snapLabelEl = snapPreview.querySelector('#dockSnapLabel');
        
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let hoveredEdge = null;
        let edgeHoldTimer = null;
        let edgeLocked = false;
        
        function clearInlineGeometry() {
            DOM.panel.classList.remove('is-custom-pos', 'is-dragging');
            DOM.panel.style.left = '';
            DOM.panel.style.top = '';
            DOM.panel.style.right = '';
            DOM.panel.style.bottom = '';
            DOM.panel.style.width = '';
            DOM.panel.style.height = '';
        }
        
        function resetEdgeHold() {
            clearTimeout(edgeHoldTimer);
            edgeHoldTimer = null;
            hoveredEdge = null;
            edgeLocked = false;
            snapPreview.classList.remove('is-visible', 'is-charging', 'is-ready');
            delete snapPreview.dataset.edge;
        }
        
        function commitEdgeDock(edge) {
            isDragging = false;
            resetEdgeHold();
            clearInlineGeometry();
            DOM.panel.dataset.dock = edge;
            document.body.dataset.panelDock = edge;
            updateSplitGridLayout();
            playBeep(587.33, 0.08, 'triangle', 0.045);
            setTimeout(() => playBeep(880.00, 0.12, 'triangle', 0.045), 75);
        }
        
        function updateEdgeHover(clientX, clientY) {
            const threshold = 48;
            let detected = null;
            
            if (clientX <= threshold) detected = 'left';
            else if (clientX >= window.innerWidth - threshold) detected = 'right';
            else if (clientY >= window.innerHeight - threshold) detected = 'bottom';
            
            if (!detected) {
                if (hoveredEdge) resetEdgeHold();
                return;
            }
            
            if (detected === hoveredEdge) return;
            
            resetEdgeHold();
            hoveredEdge = detected;
            snapPreview.dataset.edge = detected;
            snapLabelEl.textContent = `Hold 2s to Snap ${detected.toUpperCase()}...`;
            snapPreview.classList.add('is-visible');
            void snapPreview.offsetWidth;
            snapPreview.classList.add('is-charging');
            
            playBeep(440, 0.05, 'sine', 0.03);
            
            edgeHoldTimer = setTimeout(() => {
                if (!isDragging || hoveredEdge !== detected) return;
                edgeLocked = true;
                snapPreview.classList.add('is-ready');
                snapLabelEl.textContent = `✓ Snapping ${detected.toUpperCase()}!`;
                commitEdgeDock(detected);
            }, 2000);
        }
        
        STATE.onClosePanel.push(() => {
            resetEdgeHold();
            clearInlineGeometry();
        });
        
        DOM.panel.addEventListener('pointerdown', (e) => {
            if (window.innerWidth <= 768) return;
            if (e.target.closest('button, a, input, textarea, img, .connection-pill, .cyn-voice-caption')) return;
            
            const rect = DOM.panel.getBoundingClientRect();
            const floatWidth = Math.min(520, window.innerWidth - 28);
            const floatHeight = Math.min(rect.height, window.innerHeight * 0.84);
            
            isDragging = true;
            offsetX = Math.min(floatWidth - 40, Math.max(40, e.clientX - rect.left));
            offsetY = Math.min(60, Math.max(16, e.clientY - rect.top));
            
            DOM.panel.dataset.dock = 'center';
            document.body.dataset.panelDock = 'center';
            DOM.panel.classList.add('is-dragging', 'is-custom-pos');
            DOM.panel.style.left = `${Math.max(8, Math.min(window.innerWidth - floatWidth - 8, e.clientX - offsetX))}px`;
            DOM.panel.style.top = `${Math.max(8, Math.min(window.innerHeight - floatHeight - 8, e.clientY - offsetY))}px`;
            DOM.panel.style.right = 'auto';
            DOM.panel.style.bottom = 'auto';
            DOM.panel.style.width = `${floatWidth}px`;
            DOM.panel.style.height = `${floatHeight}px`;
            
            DOM.panel.setPointerCapture(e.pointerId);
            updateSplitGridLayout();
        });
        
        DOM.panel.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const maxLeft = Math.max(8, window.innerWidth - DOM.panel.offsetWidth - 8);
            const maxTop = Math.max(8, window.innerHeight - DOM.panel.offsetHeight - 8);
            const nextLeft = Math.max(8, Math.min(maxLeft, e.clientX - offsetX));
            const nextTop = Math.max(8, Math.min(maxTop, e.clientY - offsetY));
            
            DOM.panel.style.left = `${nextLeft}px`;
            DOM.panel.style.top = `${nextTop}px`;
            
            updateEdgeHover(e.clientX, e.clientY);
        });
        
        function finishDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            DOM.panel.classList.remove('is-dragging');
            if (e && e.pointerId !== undefined && DOM.panel.hasPointerCapture(e.pointerId)) {
                DOM.panel.releasePointerCapture(e.pointerId);
            }
            
            if (edgeLocked && hoveredEdge) {
                commitEdgeDock(hoveredEdge);
                return;
            }
            
            resetEdgeHold();
            updateSplitGridLayout();
            playBeep(520, 0.05, 'sine', 0.03);
        }
        
        DOM.panel.addEventListener('pointerup', finishDrag);
        DOM.panel.addEventListener('pointercancel', finishDrag);
    }
    
    //#endregion  
    //#region Audio and Visuals
    let sharedAudioCtx = null;
    let ambientGlitchTimer = null;
    let lockdownTimer = null;
    window.addEventListener('pointerdown', () => {
        try { getAudioContext(); } catch (_) { }
    }, { passive: true });
    function playBeep(freq = 520, duration = 0.08, type = 'square', vol = 0.04) {
        if (STATE.soundMuted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + duration + 0.02);
        } catch (_) { }
    }
    function startSustainedNote(freq, waveType = 'triangle') {
        if (STATE.soundMuted) return null;
        try {
            const ctx = getAudioContext();
            if (!ctx) return null;
            
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = waveType;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            
            let released = false;
            return function releaseNote() {
                if (released) return;
                released = true;
                const t = ctx.currentTime;
                gain.gain.cancelScheduledValues(t);
                gain.gain.setValueAtTime(Math.max(0.001, gain.gain.value), t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
                osc.stop(t + 0.28);
            };
        } catch (_) {
            return null;
        }
    }
    let masterSfxGain = null;
    
    function getAudioContext() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        if (!sharedAudioCtx) {
            sharedAudioCtx = new AudioCtx();
            masterSfxGain = sharedAudioCtx.createGain();
            masterSfxGain.connect(sharedAudioCtx.destination);
        }
        if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
        syncSfxGain();
        return sharedAudioCtx;
    }
    
    function getSfxDestination() {
        const ctx = getAudioContext();
        return masterSfxGain || (ctx ? ctx.destination : null);
    }
    
    function syncSfxGain() {
        if (!masterSfxGain || !sharedAudioCtx) return;
        const effectiveVol = (STATE.masterMuted || STATE.sfxMuted)
        ? 0
        : Math.max(0, Math.min(1, STATE.masterVol * STATE.sfxVol));
        masterSfxGain.gain.setValueAtTime(effectiveVol, sharedAudioCtx.currentTime);
    }
    
    function playBeep(freq = 520, duration = 0.08, type = 'square', vol = 0.04) {
        if (STATE.masterMuted || STATE.sfxMuted || STATE.masterVol === 0 || STATE.sfxVol === 0) return;
        try {
            const ctx = getAudioContext();
            const dest = getSfxDestination();
            if (!ctx || !dest) return;
            
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(now);
            osc.stop(now + duration + 0.02);
        } catch (_) { }
    }
    
    function playTeacherChord() {
        if (STATE.masterMuted || STATE.sfxMuted) return;
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
            setTimeout(() => playBeep(freq, 0.8, 'triangle', 0.12), idx * 80);
        });
    }
    function startAudioControls() {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'audio-toggle-btn settings-hub-btn';
        toggleBtn.title = 'Site Settings (Audio & Display)';
        toggleBtn.textContent = '⚙️';
        
        const mixer = document.createElement('div');
        mixer.className = 'audio-mixer-popover settings-hub-popover';
        mixer.innerHTML = `
        <div class="mixer-header">
            <span>⚙️ SITE SETTINGS</span>
            <button type="button" class="mixer-close-btn" title="Close">&times;</button>
        </div>
        
        <div class="settings-section-label">AUDIO MIXER</div>
        <div class="mixer-row">
            <div class="mixer-label-row">
                <button type="button" class="mixer-mute-chip" id="muteMasterBtn">🔊 Master</button>
                <span class="mixer-pct" id="masterPct">80%</span>
            </div>
            <input type="range" class="mixer-slider" id="masterSlider" min="0" max="100" step="1">
        </div>
        
        <div class="mixer-row">
            <div class="mixer-label-row">
                <button type="button" class="mixer-mute-chip" id="muteMusicBtn">🎵 Music</button>
                <span class="mixer-pct" id="musicPct">15%</span>
            </div>
            <input type="range" class="mixer-slider" id="musicSlider" min="0" max="100" step="1">
        </div>
        
        <div class="mixer-row">
            <div class="mixer-label-row">
                <button type="button" class="mixer-mute-chip" id="muteSfxBtn">🔔 SFX</button>
                <span class="mixer-pct" id="sfxPct">70%</span>
            </div>
            <input type="range" class="mixer-slider" id="sfxSlider" min="0" max="100" step="1">
        </div>
        
        <div class="settings-divider"></div>
        <div class="settings-section-label">DISPLAY & VISUALS</div>
        
        <div class="settings-action-row">
            <span>Low Detail Mode (FPS)</span>
            <button type="button" class="mixer-mute-chip" id="settingsLdmBtn">OFF</button>
        </div>
        
        <div class="settings-action-row">
            <span>Background Waves</span>
            <button type="button" class="mixer-mute-chip" id="settingsWaveBtn">Animated</button>
        </div>
        <div class="settings-divider"></div>
        <div class="settings-section-label">ALTERNATE EDITION</div>
        
        <div class="settings-action-row" style="margin-bottom:4px;">
            <span>Interactive Alt Site</span>
            <button type="button" class="mixer-mute-chip" id="settingsAltBtn">Open Alt ↗</button>
        </div>
        <p style="margin:0;font-size:10.5px;line-height:1.35;color:#fbbf24;opacity:0.9;">
            ⚠️ Not recommended for Teachers and Parents due to it being heavily altered and modified for fun, rather than a formal, clean website.
        </p>
    `;
        
        document.body.appendChild(toggleBtn);
        document.body.appendChild(mixer);
        
        const masterSlider = mixer.querySelector('#masterSlider');
        const musicSlider = mixer.querySelector('#musicSlider');
        const sfxSlider = mixer.querySelector('#sfxSlider');
        
        const masterPct = mixer.querySelector('#masterPct');
        const musicPct = mixer.querySelector('#musicPct');
        const sfxPct = mixer.querySelector('#sfxPct');
        
        const muteMasterBtn = mixer.querySelector('#muteMasterBtn');
        const muteMusicBtn = mixer.querySelector('#muteMusicBtn');
        const muteSfxBtn = mixer.querySelector('#muteSfxBtn');
        
        const ldmBtn = mixer.querySelector('#settingsLdmBtn');
        const waveBtn = mixer.querySelector('#settingsWaveBtn');
        
        function syncAllAudioUI() {
            const mVal = Math.round(STATE.masterVol * 100);
            const bgmVal = Math.round(STATE.musicVol * 100);
            const sfxVal = Math.round(STATE.sfxVol * 100);
            
            masterSlider.value = mVal;
            musicSlider.value = bgmVal;
            sfxSlider.value = sfxVal;
            
            masterPct.textContent = STATE.masterMuted ? 'MUTED' : `${mVal}%`;
            musicPct.textContent = (STATE.masterMuted || STATE.musicMuted) ? 'MUTED' : `${bgmVal}%`;
            sfxPct.textContent = (STATE.masterMuted || STATE.sfxMuted) ? 'MUTED' : `${sfxVal}%`;
            
            muteMasterBtn.classList.toggle('is-muted', STATE.masterMuted);
            muteMusicBtn.classList.toggle('is-muted', STATE.musicMuted);
            muteSfxBtn.classList.toggle('is-muted', STATE.sfxMuted);
            
            const allSilent = STATE.masterMuted || (STATE.musicMuted && STATE.sfxMuted) || mVal === 0;
            toggleBtn.classList.toggle('is-muted', allSilent);
            
            syncSfxGain();
            if (typeof window.syncPraiseAudio === 'function') {
                window.syncPraiseAudio();
            }
        }
        
        masterSlider.addEventListener('input', () => {
            STATE.masterVol = Number(masterSlider.value) / 100;
            if (STATE.masterVol > 0) STATE.masterMuted = false;
            localStorage.setItem('afcsMasterVol', String(STATE.masterVol));
            localStorage.setItem('afcsMasterMuted', String(STATE.masterMuted));
            syncAllAudioUI();
        });
        
        musicSlider.addEventListener('input', () => {
            STATE.musicVol = Number(musicSlider.value) / 100;
            if (STATE.musicVol > 0) STATE.musicMuted = false;
            localStorage.setItem('afcsMusicVol', String(STATE.musicVol));
            localStorage.setItem('afcsMusicMuted', String(STATE.musicMuted));
            syncAllAudioUI();
        });
        
        sfxSlider.addEventListener('input', () => {
            STATE.sfxVol = Number(sfxSlider.value) / 100;
            if (STATE.sfxVol > 0) STATE.sfxMuted = false;
            localStorage.setItem('afcsSfxVol', String(STATE.sfxVol));
            localStorage.setItem('afcsSfxMuted', String(STATE.sfxMuted));
            syncAllAudioUI();
        });
        
        sfxSlider.addEventListener('change', () => {
            playBeep(620, 0.06, 'sine', 0.045);
        });
        
        muteMasterBtn.addEventListener('click', () => {
            STATE.masterMuted = !STATE.masterMuted;
            localStorage.setItem('afcsMasterMuted', String(STATE.masterMuted));
            syncAllAudioUI();
            if (!STATE.masterMuted) playBeep(580, 0.07, 'sine', 0.045);
        });
        
        muteMusicBtn.addEventListener('click', () => {
            STATE.musicMuted = !STATE.musicMuted;
            localStorage.setItem('afcsMusicMuted', String(STATE.musicMuted));
            syncAllAudioUI();
            playBeep(520, 0.05, 'sine', 0.035);
        });
        
        muteSfxBtn.addEventListener('click', () => {
            STATE.sfxMuted = !STATE.sfxMuted;
            localStorage.setItem('afcsSfxMuted', String(STATE.sfxMuted));
            syncAllAudioUI();
            if (!STATE.sfxMuted) playBeep(660, 0.07, 'sine', 0.045);
        });
        
        let ldmOn = localStorage.getItem('afcs_ldm') === 'true';
        function syncLDM() {
            STATE.ldmActive = ldmOn;
            document.body.classList.toggle('ldm-active', ldmOn);
            ldmBtn.textContent = ldmOn ? 'ON (Fast)' : 'OFF';
            ldmBtn.classList.toggle('is-active-chip', ldmOn);
            if (!ldmOn && typeof window.wakeStarCanvas === 'function') {
                window.wakeStarCanvas();
            }
        }
        syncLDM();
        
        ldmBtn.addEventListener('click', () => {
            ldmOn = !ldmOn;
            localStorage.setItem('afcs_ldm', String(ldmOn));
            syncLDM();
            playBeep(ldmOn ? 420 : 680, 0.06, 'sine', 0.035);
        });
        
        let savedMode = localStorage.getItem('afcs_waves_mode');
        if (savedMode === null) {
            savedMode = localStorage.getItem('afcs_waves_paused') === 'true' ? '1' : '0';
        }
        let waveMode = Number(savedMode) || 0;
        
        function syncWaveState(mode) {
            document.body.classList.toggle('waves-paused', mode === 1);
            document.body.classList.toggle('waves-hidden', mode === 2);
            if (mode === 0) waveBtn.textContent = 'Animated';
            else if (mode === 1) waveBtn.textContent = 'Paused';
            else waveBtn.textContent = 'Hidden';
            waveBtn.classList.toggle('is-muted', mode === 2);
        }
        syncWaveState(waveMode);
        
        waveBtn.addEventListener('click', () => {
            waveMode = (waveMode + 1) % 3;
            localStorage.setItem('afcs_waves_mode', String(waveMode));
            localStorage.setItem('afcs_waves_paused', String(waveMode === 1));
            syncWaveState(waveMode);
            const tones = Array.of(480, 360, 620);
            playBeep(tones.at(waveMode), 0.06, 'sine', 0.03);
        });
        
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mixer.classList.toggle('is-open');
            toggleBtn.classList.toggle('is-open', isOpen);
            playBeep(isOpen ? 640 : 440, 0.05, 'sine', 0.035);
        });
        
        mixer.querySelector('.mixer-close-btn').addEventListener('click', () => {
            mixer.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
        });
        
        window.addEventListener('click', (e) => {
            if (mixer.classList.contains('is-open') && !mixer.contains(e.target) && e.target !== toggleBtn) {
                mixer.classList.remove('is-open');
                toggleBtn.classList.remove('is-open');
            }
        });
        const altBtn = mixer.querySelector('#settingsAltBtn');
        if (altBtn) {
            altBtn.addEventListener('click', () => {
                window.location.href = 'https://voxxiethelamb.github.io/beyondthemangeralt';
            });
        }
        syncAllAudioUI();
        
        DOM.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => playBeep(620, 0.045, 'sine', 0.03));
        });
        
        STATE.onClosePanel.push(() => {
            playBeep(420, 0.06, 'sine', 0.03);
            setTimeout(() => playBeep(320, 0.08, 'sine', 0.03), 55);
        });
    }
    function startTrailerControls() {
        const videoBox = document.querySelector('.video');
        const videoEl = videoBox ? videoBox.querySelector('video') : null;
        if (!videoBox || !videoEl) return;
        
        const bar = document.createElement('div');
        bar.className = 'yt-video-controls';
        bar.innerHTML = [
            '<button type="button" class="yt-ctrl-btn" id="ytRewindBtn"> -10s</button>',
            '<button type="button" class="yt-ctrl-btn" id="ytPlayPauseBtn"> Play / Pause</button>',
            '<button type="button" class="yt-ctrl-btn" id="ytForwardBtn"> +10s</button>'
        ].join('');
        videoBox.appendChild(bar);
        
        const rewBtn = bar.querySelector('#ytRewindBtn');
        const playBtn = bar.querySelector('#ytPlayPauseBtn');
        const fwdBtn = bar.querySelector('#ytForwardBtn');
        
        function togglePlay() {
            if (videoEl.style.display === 'none') return;
            if (videoEl.paused) videoEl.play();
            else videoEl.pause();
            playBeep(560, 0.05, 'sine', 0.03);
        }
        
        function skipSeconds(delta) {
            if (videoEl.style.display === 'none' || !isFinite(videoEl.duration)) return;
            videoEl.currentTime = Math.max(0, Math.min(videoEl.duration, videoEl.currentTime + delta));
            playBeep(delta > 0 ? 660 : 440, 0.04, 'sine', 0.03);
        }
        
        rewBtn.addEventListener('click', () => skipSeconds(-10));
        playBtn.addEventListener('click', togglePlay);
        fwdBtn.addEventListener('click', () => skipSeconds(10));
        
        videoEl.addEventListener('play', () => { playBtn.textContent = ' Pause'; });
        videoEl.addEventListener('pause', () => { playBtn.textContent = ' Play'; });
    }
    //#endregion 
    //#region People stuff
    function createPeople() {
        getCards().forEach(card => {
            const fullName = card.querySelector('.overlay-text').textContent.toLowerCase();
            
            for (const [lastName, officerTitle] of Object.entries(CONFIG.classOfficers)) {
                if (fullName.includes(lastName)) {
                    card.dataset.role = officerTitle;
                    card.dataset.filter = 'officer';
                    break;
                }
            }
            
            for (const [lastName, info] of Object.entries(CONFIG.playRoster)) {
                if (fullName.includes(lastName)) {
                    if (!card.dataset.role || card.dataset.role === 'Student') {
                        card.dataset.role = info.team;
                        if (info.displayTeam) card.dataset.displayRole = info.displayTeam;
                    } else {
                        card.dataset.team = info.displayTeam || info.team;
                        card.dataset.teamCategory = info.team;
                    }
                    if (info.character) card.dataset.character = info.character;
                    const currentBio = (card.dataset.bio || '').trim();
                    if (!currentBio || currentBio.toLowerCase() === 'add here') {
                        card.dataset.bio = info.bio;
                    }
                    break;
                }
            }
            
            for (const [factionKey, lastNames] of Object.entries(CONFIG.factionMap)) {
                if (lastNames.some(ln => fullName.includes(ln))) {
                    card.dataset.faction = factionKey;
                    break;
                }
            }
        });
    } // how does one CREATE a person
    function bdayParty() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        
        getCards().forEach(card => {
            const rawBday = (card.dataset.birthday || '').trim().toLowerCase();
            if (!rawBday || rawBday === 'n/a') return;
            
            const parts = rawBday.split(/[\/\-\s,]+/).filter(Boolean);
            if (parts.length < 2) return;
            
            const monthPart = parts.at(0);
            const bdayDay = parseInt(parts.at(1), 10);
            let bdayMonth = !isNaN(parseInt(monthPart, 10))
            ? parseInt(monthPart, 10) - 1
            : monthNames.indexOf(monthPart);
            
            if (bdayMonth === -1) bdayMonth = shortMonths.indexOf(monthPart);
            
            if (bdayMonth === currentMonth && bdayDay === currentDay) {
                card.classList.add('is-birthday');
                if (card.parentElement && card.parentElement.classList.contains('PersonWrapper')) {
                    card.parentElement.classList.add('is-birthday');
                }
            }
        });
    } // custom bday stuff
    function startPortraitBadges() {
        const teacherCard = document.querySelector('.PeoplePics[data-role="Teacher"]') ||
        getCards().find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('eulogio'));
        
        if (teacherCard) {
            teacherCard.dataset.role = 'Teacher';
            if (teacherCard.parentElement) {
                teacherCard.parentElement.dataset.hasSun = 'true';
                const sirObserver = new MutationObserver(() => {
                    teacherCard.parentElement.classList.toggle('sir-sun-active', teacherCard.classList.contains('active'));
                });
                sirObserver.observe(teacherCard, { attributes: true, attributeFilter: ['class'] });
            }
        }
        
        getCards().forEach(card => {
            const wrapper = card.parentElement;
            if (!wrapper) return;
            
            if (card.dataset.filter === 'officer') {
                const pip = document.createElement('span');
                pip.className = 'portrait-role-pip pip-officer';
                pip.textContent = '👑';
                pip.title = card.dataset.role;
                wrapper.appendChild(pip);
            }
            if (card.dataset.character) {
                const pip = document.createElement('span');
                pip.className = 'portrait-role-pip pip-actor';
                pip.textContent = '🎭';
                pip.title = card.dataset.character;
                wrapper.appendChild(pip);
            }
            const crewRole = card.dataset.team || (card.dataset.filter !== 'officer' && card.dataset.role !== 'Student' && card.dataset.role !== 'Teacher' ? (card.dataset.displayRole || card.dataset.role) : '');
            if (crewRole) {
                const pip = document.createElement('span');
                pip.className = 'portrait-role-pip pip-crew';
                pip.textContent = '🎥';
                pip.title = crewRole;
                wrapper.appendChild(pip);
            }
            if (card.dataset.role === 'Teacher') {
                const pip = document.createElement('span');
                pip.className = 'portrait-role-pip';
                pip.style.cssText = 'top:2px;left:2px;border:1.5px solid #e11d48;';
                pip.textContent = '🍎';
                pip.title = 'Class Adviser';
                wrapper.appendChild(pip);
            }
        });
    } // the little pips and stuff that look fun
    function startBadgeLegend() {
        if (!DOM.container) return;
        const legend = document.createElement('div');
        legend.className = 'badge-legend-strip';
        legend.innerHTML = `
            <span class="legend-item">🍎 Class Adviser</span>
            <span class="legend-item">👑 Class Officer</span>
            <span class="legend-item">🎭 Speaking Cast</span>
            <span class="legend-item">🎥 Production Crew</span>
            <span class="legend-item">🎂 Birthday Today</span>
        `;
        DOM.container.insertAdjacentElement('beforebegin', legend);
    } // it's a legend gng
    function alphaBetaThing(){
        if (!DOM.container) return;
        const bar = document.createElement('div');
        bar.className = 'alpha-jump-bar';
        bar.innerHTML = `
            <span class="alpha-jump-label">Quick Jump:</span>
            <button type="button" class="alpha-pill" data-start="A" data-end="G">A – G</button>
            <button type="button" class="alpha-pill" data-start="H" data-end="P">H – P</button>
            <button type="button" class="alpha-pill" data-start="Q" data-end="Z">Q – Z</button>
        `;
        DOM.container.insertAdjacentElement('beforebegin', bar);
        
        bar.querySelectorAll('.alpha-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const startChar = pill.dataset.start;
                const endChar = pill.dataset.end;
                const target = getVisibleCards().find(card => {
                    const firstLetter = card.querySelector('.overlay-text').textContent.trim().charAt(0).toUpperCase();
                    return firstLetter >= startChar && firstLetter <= endChar;
                });
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    playBeep(560, 0.05, 'sine', 0.03);
                }
            });
        });
    } // alphabet search (not done)
    function startImageFallback() {
        function getInitials(rawName) {
            const parts = rawName.replace(/,/g, '').split(/\s+/).filter(Boolean);
            return parts.length >= 2
            ? (parts.at(0).charAt(0) + parts.at(1).charAt(0)).toUpperCase()
            : rawName.slice(0, 2).toUpperCase();
        } // gets the initials of first and last (last name priority)
        
        function convertBrokenImg(img) {
            if (!img || img.tagName !== 'IMG' || !img.isConnected) return;
            const card = img.closest('.PeoplePics');
            const isDrawer = img.closest('#panelImageContainer');
            
            if (card) {
                if (card.querySelector('.monogram-avatar')) return;
                const rawName = card.querySelector('.overlay-text').textContent.trim();
                img.style.display = 'none';
                const mono = document.createElement('div');
                mono.className = 'monogram-avatar';
                mono.textContent = getInitials(rawName);
                card.prepend(mono);
            } else if (isDrawer) {
                const rawName = img.alt || 'AF';
                const mono = document.createElement('div');
                mono.className = `${img.className} monogram-avatar`;
                mono.style.cssText = 'width:100%;height:100%;font-size:58px;';
                mono.textContent = getInitials(rawName);
                img.replaceWith(mono);
            } else {
                const placeholder = document.createElement('div');
                placeholder.style.cssText = 'padding:24px 20px;border-radius:16px;background:rgba(5,10,35,0.85);border:1px dashed rgba(56,189,248,0.5);color:#93c5fd;font-size:14px;font-weight:bold;letter-spacing:0.5px;text-align:center;max-width:460px;margin:12px auto;';
                placeholder.textContent = ' Official Teaser Trailer & Poster Coming Nov 26, 2026';
                img.replaceWith(placeholder);
            }
        } // converts it to funny thing
        
        document.addEventListener('error', (e) => {
            if (e.target && e.target.tagName === 'IMG') convertBrokenImg(e.target);
        }, true); // returns error if happen
        
        document.querySelectorAll('img').forEach(img => {
            if (img.complete && img.naturalWidth === 0) convertBrokenImg(img);
        });
        
        const videoBox = document.querySelector('.video');
        const videoEl = videoBox ? videoBox.querySelector('video') : null;
        if (videoBox && videoEl) {
            function showVideoPlaceholder() {
                if (videoBox.querySelector('.video-coming-soon')) return;
                videoEl.style.display = 'none';
                videoBox.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                videoBox.style.borderRadius = '16px';
                videoBox.style.background = 'rgba(5, 10, 35, 0.85)';
                
                const card = document.createElement('div');
                card.className = 'video-coming-soon';
                card.style.cssText = 'padding:44px 20px;text-align:center;color:#e0f2fe;';
                card.innerHTML = [
                    '<div style="font-size:32px;margin-bottom:8px;"></div>',
                    '<div style="font-size:15px;font-weight:bold;color:#38bdf8;letter-spacing:0.4px;">Official Teaser Trailer !  Nov 26, 2026</div>',
                    '<div style="font-size:12.5px;color:rgba(255,255,255,0.65);margin-top:6px;">Filming &amp; Editing in Progress • Grade 7 – Psalms</div>'
                ].join('');
                videoBox.appendChild(card);
            }
            
            const sourceEl = videoEl.querySelector('source');
            if (sourceEl) sourceEl.addEventListener('error', showVideoPlaceholder, { once: true });
            videoEl.addEventListener('error', showVideoPlaceholder, { once: true });
            setTimeout(() => {
                if (videoEl.networkState === 3 || videoEl.readyState === 0) showVideoPlaceholder();
            }, 400);
        } // video converter
    } // just in case it's not ready
    //#endregion
    //#region Searching for a world that doesn't exist...
    function filterCards() {
        const allCards = getCards();
        const query = DOM.searchInput ? DOM.searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;
        
        if (DOM.clearBtn) {
            DOM.clearBtn.style.display = query.length > 0 ? 'block' : 'none';
        }
        
        allCards.forEach(card => {
            const name = card.querySelector('.overlay-text').textContent.toLowerCase();
            const category = (card.dataset.filter || '').toLowerCase();
            const baseRole = (card.dataset.role || 'Student').toLowerCase();
            const teamRole = (card.dataset.team || '').toLowerCase();
            const teamCategory = (card.dataset.teamCategory || '').toLowerCase();
            const displayRole = (card.dataset.displayRole || baseRole).toLowerCase();
            const character = (card.dataset.character || '').toLowerCase();
            
            const matchesSearch = name.includes(query) || displayRole.includes(query) || teamRole.includes(query) || character.includes(query);
            const filterTarget = STATE.activeRole ? STATE.activeRole.toLowerCase() : 'all';
            const matchesRole = filterTarget === 'all' ||
            (filterTarget === 'actor' && character !== '') ||
            category === filterTarget ||
            baseRole === filterTarget ||
            teamCategory === filterTarget ||
            teamRole.includes(filterTarget) ||
            displayRole.includes(filterTarget);
            
            const matchesFaction = !STATE.activeFaction || card.dataset.faction === STATE.activeFaction;
            
            if (matchesSearch && matchesRole && matchesFaction) {
                card.classList.remove('is-filtered-out');
                visibleCount++;
            } else {
                card.classList.add('is-filtered-out');
            }
        });
        
        if (DOM.matchCountEl) {
            const teacherVisible = allCards.some(c => c.dataset.role === 'Teacher' && !c.classList.contains('is-filtered-out'));
            const guestVisible = allCards.some(c => c.dataset.role === 'Guest Legend' && !c.classList.contains('is-filtered-out'));
            const studentTotal = allCards.filter(c => c.dataset.role !== 'Teacher' && c.dataset.role !== 'Guest Legend').length;
            const studentVisible = visibleCount - (teacherVisible ? 1 : 0) - (guestVisible ? 1 : 0);
            
            if (visibleCount === 0) DOM.matchCountEl.textContent = `No members found out of ${studentTotal} students`;
            else if (teacherVisible && studentVisible === studentTotal) DOM.matchCountEl.textContent = `Showing ${studentTotal} students & Class Adviser`;
            else if (teacherVisible) DOM.matchCountEl.textContent = `Showing ${studentVisible} out of ${studentTotal} students + Class Adviser`;
            else DOM.matchCountEl.textContent = `Showing ${studentVisible} out of ${studentTotal} students`;
        }
        
        STATE.onFilterCards.forEach(fn => fn());
    } // filters it in a lot of ways
    function searchThings() {
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                filterCards();
                const val = DOM.searchInput.value.toLowerCase().trim();
                if (!val) return;
                for (const hook of STATE.onSearchInput) {
                    if (hook(val) === true) break;
                }
            });
        }
        
        if (DOM.clearBtn && DOM.searchInput) {
            DOM.clearBtn.addEventListener('click', () => {
                DOM.searchInput.value = '';
                filterCards();
                DOM.searchInput.focus();
            });
        }
        
        DOM.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                DOM.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                STATE.activeRole = btn.dataset.filter;
                
                if (STATE.activeRole === 'all') {
                    STATE.activeFaction = null;
                    DOM.factionBtns.forEach(b => b.classList.remove('active'));
                }
                filterCards();
            });
        });
        
        DOM.factionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = btn.dataset.faction;
                if (STATE.activeFaction === selected) {
                    STATE.activeFaction = null;
                    btn.classList.remove('active');
                } else {
                    DOM.factionBtns.forEach(b => b.classList.remove('active'));
                    STATE.activeFaction = selected;
                    btn.classList.add('active');
                }
                filterCards();
            });
        });
        
        if (DOM.container) {
            const resetWrap = document.createElement('div');
            resetWrap.style.textAlign = 'center';
            
            const resetPill = document.createElement('button');
            resetPill.type = 'button';
            resetPill.className = 'active-reset-pill';
            resetPill.textContent = '↺ Clear All Active Filters';
            resetWrap.appendChild(resetPill);
            DOM.container.insertAdjacentElement('beforebegin', resetWrap);
            
            const emptyCard = document.createElement('div');
            emptyCard.className = 'empty-roster-card';
            emptyCard.innerHTML = `<p>No classmates match that exact combination of filters.</p><button type="button" class="reset-filters-btn">↺ Show Everyone</button>`;
            DOM.container.appendChild(emptyCard);
            
            function resetAllFilters() {
                if (DOM.searchInput) DOM.searchInput.value = '';
                const everyoneBtn = document.querySelector('.filter-btn.everyone');
                if (everyoneBtn) everyoneBtn.click();
            }
            
            resetPill.addEventListener('click', resetAllFilters);
            emptyCard.querySelector('.reset-filters-btn').addEventListener('click', resetAllFilters);
            
            STATE.onFilterCards.push(() => {
                const hasSearch = DOM.searchInput && DOM.searchInput.value.trim().length > 0;
                const hasTeam = STATE.activeRole && STATE.activeRole !== 'all';
                const hasFaction = Boolean(STATE.activeFaction);
                const hasMatches = getVisibleCards().length > 0;
                
                resetPill.classList.toggle('visible', (hasSearch || hasTeam || hasFaction) && hasMatches);
                emptyCard.classList.toggle('visible', !hasMatches);
            });
        }
        
        const spotlightBtn = document.getElementById('spotlightBtn');
        if (spotlightBtn) {
            spotlightBtn.addEventListener('click', () => {
                const visible = getVisibleCards();
                if (!visible.length) return;
                
                let ticks = 0;
                const spinInterval = setInterval(() => {
                    getCards().forEach(c => c.classList.remove('active'));
                    const randomCard = visible.at(Math.floor(Math.random() * visible.length));
                    randomCard.classList.add('active');
                    ticks++;
                    
                    if (ticks >= 12) {
                        clearInterval(spinInterval);
                        openCard(randomCard);
                        randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 70);
            });
        }
    }
    //#endregion
    //#region 2nd option- I mean Side Panel
    function openCard(card) {
        if (!card) return;
        
        for (const hook of STATE.onOpenCard) {
            if (hook(card) === true) return;
        }
        
        const name = card.querySelector('.overlay-text').textContent;
        const imgSrc = card.querySelector('img').src;
        const bday = card.dataset.birthday || 'N/A';
        const baseRole = card.dataset.role || 'Student';
        const displayRole = card.dataset.displayRole || baseRole;
        const badgeClass = baseRole.toLowerCase().replace(/\s+/g, '-');
        const bio = card.dataset.bio || 'No description provided.';
        
        const teamRole = card.dataset.team || '';
        const teamCategory = card.dataset.teamCategory || teamRole;
        const teamClass = teamCategory.toLowerCase().replace(/\s+/g, '-');
        const teamBadgeHTML = teamRole ? `<span class="panel-badge ${teamClass}">${teamRole}</span>` : '';
        
        const character = card.dataset.character || '';
        const characterHTML = character
        ? `<div class="meta-item" style="margin-bottom:8px;"><span class="meta-label">Play Character</span><span class="meta-value" style="color:#f472b6;font-weight:bold;"> ${character}</span></div>`
        : '';
        
        const birthdayBanner = card.classList.contains('is-birthday')
        ? `<div style="margin-top:12px;padding:8px 12px;background:rgba(255,215,0,0.15);border:1px solid #ffd700;border-radius:8px;color:#ffd700;font-weight:bold;text-align:center;"> Happy Birthday Today! </div>`
        : '';
        
        let birthdayMetaHTML = '';
        if (bday && bday !== 'N/A' && bday.toLowerCase() !== 'month dd, yyyy') {
            const parsed = new Date(bday);
            if (isNaN(parsed.getTime())) {
                birthdayMetaHTML = `<div class="meta-item"><span class="meta-label">Birthday</span><span class="meta-value">${bday}</span></div>`;
            } else {
                const now = new Date();
                const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                let nextBday = new Date(now.getFullYear(), parsed.getMonth(), parsed.getDate());
                if (nextBday < todayMidnight) nextBday.setFullYear(now.getFullYear() + 1);
                const diffDays = Math.round((nextBday - todayMidnight) / 86400000);
                const tag = diffDays === 0 ? '  Today!' : diffDays === 1 ? ' ( Tomorrow!)' : ` (Their Birthday is in ${diffDays} days!)`;
                birthdayMetaHTML = `<div class="meta-item"><span class="meta-label">Birthday</span><span class="meta-value">${bday}<span style="color:#fde047;font-weight:bold;">${tag}</span></span></div>`;
            }
        }
        
        if (DOM.verity) {
            if (baseRole === 'Teacher') DOM.verity.textContent = 'Teacher Information';
            else if (baseRole === 'Guest Legend') DOM.verity.textContent = 'VIP Guest Information';
            else DOM.verity.textContent = 'Student Information';
        }
        
        const monoEl = card.querySelector('.monogram-avatar');
        const isCustomPfpActive = card.querySelector('img.is-zerotwo-pfp, img.is-carl-pfp, img.is-cortis-pfp, img.is-kobe-pfp, img.is-vox-pfp, img.is-alastor-pfp, img.is-newton-pfp, img.is-guest-alter-pfp');
        if (isCustomPfpActive) {
            DOM.panelImageContainer.innerHTML = `<img src="${imgSrc}" alt="${name}" class="${isCustomPfpActive.className}">`;
        } else if (monoEl) {
            DOM.panelImageContainer.innerHTML = `<div class="panel-avatar monogram-avatar" style="width:100%;height:100%;font-size:64px;">${monoEl.textContent}</div>`;
        } else {
            DOM.panelImageContainer.innerHTML = `<img src="${imgSrc}" alt="${name}">`;
        }
        DOM.panelBody.innerHTML = `
            <div class="panel-card-header">
                <h2 class="panel-name">${name}</h2>
                <div class="panel-badges-wrap">
                    <span class="panel-badge ${badgeClass}">${displayRole}</span>
                    ${teamBadgeHTML}
                </div>
                ${birthdayBanner}
            </div>
            <div class="panel-meta-section">
                ${characterHTML}
                ${birthdayMetaHTML}
            </div>
            <div class="panel-bio-section">
                <h4 class="section-title">About Me</h4>
                <p class="bio-text">${bio}</p>
            </div>
        `;
        
        renderPanelConnections(card);
        renderShareButton(card);
        
        requestAnimationFrame(() => {
            const glowStyles = window.getComputedStyle(card);
            DOM.panelImageContainer.style.borderColor = glowStyles.borderColor;
            DOM.panelImageContainer.style.boxShadow = glowStyles.boxShadow;
        });
        
        getCards().forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const wasAlreadyOpen = DOM.panel.classList.contains('active');
        if (!wasAlreadyOpen) {
            const docks = new Array('right', 'left', 'bottom', 'center');
            const chosenDock = docks[Math.floor(Math.random() * docks.length)];
            DOM.panel.style.transition = 'none';
            DOM.panel.dataset.dock = chosenDock;
            document.body.dataset.panelDock = chosenDock;
            void DOM.panel.offsetWidth;
            DOM.panel.style.transition = '';
        }
        
        DOM.panel.classList.add('active');
        if (DOM.overlay) DOM.overlay.classList.add('active');
        document.body.classList.add('panel-is-open');
        updateSplitGridLayout();
        
        if (baseRole === 'Teacher') {
            if (card.parentElement) card.parentElement.classList.add('sir-sun-active');
            playTeacherChord();
        }
    }
    
    function closePanel() {
        const wasOpen = DOM.panel && DOM.panel.classList.contains('active');
        if (DOM.panel) DOM.panel.classList.remove('active');
        if (DOM.overlay) DOM.overlay.classList.remove('active');
        getCards().forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.PersonWrapper.sir-sun-active').forEach(w => w.classList.remove('sir-sun-active'));
        document.body.classList.remove('panel-is-open');
        delete document.body.dataset.panelDock;
        updateSplitGridLayout();
        if (wasOpen) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
            STATE.onClosePanel.forEach(fn => fn());
        }
    }
    window.addEventListener('resize', updateSplitGridLayout, { passive: true });
    function navigatePanel(step) {
        const visibleCards = getVisibleCards();
        if (!visibleCards.length) return;
        
        const activeCard = document.querySelector('.PeoplePics.active');
        let nextIndex = visibleCards.indexOf(activeCard) + step;
        if (nextIndex >= visibleCards.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = visibleCards.length - 1;
        
        openCard(visibleCards.at(nextIndex));
    }
    function renderPanelConnections(activeCard) {
        const allCards = getCards();
        const faction = activeCard.dataset.faction || '';
        const team = activeCard.dataset.team || activeCard.dataset.role || '';
        
        let label = '';
        let matches = [];
        
        if (faction && faction !== 'None') {
            label = `In ${CONFIG.factionLabels[faction] || faction}`;
            matches = allCards.filter(c => c !== activeCard && c.dataset.faction === faction);
        } else if (team && team !== 'Student') {
            label = `Also in ${team}`;
            matches = allCards.filter(c => c !== activeCard && (c.dataset.team === team || c.dataset.role === team));
        }
        
        if (!matches.length) return;
        
        const box = document.createElement('div');
        box.className = 'panel-connections';
        box.innerHTML = `<span class="connections-title"> ${label}</span><div class="connections-pills"></div>`;
        
        const pillWrap = box.querySelector('.connections-pills');
        matches.forEach(targetCard => {
            const raw = (targetCard.querySelector('.overlay-text')?.textContent || '').trim();
            const lastName = (raw.split(',').at(0) || raw).trim();
            
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'connection-pill';
            btn.textContent = lastName;
            btn.addEventListener('click', () => {
                playBeep(560, 0.05, 'sine', 0.03);
                openCard(targetCard);
            });
            pillWrap.appendChild(btn);
        });
        
        DOM.panelBody.appendChild(box);
    }
    function renderShareButton(card) {
        const fullName = card.querySelector('.overlay-text').textContent.trim();
        const slug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        history.replaceState(null, '', `#${slug}`);
        
        const shareBtn = document.createElement('button');
        shareBtn.type = 'button';
        shareBtn.className = 'share-profile-btn';
        shareBtn.textContent = ' Copy Direct Link to Profile';
        shareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                shareBtn.textContent = ' Link Copied!';
                setTimeout(() => { shareBtn.textContent = ' Copy Direct Link to Profile'; }, 2000);
            });
        });
        
        DOM.panelBody.appendChild(shareBtn);
    }
    function startSidePanel() {
        let lockedCard = null;
        
        if (DOM.container) {
            DOM.container.addEventListener('click', (e) => {
                const card = e.target.closest('.PeoplePics');
                if (!card) return;
                
                if (lockedCard === card) return;
                
                if (DOM.panel && DOM.panel.classList.contains('active') && card.classList.contains('active')) {
                    lockedCard = card;
                    closePanel();
                    return;
                }
                
                lockedCard = null;
                openCard(card);
            });
        }
        
        if (DOM.closeBtn) DOM.closeBtn.addEventListener('click', closePanel);
        if (DOM.overlay) DOM.overlay.addEventListener('click', closePanel);
        if (DOM.prevCardBtn) DOM.prevCardBtn.addEventListener('click', () => navigatePanel(-1));
        if (DOM.nextCardBtn) DOM.nextCardBtn.addEventListener('click', () => navigatePanel(1));
        
        window.addEventListener('click', (e) => {
            const clickedCard = e.target.closest('.PeoplePics');
            if (!clickedCard || clickedCard !== lockedCard) {
                lockedCard = null;
            }
            if (DOM.panel && !DOM.panel.contains(e.target) && !clickedCard && (!DOM.overlay || !DOM.overlay.contains(e.target))) {
                closePanel();
            }
        });
        
        let touchStartX = 0;
        let touchStartY = 0;
        
        if (DOM.panel) {
            DOM.panel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            DOM.panel.addEventListener('touchend', (e) => {
                if (e.target.closest('button')) return;
                const diffX = e.changedTouches[0].screenX - touchStartX;
                const diffY = e.changedTouches[0].screenY - touchStartY;
                
                if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY)) {
                    navigatePanel(diffX < 0 ? 1 : -1);
                } else if (diffY > 75 && DOM.panel.scrollTop <= 0) {
                    closePanel();
                }
            }, { passive: true });
        }
        
        const initialHash = window.location.hash.replace('#', '').toLowerCase();
        if (initialHash) {
            const match = getCards().find(card => {
                const slug = card.querySelector('.overlay-text').textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return slug === initialHash || slug.includes(initialHash);
            });
            if (match) {
                setTimeout(() => {
                    openCard(match);
                    match.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            }
        }
    }
    //#endregion
    //#region Stuff
    function startCompareModal() {
        let firstCard = null;
        let waitingForSecond = false;
        
        const toast = document.createElement('div');
        toast.className = 'compare-toast';
        toast.innerHTML = `<span id="compareToastText"> Click any 2nd classmate to compare</span><button type="button" class="compare-cancel-btn">Cancel</button>`;
        document.body.appendChild(toast);
        
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'vip-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="vip-modal-card compare-modal-card">
                <button type="button" class="vip-close-btn">&times;</button>
                <div class="vip-badge"> CAST & CREW COMPARISON</div>
                <div class="compare-grid" id="compareGridBody"></div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
        
        const gridBody = modalOverlay.querySelector('#compareGridBody');
        const closeModalBtn = modalOverlay.querySelector('.vip-close-btn');
        
        function cancelComparePick() {
            waitingForSecond = false;
            firstCard = null;
            toast.classList.remove('active');
        }
        
        toast.querySelector('.compare-cancel-btn').addEventListener('click', cancelComparePick);
        closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
        
        function buildColumnHTML(card) {
            const name = card.querySelector('.overlay-text').textContent.trim();
            const imgSrc = card.querySelector('img').src;
            const monoEl = card.querySelector('.monogram-avatar');
            const avatarHTML = monoEl
            ? `<div class="compare-avatar monogram-avatar" style="font-size:34px;">${monoEl.textContent}</div>`
            : `<img class="compare-avatar" src="${imgSrc}" alt="${name}">`;
            
            const role = card.dataset.displayRole || card.dataset.role || 'Student';
            const team = card.dataset.team ? ` • ${card.dataset.team}` : '';
            const character = card.dataset.character || 'Behind-the-Scenes Crew';
            const faction = CONFIG.factionLabels[card.dataset.faction] || 'Production & Faculty';
            const bio = card.dataset.bio || 'No description provided.';
            
            return `
                <div class="compare-col">
                    ${avatarHTML}
                    <h3 class="compare-name">${name}</h3>
                    <span class="panel-badge">${role}${team}</span>
                    <div class="compare-detail"><strong>Play Character</strong><span> ${character}</span></div>
                    <div class="compare-detail"><strong>Story Faction</strong><span>${faction}</span></div>
                    <div class="compare-detail"><strong>About</strong><span>${bio}</span></div>
                </div>
            `;
        }
        
        function renderComparison(cardA, cardB) {
            gridBody.innerHTML = `
                ${buildColumnHTML(cardA)}
                <div class="compare-vs-wrap">
                    <div class="compare-vs-badge">VS</div>
                    <button type="button" class="compare-swap-btn" title="Swap Sides">⇄ Swap</button>
                </div>
                ${buildColumnHTML(cardB)}
            `;
            
            gridBody.querySelector('.compare-swap-btn').addEventListener('click', () => {
                renderComparison(cardB, cardA);
                playBeep(640, 0.06, 'sine', 0.035);
            });
            
            modalOverlay.classList.add('active');
            playBeep(520, 0.08, 'sine', 0.04);
            setTimeout(() => playBeep(740, 0.12, 'sine', 0.04), 80);
        }
        
        STATE.onOpenCard.push((card) => {
            if (waitingForSecond && card && card !== firstCard) {
                const savedFirst = firstCard;
                cancelComparePick();
                closePanel();
                renderComparison(savedFirst, card);
                return true;
            }
            
            requestAnimationFrame(() => {
                if (!DOM.panelBody || DOM.panelBody.querySelector('.compare-trigger-btn')) return;
                const cmpBtn = document.createElement('button');
                cmpBtn.type = 'button';
                cmpBtn.className = 'compare-trigger-btn';
                cmpBtn.textContent = ' Compare With Another...';
                cmpBtn.addEventListener('click', () => {
                    firstCard = card;
                    waitingForSecond = true;
                    const firstName = card.querySelector('.overlay-text').textContent.trim();
                    toast.querySelector('#compareToastText').textContent = ` Comparing ${firstName} !  click any 2nd classmate!`;
                    toast.classList.add('active');
                    closePanel();
                    playBeep(600, 0.07, 'sine', 0.04);
                });
                DOM.panelBody.appendChild(cmpBtn);
            });
            return false;
        });
    } // comparison
    function startPlaybillModal() {
        const openBtn = document.getElementById('openPlaybillBtn');
        if (!openBtn) return;
        
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'vip-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="vip-modal-card credits-modal-card">
                <button type="button" class="vip-close-btn">&times;</button>
                <div class="credits-modal-header">
                    <div class="vip-badge"> PASKONG AFCS 2026 PLAYBILL</div>
                    <h2>Beyond The Manger</h2>
                    <p class="vip-desc" style="margin-bottom:0;">Grade 7 – Psalms • S.Y. 2026–2027</p>
                </div>
                <div id="creditsRollBody"></div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
        
        const bodyEl = modalOverlay.querySelector('#creditsRollBody');
        const closeModalBtn = modalOverlay.querySelector('.vip-close-btn');
        
        function buildCredits() {
            const cards = getCards();
            const groups = {
                ' Cast & Characters': [],
                ' Class Officers': [],
                ' Production & Technical Crew': []
            };
            
            cards.forEach(card => {
                const name = card.querySelector('.overlay-text').textContent.trim();
                if (card.dataset.character) groups[' Cast & Characters'].push({ name, role: card.dataset.character });
                if (card.dataset.filter === 'officer') groups[' Class Officers'].push({ name, role: card.dataset.role });
                const crew = card.dataset.team || (card.dataset.filter !== 'officer' && card.dataset.role !== 'Student' ? (card.dataset.displayRole || card.dataset.role) : '');
                if (crew) groups[' Production & Technical Crew'].push({ name, role: crew });
            });
            
            const statsHTML = `
                <div class="playbill-stats-grid">
                    <div class="playbill-stat-box"><span class="playbill-stat-num">${cards.length}</span><span class="playbill-stat-lbl">Roster</span></div>
                    <div class="playbill-stat-box"><span class="playbill-stat-num">${groups[' Cast & Characters'].length}</span><span class="playbill-stat-lbl">Speaking Cast</span></div>
                    <div class="playbill-stat-box"><span class="playbill-stat-num">${groups[' Class Officers'].length}</span><span class="playbill-stat-lbl">Officers</span></div>
                    <div class="playbill-stat-box"><span class="playbill-stat-num">${groups[' Production & Technical Crew'].length}</span><span class="playbill-stat-lbl">Crew Leads</span></div>
                </div>
            `;
            
            const groupsHTML = Object.entries(groups).map(([title, list]) => `
                <div class="credits-group">
                    <h4>${title} (${list.length})</h4>
                    ${list.map(item => `<div class="credits-entry"><span class="credits-person">${item.name}</span><span class="credits-role-label">${item.role}</span></div>`).join('')}
                </div>
            `).join('');
            
            bodyEl.innerHTML = `${statsHTML}${groupsHTML}<button type="button" class="playbill-print-btn" id="playbillPrintTrigger"> Print / Save PDF Program</button>`;
            
            const printBtn = bodyEl.querySelector('#playbillPrintTrigger');
            if (printBtn) {
                printBtn.addEventListener('click', () => {
                    modalOverlay.classList.remove('active');
                    setTimeout(() => window.print(), 150);
                });
            }
        }
        
        openBtn.addEventListener('click', () => {
            buildCredits();
            modalOverlay.classList.add('active');
        });
        closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    } // playbill
    function startTourGuide() {
        const pitchBar = document.createElement('div');
        pitchBar.className = 'pitch-bar';
        pitchBar.innerHTML = `
            <button type="button" class="pitch-step-btn" data-step="0">1. Hero</button>
            <button type="button" class="pitch-step-btn" data-step="1">2. Synopsis</button>
            <button type="button" class="pitch-step-btn" data-step="2">3. Roadmap</button>
            <button type="button" class="pitch-step-btn" data-step="3">4. Cast & Crew</button>
            <button type="button" class="pitch-step-btn" data-step="4">5. Playbill</button>
            <button type="button" class="pitch-close-btn" title="Exit Tour Guide (P)">&times;</button>
        `;
        document.body.appendChild(pitchBar);
        
        const stepBtns = pitchBar.querySelectorAll('.pitch-step-btn');
        let currentStep = -1;
        
        function goToStep(idx) {
            currentStep = idx;
            stepBtns.forEach((b, i) => b.classList.toggle('current', i === idx));
            
            if (idx === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
            else if (idx === 1) document.querySelector('.synopsis-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else if (idx === 2) document.querySelector('.timeline-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (idx === 3) document.querySelector('.filter-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else if (idx === 4) document.getElementById('openPlaybillBtn')?.click();
            
            playBeep(580, 0.05, 'sine', 0.03);
        }
        
        stepBtns.forEach(btn => btn.addEventListener('click', () => goToStep(Number(btn.dataset.step))));
        pitchBar.querySelector('.pitch-close-btn').addEventListener('click', () => pitchBar.classList.remove('active'));
        
        window.addEventListener('keydown', (e) => {
            if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
            if (document.querySelectorAll('.vip-modal-overlay.active').length > 0 && e.key.toLowerCase() !== 'p') return;
            
            if (e.key.toLowerCase() === 'p') {
                e.preventDefault();
                const isOpening = !pitchBar.classList.contains('active');
                pitchBar.classList.toggle('active', isOpening);
                if (isOpening && currentStep === -1) goToStep(0);
            } else if (pitchBar.classList.contains('active') && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                goToStep((currentStep + 1) % stepBtns.length);
            }
        });
    } // guide
    //#endregion
    //#region Physics
    function startDecorativeWaves() {
        function generateWaveSvg(isVertical = false) {
            let path = isVertical ? 'M 10 0 ' : 'M 0 10 ';
            for (let i = 0; i < 20; i++) {
                const height = (i % 2 === 0) ? 10 - (Math.random() * 10) : 10 + (Math.random() * 10);
                const mid = i * 20 + 10;
                const end = (i + 1) * 20;
                path += isVertical ? `Q ${height} ${mid}, 10 ${end} ` : `Q ${mid} ${height}, ${end} 10 `;
            }
            path += isVertical ? 'L 0 400 L 0 0 Z' : 'L 400 20 L 0 20 Z';
            const viewBox = isVertical ? '0 0 20 400' : '0 0 400 20';
            return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path fill="%230099ff" d="${path}"/></svg>')`;
        }
        
        document.documentElement.style.setProperty('--wave-img', generateWaveSvg(false));
        document.documentElement.style.setProperty('--wave-do', generateWaveSvg(true));
        document.documentElement.style.setProperty('--wave-dir', Math.random() < 0.5 ? 'reverse' : 'normal');
    }
    function startParticleCanvas() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:10000;';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let animRunning = false;
        
        function syncSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        syncSize();
        window.addEventListener('resize', syncSize, { passive: true });
        
        function renderLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = STATE.particles.length - 1; i >= 0; i--) {
                const p = STATE.particles.at(i);
                
                if (p.type === 'SHOCKWAVE') {
                    p.radius += 1.8;
                    p.alpha -= 0.04;
                    if (p.alpha <= 0 || p.radius >= p.maxRadius) {
                        STATE.particles.splice(i, 1);
                        continue;
                    }
                    ctx.save();
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                } else {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.08;
                    p.alpha -= p.decay;
                    if (p.alpha <= 0) {
                        STATE.particles.splice(i, 1);
                        continue;
                    }
                    ctx.save();
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
            
            if (STATE.particles.length > 0) {
                requestAnimationFrame(renderLoop);
            } else {
                animRunning = false;
            }
        }
        
        window.wakeParticleCanvas = function () {
            if (!animRunning) {
                animRunning = true;
                requestAnimationFrame(renderLoop);
            }
        };
        
        window.addEventListener('pointerdown', (e) => {
            const ringColor = STATE.partyModeOn ? '#00FF66' : '#38bdf8';
            const colors = STATE.partyModeOn ? ['#00FF66', '#00BCFF'] : ['#38bdf8', '#facc15'];
            
            STATE.particles.push({
                type: 'SHOCKWAVE',
                x: e.clientX,
                y: e.clientY,
                radius: 4,
                maxRadius: 28,
                alpha: 1.0,
                color: ringColor
            });
            
            spawnBurst(e.clientX, e.clientY, colors, 16);
            window.wakeParticleCanvas();
        }, { passive: true });
    }
    function startCursorGlow() {
        
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const glow = document.createElement('div');
        glow.style.cssText = 'position:fixed;left:0;top:0;width:440px;height:440px;border-radius:50%;pointer-events:none;z-index:2;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.65s ease-out;';
        document.body.appendChild(glow);
        
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;
        let running = false;
        let touchFadeTimer = null;
        
        function updateGlowColor() {
            if (STATE.lockdownOn) {
                glow.style.background = 'radial-gradient(circle, rgba(225,29,72,0.28) 0%, rgba(225,29,72,0.08) 40%, transparent 70%)';
            } else if (document.body.classList.contains('theme-doomsday')) {
                glow.style.background = 'radial-gradient(circle, rgba(16,185,129,0.32) 0%, rgba(52,211,153,0.09) 40%, transparent 70%)';
            } else if (document.body.classList.contains('search-fx-cornerstone')) {
                glow.style.background = 'radial-gradient(circle, rgba(250,204,21,0.30) 0%, rgba(251,146,60,0.09) 40%, transparent 70%)';
            } else if (STATE.partyModeOn) {
                glow.style.background = 'radial-gradient(circle, rgba(0,255,102,0.26) 0%, rgba(0,188,255,0.08) 40%, transparent 70%)';
            } else {
                glow.style.background = 'radial-gradient(circle, rgba(56,189,248,0.26) 0%, rgba(0,153,255,0.08) 40%, transparent 70%)';
            }
        }
        
        function animateGlow() {
            currentX += (targetX - currentX) * 0.14;
            currentY += (targetY - currentY) * 0.14;
            glow.style.left = `${currentX}px`;
            glow.style.top = `${currentY}px`;
            updateGlowColor();
            
            const dist = Math.hypot(targetX - currentX, targetY - currentY);
            if (glow.style.opacity !== '0' || dist > 0.5) {
                requestAnimationFrame(animateGlow);
            } else {
                running = false;
            }
        }
        
        function moveSpotlight(x, y, isTouch) {
            if (STATE.ldmActive) {
                glow.style.opacity = '0';
                return;
            }
            targetX = x;
            targetY = y;
            clearTimeout(touchFadeTimer);
            
            if (glow.style.opacity === '0' && !running) {
                currentX = targetX;
                currentY = targetY;
            }
            glow.style.opacity = '1';
            
            if (!running) {
                running = true;
                requestAnimationFrame(animateGlow);
            }
            if (isTouch) {
                touchFadeTimer = setTimeout(() => { glow.style.opacity = '0'; }, 950);
            }
        }
        
        window.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'touch') moveSpotlight(e.clientX, e.clientY, false);
        }, { passive: true });
        
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) moveSpotlight(e.touches[0].clientX, e.touches[0].clientY, true);
        }, { passive: true });
        
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) moveSpotlight(e.touches[0].clientX, e.touches[0].clientY, true);
        }, { passive: true });
        document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    }
    function startPortraitPhysics() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const motionPaused = document.body.classList.contains('waves-paused');
        const maxGravityDist = 290;
        const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
        let pointerX = -9999;
        let pointerY = -9999;
        let lastScrollY = window.scrollY;
        let loopRunning = false;
        
        let bodies = [];
        
        function rebuildPhysicsCache() {
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const existingMap = new Map(bodies.map(b => [b.card, b]));
            
            bodies = getCards().map(card => {
                const wrapper = card.parentElement || card;
                const prevTransform = wrapper.style.transform;
                wrapper.style.transition = 'none';
                wrapper.style.transform = '';
                
                const rect = wrapper.getBoundingClientRect();
                const radius = rect.width / 2;
                const docHomeX = rect.left + scrollX + radius;
                const docHomeY = rect.top + scrollY + radius;
                
                wrapper.style.transform = prevTransform;
                
                const existing = existingMap.get(card);
                if (existing) {
                    existing.radius = radius;
                    existing.docHomeX = docHomeX;
                    existing.docHomeY = docHomeY;
                    return existing;
                }
                
                return {
                    card, wrapper, radius, docHomeX, docHomeY,
                    x: 0, y: 0, vx: 0, vy: 0,
                    rx: 0, ry: 0, vrx: 0, vry: 0,
                    scale: 1, vScale: 0, grav: 0, tilting: false
                };
            });
        }
        
        window.refreshPortraitPhysicsCache = rebuildPhysicsCache;
        rebuildPhysicsCache();
        
        window.addEventListener('resize', rebuildPhysicsCache, { passive: true });
        STATE.onFilterCards.push(() => requestAnimationFrame(rebuildPhysicsCache));
        
        function stepPhysics() {
            if (STATE.ldmActive) {
                loopRunning = false;
                return;
            }
            let anyActive = false;
            const stiffness = 0.24;
            const damping = 0.05;
            const viewH = window.innerHeight;
            const focalY = viewH * 0.48;
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            
            bodies.forEach(b => {
                if (b.card.classList.contains('is-filtered-out')) {
                    if (b.tilting || b.grav > 0 || Math.abs(b.x) > 0.05 || Math.abs(b.y) > 0.05) {
                        b.tilting = false;
                        b.grav = 0;
                        b.x = b.y = b.vx = b.vy = b.rx = b.ry = 0;
                        b.scale = 1;
                        b.wrapper.classList.remove('is-tilting');
                        b.card.style.setProperty('--grav', '0');
                        b.wrapper.style.transform = '';
                    }
                    return;
                }
                
                const radius = b.radius;
                const homeX = b.docHomeX - scrollX;
                const homeY = b.docHomeY - scrollY;
                const dx = pointerX - homeX;
                const dy = pointerY - homeY;
                const dist = Math.hypot(dx, dy);
                
                b.tilting = !motionPaused && !isTouchPrimary && (b.tilting ? dist <= radius * 1.08 : dist <= radius * 0.95);
                
                let targetX = 0, targetY = 0, targetRx = 0, targetRy = 0, targetScale = 1, targetGrav = 0;
                
                if (b.tilting) {
                    const normX = Math.min(1, Math.max(0, (dx + radius) / (radius * 2)));
                    const normY = Math.min(1, Math.max(0, (dy + radius) / (radius * 2)));
                    targetRx = (0.5 - normY) * 30;
                    targetRy = (normX - 0.5) * 30;
                    targetScale = 1.08;
                    targetGrav = 1;
                    
                    b.wrapper.classList.add('is-tilting');
                    b.card.style.setProperty('--glare-x', `${(normX * 100).toFixed(1)}%`);
                    b.card.style.setProperty('--glare-y', `${(normY * 100).toFixed(1)}%`);
                } else {
                    b.wrapper.classList.remove('is-tilting');
                    if (!isTouchPrimary && dist < maxGravityDist) {
                        const strength = Math.pow(1 - dist / maxGravityDist, 1.05);
                        targetX = dx * strength * 0.24;
                        targetY = dy * strength * 0.24;
                        targetScale = 1 + strength * 0.09;
                        targetGrav = strength;
                    } else if (isTouchPrimary && (homeY + radius) > 0 && (homeY - radius) < viewH) {
                        const bandDist = Math.abs(homeY - focalY);
                        if (bandDist < 170) {
                            const bandStrength = Math.pow(1 - bandDist / 170, 1.3);
                            targetScale = 1 + bandStrength * 0.05;
                            targetGrav = bandStrength * 0.85;
                        }
                    }
                }
                
                b.vx = (b.vx + (targetX - b.x) * stiffness) * damping;
                b.vy = (b.vy + (targetY - b.y) * stiffness) * damping;
                b.vrx = (b.vrx + (targetRx - b.rx) * stiffness) * damping;
                b.vry = (b.vry + (targetRy - b.ry) * stiffness) * damping;
                b.vScale = (b.vScale + (targetScale - b.scale) * stiffness) * damping;
                
                b.x += b.vx;
                b.y += b.vy;
                b.vrx = Math.max(-14, Math.min(14, b.vrx));
                b.vry = Math.max(-14, Math.min(14, b.vry));
                b.rx = Math.max(-60, Math.min(60, b.rx + b.vrx));
                b.ry = Math.max(-60, Math.min(60, b.ry + b.vry));
                b.scale += b.vScale;
                b.grav += (targetGrav - b.grav) * 0.2;
                
                const isMoving = Math.abs(b.vx) > 0.01 || Math.abs(b.vy) > 0.01 ||
                Math.abs(b.vrx) > 0.01 || Math.abs(b.vry) > 0.01 ||
                Math.abs(targetX - b.x) > 0.05 || Math.abs(targetY - b.y) > 0.05 ||
                Math.abs(targetRx - b.rx) > 0.05 || Math.abs(targetRy - b.ry) > 0.05 ||
                Math.abs(targetScale - b.scale) > 0.002 || b.tilting || b.grav > 0.005;
                
                if (isMoving) {
                    anyActive = true;
                    b.card.style.setProperty('--grav', b.grav.toFixed(3));
                    b.wrapper.style.transform = `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0) perspective(420px) rotateX(${b.rx.toFixed(2)}deg) rotateY(${b.ry.toFixed(2)}deg) scale(${b.scale.toFixed(4)})`;
                } else if (b.wrapper.style.transform !== '') {
                    b.card.style.setProperty('--grav', '0');
                    b.wrapper.style.transform = '';
                }
            });
            
            if (anyActive) requestAnimationFrame(stepPhysics);
            else loopRunning = false;
        }
        
        function wakePhysics() {
            if (!loopRunning) {
                loopRunning = true;
                requestAnimationFrame(stepPhysics);
            }
        }
        
        window.addEventListener('pointermove', (e) => {
            if (e.pointerType === 'touch') return;
            pointerX = e.clientX;
            pointerY = e.clientY;
            wakePhysics();
        }, { passive: true });
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            
            if (isTouchPrimary || pointerX === -9999) {
                const viewH = window.innerHeight;
                const impulseY = Math.max(-4.5, Math.min(4.5, -deltaY * 0.045));
                const impulseRx = Math.max(-6, Math.min(6, deltaY * 0.075));
                
                bodies.forEach(b => {
                    if (b.card.classList.contains('is-filtered-out')) return;
                    const homeY = b.docHomeY - currentScrollY;
                    if ((homeY + b.radius) > -60 && (homeY - b.radius) < viewH + 60) {
                        b.vy = Math.max(-6, Math.min(6, b.vy + impulseY));
                        b.vrx = Math.max(-10, Math.min(10, b.vrx + impulseRx));
                    }
                });
                wakePhysics();
            }
        }, { passive: true });
        
        document.addEventListener('mouseleave', () => {
            pointerX = -9999;
            pointerY = -9999;
            wakePhysics();
        });
    }
    function startScrollEffects() {
        const revealTargets = document.querySelectorAll('.synopsis-card, .faq-section, .feedback-section, .search-wrapper, .filter-bar, .faction-bar, .PersonWrapper, .teaser-footer');
        
        if (revealTargets.length) {
            revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));
            
            const observer = new IntersectionObserver((entries) => {
                const intersectingWrappers = [];
                
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('PersonWrapper')) {
                            intersectingWrappers.push(entry.target);
                        } else if (!entry.target.classList.contains('is-visible')) {
                            entry.target.style.setProperty('--reveal-delay', '0ms');
                            entry.target.classList.add('is-visible');
                        }
                    } else if (entry.boundingClientRect.top > window.innerHeight * 0.6) {
                        entry.target.style.removeProperty('--reveal-delay');
                        entry.target.classList.remove('is-visible');
                    }
                });
                
                if (intersectingWrappers.length) {
                    const rows = new Map();
                    intersectingWrappers.forEach(el => {
                        const rowKey = Math.round(el.offsetTop / 24);
                        if (!rows.has(rowKey)) rows.set(rowKey, []);
                        rows.get(rowKey).push(el);
                    });
                    
                    const sortedRowKeys = Array.from(rows.keys()).sort((a, b) => a - b);
                    sortedRowKeys.forEach((key, rowIdx) => {
                        const rowCards = rows.get(key).sort((a, b) => a.offsetLeft - b.offsetLeft);
                        rowCards.forEach((cardEl, colIdx) => {
                            if (cardEl.classList.contains('is-visible')) return;
                            const delay = rowIdx * 150 + colIdx * 55;
                            cardEl.style.setProperty('--reveal-delay', `${delay}ms`);
                            cardEl.classList.add('is-visible');
                        });
                    });
                }
            }, { threshold: 0.02, rootMargin: '0px 0px -33% 0px' });
            
            requestAnimationFrame(() => {
                revealTargets.forEach(el => observer.observe(el));
            });
            
            window.addEventListener('scroll', () => {
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
                    const remaining = Array.from(revealTargets).filter(el => !el.classList.contains('is-visible'));
                    remaining.sort((a, b) => (a.offsetTop - b.offsetTop) || (a.offsetLeft - b.offsetLeft));
                    remaining.forEach((el, idx) => {
                        el.style.setProperty('--reveal-delay', `${idx * 45}ms`);
                        el.classList.add('is-visible');
                    });
                }
            }, { passive: true });
        }
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        document.body.appendChild(progressBar);
        
        const topBtn = document.createElement('button');
        topBtn.type = 'button';
        topBtn.className = 'back-to-top-btn';
        topBtn.textContent = '↑ Top';
        topBtn.title = 'Scroll Back to Top';
        document.body.appendChild(topBtn);
        
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playBeep(520, 0.05, 'sine', 0.03);
            setTimeout(() => playBeep(680, 0.07, 'sine', 0.03), 50);
        });
    }
    function startLowDetailMode() {
        const ldmBtn = document.createElement('button');
        ldmBtn.type = 'button';
        ldmBtn.className = 'ldm-toggle-btn';
        
        let ldmOn = localStorage.getItem('afcs_ldm') === 'true';
        
        function syncLDM() {
            STATE.ldmActive = ldmOn;
            document.body.classList.toggle('ldm-active', ldmOn);
            ldmBtn.classList.toggle('is-active', ldmOn);
            ldmBtn.textContent = ldmOn ? ' LDM: ON' : ' LDM: OFF';
            ldmBtn.title = ldmOn
            ? 'Low Detail Mode Active (Click for Full Visuals)'
            : 'Enable Low Detail Mode for smoother FPS';
            
            if (!ldmOn && typeof window.wakeStarCanvas === 'function') {
                window.wakeStarCanvas();
            }
        }
        
        syncLDM();
        document.body.appendChild(ldmBtn);
        
        ldmBtn.addEventListener('click', () => {
            ldmOn = !ldmOn;
            localStorage.setItem('afcs_ldm', String(ldmOn));
            syncLDM();
            playBeep(ldmOn ? 420 : 680, 0.06, 'sine', 0.035);
        });
    }
    //#endregion
    //#region Quirks
    /*
    The Names SHOULD be self explanatory, so just read it, should be easy
    from there.
    */
    function startWeatherWidget() {
        const eventBar = document.querySelector('.event-details-bar');
        if (!eventBar) return;
        
        const weatherCard = document.createElement('div');
        weatherCard.className = 'event-detail-item weather-flip-card';
        weatherCard.title = 'Click to switch between Antipolo & Dubai';
        weatherCard.innerHTML = [
            '<span class="detail-icon" id="weatherIcon"></span>',
            '<div>',
            '<span class="detail-label" id="weatherLabel">Antipolo Live Weather ⇄</span>',
            '<span class="detail-value" id="weatherValue">Checking local sky...</span>',
            '</div>'
        ].join('');
        eventBar.appendChild(weatherCard);
        
        const iconEl = weatherCard.querySelector('#weatherIcon');
        const labelEl = weatherCard.querySelector('#weatherLabel');
        const valueEl = weatherCard.querySelector('#weatherValue');
        const cache = { Antipolo: null, Dubai: null };
        let activeCity = 'Antipolo';
        
        function getCityHour(city) {
            const tz = city === 'Dubai' ? 'Asia/Dubai' : 'Asia/Manila';
            const hourStr = new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                hour: 'numeric',
                hour12: false
            }).format(new Date());
            return parseInt(hourStr, 10) % 24;
        }
        
        function getCityClock(city) {
            const tz = city === 'Dubai' ? 'Asia/Dubai' : 'Asia/Manila';
            return new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(new Date());
        }
        
        function pickWeatherIcon(desc, city) {
            const lower = (desc || '').toLowerCase();
            const hour = getCityHour(city);
            const isNight = hour >= 18 || hour < 6;
            
            if (lower.includes('thunder')) return '';
            if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) return '';
            if (lower.includes('fog') || lower.includes('mist') || lower.includes('haze')) return '';
            if (lower.includes('overcast') || lower.includes('cloudy')) return '';
            if (lower.includes('partly')) return isNight ? '' : '';
            return isNight ? '' : '';
        }
        
        function decodeWmoCode(code) {
            if (code === 0) return 'Clear Sky';
            if (code <= 3) return 'Partly Cloudy';
            if (code <= 48) return 'Foggy';
            if (code <= 67) return 'Rainy';
            if (code <= 77) return 'Snow';
            if (code <= 82) return 'Rain Showers';
            return 'Thunderstorm';
        }
        
        function renderCity(city) {
            const info = cache[city];
            if (!info) {
                iconEl.textContent = city === 'Dubai' ? '' : '';
                labelEl.textContent = `${city} Live Weather ⇄`;
                valueEl.textContent = 'Checking sky...';
                return;
            }
            if (info.fallback) {
                iconEl.textContent = city === 'Dubai' ? '' : '';
                labelEl.textContent = city === 'Dubai' ? 'Dubai (Burj Khalifa) ⇄' : 'Venue Status ⇄';
                valueEl.textContent = city === 'Dubai'
                ? `${getCityClock('Dubai')} • Clear Desert Sky`
                : 'Covered Court (Rain or Shine)';
                return;
            }
            iconEl.textContent = pickWeatherIcon(info.desc, city);
            labelEl.textContent = `${city} (${getCityClock(city)}) ⇄`;
            valueEl.textContent = `${info.temp}°C • ${info.desc}`;
        }
        
        function fetchCityWeather(city) {
            const coords = city === 'Dubai'
            ? 'latitude=25.1972&longitude=55.2744'
            : 'latitude=14.5864&longitude=121.1753';
            
            const domain = ['api', 'open-meteo', 'com'].join('.');
            const url = 'https:' + '//' + domain + '/v1/forecast?' + coords + '&current_weather=true';
            
            fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(data => {
                if (!data.current_weather) throw new Error('Missing current_weather');
                cache[city] = {
                    temp: Math.round(data.current_weather.temperature),
                    desc: decodeWmoCode(data.current_weather.weathercode),
                    fallback: false
                };
                if (activeCity === city) renderCity(city);
            })
            .catch(err => {
                console.warn('Weather fallback:', err);
                cache[city] = { fallback: true };
                if (activeCity === city) renderCity(city);
            });
        }
        
        weatherCard.addEventListener('click', () => {
            activeCity = activeCity === 'Antipolo' ? 'Dubai' : 'Antipolo';
            weatherCard.classList.remove('is-flipping');
            void weatherCard.offsetWidth;
            weatherCard.classList.add('is-flipping');
            playBeep(activeCity === 'Dubai' ? 660 : 520, 0.06, 'sine', 0.035);
            
            if (!cache[activeCity]) {
                renderCity(activeCity);
                fetchCityWeather(activeCity);
            } else {
                renderCity(activeCity);
            }
        });
        
        fetchCityWeather('Antipolo');
        fetchCityWeather('Dubai');
    }
    function startTimeOfDayTheme() {
        function applySkyPhase() {
            const hour = new Date().getHours();
            document.body.classList.remove('sky-morning', 'sky-afternoon', 'sky-sunset', 'sky-night');
            
            if (hour >= 6 && hour < 12) document.body.classList.add('sky-morning');
            else if (hour >= 12 && hour < 17) document.body.classList.add('sky-afternoon');
            else if (hour >= 17 && hour < 19) document.body.classList.add('sky-sunset');
            else document.body.classList.add('sky-night');
        }
        
        applySkyPhase();
        setInterval(applySkyPhase, 60000);
    }
    function startCalendarExport() {
        const eventBar = document.querySelector('.event-details-bar');
        if (!eventBar) return;
        
        const btnWrap = document.createElement('div');
        btnWrap.style.textAlign = 'center';
        
        const calBtn = document.createElement('button');
        calBtn.type = 'button';
        calBtn.className = 'calendar-save-btn';
        calBtn.textContent = ' Save Dec 17 Showtime to Calendar';
        btnWrap.appendChild(calBtn);
        eventBar.insertAdjacentElement('afterend', btnWrap);
        
        calBtn.addEventListener('click', () => {
            const icsLines = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//AFCS Grade 7 Psalms//Paskong AFCS 2026//EN',
                'BEGIN:VEVENT',
                'UID:beyond-the-manger-afcs-2026@afcs.edu.ph',
                'DTSTAMP:20261114T110000Z',
                'DTSTART:20261215T100000Z',
                'DTEND:20261215T110000Z',
                'SUMMARY:Beyond The Manger: When Faith Becomes the Key (Paskong AFCS 2026)',
                'DESCRIPTION:Grade 7 - Psalms Stage Play Presentation. Core Theme: We rise because Jesus Christ is our Cornerstone.',
                'LOCATION:AFCS Stage in the Covered Court, Antipolo Faith Christian School Inc.',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');
            
            const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Beyond_The_Manger_Paskong_AFCS_2026.ics';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            
            calBtn.textContent = ' Calendar Invite Downloaded!';
            setTimeout(() => {
                calBtn.textContent = ' Save Dec 17 Showtime to Calendar';
            }, 2500);
        });
    }
    function startVenueFloorPlan() {
        const synopsisCard = document.querySelector('.synopsis-card');
        if (!synopsisCard) return;
        
        const existingCalBtn = synopsisCard.querySelector('.calendar-save-btn');
        const targetWrap = existingCalBtn ? existingCalBtn.parentElement : synopsisCard;
        
        const mapBtn = document.createElement('button');
        mapBtn.type = 'button';
        mapBtn.className = 'calendar-save-btn floorplan-toggle-btn';
        mapBtn.style.marginLeft = '8px';
        mapBtn.textContent = ' AFCS Venue Floor Plan';
        targetWrap.appendChild(mapBtn);
        
        const drawer = document.createElement('div');
        drawer.className = 'venue-floorplan-drawer';
        drawer.innerHTML = [
            '<div class="fp-header">',
            '<span class="fp-title">PASKONG AFCS 2026 • COVERED COURT LAYOUT</span>',
            '<button type="button" class="fp-reader-btn" id="fpReaderToggle"> Reader View</button>',
            '</div>',
            '<div class="fp-mobile-tip"> Tip: Tap <strong>Reader View</strong> (or your browser\'s Reading Mode) for a full-screen layout.</div>',
            '<div class="fp-hint" id="fpZoneInfo" style="margin-bottom:10px;">Tap any zone for venue info</div>',
            '<div class="fp-blueprint"><div class="fp-main-area"><div class="fp-top-strip">',
            '<div class="fp-zone fp-room" data-info="Gate Pass Room & Clinic !  Upper-left check-in & medical station.">Gate Pass / Clinic</div>',
            '<div class="fp-zone fp-room" data-info="Restrooms & Janitor Room !  Girls\' CR, Boys\' CR, and Janitor Room.">CRs &amp; Janitor</div>',
            '<div class="fp-zone fp-room fp-exit" data-info="EXIT & Black Panther Hallway !  Leads to Students Waiting Area.">EXIT / Black Panther</div>',
            '<div class="fp-zone fp-room fp-waiting" data-info="Students Waiting Area !  Performers hold here before going backstage.">Students Waiting Area</div>',
            '<div class="fp-zone fp-room" data-info="Conference Area !  Faculty & coordinator briefing zone.">Conference Area</div></div>',
            '<div class="fp-court-grid"><div class="fp-zone fp-seating" data-info="Left Audience Seating !  Angled seating sections near Entrance (Left 1)."> Left Seating</div>',
            '<div class="fp-center-column"><div class="fp-zone fp-multimedia" data-info="Multimedia Room !  Directly behind the main stage backdrop."> Multimedia Room</div>',
            '<div class="fp-zone fp-stage" data-info="Main Stage (Zones 1–10) !  Where Grade 7 – Psalms performs Beyond The Manger!"><span class="fp-stage-title"> STAGE</span>',
            '<div class="fp-stage-grid"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div></div>',
            '<div class="fp-zone fp-seating fp-center-seating" data-info="Center Audience Seating !  Front VIP & main audience rows facing the stage."> Center Audience Seating</div></div>',
            '<div class="fp-zone fp-seating" data-info="Right Audience Seating !  Seating sections along the right walkway."> Right Seating</div></div>',
            '<div class="fp-bottom-strip"><div class="fp-zone fp-entrance" data-info="Entrances (Left 1) !  Main guest & audience entrance at the bottom-left."> Entrance (Left 1)</div>',
            '<div class="fp-zone fp-tech" data-info="Tech Booth (Left) !  Audio, mics, and stage cue control."> Tech Booth</div>',
            '<div class="fp-zone fp-tech" data-info="Tech Booth (Center) !  Lighting & projection control."> Tech Booth</div></div></div>',
            '<div class="fp-right-sidebar"><div class="fp-zone fp-room" data-info="Knights Credit Room !  Upper-right wing.">Knights Credit</div>',
            '<div class="fp-zone fp-room" data-info="Smile Room !  Cast & student prep room.">Smile Room</div>',
            '<div class="fp-zone fp-room" data-info="Pamper Room !  Costume & makeup touch-ups.">Pamper Room</div>',
            '<div class="fp-zone fp-room fp-plant" data-info="Tom\'s Plant !  Courtyard garden & numbered stations 1–4."> Tom\'s Plant</div>',
            '<div class="fp-zone fp-room" data-info="PDT Room !  Right-wing holding room.">PDT Room</div>',
            '<div class="fp-zone fp-room" data-info="Daisy Room !  Right-wing holding room.">Daisy Room</div>',
            '<div class="fp-zone fp-room fp-chapel" data-info="AFCS Chapel !  Located at the bottom-right corner."> CHAPEL</div></div></div>'
        ].join('');
        targetWrap.insertAdjacentElement('afterend', drawer);
        
        const infoEl = drawer.querySelector('#fpZoneInfo');
        const readerBtn = drawer.querySelector('#fpReaderToggle');
        
        function setReaderMode(enable) {
            drawer.classList.toggle('is-reader-view', enable);
            readerBtn.textContent = enable ? '✕ Exit Reader View' : ' Reader View';
            document.body.style.overflow = enable ? 'hidden' : '';
            if (enable) {
                document.body.appendChild(drawer);
            } else {
                targetWrap.insertAdjacentElement('afterend', drawer);
            }
        }
        
        readerBtn.addEventListener('click', () => {
            const nextState = !drawer.classList.contains('is-reader-view');
            setReaderMode(nextState);
            playBeep(nextState ? 660 : 480, 0.06, 'sine', 0.035);
        });
        
        mapBtn.addEventListener('click', () => {
            const isOpen = drawer.classList.toggle('is-open');
            if (!isOpen && drawer.classList.contains('is-reader-view')) {
                setReaderMode(false);
            }
            mapBtn.textContent = isOpen ? ' Hide Venue Floor Plan' : ' AFCS Venue Floor Plan';
            playBeep(isOpen ? 620 : 460, 0.06, 'sine', 0.035);
        });
        
        drawer.querySelectorAll('.fp-zone').forEach(zone => {
            zone.addEventListener('click', () => {
                drawer.querySelectorAll('.fp-zone').forEach(z => z.classList.remove('is-selected'));
                zone.classList.add('is-selected');
                infoEl.textContent = zone.dataset.info;
                playBeep(580, 0.045, 'triangle', 0.03);
            });
        });
    }
    function startVenueFacts() {
        const settingStat = Array.from(document.querySelectorAll('.story-stat')).find(s =>
            (s.querySelector('.stat-label')?.textContent || '').toLowerCase().includes('setting')
        );
        if (!settingStat) return;
        
        const valEl = settingStat.querySelector('.stat-value');
        const labelEl = settingStat.querySelector('.stat-label');
        if (!valEl || !labelEl) return;
        
        let idx = 0;
        settingStat.classList.add('burj-fact-card');
        settingStat.title = 'Click for Burj Khalifa research facts';
        labelEl.textContent = 'Setting (Click for Facts) ↻';
        
        settingStat.addEventListener('click', () => {
            idx = (idx + 1) % CONFIG.venueFacts.length;
            valEl.classList.remove('fact-pop');
            void valEl.offsetWidth;
            valEl.textContent = CONFIG.venueFacts.at(idx);
            valEl.classList.add('fact-pop');
            playBeep(540 + idx * 35, 0.05, 'sine', 0.03);
        });
    }
    function startTimeline() {
        const section = document.querySelector('.timeline-section');
        const fillEl = document.getElementById('timelineFill');
        const nodesEl = document.getElementById('timelineNodes');
        if (!fillEl || !nodesEl) return;
        
        const startMs = new Date('2026-11-03T00:00:00').getTime();
        const endMs = new Date('2026-12-17T18:00:00').getTime();
        const nowMs = Date.now();
        
        const rawPercent = ((nowMs - startMs) / (endMs - startMs)) * 100;
        fillEl.style.width = `${Math.max(0, Math.min(100, rawPercent))}%`;
        
        let activeIndex = 0;
        CONFIG.milestones.forEach((m, idx) => {
            if (nowMs >= new Date(`${m.date}T00:00:00`).getTime()) activeIndex = idx;
        });
        
        let detailBox = null;
        if (section) {
            detailBox = document.createElement('div');
            detailBox.className = 'timeline-detail-box';
            section.appendChild(detailBox);
        }
        let activeNodeIdx = -1;
        
        CONFIG.milestones.forEach((m, idx) => {
            const mMs = new Date(`${m.date}T00:00:00`).getTime();
            const leftPct = Math.max(0, Math.min(100, ((mMs - startMs) / (endMs - startMs)) * 100));
            
            const node = document.createElement('div');
            node.className = `tl-node pos-${m.pos}`;
            node.style.left = `${leftPct}%`;
            
            if (idx < activeIndex) node.classList.add('is-past');
            else if ((idx === activeIndex && nowMs < endMs) || (nowMs >= endMs && idx === CONFIG.milestones.length - 1)) {
                node.classList.add('is-now');
            }
            
            const dateLabel = node.classList.contains('is-now') ? `NOW (${m.shortDate})` : m.shortDate;
            node.innerHTML = `<div class="tl-label"><span class="tl-date">${dateLabel}</span><span>${m.title}</span></div>`;
            
            if (detailBox) {
                node.addEventListener('click', () => {
                    if (activeNodeIdx === idx) {
                        detailBox.classList.remove('visible');
                        activeNodeIdx = -1;
                        return;
                    }
                    activeNodeIdx = idx;
                    detailBox.textContent = m.detail;
                    detailBox.classList.add('visible');
                    playBeep(640, 0.06, 'sine', 0.035);
                });
            }
            
            nodesEl.appendChild(node);
        });
    }
    function startCountdown() {
        const wrapper = document.getElementById('showtimeCountdown');
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');
        if (!wrapper || !daysEl) return;
        
        const targetDate = new Date('2026-12-17T18:00:00').getTime();
        
        function updateTimer() {
            const diff = targetDate - Date.now();
            if (diff <= 0) {
                wrapper.classList.remove('is-urgent');
                wrapper.innerHTML = `<div class="countdown-live-banner"> IT'S SHOWTIME! !  PASKONG AFCS 2026 </div>`;
                return;
            }
            if (diff < 86400000) wrapper.classList.add('is-urgent');
            
            daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
            hoursEl.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
            minsEl.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
            secsEl.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }
    function startScriptureCard() {
        const synopsisCard = document.querySelector('.synopsis-card');
        const themeBanner = synopsisCard ? synopsisCard.querySelector('.theme-banner') : null;
        if (!synopsisCard || !CONFIG.scriptures || !CONFIG.scriptures.length) return;
        
        let idx = Math.floor(Math.random() * CONFIG.scriptures.length);
        const box = document.createElement('div');
        box.className = 'scripture-card';
        box.innerHTML = [
            '<div class="scripture-header">',
            '<span id="scriptureTag"> Our Cornerstone</span>',
            '<span id="scriptureCounter">1 / ' + CONFIG.scriptures.length + '</span>',
            '</div>',
            '<p class="scripture-text" id="scriptureText"></p>',
            '<span class="scripture-ref" id="scriptureRef"></span>',
            '<div class="scripture-actions">',
            '<button type="button" class="scripture-btn" id="nextScriptureBtn"> Next Verse ↻</button>',
            '<button type="button" class="scripture-btn" id="copyScriptureBtn"> Copy Verse</button>',
            '</div>'
        ].join('');
        
        if (themeBanner) themeBanner.insertAdjacentElement('afterend', box);
        else synopsisCard.appendChild(box);
        
        const tagEl = box.querySelector('#scriptureTag');
        const counterEl = box.querySelector('#scriptureCounter');
        const textEl = box.querySelector('#scriptureText');
        const refEl = box.querySelector('#scriptureRef');
        const nextBtn = box.querySelector('#nextScriptureBtn');
        const copyBtn = box.querySelector('#copyScriptureBtn');
        
        function renderVerse() {
            const item = CONFIG.scriptures.at(idx);
            tagEl.textContent = ' ' + item.tag;
            counterEl.textContent = (idx + 1) + ' / ' + CONFIG.scriptures.length;
            textEl.textContent = item.text;
            refEl.textContent = '!  ' + item.ref;
        }
        
        nextBtn.addEventListener('click', () => {
            idx = (idx + 1) % CONFIG.scriptures.length;
            textEl.classList.remove('fact-pop');
            void textEl.offsetWidth;
            renderVerse();
            textEl.classList.add('fact-pop');
            playBeep(587.33, 0.06, 'sine', 0.035);
        });
        
        copyBtn.addEventListener('click', () => {
            const item = CONFIG.scriptures.at(idx);
            const fullQuote = item.text + ' !  ' + item.ref + ' (Beyond The Manger • Paskong AFCS 2026)';
            navigator.clipboard.writeText(fullQuote).then(() => {
                copyBtn.textContent = ' Verse Copied!';
                playBeep(783.99, 0.08, 'sine', 0.035);
                setTimeout(() => { copyBtn.textContent = ' Copy Verse'; }, 2000);
            });
        });
        
        renderVerse();
    }
    function startFaqSection() {
        const synopsisSection = document.querySelector('.synopsis-section');
        if (!synopsisSection || !CONFIG.faqs || !CONFIG.faqs.length) return;
        
        const section = document.createElement('section');
        section.className = 'faq-section reveal-on-scroll';
        section.innerHTML = [
            '<div class="faq-card">',
            '  <div class="faq-header">',
            '    <div>',
            '      <span class="story-pill">❓ GOT QUESTIONS?</span>',
            '      <h2 class="faq-heading">Frequently Asked Questions</h2>',
            '    </div>',
            '    <button type="button" class="faq-toggle-all-btn" id="faqToggleAllBtn">Show All Answers</button>',
            '  </div>',
            '  <div class="faq-list" id="faqList"></div>',
            '</div>'
        ].join('');
        
        synopsisSection.insertAdjacentElement('afterend', section);
        
        const listEl = section.querySelector('#faqList');
        const toggleAllBtn = section.querySelector('#faqToggleAllBtn');
        
        CONFIG.faqs.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'faq-item';
            row.innerHTML = [
                `<button type="button" class="faq-question" aria-expanded="false">`,
                `  <span>${item.q}</span>`,
                `  <span class="faq-chevron">▾</span>`,
                `</button>`,
                `<div class="faq-answer"><p>${item.a}</p></div>`
            ].join('');
            
            const qBtn = row.querySelector('.faq-question');
            qBtn.addEventListener('click', () => {
                const isOpen = row.classList.toggle('is-open');
                qBtn.setAttribute('aria-expanded', String(isOpen));
                syncToggleAllLabel();
                playBeep(isOpen ? 620 : 460, 0.05, 'sine', 0.03);
            });
            
            listEl.appendChild(row);
        });
        
        function syncToggleAllLabel() {
            const items = Array.from(listEl.querySelectorAll('.faq-item'));
            const allOpen = items.length > 0 && items.every(el => el.classList.contains('is-open'));
            toggleAllBtn.textContent = allOpen ? 'Hide All Answers' : 'Show All Answers';
            toggleAllBtn.classList.toggle('is-active', allOpen);
        }
        
        toggleAllBtn.addEventListener('click', () => {
            const items = Array.from(listEl.querySelectorAll('.faq-item'));
            const shouldOpen = !items.every(el => el.classList.contains('is-open'));
            
            items.forEach(el => {
                el.classList.toggle('is-open', shouldOpen);
                el.querySelector('.faq-question')?.setAttribute('aria-expanded', String(shouldOpen));
            });
            
            syncToggleAllLabel();
            playBeep(shouldOpen ? 680 : 420, 0.06, 'sine', 0.035);
        });
    }
    function startFeedbackSection() {
        const anchor = document.querySelector('.faq-section') || document.querySelector('.synopsis-section');
        if (!anchor) return;
        
        const section = document.createElement('section');
        section.className = 'feedback-section reveal-on-scroll';
        section.innerHTML = [
            '<div class="feedback-card">',
            '  <div class="feedback-header">',
            '    <span class="story-pill">💌 WE\'D LOVE TO HEAR FROM YOU</span>',
            '    <h2 class="feedback-heading">Requests &amp; Feedback</h2>',
            '    <p class="feedback-sub">Have a question for the Q&amp;A, a website feature idea, or encouragement for Grade 7 – Psalms?</p>',
            '  </div>',
            '  <form class="feedback-form" id="feedbackForm">',
            '    <div class="feedback-row">',
            '      <input type="text" class="feedback-input" id="fbName" placeholder="Your Name (or Anonymous)" maxlength="60">',
            '      <select class="feedback-select" id="fbCategory">',
            '        <option value="Question for Q&A">❓ Question for Q&A</option>',
            '        <option value="Website Feature Request">✨ Website Feature Request</option>',
            '        <option value="Play Feedback / Encouragement">🎭 Play Feedback / Encouragement</option>',
            '        <option value="Bug Report">🐞 Bug Report</option>',
            '      </select>',
            '    </div>',
            '    <textarea class="feedback-textarea" id="fbMessage" rows="3" placeholder="Write your request, question, or message here..." required></textarea>',
            '    <div class="feedback-actions">',
            '      <button type="submit" class="feedback-submit-btn">✉️ Send via Email</button>',
            '      <button type="button" class="feedback-copy-btn" id="fbCopyBtn">📋 Copy Message to Send</button>',
            '    </div>',
            '    <div class="feedback-status" id="fbStatus"></div>',
            '  </form>',
            '</div>'
        ].join('');
        
        anchor.insertAdjacentElement('afterend', section);
        
        const form = section.querySelector('#feedbackForm');
        const nameInput = section.querySelector('#fbName');
        const catSelect = section.querySelector('#fbCategory');
        const msgInput = section.querySelector('#fbMessage');
        const copyBtn = section.querySelector('#fbCopyBtn');
        const statusEl = section.querySelector('#fbStatus');
        
        function buildFormattedText() {
            const sender = nameInput.value.trim() || 'Anonymous Visitor';
            const category = catSelect.value;
            const message = msgInput.value.trim();
            return {
                subject: `[Beyond The Manger] ${category} from ${sender}`,
                body: `From: ${sender}\nCategory: ${category}\n\nMessage:\n${message}\n\n— Sent from Beyond The Manger (Grade 7 – Psalms)`
            };
        }
        
        function showStatus(text, isError = false) {
            statusEl.textContent = text;
            statusEl.style.color = isError ? '#fda4af' : '#6ee7b7';
            statusEl.classList.add('visible');
        }
        
        const submitBtn = form.querySelector('.feedback-submit-btn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = msgInput.value.trim();
            if (!message) {
                showStatus('Please type a message first!', true);
                return;
            }

            const sender = nameInput.value.trim() || 'Anonymous Visitor';
            const category = catSelect.value;

            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Sending...';

            try {
                const res = await fetch('https://web3forms.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: CONFIG.web3formsKey,
                        subject: `[Beyond The Manger] ${category} from ${sender}`,
                        from_name: sender,
                        category: category,
                        message: message
                    })
                });

                const data = await res.json();
                if (data.success) {
                    showStatus('✓ Sent! Thank you for your feedback.');
                    form.reset();
                    playBeep(680, 0.08, 'sine', 0.04);
                    setTimeout(() => playBeep(880, 0.12, 'sine', 0.04), 80);
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                showStatus('⚠️ Could not send automatically. Try the Copy button instead!', true);
                playBeep(320, 0.12, 'sawtooth', 0.04);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '✉️ Send Message';
            }
        });
        
        copyBtn.addEventListener('click', () => {
            if (!msgInput.value.trim()) {
                showStatus('Please type a message first!', true);
                msgInput.focus();
                return;
            }
            const { body } = buildFormattedText();
            navigator.clipboard.writeText(body).then(() => {
                copyBtn.textContent = '✓ Copied!';
                showStatus('✓ Message copied! Paste it in Messenger, Discord, or email to send.');
                playBeep(784, 0.08, 'sine', 0.04);
                setTimeout(() => { copyBtn.textContent = '📋 Copy Message to Send'; }, 2200);
            });
        });
    }
    //#endregion
    //#region Extra Glue For Code
    function startModalsAndShortcuts() {
        const helpBtn = document.getElementById('shortcutHelpBtn');
        const modal = document.getElementById('shortcutModal');
        const closeHelpBtn = document.getElementById('closeShortcutModal');
        
        function toggleHelpModal(forceState) {
            if (!modal) return;
            const shouldOpen = typeof forceState === 'boolean' ? forceState : !modal.classList.contains('active');
            modal.classList.toggle('active', shouldOpen);
        }
        
        if (helpBtn) helpBtn.addEventListener('click', () => toggleHelpModal(true));
        if (closeHelpBtn) closeHelpBtn.addEventListener('click', () => toggleHelpModal(false));
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) toggleHelpModal(false); });
        
        window.addEventListener('keydown', (e) => {
            const openModals = document.querySelectorAll('.vip-modal-overlay.active');
            if (openModals.length > 0) {
                if (e.key === 'Escape') openModals.forEach(m => m.classList.remove('active'));
                return;
            }
            
            if (e.key === 'Escape') {
                if (DOM.panel && DOM.panel.classList.contains('active')) {
                    closePanel();
                    return;
                }
                if (DOM.searchInput && document.activeElement === DOM.searchInput) {
                    DOM.searchInput.value = '';
                    filterCards();
                    DOM.searchInput.blur();
                }
                return;
            }
            
            if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                return;
            }
            
            if (DOM.panel && DOM.panel.classList.contains('active')) {
                if (e.key === 'ArrowRight') { navigatePanel(1); return; }
                if (e.key === 'ArrowLeft') { navigatePanel(-1); return; }
            }
            
            if (e.key === '/') {
                e.preventDefault();
                if (DOM.searchInput) {
                    DOM.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    DOM.searchInput.focus();
                }
                return;
            }
            if (e.key === '?') {
                e.preventDefault();
                toggleHelpModal();
                return;
            }
        });
    }
    //#endregion
    function startAltPortal() {
        if (!DOM.searchInput) return;
        DOM.searchInput.addEventListener('input', () => {
            if (DOM.searchInput.value.toLowerCase().trim() === 'alt') {
                DOM.searchInput.value = '';
                const toast = document.createElement('div');
                toast.style.cssText = 'position:fixed;top:28px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:999px;background:rgba(5,10,35,0.96);border:2px solid #38bdf8;color:#e0f2fe;font-weight:800;font-size:13px;letter-spacing:0.6px;z-index:999999;box-shadow:0 12px 32px rgba(0,0,0,0.85),0 0 24px rgba(56,189,248,0.6);';
                toast.textContent = '🌀 Opening Beyond The Manger: Alt Universe...';
                document.body.appendChild(toast);
                
                playBeep(523.25, 0.08, 'sine', 0.04);
                setTimeout(() => playBeep(783.99, 0.14, 'sine', 0.045), 75);
                
                setTimeout(() => {
                    window.location.href = 'https://voxxiethelamb.github.io/beyondthemangeralt';
                }, 650);
            }
        });
    }
    function startAll() {
        createPeople();
        startAudioControls();
        startPraiseBGM();
        startDynamicTabPanel();
        bdayParty();
        startPortraitBadges();
        startBadgeLegend();
        alphaBetaThing();
        navBarThing();
        startImageFallback();
        
        startDecorativeWaves();
        startParticleCanvas();
        startCursorGlow();
        startPortraitPhysics();
        startFaqSection();
        startFeedbackSection();
        startScrollEffects();
        startTimeOfDayTheme();
        
        searchThings();
        filterCards();
        startSidePanel();
        startCompareModal();
        startPlaybillModal();
        startTourGuide();
        startScriptureCard();
        
        startWeatherWidget();
        startCalendarExport();
        startVenueFloorPlan();
        startVenueFacts();
        startTimeline();
        startCountdown();
        
        startModalsAndShortcuts();
        startTrailerControls();
        startAltPortal();
        
    }
    startAll();
});