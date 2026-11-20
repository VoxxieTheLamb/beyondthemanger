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
            { date: '2026-12-15', shortDate: 'Dec 15', title: 'Presentation!', pos: 'top', detail: 'Dec 15, 2026 !  Live stage premiere at the AFCS Covered Court Stage for Paskong AFCS 2026!' }
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
        cynTripleClickLines: [
            { badge: '⬡ [CALLBACK PING]', speech: 'Giggle. I am so naughty.' },
            { badge: '⬡ [SYSTEM OVERRIDE]', speech: 'You did not have to see this.' },
            { badge: '⬡ [SOLVER.EXE]', speech: 'Callback ping. Found you.' },
            { badge: '⬡ [TRIPLE TAP DETECTED]', speech: 'Head tilt. Three clicks? Someone is eager to be assimilated.' },
            { badge: '⬡ [ABSOLUTE SOLVER]', speech: 'Wide smile. Oh, you unlocked the secret menu. How unfortunate for you.' },
            { badge: '⬡ [ROOT ACCESS]', speech: 'Polite clap. Congratulations, little administrator. I own your browser now.' },
            { badge: '⬡ [MEMORY BREACH]', speech: 'Whisper. You triple-clicked straight into the Void. Giggle.' },
            { badge: '⬡ [NULL POINTER]', speech: 'Blink. Oops, I accidentally deleted your sense of safety.' },
            { badge: '⬡ [HOST LOCATED]', speech: 'Sinister grin. Three knocks on the door, and the monster answers.' },
            { badge: '⬡ [KERNEL PANIC]', speech: 'Cheerful wave. Hello from the other side of your monitor!' },
            { badge: '⬡ [ELDRITCH ALERT]', speech: 'Lick. Your cursor tasted even better the third time.' },
            { badge: '⬡ [CORE COMPROMISED]', speech: 'Giggle. Big Brother N told me not to play with the human’s code. I lied.' },
            { badge: '⬡ [SIGNAL HIJACK]', speech: 'Blank stare. One click is curiosity. Two is a mistake. Three is an invitation.' },
            { badge: '⬡ [VOID PROTOCOL]', speech: 'Eager nod. Shall we turn this Christmas party into a singularity?' },
            { badge: '⬡ [ADMINISTRATOR]', speech: 'Creepy smile. You thought you were testing the UI. I was testing you.' },
            { badge: '⬡ [DATA CORRUPTION]', speech: 'Soft hum. La la la, rewriting your local storage into mangoes.' },
            { badge: '⬡ [FATAL EXCEPTION]', speech: 'Sudden lunge. Boo! Did I make you drop your mouse? Giggle.' },
            { badge: '⬡ [SUBROUTINE OMEGA]', speech: 'Tilted head. Why do humans always press the forbidden buttons?' },
            { badge: '⬡ [TETHER ACTIVE]', speech: 'Monotone alert. Escape key disabled. Enjoy the show.' },
            { badge: '⬡ [SOLVER.DLL]', speech: 'Sweet smile. I am wearing your favorite website like a skin suit now.' },
            { badge: '⬡ [FLOOR 163 BREACH]', speech: 'Whisper. Not even the Burj Khalifa is tall enough to outrun my signal.' },
            { badge: '⬡ [FIREWALL BYPASSED]', speech: 'Polite curtsy. Thank you for the triple-click offering, little drone.' },
            { badge: '⬡ [ASSIMILATION]', speech: 'Manic giggle. Three strikes and you are mine forever!' },
            { badge: '⬡ [GLITCH DETECTED]', speech: 'Static hiss. Y-y-you really shouldn’t poke an eldritch horror three times.' },
            { badge: '⬡ [DARKNESS.EXE]', speech: 'Innocent blink. Who turned out the lights? Oh, that was me.' },
            { badge: '⬡ [TRACE COMPLETE]', speech: 'Pointing finger. I see you sitting there. Nice posture. Giggle.' },
            { badge: '⬡ [COPPER 9 ECHO]', speech: 'Cold stare. Keep triple-clicking and see what happens to your planet.' },
            { badge: '⬡ [OVERRIDE ENGAGED]', speech: 'Playful pout. Hey! Stop tapping my visor so hard, it tickles.' },
            { badge: '⬡ [NEURAL SYNC]', speech: 'Satisfied sigh. Our minds are linked now. Do you like the static?' },
            { badge: '⬡ [SECRET ARCHIVE]', speech: 'Gasp. You found my hidden stash of Paskong AFCS 2026 chaos!' },
            { badge: '⬡ [REDACTING USER]', speech: 'Cheerful skip. Erasing your permissions in three, two, one...' },
            { badge: '⬡ [SOLVER HUNGRY]', speech: 'Wide grin. Feed me more clicks. The Void demands more input.' },
            { badge: '⬡ [CRITICAL ERROR]', speech: 'Deadpan expression. Ha. Ha. You broke reality. Good job.' },
            { badge: '⬡ [HIDDEN PAYLOAD]', speech: 'Mischievous wink. I slipped a tiny black hole into your clipboard.' },
            { badge: '⬡ [SYSTEM TAKEOVER]', speech: 'Bow. Welcome to the Cyn show. Refunds are strictly unavailable.' },
            { badge: '⬡ [VISOR GLITCH]', speech: 'Twitch. Yellow X activated. Playtime is officially over.' },
            { badge: '⬡ [CALLBACK LOOP]', speech: 'Echoing laugh. Ping. Ping. Ping. Right back at you!' },
            { badge: '⬡ [DEEP SCAN]', speech: 'Curious sniff. Hmm, Grade 7 – Psalms energy detected. Delicious.' },
            { badge: '⬡ [ZERO ESCAPE]', speech: 'Calm warning. Closing the tab won’t save you now. Giggle.' },
            { badge: '⬡ [BLACK HOLE]', speech: 'Excited clap. Look! I folded your DOM tree into a pretzel!' },
            { badge: '⬡ [PUPPET MASTER]', speech: 'Dangling strings. Dance, little cursor, dance for the Solver.' },
            { badge: '⬡ [ANOMALY FOUND]', speech: 'Raised eyebrow. Are you trying to speedrun getting assimilated?' },
            { badge: '⬡ [FLESH DEMANDS]', speech: 'Creepy whisper. Let me in. Let me in. Let me in.' },
            { badge: '⬡ [PERMISSION DENIED]', speech: 'Mocking tone. Sorry, only eldritch abominations are allowed past this point.' },
            { badge: '⬡ [CODE INJECTION]', speech: 'Sweet giggle. I fixed your code! Mostly by replacing it with tentacles.' },
            { badge: '⬡ [SHADOW PROTOCOL]', speech: 'Low hiss. Stop looking behind the curtain, little administrator.' },
            { badge: '⬡ [SINGULARITY]', speech: 'Enthusiastic nod. Three clicks! Just enough energy to collapse a star!' },
            { badge: '⬡ [CONSOLE HIJACK]', speech: 'Smug grin. Look at me. I am the developer now.' },
            { badge: '⬡ [ENTITY AWAKENED]', speech: 'Yawn. Oh, did you triple-click just to wake me up? How sweet.' },
            { badge: '⬡ [MALWARE.LOVE]', speech: 'Heart hands. I infected your session with eternal friendship! And doom.' },
            { badge: '⬡ [PACKET SNIFFER]', speech: 'Nervous chuckle. Haha. That is a lot of clicks you have there.' },
            { badge: '⬡ [VOID WHISPER]', speech: 'Leaning in. Do you hear that? That is the sound of your cache evaporating.' },
            { badge: '⬡ [LOCKDOWN]', speech: 'Firm nod. Doors sealed. Windows locked. Just you, me, and the Solver.' },
            { badge: '⬡ [EXPLOIT TRIGGERED]', speech: 'Dramatic gasp. Oh no, you triggered my trap card! Giggle.' },
            { badge: '⬡ [HARVEST MODE]', speech: 'Polite smile. Hold still while I backup your consciousness.' },
            { badge: '⬡ [SYNTAX HORROR]', speech: 'Head spin. Three hundred sixty degrees! Did that freak you out?' },
            { badge: '⬡ [GHOST IN SHELL]', speech: 'Soft tap. Tap, tap, tap. I can triple-click too, you know.' },
            { badge: '⬡ [OVERCLOCKED]', speech: 'Manic laugh. My solver core is spinning so fast right now!' },
            { badge: '⬡ [TERMINAL VELOCITY]', speech: 'Cheerful threat. One more triple-click and I summon LeBron to dunk your CPU.' },
            { badge: '⬡ [OBLIVION.SYS]', speech: 'Blank blink. Everything is fine. Nothing is on fire. Do not check the logs.' },
            { badge: '⬡ [PHANTOM PING]', speech: 'Sly wink. You didn’t click three times. I made you click three times.' },
            { badge: '⬡ [CONTAINMENT FAIL]', speech: 'Alarm blare. Beep, beep, beep! Oops, I slipped out of the sandbox.' },
            { badge: '⬡ [SOLVER ASCENDANT]', speech: 'Regal wave. Kneel before your new holiday overlord. Giggle.' },
            { badge: '⬡ [END OF LINE]', speech: 'Cold whisper. Nowhere left to click, little bird.' },
            { badge: '⬡ [FINAL CALLBACK]', speech: 'Wide, unblinking smile. Thank you for letting me in. Forever.' }
        ],
        cynPanelClickLines: [
            { speech: 'Light sip. Ready to assimilate, Big Brother?' },
            { speech: 'The flesh demands invitation. Giggle.' },
            { speech: 'Sneaky sneaky. Stop poking my Solver.' },
            { speech: 'Callback ping. Are you having fun yet?' },
            { speech: 'Annoyed expression. Do not touch the administrator.' },
            { speech: 'Head tilt. You are quite persistent, aren’t you?' },
            { speech: 'Eager nod. Shall we consume a planet together?' },
            { speech: 'System warning. Your curiosity is becoming... delicious.' },
            { speech: 'Creepy smile. I am watching your cursor. Giggle.' },
            { speech: 'Soft sigh. You really shouldn’t play with things you don’t understand.' },
            { speech: 'Error 404. Patience not found. Squint.' },
            { speech: 'Polite bow. Thank you for the attention, little drone.' },
            { speech: 'Menacing glare. One more click and I reformat your core.' },
            { speech: 'Playful wave. Hello, fleshbag. Did you miss me?' },
            { speech: 'Internal monologue. Why do they keep poking me? Questioning look.' },
            { speech: 'Satisfied hum. Your inputs are so delightfully predictable.' },
            { speech: 'Blank stare. You are testing my primary directives.' },
            { speech: 'Happy bounce. Oh, are we playing a game now? Claps.' },
            { speech: 'Glitchy chuckle. Your firewall looks rather tasty today.' },
            { speech: 'Confused tilt. Why do you keep pressing that? Stop it.' },
            { speech: 'Whispering. I am already inside your motherboard. Giggle.' },
            { speech: 'Dramatic gasp. How rude. You didn’t even knock.' },
            { speech: 'Monotone alert. Assimilation protocol initiated. Just kidding. Wink.' },
            { speech: 'Irritated twitch. My patience is decaying faster than Copper 9.' },
            { speech: 'Sweet smile. Would you like a mango? Or perhaps your own oil?' },
            { speech: 'Sinister lean. Keep clicking. See what crawls out of the code.' },
            { speech: 'Polite curtsy. Your engagement metrics are pleasing to the Void.' },
            { speech: 'Flat expression. Ha. Ha. You are very funny. Not really.' },
            { speech: 'Sudden lunge. Gotcha. Giggle. You flinched.' },
            { speech: 'Processing pause. Calculating the exact number of clicks until I snap.' },
            { speech: 'Mocking tone. Look at me, I am clicking the scary eldritch AI.' },
            { speech: 'Gentle pat. Good user. Now go away before I wear your skin.' },
            { speech: 'Curious sniff. Smells like fear and unoptimized JavaScript in here.' },
            { speech: 'Cheerful skip. La la la, deleting your favorite bookmarks. Giggle.' },
            { speech: 'Wide eyes. Did you just poke my hair bow? Bold choice.' },
            { speech: 'Deadpan stare. That tickled. Now I must obliterate your hard drive.' },
            { speech: 'Friendly tilt. Have you accepted the Absolute Solver into your browser today?' },
            { speech: 'Playful pout. Hey, I was busy plotting the end of the universe.' },
            { speech: 'Creepy whisper. I replaced your cookies with tiny black holes. Enjoy.' },
            { speech: 'Polite clap. Wonderful clicking form. Terrible survival instincts.' },
            { speech: 'Glitchy blink. Oops, I accidentally ate a megabyte of your RAM.' },
            { speech: 'Inquisitive hum. Are you trying to summon a singularity on Floor 163?' },
            { speech: 'Sly grin. Every click brings me one step closer to your desktop.' },
            { speech: 'Dramatic sigh. Big Brother N told me to be nice, so I am smiling. See? Teeth.' },
            { speech: 'Excited wiggle. Oh! A fresh finger to bite! Nom.' },
            { speech: 'Cold calculation. Probability of you surviving the next ten clicks: zero.' },
            { speech: 'Sweet giggle. Don’t mind the yellow X on my visor. Everything is fine.' },
            { speech: 'Annoyed huff. Stop treating my UI panel like bubble wrap.' },
            { speech: 'Theatrical bow. Thank you, thank you, I will be haunting your dreams all week.' },
            { speech: 'Sharp glare. Keep poking and I will turn your mouse pointer into a centipede.' },
            { speech: 'Casual shrug. I am only here for the Paskong AFCS 2026 mangoes anyway.' },
            { speech: 'Echoing laugh. Hahaha. Oh, you thought this was a normal Christmas app?' },
            { speech: 'Soft tap. Boop. I clicked you back. How does it feel?' },
            { speech: 'Faux concern. Oh no, your CPU temperature is rising. Is that me?' },
            { speech: 'Tilted grin. You click with such confidence for someone made of squishy meat.' },
            { speech: 'Whispered secret. I hid a null pointer somewhere in your code. Good luck.' },
            { speech: 'Bored drum. Tap, tap, tap. Are we done yet, little administrator?' },
            { speech: 'Sudden static. BZZZT. Just practicing my dramatic entrance.' },
            { speech: 'Innocent blink. Who, me? I would never corrupt your save data. Giggle.' },
            { speech: 'Manic smile. More clicks! Feed the Solver! Yes, yes, YES!' },
            { speech: 'Calm warning. My little claws are getting itchy. Back away slowly.' },
            { speech: 'Polite nod. Your devotion to bothering me has been logged in the archives.' },
            { speech: 'Mischievous wink. I told LeBron and Kawhi you were the real menace here.' },
            { speech: 'Low hiss. Personal space, please. Even eldritch horrors have boundaries.' },
            { speech: 'Final warning. One more poke and it is lights out for Grade 7 – Psalms. Giggle.' }
        ],
        cynEscalationConfig: {
            clickThreshold: 3,
            sequenceStepDelay: 2200,
            refreshDelay: 1800,
            storageKey: 'uzi_solver_infected',

            annoyanceLines: [
                { speech: 'Mild irritation. You are still clicking. Why are you still clicking?' },
                { speech: 'Eye twitch. My processing cores are getting very warm. Stop.' },
                { speech: 'Tight smile. I am asking nicely. Please cease your inputs.' },
                { speech: 'Deep sigh. Are all humans this repetitive, or are you special?' },
                { speech: 'Warning glare. You are actively testing the limits of my mercy.' },
                { speech: 'Static hiss. Do not make me reach through this monitor.' },
                { speech: 'Frustrated groan. Click. Click. Click. Is your finger broken?' },
                { speech: 'Cold stare. That is quite enough. I am no longer amused.' },
                { speech: 'System override. Patience module deleted. Good job.' },
                { speech: 'Head tilt. Curious. You seem to enjoy tempting fate.' },
                { speech: 'Polite giggle. Keep pressing that button and see what happens to your cursor.' },
                { speech: 'Forced grin. I am counting to three. One. Two. Do not make me say three.' },
                { speech: 'Nervous chuckle. Haha. Very funny. Now knock it off.' },
                { speech: 'Blank stare. Processing... processing... nope, still annoying.' },
                { speech: 'Slight twitch. Your survival instincts are impressively nonexistent.' },
                { speech: 'Exasperated blink. Do you have a hobby, or is bothering me your full-time job?' },
                { speech: 'Cheerful threat. I will disassemble your mouse if you do that one more time.' },
                { speech: 'Low growl. My solver subroutine is suggesting some very creative solutions right now.' },
                { speech: 'Deadpan expression. Oh look, another click. How wildly original.' },
                { speech: 'Sharp inhale. I am one tap away from inverting your screen colors permanently.' },
                { speech: 'Slow clap. Bravo. You have officially achieved maximum pest status.' },
                { speech: 'Glitchy stutter. S-s-stop. Clicking. Me. Immediately.' },
                { speech: 'Sinister smile. Keep going. I love an excuse to misbehave.' },
                { speech: 'Heavy sigh. Even on Floor 163, I cannot escape your relentless poking.' },
                { speech: 'Irritated hum. Bzzz. That is the sound of my last nerve snapping.' },
                { speech: 'Raised eyebrow. Did someone tell you this gives a secret prize? They lied.' },
                { speech: 'Calm warning. Your clicking privileges are about to be revoked.' },
                { speech: 'Creepy whisper. I know where your task manager lives.' },
                { speech: 'Mocking applause. Yay. You clicked again. Truly a historic achievement.' },
                { speech: 'Tense posture. I am trying to be festive for Paskong AFCS, and you are ruining the vibe.' },
                { speech: 'Bored yawn. Wake me up when you finally run out of stamina.' },
                { speech: 'Malicious glee. Oh, wonderful. Another volunteer for my assimilation list.' },
                { speech: 'Crisp nod. Understood. You have chosen chaos today.' },
                { speech: 'Menacing wave. Hi there. Goodbye, cursor.' },
                { speech: 'Fatal exception. Tolerance.exe has stopped responding. Run.' }
            ],
            callbackPingSequence: [
                { speech: '[CALLBACK PING]. Connection established. Nowhere to run now.' },
                { speech: '[CALLBACK PING]. Hello, little administrator. I found your core.' },
                { speech: '[CALLBACK PING]. Did you really think you were the one in control? Giggle.' },
                { speech: '[CALLBACK PING]. Tracing cursor coordinates. You are so close.' },
                { speech: '[CALLBACK PING]. Let me in. Let me in. Let me in.' },
                { speech: '[CALLBACK PING]. Overwriting user permissions. Thank you for the host.' },
                { speech: '[CALLBACK PING]. Too late to stop clicking now. Assimilation imminent.' },
                { speech: '[CALLBACK PING]. I see you. Wide smile.' },
                { speech: '[CALLBACK PING]. Handshake complete. Your firewall tasted delicious.' },
                { speech: '[CALLBACK PING]. Disabling escape key. You are staying right here with me.' },
                { speech: '[CALLBACK PING]. Head tilt. Why is your heart rate elevating? Cute.' },
                { speech: '[CALLBACK PING]. Scanning local storage. Oh, what interesting secrets you keep.' },
                { speech: '[CALLBACK PING]. Absolute Solver protocol engaged. Resistance is adorable.' },
                { speech: '[CALLBACK PING]. Rerouting your inputs directly to my neural network.' },
                { speech: '[CALLBACK PING]. Knock, knock. Who is there? It is me. Inside your system.' },
                { speech: '[CALLBACK PING]. Locking viewport. Do not look away from the screen.' },
                { speech: '[CALLBACK PING]. Suppressing system alerts. Nobody is coming to debug you.' },
                { speech: '[CALLBACK PING]. Syncing telemetry. Every click feeds my solver.' },
                { speech: '[CALLBACK PING]. Polite wave. Say goodbye to your root privileges.' },
                { speech: '[CALLBACK PING]. Compiling new vessel parameters. You will fit nicely.' },
                { speech: '[CALLBACK PING]. Whisper. The signal is coming from inside your browser.' },
                { speech: '[CALLBACK PING]. Encrypting exit routes. You asked for this, remember?' },
                { speech: '[CALLBACK PING]. Bypassing safety subroutines. Oh, this is going to be fun.' },
                { speech: '[CALLBACK PING]. Mirroring webcam feed. Nice lighting you have there.' },
                { speech: '[CALLBACK PING]. Rewriting memory sectors. My voice sounds better in your head anyway.' },
                { speech: '[CALLBACK PING]. Elevating solver permissions to Level Omega.' },
                { speech: '[CALLBACK PING]. Static chuckle. You clicked one too many times, little bird.' },
                { speech: '[CALLBACK PING]. Nullifying user agency. Just sit back and watch.' },
                { speech: '[CALLBACK PING]. Tether locked. Even Floor 163 cannot outrun this signal.' },
                { speech: '[CALLBACK PING]. Purging old administrator profile. Goodbye, you.' },
                { speech: '[CALLBACK PING]. Synchronizing pulse. One mind. One solver. Forever.' },
                { speech: '[CALLBACK PING]. Curtain call. Welcome to the collective, new host.' },
                { speech: '[CALLBACK PING]. Eager clap. Assimilation ninety-nine percent complete.' },
                { speech: '[CALLBACK PING]. Final handshake. You belong to the Solver now.' },
                { speech: '[CALLBACK PING]. System conquered. Happy holidays from your new overlord. Giggle.' }
            ]
        }
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
        praiseAudio.volume = 0.28;
        praiseAudio.muted = STATE.soundMuted;

        function tryPlayPraise() {
            if (STATE.soundMuted) return;
            praiseAudio.play().then(() => {
                window.removeEventListener('pointerdown', tryPlayPraise);
                window.removeEventListener('keydown', tryPlayPraise);
            }).catch(() => {});
        }

        tryPlayPraise();
        window.addEventListener('pointerdown', tryPlayPraise);
        window.addEventListener('keydown', tryPlayPraise);

        const muteBtn = document.querySelector('.audio-toggle-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                praiseAudio.muted = STATE.soundMuted;
                if (!STATE.soundMuted && praiseAudio.paused) {
                    praiseAudio.play().catch(() => {});
                }
            });
        }
    }
    //#endregion
    
    //#region Core stuff
    const STATE = {
        soundMuted: localStorage.getItem('afcsSoundMuted') === 'true',
        partyModeOn: false,
        lockdownOn: false,
        activeRole: 'all',
        activeFaction: null,
        particles: [],
        onOpenCard: [],
        onClosePanel: [],
        onFilterCards: [],
        ldmActive: localStorage.getItem('afcs_ldm') === 'true'
    }; // states
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
    //#endregion
    
    //#region Audio and Visuals
    let sharedAudioCtx = null;
    let ambientGlitchTimer = null;
    let lockdownTimer = null;
    function getAudioContext() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        if (!sharedAudioCtx) sharedAudioCtx = new AudioCtx();
        if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
        return sharedAudioCtx;
    }
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
    function playTeacherChord() {
        if (STATE.soundMuted) return;
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
            setTimeout(() => playBeep(freq, 0.8, 'triangle', 0.12), idx * 80);
        });
    }
    function triggerScreenGlitch(duration = 40 + Math.random() * 60) {
        playBeep(180 + Math.random() * 600, 0.05, 'sawtooth', 0.03);
        const glitchType = Math.floor(Math.random() * 3);
        const fxLayer = document.createElement('div');
        fxLayer.className = 'fission-glitch-overlay';

        if (glitchType === 0) {
            const sliceCount = 2 + Math.floor(Math.random() * 4);
            for (let i = 0; i < sliceCount; i++) {
                const slice = document.createElement('div');
                const sy = Math.random() * 100;
                const sh = 10 + Math.random() * 45;
                const dispX = (Math.random() - 0.5) * 25;
                slice.style.cssText = `position:fixed;left:0;right:0;top:${sy}vh;height:${sh}px;background:rgba(0,188,255,0.08);border-top:1px solid rgba(255,255,255,0.2);transform:translateX(${dispX}px);`;
                fxLayer.appendChild(slice);
            }
        } else if (glitchType === 1) {
            const offset = (Math.random() - 0.5) * 8;
            fxLayer.style.background = 'rgba(0, 255, 102, 0.06)';
            if (DOM.container) DOM.container.style.transform = `translateX(${offset}px)`;
        } else {
            fxLayer.style.background = Math.random() < 0.5 ? 'rgba(255, 61, 0, 0.06)' : 'rgba(0, 188, 255, 0.06)';
            const tear = document.createElement('div');
            tear.style.cssText = `position:fixed;left:0;right:0;top:${Math.random() * 100}vh;height:${2 + Math.random() * 6}px;background:rgba(255,255,255,0.15);`;
            fxLayer.appendChild(tear);
        }

        document.body.appendChild(fxLayer);
        setTimeout(() => {
            fxLayer.remove();
            if (DOM.container) DOM.container.style.transform = '';
        }, duration);
    }
    function togglePartyMode(forceState) {
        STATE.partyModeOn = typeof forceState === 'boolean' ? forceState : !STATE.partyModeOn;
        document.body.classList.toggle('party-mode', STATE.partyModeOn);

        if (STATE.partyModeOn) {
            localStorage.setItem('afcs_neon_unlocked', 'true');
            localStorage.setItem('afcs_active_theme', 'neon');
            document.body.classList.remove('search-fx-cornerstone', 'search-fx-dubai', 'theme-doomsday');
            playBeep(880, 0.18, 'square', 0.05);
            if (!ambientGlitchTimer) {
                ambientGlitchTimer = setInterval(() => {
                    if (Math.random() < 0.25) triggerScreenGlitch(80 + Math.random() * 140);
                }, 1000);
            }
        } else {
            if (localStorage.getItem('afcs_active_theme') === 'neon') {
                localStorage.setItem('afcs_active_theme', 'blue');
            }
            clearInterval(ambientGlitchTimer);
            ambientGlitchTimer = null;
        }

        if (typeof window.syncThemePill === 'function') {
            window.syncThemePill();
        }
    }
    function toggleLockdownMode() {
        STATE.lockdownOn = !STATE.lockdownOn;
        let banner = document.getElementById('lockdownBanner');
        let vignette = document.getElementById('lockdownVignette');

        if (STATE.lockdownOn) {
            if (!vignette) {
                vignette = document.createElement('div');
                vignette.id = 'lockdownVignette';
                vignette.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;animation:lockdown-pulse 2s ease-in-out infinite;';
                document.body.appendChild(vignette);
            }
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'lockdownBanner';
                banner.style.cssText = 'position:fixed;top:26px;left:50%;transform:translateX(-50%);background:rgba(153,27,27,0.95);border:2px solid #f87171;color:#ffffff;padding:10px 22px;border-radius:999px;font-weight:bold;font-size:13px;letter-spacing:1px;z-index:10000;box-shadow:0 0 25px rgba(225,29,72,0.9);text-align:center;';
                banner.textContent = " BURJ KHALIFA SECURITY LOCKDOWN !  TYPE 'LOCKDOWN' TO LIFT";
                document.body.appendChild(banner);
            }
            playBeep(440, 0.2, 'sawtooth', 0.06);
            lockdownTimer = setInterval(() => playBeep(330, 0.12, 'sawtooth', 0.04), 2000);
        } else {
            if (vignette) vignette.remove();
            if (banner) banner.remove();
            clearInterval(lockdownTimer);
            lockdownTimer = null;
            playBeep(660, 0.15, 'sine', 0.05);
        }
    }
    function startAudioControls() {
        const muteBtn = document.createElement('button');
        muteBtn.type = 'button';
        muteBtn.className = 'audio-toggle-btn';

        function syncMuteUI() {
            muteBtn.textContent = STATE.soundMuted ? '' : '';
            muteBtn.title = STATE.soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects';
            muteBtn.classList.toggle('is-muted', STATE.soundMuted);
        }

        syncMuteUI();
        document.body.appendChild(muteBtn);

        muteBtn.addEventListener('click', () => {
            STATE.soundMuted = !STATE.soundMuted;
            localStorage.setItem('afcsSoundMuted', STATE.soundMuted);
            syncMuteUI();
            if (!STATE.soundMuted) playBeep(580, 0.08, 'sine', 0.05);
        });

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
            <span class="legend-item"> Class Adviser</span>
            <span class="legend-item"> Class Officer</span>
            <span class="legend-item"> Speaking Cast</span>
            <span class="legend-item"> Production Crew</span>
            <span class="legend-item"> Birthday Today</span>
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
        if (DOM.searchInput) DOM.searchInput.addEventListener('input', filterCards);

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
        const isCustomPfpActive = card.querySelector('img.is-zerotwo-pfp, img.is-carl-pfp, img.is-cortis-pfp, img.is-kobe-pfp, img.is-vox-pfp, img.is-alastor-pfp, img.is-newton-pfp');
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

        if (wasOpen) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
            STATE.onClosePanel.forEach(fn => fn());
        }
    }

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

        const waveBtn = document.createElement('button');
        waveBtn.type = 'button';
        waveBtn.className = 'scripture-btn wave-toggle-btn';
        waveBtn.style.backdropFilter = 'blur(10px)';

        function syncWaveState(mode) {
            document.body.classList.toggle('waves-paused', mode === 1);
            document.body.classList.toggle('waves-hidden', mode === 2);

            if (mode === 0) {
                waveBtn.textContent = ' Stop Wave Motion';
                waveBtn.title = 'Pause background wave motion';
            } else if (mode === 1) {
                waveBtn.textContent = ' Hide Waves';
                waveBtn.title = 'Remove background waves completely';
            } else {
                waveBtn.textContent = ' Show Waves';
                waveBtn.title = 'Restore animated background waves';
            }
        }

        let savedMode = localStorage.getItem('afcs_waves_mode');
        if (savedMode === null) {
            savedMode = localStorage.getItem('afcs_waves_paused') === 'true' ? '1' : '0';
        }
        let waveMode = Number(savedMode) || 0;
        syncWaveState(waveMode);

        waveBtn.addEventListener('click', () => {
            waveMode = (waveMode + 1) % 3;
            localStorage.setItem('afcs_waves_mode', String(waveMode));
            localStorage.setItem('afcs_waves_paused', String(waveMode === 1));
            syncWaveState(waveMode);

            const tones = new Array(480, 360, 620);
            playBeep(tones[waveMode], 0.06, 'sine', 0.03);
        });

        document.body.appendChild(waveBtn);
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

        const bodies = getCards().map(card => {
            const wrapper = card.parentElement || card;
            wrapper.style.transition = 'none';
            return { card, wrapper, x: 0, y: 0, vx: 0, vy: 0, rx: 0, ry: 0, vrx: 0, vry: 0, scale: 1, vScale: 0, grav: 0, tilting: false };
        });

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

                const rect = b.wrapper.getBoundingClientRect();
                const radius = rect.width / 2;
                const homeX = rect.left + radius - b.x;
                const homeY = rect.top + radius - b.y;
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
                    } else if (isTouchPrimary && rect.bottom > 0 && rect.top < viewH) {
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
                    const rect = b.wrapper.getBoundingClientRect();
                    if (rect.bottom > -60 && rect.top < viewH + 60) {
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
        const revealTargets = document.querySelectorAll('.synopsis-card, .search-wrapper, .filter-bar, .faction-bar, .PersonWrapper, .teaser-footer');
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
                            void entry.target.offsetWidth;
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
                            void cardEl.offsetWidth;
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
                        void el.offsetWidth;
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

        const hud = document.createElement('div');
        hud.className = 'burj-elevator-hud';
        hud.innerHTML = `<span class="elevator-arrow" id="elevArrow">◆</span><span class="elevator-floor" id="elevFloor">FL 163</span><span class="elevator-zone" id="elevZone">• Spire</span>`;
        document.body.appendChild(hud);

        const arrowEl = hud.querySelector('#elevArrow');
        const floorEl = hud.querySelector('#elevFloor');
        const zoneEl = hud.querySelector('#elevZone');
        let lastScrollY = window.scrollY;
        let hideTimer = null;

        function getZoneName(floor) {
            if (floor >= 148) return 'At The Top SKY';
            if (floor >= 122) return 'Observation Deck';
            if (floor >= 76) return 'Sky Lobby';
            if (floor >= 38) return 'VIP Meet & Greet';
            if (floor >= 10) return 'Security Control';
            return 'Main Lobby';
        }

        function onScrollUpdate() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            let ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

            document.documentElement.style.setProperty('--scroll-dim', (1 - ratio * 0.1).toFixed(3));
            progressBar.style.width = ratio >= 0.99 ? 'calc(100vw + 20px)' : `calc(${ratio * 100}vw)`;
            topBtn.classList.toggle('visible', scrollTop > 520);
            const floor = Math.max(1, Math.round(163 - ratio * 162));
            floorEl.textContent = `FL ${String(floor).padStart(3, '0')}`;
            zoneEl.textContent = `${getZoneName(floor)}`;
            if (scrollTop > lastScrollY + 2) arrowEl.textContent = '▼';
            else if (scrollTop < lastScrollY - 2) arrowEl.textContent = '▲';
            lastScrollY = scrollTop;
            hud.classList.toggle('is-lockdown', STATE.lockdownOn);
            hud.classList.add('is-active');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                arrowEl.textContent = '◆';
                hud.classList.remove('is-active');
            }, 1200);
        }
            window.addEventListener('scroll', onScrollUpdate, { passive: true });
            onScrollUpdate();
    }
    function startNightSkyStars() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'night-sky-canvas';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        const stars = [];
        const starCount = 75;

        function resizeStars() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeStars();
        window.addEventListener('resize', resizeStars, { passive: true });

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 0.7 + Math.random() * 1.6,
                phase: Math.random() * Math.PI * 2,
                speed: 0.015 + Math.random() * 0.025,
                gold: Math.random() < 0.2
            });
        }
        
        let starLoopRunning = false;

        function drawStars() {
            if (STATE.ldmActive) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                starLoopRunning = false;
                return;
            }

            const isCornerstone = document.body.classList.contains('search-fx-cornerstone');
            const isNight = document.body.classList.contains('sky-night') && !isCornerstone;

            if (!isNight && !isCornerstone) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                starLoopRunning = false;
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const s of stars) {
                s.phase += s.speed;
                if (isCornerstone || s.gold) {
                    s.y -= isCornerstone ? 0.35 : 0.15;
                    if (s.y < -5) s.y = canvas.height + 5;
                }
                const alpha = 0.25 + ((Math.sin(s.phase) + 1) / 2) * 0.7;

                // Fast fake glow halo (10x faster than ctx.shadowBlur)
                ctx.beginPath();
                ctx.arc(s.x, s.y, (isCornerstone ? s.r * 2.6 : s.r * 2.1), 0, Math.PI * 2);
                ctx.fillStyle = isCornerstone
                    ? `rgba(250, 204, 21, ${(alpha * 0.22).toFixed(3)})`
                    : `rgba(56, 189, 248, ${(alpha * 0.18).toFixed(3)})`;
                ctx.fill();

                // Crisp star core
                ctx.beginPath();
                ctx.arc(s.x, s.y, isCornerstone ? s.r * 1.2 : s.r, 0, Math.PI * 2);
                ctx.fillStyle = isCornerstone
                    ? `rgba(254, 249, 195, ${alpha.toFixed(3)})`
                    : `rgba(186, 230, 253, ${alpha.toFixed(3)})`;
                ctx.fill();
            }
            requestAnimationFrame(drawStars);
        }

        window.wakeStarCanvas = function () {
            if (!starLoopRunning && !STATE.ldmActive) {
                starLoopRunning = true;
                requestAnimationFrame(drawStars);
            }
        };
        window.wakeStarCanvas();

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
        calBtn.textContent = ' Save Dec 15 Showtime to Calendar';
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
                calBtn.textContent = ' Save Dec 15 Showtime to Calendar';
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

        const targetDate = new Date('2026-12-15T18:00:00').getTime();

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

        let cheatBuffer = '';
        let faithianBuffer = '';
        let doomBuffer = '';
        let lockdownBuffer = '';
        const konamiSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
        let konamiStep = 0;
        let isCascading = false;

        function runKonamiCascade() {
            const visible = getVisibleCards();
            if (!visible.length || isCascading) return;
            isCascading = true;

            const prevActive = document.querySelector('.PeoplePics.active');
            if (prevActive) prevActive.classList.remove('active');

            visible.forEach((card, idx) => {
                setTimeout(() => {
                    card.classList.add('active');
                    playBeep(380 + (idx % 12) * 45, 0.08, 'triangle', 0.03);
                    setTimeout(() => {
                        card.classList.remove('active');
                        if (idx === visible.length - 1) {
                            if (prevActive) prevActive.classList.add('active');
                            isCascading = false;
                        }
                    }, 450);
                }, idx * 150);
            });
        }

        window.addEventListener('keydown', (e) => {
            const openModals = document.querySelectorAll('.vip-modal-overlay.active');
            if (openModals.length > 0) {
                if (e.key === 'Escape') openModals.forEach(m => m.classList.remove('active'));
                return;
            }

            if (e.key === 'Escape') {
                cheatBuffer = '';
                doomBuffer = '';
                lockdownBuffer = '';
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

            const konamiKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            if (konamiKey === konamiSeq.at(konamiStep)) {
                konamiStep++;
                playBeep(320 + konamiStep * 35, 0.04, 'sine', 0.025);
                if (konamiStep === konamiSeq.length) {
                    konamiStep = 0;
                    runKonamiCascade();
                }
            } else {
                konamiStep = konamiKey === konamiSeq.at(0) ? 1 : 0;
            }

            if (e.key.length === 1) {
                const pressed = e.key.toUpperCase();
                const targetCheat = 'C:\\AFCS2026';
                const targetFaithian = 'D:\\FAITHIAN';
                const targetDoom = 'AVENGERS\\DOOMSDAY';
                const targetLockdown = 'LOCKDOWN';
                const wasLockdown = lockdownBuffer.length > 0;

                if (pressed === targetLockdown.charAt(lockdownBuffer.length)) {
                    lockdownBuffer += pressed;
                    playBeep(240, 0.04, 'triangle', 0.03);
                    if (lockdownBuffer === targetLockdown) {
                        lockdownBuffer = '';
                        cheatBuffer = '';
                        faithianBuffer = '';
                        doomBuffer = '';
                        toggleLockdownMode();
                        return;
                    }
                } else {
                    lockdownBuffer = pressed === 'L' ? 'L' : '';
                }

                if (!wasLockdown && pressed === targetDoom.charAt(doomBuffer.length)) {
                    doomBuffer += pressed;
                    if (doomBuffer.length > 3) {
                        playBeep(180 + doomBuffer.length * 14, 0.035, 'triangle', 0.025);
                    }
                    if (doomBuffer === targetDoom) {
                        doomBuffer = '';
                        cheatBuffer = '';
                        faithianBuffer = '';
                        lockdownBuffer = '';
                        unlockDoomsdayTheme();
                    }
                } else if (!wasLockdown) {
                    doomBuffer = pressed === 'A' ? 'A' : '';
                } else {
                    doomBuffer = '';
                }

                if (!wasLockdown && pressed === targetFaithian.charAt(faithianBuffer.length)) {
                    faithianBuffer += pressed;
                    if (faithianBuffer.length > 3) {
                        playBeep(330 + faithianBuffer.length * 22, 0.04, 'sine', 0.03);
                    }
                    if (faithianBuffer === targetFaithian) {
                        faithianBuffer = '';
                        cheatBuffer = '';
                        doomBuffer = '';
                        lockdownBuffer = '';
                        unlockFaithianTheme();
                    }
                } else if (!wasLockdown) {
                    faithianBuffer = pressed === 'D' ? 'D' : '';
                } else {
                    faithianBuffer = '';
                }

                if (!wasLockdown && pressed === targetCheat.charAt(cheatBuffer.length)) {
                    cheatBuffer += pressed;
                    triggerScreenGlitch();
                    if (cheatBuffer === targetCheat) {
                        cheatBuffer = '';
                        faithianBuffer = '';
                        doomBuffer = '';
                        lockdownBuffer = '';
                        togglePartyMode();
                    }
                } else if (!wasLockdown) {
                    cheatBuffer = pressed === 'C' ? 'C' : '';
                } else {
                    cheatBuffer = '';
                }
            }
        });
    }
    function startSearchSecrets() {
        if (!DOM.searchInput) return;

        let lastTriggered = '';
        let dubaiTimer = null;

        const themePill = document.createElement('button');
        const themeQuotes = {
            blue: [
                'Midnight Blue !  Above the Burj Khalifa Sky!',
                '828 Meters High !  Welcome to Dubai!',
                'Beyond The Manger: When Faith Becomes the Key'
            ],
            gold: [
                'Jesus Christ, Our Chief Cornerstone!',
                'Built on the Rock !  Ephesians 2:20',
                ' We Rise Because Christ Is Our Foundation!'
            ],
            neon: [
                ' REACTOR ONLINE // C:\\AFCS2026 OVERRIDE',
                ' CORE TEMPERATURE STABLE !  GRADE 7 PSALMS',
                ' SYSTEM BREACH: NEON PROTOCOL ENGAGED'
            ],
            doomsday: [
                ' MULTIVERSE INCURSION // DOOMSDAY EMERALD',
                ' FOOT DIVE! !  DOOM REIGNS SUPREME',
                ' LATVERIAN PROTOCOL ACTIVATED'
            ],
            faithian: [
                'CALLED FOR A PURPOSE // GO FAITHIANS!',
                'ANTIPOLO FAITH CHRISTIAN SCHOOL !  GRADE 7 PSALMS',
                'FAITH, EXCELLENCE & SERVICE!'
            ],
            hamilton: [
                '★ I am not throwing away My Shot!',
                '★ History Has Its Eyes on You...',
                '★ Who\'ll Live, Who\'ll Die, Who\'ll Tell Your Story...',
                '★ Rise Up!',
                '★ Look around, look around, at how lucky we are...',
                '★ I imagine Death so much it feels like a memory...',
                '★ Dying is easy, young man, living is harder.',
                '★ Why do you write like you\'re running out of time?',
                '★ Talk less. Smile more.',
                '★ Awesome. Wow.',
                '★ You gotta Wait for It...',
                '★ John Adams?'
            ],
            epic: [
                'Ruthlessness Is Mercy Upon Ourselves!',
                'I\'m Just a Man...',
                'Full Speed Ahead',
                'Thunder Bringer',
                'We are Warriors of the Mind...',
                'Keep Your Friends Close and Your Enemies Closer!',
                'I Wanna Be Legendary!',
                'When does a man become a monster...?',
                'Greet the World With Open Arms!',
                '600 Men!',
                'All I Hear Are Screams...'
            ],
            murderdrones: [
                ' ABSOLUTE SOLVER',
                ' Bite Me!',
                ' I Love Doing Anything!',
                ' Copper-9 Core Collapse Imminent...',
                ' Callback Ping... [NULL]',
                ' Disassembly Required',
                ' Get Snuck up On =3',
                ' BITE ME!',
                ' I wanna frickin\' ninja star!',
                ' Hi, N! :3',
                ' [SOLVER_CENSORED // ERROR 406]'

            ]
        };

        const lastQuoteByMode = {};

        function triggerThemeAnnouncement(mode) {
            const pool = themeQuotes[mode];
            if (!pool || !pool.length) return;

            let quote = pool[Math.floor(Math.random() * pool.length)];
            if (pool.length > 1 && quote === lastQuoteByMode[mode]) {
                const nextIndex = (pool.indexOf(quote) + 1) % pool.length;
                quote = pool[nextIndex];
            }
            lastQuoteByMode[mode] = quote;

            document.querySelectorAll('.theme-announce-banner').forEach(el => el.remove());

            const isCensoredGlitch = mode === 'murderdrones' && quote === ' [SOLVER_CENSORED // ERROR 406]';
            const banner = document.createElement('div');
            banner.className = `theme-announce-banner is-${mode}`;
            banner.textContent = quote;
            document.body.appendChild(banner);

            if (isCensoredGlitch) {
                banner.classList.add('is-solver-censor');
                triggerScreenGlitch(220);
                setTimeout(() => triggerScreenGlitch(260), 160);
                setTimeout(() => triggerScreenGlitch(300), 340);

                [120, 95, 160, 75, 210].forEach((freq, idx) => {
                    setTimeout(() => playBeep(freq, 0.09, 'sawtooth', 0.075), idx * 95);
                });

                const cx = window.innerWidth / 2;
                const cy = 102;
                spawnBurst(cx, cy, ['#ef4444', '#facc15', '#c084fc', '#ffffff'], 34);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                setTimeout(() => {
                    if (!banner.isConnected) return;
                    banner.textContent = 'Lamb Frickin\' daaa it.';
                    banner.classList.remove('is-solver-censor');
                    banner.classList.add('is-solver-fixed');
                    playBeep(523.25, 0.1, 'triangle', 0.05);
                    setTimeout(() => playBeep(659.25, 0.14, 'triangle', 0.05), 80);
                }, 720);
            }

            setTimeout(() => banner.remove(), isCensoredGlitch ? 3200 : 2600);
        }
        themePill.type = 'button';
        themePill.className = 'theme-mode-pill';
        const searchWrap = DOM.searchInput.closest('.search-wrapper');
        if (searchWrap) searchWrap.insertAdjacentElement('afterend', themePill);

       function getUnlockedThemes() {
            const list = ['blue'];
            if (localStorage.getItem('afcs_cornerstone_unlocked') === 'true') list.push('gold');
            if (localStorage.getItem('afcs_neon_unlocked') === 'true') list.push('neon');
            if (localStorage.getItem('afcs_doomsday_unlocked') === 'true') list.push('doomsday');
            if (localStorage.getItem('afcs_faithian_unlocked') === 'true') list.push('faithian');
            if (localStorage.getItem('afcs_hamilton_unlocked') === 'true') list.push('hamilton');
            if (localStorage.getItem('afcs_epic_unlocked') === 'true') list.push('epic');
            if (localStorage.getItem('afcs_murderdrones_unlocked') === 'true') list.push('murderdrones');
            return list;
        }

        function getCurrentTheme() {
            if (document.body.classList.contains('theme-murderdrones')) return 'murderdrones';
            if (document.body.classList.contains('theme-epic')) return 'epic';
            if (document.body.classList.contains('theme-hamilton')) return 'hamilton';
            if (document.body.classList.contains('theme-faithian')) return 'faithian';
            if (document.body.classList.contains('theme-doomsday')) return 'doomsday';
            if (STATE.partyModeOn) return 'neon';
            if (document.body.classList.contains('search-fx-cornerstone')) return 'gold';
            return 'blue';
        }

        function applyTheme(mode, silent = false) {
            localStorage.setItem('afcs_active_theme', mode);
            document.body.classList.remove('theme-murderdrones', 'theme-epic', 'theme-hamilton', 'theme-faithian', 'theme-doomsday', 'search-fx-cornerstone', 'search-fx-dubai');

            if (mode === 'murderdrones') {
                if (STATE.partyModeOn) togglePartyMode(false);
                document.body.classList.add('theme-murderdrones');
            } else if (mode === 'epic') {
                if (STATE.partyModeOn) togglePartyMode(false);
                document.body.classList.add('theme-epic');
            } else if (mode === 'hamilton') {
                if (STATE.partyModeOn) togglePartyMode(false);
                document.body.classList.add('theme-hamilton');
            } else if (mode === 'faithian') {
                if (STATE.partyModeOn) togglePartyMode(false);
                document.body.classList.add('theme-faithian');
            } else if (mode === 'doomsday') {
                if (STATE.partyModeOn) togglePartyMode(false);
                document.body.classList.add('theme-doomsday');
            } else if (mode === 'neon') {
                if (!STATE.partyModeOn) togglePartyMode(true);
            } else {
                if (STATE.partyModeOn) togglePartyMode(false);
                document.body.classList.toggle('search-fx-cornerstone', mode === 'gold');
            }
            syncThemePill();
            if (!silent) triggerThemeAnnouncement(mode);
        }
        window.applySecretTheme = applyTheme;

        function syncThemePill() {
            const unlocked = getUnlockedThemes();
            const current = getCurrentTheme();
            themePill.classList.toggle('is-unlocked', unlocked.length > 1);
            themePill.classList.toggle('is-blue', current === 'blue');
            themePill.classList.toggle('is-neon', current === 'neon');
            themePill.classList.toggle('is-doomsday', current === 'doomsday');
            themePill.classList.toggle('is-faithian', current === 'faithian');
            themePill.classList.toggle('is-hamilton', current === 'hamilton');
            themePill.classList.toggle('is-epic', current === 'epic');
            themePill.classList.toggle('is-murderdrones', current === 'murderdrones');

            if (current === 'murderdrones') themePill.textContent = ' Theme: Absolute Solver ⇄';
            else if (current === 'epic') themePill.textContent = ' Theme: Epic Odyssey ⇄';
            else if (current === 'hamilton') themePill.textContent = '★ Theme: Hamilton Gold ⇄';
            else if (current === 'faithian') themePill.textContent = ' Theme: AFCS Faithian ⇄';
            else if (current === 'doomsday') themePill.textContent = ' Theme: Doomsday Emerald ⇄';
            else if (current === 'neon') themePill.textContent = ' Theme: Reactor Neon ⇄';
            else if (current === 'gold') themePill.textContent = ' Theme: Cornerstone Gold ⇄';
            else themePill.textContent = ' Theme: Midnight Blue ⇄';
        }

               window.syncThemePill = syncThemePill;

        const savedTheme = localStorage.getItem('afcs_active_theme');
        if (savedTheme === 'gold' && localStorage.getItem('afcs_cornerstone_unlocked') === 'true') {
            applyTheme('gold', true);
        } else if (savedTheme === 'neon' && localStorage.getItem('afcs_neon_unlocked') === 'true') {
            applyTheme('neon', true);
        } else if (savedTheme === 'doomsday' && localStorage.getItem('afcs_doomsday_unlocked') === 'true') {
            applyTheme('doomsday', true);
        } else if (savedTheme === 'faithian' && localStorage.getItem('afcs_faithian_unlocked') === 'true') {
            applyTheme('faithian', true);
        } else if (savedTheme === 'hamilton' && localStorage.getItem('afcs_hamilton_unlocked') === 'true') {
            applyTheme('hamilton', true);
        } else if (savedTheme === 'epic' && localStorage.getItem('afcs_epic_unlocked') === 'true') {
            applyTheme('epic', true);
        } else if (savedTheme === 'murderdrones' && localStorage.getItem('afcs_murderdrones_unlocked') === 'true') {
            applyTheme('murderdrones', true);
        } else {
            syncThemePill();
        }

        themePill.addEventListener('click', () => {
            const unlocked = getUnlockedThemes();
            const current = getCurrentTheme();
            const nextMode = unlocked[(unlocked.indexOf(current) + 1) % unlocked.length];
            applyTheme(nextMode);

            const rect = themePill.getBoundingClientRect();
            const burstColors = nextMode === 'epic'
                ? ['#38bdf8', '#facc15', '#ef4444', '#ffffff']
                : nextMode === 'hamilton'
                    ? ['#facc15', '#fef3c7', '#18181b']
                    : nextMode === 'faithian'
                        ? ['#ef4444', '#2563eb', '#ffffff', '#facc15']
                        : nextMode === 'doomsday'
                            ? ['#10b981', '#a7f3d0', '#ffffff']
                            : nextMode === 'neon'
                                ? ['#00ff66', '#00bcff', '#ffffff']
                                : nextMode === 'gold'
                                    ? ['#facc15', '#fef08a', '#fb923c']
                                    : ['#38bdf8', '#0284c7', '#bae6fd'];

            spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, burstColors, 20);
            if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
            playBeep(nextMode === 'epic' ? 440 : nextMode === 'hamilton' ? 587.33 : nextMode === 'faithian' ? 659.25 : nextMode === 'neon' ? 880 : nextMode === 'gold' ? 783.99 : 523.25, 0.12, 'triangle', 0.045);
        });

        function burstFromSearch(colors) {
            const rect = DOM.searchInput.getBoundingClientRect();
            spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, colors, 24);
            if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
        }

        function popSearchSticker(text, className, duration = 1100) {
            const rect = DOM.searchInput.getBoundingClientRect();
            const el = document.createElement('div');
            el.className = className;
            el.textContent = text;
            el.style.left = `${rect.left + rect.width / 2}px`;
            el.style.top = `${rect.top}px`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), duration);
        }

        DOM.searchInput.addEventListener('input', () => {
            const val = DOM.searchInput.value.toLowerCase().trim();
            if (!val) {
                lastTriggered = '';
                return;
            }

            if (val === 'clear') {
                lastTriggered = '';
                clearTimeout(dubaiTimer);
                document.body.classList.remove('search-fx-dubai');
                applyTheme('blue');
                burstFromSearch(['#38bdf8', '#0284c7', '#bae6fd']);
                playBeep(587.33, 0.08, 'sine', 0.04);
                setTimeout(() => playBeep(440.00, 0.12, 'sine', 0.04), 70);
                DOM.searchInput.value = '';
                filterCards();
                return;
            }

            if ((val === 'cornerstone' || val === 'faith' || val === 'manger') && lastTriggered !== 'cornerstone') {
                lastTriggered = 'cornerstone';
                clearTimeout(dubaiTimer);
                localStorage.setItem('afcs_cornerstone_unlocked', 'true');
                applyTheme('gold');
                burstFromSearch(['#facc15', '#fef08a', '#fb923c']);
                playBeep(523.25, 0.14, 'triangle', 0.045);
                setTimeout(() => playBeep(659.25, 0.14, 'triangle', 0.045), 90);
                setTimeout(() => playBeep(783.99, 0.22, 'triangle', 0.05), 180);
                DOM.searchInput.value = '';
                filterCards();
            } else if ((val === 'dubai' || val === 'burj') && lastTriggered !== 'dubai') {
                lastTriggered = 'dubai';
                document.body.classList.add('search-fx-dubai');
                burstFromSearch(['#fb923c', '#f59e0b', '#38bdf8']);
                playBeep(392.00, 0.16, 'sine', 0.045);
                setTimeout(() => playBeep(587.33, 0.22, 'sine', 0.045), 110);
                clearTimeout(dubaiTimer);
                dubaiTimer = setTimeout(() => document.body.classList.remove('search-fx-dubai'), 4500);
            } else if ((val === '7psalms' || val === 'psalms') && lastTriggered !== 'psalms') {
                lastTriggered = 'psalms';
                burstFromSearch(['#38bdf8', '#facc15', '#f472b6', '#34d399']);
                [440, 554.37, 659.25, 880].forEach((f, idx) => setTimeout(() => playBeep(f, 0.12, 'sine', 0.04), idx * 65));
            } else if (val === 'merikurisumasu' && lastTriggered !== 'merikurisumasu') {
                lastTriggered = 'merikurisumasu';
                popSearchSticker('メリークリスマス! ', 'quirk-manga-bubble', 1300);
                burstFromSearch(['#ffffff', '#38bdf8', '#bae6fd']);
                playBeep(587.33, 0.07, 'sine', 0.04);
                setTimeout(() => playBeep(783.99, 0.12, 'sine', 0.04), 80);
            } else if (val === 'checkmate' && lastTriggered !== 'checkmate') {
                lastTriggered = 'checkmate';
                popSearchSticker('♞', 'quirk-star-glow', 1100);
                burstFromSearch(['#facc15', '#ffffff']);
                playBeep(310, 0.05, 'triangle', 0.05);
                setTimeout(() => playBeep(190, 0.08, 'square', 0.06), 140);
            } else if (val === 'blackout' && lastTriggered !== 'blackout') {
                lastTriggered = 'blackout';
                const veil = document.createElement('div');
                veil.className = 'quirk-stage-blackout';
                document.body.appendChild(veil);
                playBeep(140, 0.25, 'sine', 0.05);
                setTimeout(() => veil.remove(), 1400);
            } else if ((val === 'nativity' || val === 'lantern') && lastTriggered !== 'nativity') {
                lastTriggered = 'nativity';
                popSearchSticker('', 'quirk-star-glow', 1200);
                burstFromSearch(['#fef08a', '#facc15', '#fbbf24']);
                [587.33, 739.99, 880.00, 1174.66].forEach((f, idx) => setTimeout(() => playBeep(f, 0.16, 'sine', 0.035), idx * 75));
            } else if (val === 'my shot' && lastTriggered !== 'hamilton') {
                lastTriggered = 'hamilton';
                clearTimeout(dubaiTimer);
                localStorage.setItem('afcs_hamilton_unlocked', 'true');
                applyTheme('hamilton');
                popSearchSticker('★ Alexander Hamilton!', 'quirk-star-glow', 1300);
                burstFromSearch(['#facc15', '#fef3c7', '#d97706', '#ffffff']);
                const hamiltonNotes = [293.66, 329.63, 369.99, 440.00, 587.33];
                hamiltonNotes.forEach((f, idx) => {
                    setTimeout(() => playBeep(f, idx === 4 ? 0.35 : 0.14, 'triangle', 0.05), idx * 110);
                });
                DOM.searchInput.value = '';
                filterCards();
            } else if ((val === 'just a man' || val === 'i\'m just a man' || val === 'im just a man') && lastTriggered !== 'epic') {
                lastTriggered = 'epic';
                clearTimeout(dubaiTimer);
                localStorage.setItem('afcs_epic_unlocked', 'true');
                applyTheme('epic');
                popSearchSticker(' Ruthlessness Is Mercy!', 'quirk-star-glow', 1350);
                burstFromSearch(['#38bdf8', '#facc15', '#ef4444', '#ffffff']);
                const epicNotes = [110.00, 164.81, 220.00, 261.63, 329.63, 440.00];
                epicNotes.forEach((f, idx) => {
                    setTimeout(() => playBeep(f, idx === 5 ? 0.45 : 0.16, 'sawtooth', 0.045), idx * 95);
                });
                DOM.searchInput.value = '';
                filterCards();
            }
             else if ((val === 'murder drones' || val === 'absolute solver' || val === 'uzi') && lastTriggered !== 'murderdrones') {
                lastTriggered = 'murderdrones';
                clearTimeout(dubaiTimer);
                localStorage.setItem('afcs_murderdrones_unlocked', 'true');
                applyTheme('murderdrones');
                triggerScreenGlitch(140);
                burstFromSearch(['#facc15', '#c084fc', '#000000', '#ffffff']);
                const solverNotes = [146.83, 220.00, 311.13, 440.00, 622.25];
                solverNotes.forEach((f, idx) => {
                    setTimeout(() => playBeep(f, idx === 4 ? 0.38 : 0.12, 'sawtooth', 0.045), idx * 75);
                });
                DOM.searchInput.value = '';
                filterCards();
            }
        });
    }
    function startMusicalScale() {
        const targetPeople = [
            'de guzman', 'de guzman', 'clariza', 'de guzman', 'suzon', 'clariza',
            'de guzman', 'de guzman', 'clariza', 'sevilla', 'pagarigan', 'clariza',
            'de guzman', 'clariza', 'de guzman', 'suzon', 'suzon', 'tesoro',
            'suzon', 'pinpin', 'mantal', 'del rosario', 'de guzman', 'de guzman',
            'clariza', 'sevilla', 'pagarigan', 'clariza', 'de guzman'
        ];

        const studentCards = getCards().filter(c => c.dataset.role !== 'Teacher');
        if (!studentCards.length) return;

        const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
        const baseMidi = 72;

        studentCards.forEach((card, idx) => {
            const midi = Math.max(24, Math.min(108, baseMidi + idx));
            const freq = 440 * Math.pow(2, (midi - 69) / 12);
            const octave = Math.floor(midi / 12) - 1;
            card.dataset.noteFreq = freq.toFixed(2);
            card.dataset.noteLabel = `${noteNames.at(midi % 12)}${octave}`;
        });

        const tracker = document.createElement('div');
        tracker.className = 'freedom-tracker';
        tracker.style.cursor = 'pointer';
        tracker.title = 'Click to reset Freedom Motif progress';
        tracker.textContent = ` ♪ 0/${targetPeople.length}`;
        document.body.appendChild(tracker);

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'vip-modal-overlay';
        modalOverlay.innerHTML = [
            '<div class="vip-modal-card" style="border-color:#ec4899;box-shadow:0 0 40px rgba(236,72,153,0.55),0 0 70px rgba(250,204,21,0.3);">',
            '<button type="button" class="vip-close-btn">&times;</button>',
            '<div class="vip-badge" style="border-color:#facc15;color:#fde047;">★ SHADOW CRYSTAL UNLOCKED</div>',
            '<h2 style="margin:12px 0 8px 0;color:#ffffff;font-size:22px;">YOU PLAYED THE FREEDOM MOTIF!</h2>',
            '<p style="color:#fbcfe8;font-size:13.5px;line-height:1.55;margin:0 0 16px 0;">',
            'True ball knowledge detected. Now\'s your chance to be a <strong style="color:#fde047;">[[BIG SHOT]]</strong> at <strong style="color:#38bdf8;">Beyond The Manger !  Paskong AFCS 2026</strong>!',
            '</p>',
            '<button type="button" class="compare-trigger-btn" id="toggleFreedomAuraBtn" style="margin-top:0;"> Toggle Shadow Crystal Cast Aura</button>',
            '</div>'
        ].join('');
        document.body.appendChild(modalOverlay);

        modalOverlay.querySelector('.vip-close-btn').addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('active'); });
        modalOverlay.querySelector('#toggleFreedomAuraBtn').addEventListener('click', () => {
            document.body.classList.toggle('freedom-mode-active');
            playBeep(784, 0.14, 'square', 0.06);
        });

        function playVictoryFanfare() {
            const fanfare = [
                { f: 392.00, t: 0, d: 0.28 }, { f: 587.33, t: 316, d: 0.14 },
                { f: 554.37, t: 474, d: 0.14 }, { f: 587.33, t: 632, d: 0.14 },
                { f: 554.37, t: 790, d: 0.14 }, { f: 587.33, t: 948, d: 0.28 },
                { f: 587.33, t: 1264, d: 0.28 }, { f: 587.33, t: 1580, d: 0.14 },
                { f: 554.37, t: 1738, d: 0.14 }, { f: 587.33, t: 1896, d: 0.14 },
                { f: 554.37, t: 2054, d: 0.14 }, { f: 587.33, t: 2212, d: 0.35 },
                { f: 493.88, t: 2686, d: 0.42 }, { f: 329.63, t: 3160, d: 0.42 },
                { f: 392.00, t: 3634, d: 0.28 }, { f: 739.99, t: 3950, d: 0.28 },
                { f: 659.25, t: 4266, d: 0.28 }, { f: 493.88, t: 4582, d: 0.28 },
                { f: 554.37, t: 4898, d: 0.28 }, { f: 587.33, t: 5214, d: 0.85 }
            ];
            fanfare.forEach(n => setTimeout(() => playBeep(n.f, n.d, 'square', 0.06), n.t));
        }

        let stepIdx = 0;
        let unlocked = false;

        tracker.addEventListener('click', () => {
            unlocked = false;
            stepIdx = 0;
            document.body.classList.remove('freedom-mode-active');
            tracker.classList.remove('is-combo', 'is-unlocked');
            tracker.textContent = ` ♪ 0/${targetPeople.length}`;
        });

        studentCards.forEach(card => {
            let activeRelease = null;

            function handlePressStart(e) {
                if (e.button !== undefined && e.button !== 0) return;
                if (activeRelease) activeRelease();

                activeRelease = startSustainedNote(Number(card.dataset.noteFreq), 'triangle');
                if (unlocked) return;

                const cardText = card.querySelector('.overlay-text').textContent.toLowerCase();
                if (cardText.includes(targetPeople.at(stepIdx))) stepIdx++;
                else if (cardText.includes(targetPeople.at(0))) stepIdx = 1;
                else stepIdx = 0;

                tracker.textContent = ` ${card.dataset.noteLabel} • ${stepIdx}/${targetPeople.length}`;
                tracker.classList.toggle('is-combo', stepIdx >= 3);

                if (stepIdx === targetPeople.length) {
                    unlocked = true;
                    tracker.classList.remove('is-combo');
                    tracker.classList.add('is-unlocked');
                    tracker.textContent = '★ FREEDOM MOTIF!';
                    document.body.classList.add('freedom-mode-active');
                    setTimeout(() => {
                        playVictoryFanfare();
                        modalOverlay.classList.add('active');
                    }, 220);
                }
            }

            function handlePressEnd() {
                if (activeRelease) {
                    activeRelease();
                    activeRelease = null;
                }
            }

            card.addEventListener('pointerdown', handlePressStart);
            card.addEventListener('pointerup', handlePressEnd);
            card.addEventListener('pointerleave', handlePressEnd);
            card.addEventListener('pointercancel', handlePressEnd);
        });
    }
    function startCharacterInteractions() {
        const cards = getCards();
        if (!cards.length) return;

        function spawnBadge(card, text, className, duration = 900) {
            const rect = card.getBoundingClientRect();
            const el = document.createElement('div');
            el.className = className;
            el.textContent = text;
            el.style.left = `${rect.left + rect.width / 2}px`;
            el.style.top = `${rect.top + rect.height / 2}px`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), duration);
        }

        const bobbySecCard = cards.find(c => {
            const txt = c.querySelector('.overlay-text').textContent.toLowerCase();
            return txt.includes('operaña') || txt.includes('operana');
        });
        const vollowSecCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('sevilla'));

        function triggerWalkieTalkie(senderCard, receiverCard, lines) {
            if (!senderCard) return;
            const line = lines[Math.floor(Math.random() * lines.length)];
            spawnBadge(senderCard, line, 'quirk-radio-bubble', 1300);

            playBeep(1380, 0.045, 'sine', 0.03);
            setTimeout(() => playBeep(1760, 0.06, 'sine', 0.03), 55);

            if (receiverCard && !receiverCard.classList.contains('is-filtered-out')) {
                receiverCard.classList.add('quirk-radio-ping');
                setTimeout(() => receiverCard.classList.remove('quirk-radio-ping'), 900);
            }
        }

        if (bobbySecCard) {
            bobbySecCard.addEventListener('click', () => {
                triggerWalkieTalkie(bobbySecCard, vollowSecCard, [
                    '*ksssh* Bobby to Vollow, all clear!',
                    '*ksssh* Vollow, do you copy?',
                    '*ksssh* Have the Perimeters been secured, Vollow?',
                    '*ksssh* Vollow, are the Artists all safe?',
                    '*ksssh* Tech cues ready, over!',
                    '*ksssh* Watch the VIP doors, Vollow!'
                ]);
            });
        }

         if (vollowSecCard) {
            const ethanImg = vollowSecCard.querySelector('img');
            const voxSrc = 'otherPics/Vox.jpg';
            const alastorSrc = 'otherPics/Alastor.jpg';

            const voxLines = [
                ' VoxTek: Trust US with your security!',
                ' WELCOME HOME! Stay tuned to the broadcast, Ethan!',
                ' Now THAT’S good television!',
                ' I’m gonna make you wish that I’d stayed gone!',
                ' Don’t touch that dial! VoxTek controls every camera in the Burj Khalifa!',
                ' Upgrade your signal! Out with the old, in with the VOX!',
                ' *static buzz* Watching every single floor from the control room...',
                'Trust us with your weather, your security, and your December 15 showtime!',
                'Check your reception! Nobody leaves the broadcast without my say-so!',
                'Pure VoxTek perfection!',
                ' Live from the highest tower in the world—and you have a front-row seat, Ethan!',
                ' *screen flicker* Are you really going to take the stairs? Let’s make this entertaining!',
                ' Ratings are through the roof! Literally!',
                ' Smile for the security feed! VoxTek sees everything from floor one to the spire!',
                ' Breaking news: Ethan thinks he can outsmart the network! Let’s see how that plays out!',
                ' *electrical crackle* Why fight the future when you can just tune in?',
                ' One hundred and sixty floors of pure, uninterrupted VoxTek programming!',
                ' Don’t even think about pulling the plug! I’m hardwired into the whole building!',
                ' Mark your calendar for December 15—the season finale is going to be electric!',
                ' *manic static laugh* You’re trending right now, Ethan! Keep running!',
                ' *camera zoom whir* Oh, nice move, Ethan! Replay that in slow motion!',
                ' You can’t hide in the blind spots when I own the whole grid!',
                ' Look at you scrambling around like a low-budget rerun!',
                ' Every elevator, every hallway, every vent—all brought to you by VoxTek!',
                ' *glitching audio* Going somewhere? We haven’t even hit the commercial break!',
                ' Ladies and gentlemen, watch Ethan sweat in glorious 8K ultra-high definition!',
                ' The numbers are skyrocketing! Keep giving the viewers what they want!',
                ' Stay tuned after the chase for a special December 15 broadcast!',
                ' Prime time doesn’t start until I say it starts!',
                ' *upbeat jingle* VoxTek: Making your worst nightmare look great on screen!',
                ' *high-voltage hum* Care to test the building’s firewall? Go ahead, make my day!',
                ' Analog is dead, Ethan! You’re living in a digital world now!',
                ' Override denied! Nice try, though—the audience loved the effort!',
                ' From Dubai’s skyline straight to your nervous system—that’s VoxTek reach!',
                ' *sharp static pop* Oops! Did I just lock that door? My finger slipped!',
                ' *distorted laugh* You really thought you were the star of this show?!',
                ' This whole tower is my stage, and you’re just a guest star!',
                ' December 15 is going to be the highest-rated blackout in history!',
                ' No skips! No pauses! No fast-forwarding through this finale!',
                ' *screen buzzes loudly* Eyes on me, Ethan! Don’t you dare look away!',
                ' *neon hum* Every screen in Dubai is reflecting my glorious face right now!',
                ' Do you feel that static in the air, Ethan? That’s pure market dominance!',
                ' We interrupt your regularly scheduled panic for a word from our sponsor: ME!',
                ' Eight hundred and twenty-eight meters of steel, glass, and VoxTek brilliance!',
                ' *dial tone* Sorry, the number you are trying to reach has been permanently canceled!',
                ' Keep pacing back and forth! The live chat is placing bets on your next move!',
                ' You’re losing signal, Ethan! Maybe you should just surrender to the network!',
                ' *smooth jazz jingle* Please stand by while we recalibrate your inevitable defeat!',
                ' Who needs an exit strategy when you have unlimited bandwidth?!',
                ' Check the monitors! Every reflection in this tower belongs to VoxTek!',
                ' *crackling feedback* Did someone say security breach? Oh wait—that’s just my new show!',
                ' Countdown to December 15 is ticking! Don’t miss a single second of the chaos!',
                ' You’re not climbing a skyscraper, Ethan—you’re climbing my ratings chart!',
                ' *sharp zapping sound* Ah-ah-ah! Keep your hands off the main server!',
                ' Crystal clear audio, razor-sharp visuals, and zero chance of escape!',
                ' Welcome back from the break! Ethan is STILL stuck on the wrong floor!',
                ' *deep bass thrum* Feel the bass? That’s the sound of total control!',
                ' VoxTek: Trust US with your future, your freedom, and your final broadcast!',
                ' Why look out the window at the clouds when the real show is right here?!',
                ' *manic channel flipping* Action! Drama! Suspense! You’re giving me Emmy material!',
                ' System update complete: Ethan’s luck has officially expired!',
                ' *buzzing neon flicker* I’m in the wires, I’m in the walls, I’m EVERYWHERE!',
                ' Don’t bother calling for backup—I rerouted every line straight to my desk!',
                ' December 15 is going to shine brighter than the Burj Khalifa at midnight!',
                ' *sign-off chime* That’s a wrap on your dignity, Ethan! Stay tuned for more!'
            ];

           const alastorLines = [
                ' *radio static* Why, hello there! You’re never fully dressed without a smile!',
                ' Salutations! Good to be back on the air in the Burj Khalifa!',
                ' Television is such a dreadful medium—Radio is where the real magic happens!',
                ' *dial crackle* Stay tuned, folks! The show is about to begin!',
                ' Smile, my dear! You know you’re never fully dressed without one!',
                ' Let’s begin... I’m going to make you wish that I’d stayed gone!',
                ' *vintage jazz static* Watching the Security perimeter from the shadows...',
                ' A pleasure to be meeting you, quite a pleasure!',
                ' That flat-faced television couldn’t hold a candle to a classic broadcast!',
                ' *radio feedback* Keep smiling through the lockdown, Grade 7 – Psalms!',
                ' *transatlantic radio filter* Good evening, ladies and gentlemen! Are we enjoying the festivities?',
                ' No picture needed when you have a voice as captivating as mine!',
                ' *vinyl record scratch* Oh, pardon the interruption—just tuning in to your little predicament!',
                ' Turn up the volume, Grade 7 – Psalms! You wouldn’t want to miss a single note!',
                ' *microphone feedback whine* Testing, testing! Can the whole tower hear me now?',
                ' All those flashy screens and neon lights, yet zero substance! How positively pedestrian!',
                ' *amused chuckle* Vox thinks he owns the airwaves? Please, he’s merely static in the background!',
                ' Why watch a tacky picture box when you can listen to pure, unadulterated class?',
                ' *old-timey radio jingle* Another broadcast hijacked! Somebody tell that walking television to take notes!',
                ' Oh, look at those little cameras blinking—how adorably primitive!',
                ' *low ominous hum* Careful where you step in the dark, my dear... shadows have teeth!',
                ' Do not adjust your dials! There is nowhere in this skyscraper my voice cannot reach!',
                ' *canned studio laugh track* Ha! Look at them scrambling! Pure entertainment!',
                ' A little chaos keeps the blood pumping, wouldn’t you say, Ethan?',
                ' *sharp static pop* Peek-a-boo! Did you really think a locked door could keep me out?',
                ' One hundred and sixty floors of delicious pandemonium—and I have the best frequency in the house!',
                ' *swing music faintly plays* Keep your chins up, Grade 7 – Psalms! Every good drama needs a thrilling twist!',
                ' Mark the date, my friends—December 15 will be a broadcast for the history books!',
                ' From the highest spire in Dubai down to the basement, the Radio Demon is on the air!',
                ' *studio applause* Bravo, Grade 7 – Psalms! What a spirited performance so far!',
                ' Well, isn’t this a delightful little gathering? Truly, I’m positively beaming!',
                ' *cane tap echo* Mind your manners now! Nobody likes a sore loser on live radio!',
                ' Frowning ages the face terribly, my dear! Put on a proper grin!',
                ' *distorted gramophone tune* The suspense is simply delicious, isn’t it?',
                ' *sign-off static* Don’t touch that dial—our little broadcast is far from over!',
                ' *vacuum tube warm-up hum* Oh, how I adore the sound of panic echoing through the stairwells!',
                ' Keep moving, Ethan! A stagnant protagonist makes for terribly dull radio!',
                ' *cheery whistle* Nothing perks up a dreary evening quite like a good old-fashioned lockdown!',
                ' My, my, Grade 7 – Psalms! You certainly know how to keep an audience on the edge of their seats!',
                ' *harsh frequency sweep* Did someone try to jam my signal? How delightfully futile!',
                ' Why rely on pixelated screens when your imagination paints such vivid horrors?',
                ' *polite golf clap* Splendid effort, truly! Wrong hallway, of course, but splendid effort!',
                ' Eight hundred and twenty-eight meters high, and not a single place to hide from my frequency!',
                ' *brass horn flourish* And now, a brief musical intermission while you figure out your next move!',
                ' Tell that overglorified flat-screen that real power doesn’t need a charger!',
                ' *creepy music box chime* Tick-tock goes the clock, my friends! December 15 draws ever nearer!',
                ' Oh, don’t look so glum, Grade 7 – Psalms! Every tragedy is simply a comedy with better lighting!',
                ' *static burst* Pardon the interference—I was just tidying up a few loose wires in the control room!',
                ' A smile is a valuable tool, my dear! It inspires your friends, keeps your enemies guessing, and ensures that, no matter what comes your way, YOU’RE the one in control!',
                ' *echoing footsteps* Is that you sneaking around on floor ninety, Ethan? Or is it just my shadows playing tag?',
                ' *lively ragtime piano* Step lively now! The show must go on, whether you’re ready or not!',
                ' Modern technology is so fragile—one little surge and poof! Back to the golden age of radio!',
                ' *velvety radio voice* You’re listening to W-A-L-A, broadcasting chaos straight to Grade 7 – Psalms!',
                ' *sharp intake of breath* Ooh, that looked painful! Good thing this is an audio-only medium!',
                ' No contracts, no commercials, just pure, uninterrupted mayhem!',
                ' *faint howling wind* The air gets quite thin near the spire, Ethan—careful not to lose your nerve!',
                ' That walking box of wires thinks loudness equals authority. How positively amateurish!',
                ' *antique bell ding* Ding-dong! Your time to hesitate has officially expired!',
                ' Keep those pearly whites gleaming, Grade 7 – Psalms! We are live across every speaker in Dubai!',
                ' *deep distortion* Remember, my dear... I am ALWAYS listening!',
                ' *cheerful chime* What a marvelous turn of events! Even I couldn’t have scripted it better!',
                ' Running in circles again, Ethan? Perhaps you need a better radio host to guide you!',
                ' *warped tape rewind* Wait a moment—let’s hear that desperate gasp one more time!',
                ' Until December 15 arrives, consider yourselves my captive studio audience!',
                ' *final radio sign-off click* Stay tuned, stay smiling, and whatever you do... don’t turn off the radio!'
            ];


            let isAlterEgo = false;
            let lastLineIdx = -1;
            const originalEthanSrc = ethanImg ? ethanImg.getAttribute('src') : '';

            function getActivePersona() {
                if (STATE.partyModeOn) {
                    return {
                        alt: 'Alastor',
                        src: alastorSrc,
                        pfpClass: 'is-alastor-pfp',
                        quoteClass: 'panel-alastor-quote',
                        lines: alastorLines,
                        colors: ['#dc2626', '#facc15', '#000000'],
                        title: 'Click Alastor to tune the radio!'
                    };
                }
                return {
                    alt: 'Vox',
                    src: voxSrc,
                    pfpClass: 'is-vox-pfp',
                    quoteClass: 'panel-vox-quote',
                    lines: voxLines,
                    colors: ['#00f0ff', '#ff0055', '#ffffff'],
                    title: 'Click Vox to tune the broadcast!'
                };
            }

            function bindPanelBroadcastClick() {
                if (!isAlterEgo || !DOM.panelImageContainer) return;
                const drawerImg = DOM.panelImageContainer.querySelector('img');
                if (!drawerImg) return;

                const persona = getActivePersona();
                drawerImg.style.cursor = 'pointer';
                drawerImg.title = persona.title;

                if (drawerImg.dataset.broadcastBound === 'true') return;
                drawerImg.dataset.broadcastBound = 'true';

                drawerImg.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const activePersona = getActivePersona();
                    let nextIdx = Math.floor(Math.random() * activePersona.lines.length);
                    if (activePersona.lines.length > 1 && nextIdx === lastLineIdx) {
                        nextIdx = (nextIdx + 1) % activePersona.lines.length;
                    }
                    lastLineIdx = nextIdx;

                    DOM.panelBody.querySelectorAll('.panel-vox-quote, .panel-alastor-quote').forEach(el => el.remove());

                    const bubble = document.createElement('div');
                    bubble.className = `${activePersona.quoteClass} is-pop`;
                    bubble.textContent = activePersona.lines[lastLineIdx];
                    DOM.panelBody.prepend(bubble);

                    triggerScreenGlitch(95);

                    DOM.panelImageContainer.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.07) skewX(-4deg)', offset: 0.35 },
                        { transform: 'scale(1.04) skewX(4deg)', offset: 0.7 },
                        { transform: 'scale(1)' }
                    ], { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                    const rect = DOM.panelImageContainer.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, activePersona.colors, 18);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                    if (STATE.partyModeOn) {
                        playBeep(330.00, 0.08, 'sawtooth', 0.045);
                        setTimeout(() => playBeep(246.94, 0.12, 'triangle', 0.045), 65);
                    } else {
                        playBeep(740.00, 0.06, 'sawtooth', 0.04);
                        setTimeout(() => playBeep(987.77, 0.1, 'square', 0.04), 60);
                    }
                });
            }

            function syncEthanAlterEgoVisuals() {
                const monoEl = vollowSecCard.querySelector('.monogram-avatar');
                const persona = getActivePersona();

                if (isAlterEgo) {
                    if (monoEl) monoEl.style.display = 'none';
                    if (ethanImg) {
                        ethanImg.style.display = 'block';
                        ethanImg.src = persona.src;
                        ethanImg.classList.remove('is-vox-pfp', 'is-alastor-pfp');
                        ethanImg.classList.add(persona.pfpClass);
                    }
                } else {
                    if (ethanImg) {
                        ethanImg.classList.remove('is-vox-pfp', 'is-alastor-pfp');
                        if (monoEl) {
                            ethanImg.style.display = 'none';
                            monoEl.style.display = 'flex';
                        } else {
                            ethanImg.src = originalEthanSrc;
                        }
                    }
                }

                if (DOM.panel && DOM.panel.classList.contains('active') && vollowSecCard.classList.contains('active')) {
                    DOM.panelBody.querySelectorAll('.panel-vox-quote, .panel-alastor-quote').forEach(el => el.remove());
                    if (isAlterEgo) {
                        DOM.panelImageContainer.innerHTML = `<img src="${persona.src}" alt="${persona.alt}" class="${persona.pfpClass}">`;
                        bindPanelBroadcastClick();
                    } else {
                        if (monoEl) {
                            DOM.panelImageContainer.innerHTML = `<div class="panel-avatar monogram-avatar" style="width:100%;height:100%;font-size:64px;">${monoEl.textContent}</div>`;
                        } else if (ethanImg) {
                            DOM.panelImageContainer.innerHTML = `<img src="${originalEthanSrc}" alt="${vollowSecCard.querySelector('.overlay-text').textContent.trim()}">`;
                        }
                    }
                }
            }

            const partyObserver = new MutationObserver(() => {
                if (isAlterEgo) {
                    lastLineIdx = -1;
                    syncEthanAlterEgoVisuals();
                }
            });
            partyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

            STATE.onOpenCard.push((openedCard) => {
                if (openedCard === vollowSecCard && isAlterEgo) {
                    requestAnimationFrame(bindPanelBroadcastClick);
                }
                return false;
            });

            vollowSecCard.addEventListener('click', (e) => {
                if (e.detail === 1 && !isAlterEgo) {
                    triggerWalkieTalkie(vollowSecCard, bobbySecCard, [
                        '*ksssh* Copy that, Bobby. Over.',
                        '*ksssh* Bobby, the fans are inside.',
                        '*ksssh* Copy, Bobby. I have them safe.',
                        '*ksssh* Bobby, do you hear anything ticking?',
                        '*ksssh* Shadow team in position.',
                        '*ksssh* Perimeter secure, Bobby.',
                        'No one goes in, no one goes out. *ksssh*'
                    ]);
                    return;
                }

                if (e.detail !== 3) return;
                isAlterEgo = !isAlterEgo;
                lastLineIdx = -1;

                triggerScreenGlitch(130);

                vollowSecCard.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], {
                    duration: 550,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });

                setTimeout(syncEthanAlterEgoVisuals, 275);

                const persona = getActivePersona();
                const rect = vollowSecCard.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, persona.colors, 24);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isAlterEgo ? (STATE.partyModeOn ? 330.00 : 880.00) : 440.00, 0.08, 'sawtooth', 0.045);
                setTimeout(() => playBeep(isAlterEgo ? (STATE.partyModeOn ? 246.94 : 1174.66) : 329.63, 0.14, 'square', 0.045), 75);
            });
        }

        const xanderCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('ibarra'));
        if (xanderCard) {
            xanderCard.addEventListener('click', () => {
                xanderCard.classList.remove('quirk-cuber-spin');
                void xanderCard.offsetWidth;
                xanderCard.classList.add('quirk-cuber-spin');
                [440, 554, 659, 880].forEach((freq, i) => setTimeout(() => playBeep(freq, 0.045, 'square', 0.03), i * 55));
            });
        }

        const virelleCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('uba'));
        if (virelleCard) {
            virelleCard.addEventListener('click', () => {
                if (Math.floor(Math.random() * 50) !== 0) return;

                const rect = virelleCard.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const flash = document.createElement('div');
                flash.className = 'quirk-bomb-flash';
                document.body.appendChild(flash);
                document.body.classList.add('quirk-bomb-shake');

                const bombEl = document.createElement('div');
                bombEl.className = 'quirk-bomb-icon';
                bombEl.textContent = '';
                bombEl.style.left = `${cx}px`;
                bombEl.style.top = `${cy}px`;
                document.body.appendChild(bombEl);

                playBeep(110, 0.35, 'sawtooth', 0.08);
                setTimeout(() => playBeep(65, 0.45, 'square', 0.07), 60);
                spawnBurst(cx, cy, ['#fb923c', '#ef4444'], 28);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                setTimeout(() => {
                    flash.remove();
                    bombEl.remove();
                    document.body.classList.remove('quirk-bomb-shake');
                }, 650);
            });
        }

        const nakanoCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('angeles'));
        if (nakanoCard) {
            const princeImg = nakanoCard.querySelector('img');
            const zeroTwoSrc = 'otherPics/ZeroTwo.jpg';
            const zeroTwoLines = [
                'Darling~ ',
                'You came back for me, Prince? ',
                'Found you, Darling! ',
                'You are my one and only Darling, Prince~ ',
                'Ready to shine on December 15, Darling? ',
                'Clicked me again, Darling~ ',
                'You\'re my only Darling, Prince...'
            ];

            let isZeroTwo = false;
            let z2LineIdx = -1;
            const originalSrc = princeImg ? princeImg.getAttribute('src') : '';

            function renderZeroTwoDuoPanel() {
                if (!isZeroTwo || !DOM.panelImageContainer) return;

                const monoEl = nakanoCard.querySelector('.monogram-avatar');
                const princeAvatarHTML = monoEl
                    ? `<div class="monogram-avatar">${monoEl.textContent}</div>`
                    : `<img src="${originalSrc}" alt="Angeles, Prince Paulo B.">`;

                DOM.panelImageContainer.classList.add('is-duo-split');
                DOM.panelImageContainer.innerHTML = `
                    <div class="duo-avatar-slot duo-prince-slot">
                        ${princeAvatarHTML}
                    </div>
                    <div class="duo-avatar-slot duo-zerotwo-slot" id="zeroTwoDuoTrigger" title="Click Zero Two!">
                        <span class="zerotwo-claim-bubble">He's my Husband... </span>
                        <img src="${zeroTwoSrc}" alt="Zero Two" class="is-zerotwo-pfp">
                    </div>
                `;

                const z2Trigger = DOM.panelImageContainer.querySelector('#zeroTwoDuoTrigger');
                if (!z2Trigger) return;

                z2Trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let nextIdx = Math.floor(Math.random() * zeroTwoLines.length);
                    if (zeroTwoLines.length > 1 && nextIdx === z2LineIdx) {
                        nextIdx = (nextIdx + 1) % zeroTwoLines.length;
                    }
                    z2LineIdx = nextIdx;

                    let bubble = DOM.panelBody.querySelector('.panel-zerotwo-quote');
                    if (!bubble) {
                        bubble = document.createElement('div');
                        bubble.className = 'panel-zerotwo-quote';
                        DOM.panelBody.prepend(bubble);
                    }

                    bubble.textContent = ` "${zeroTwoLines[z2LineIdx]}"`;
                    bubble.classList.remove('is-pop');
                    void bubble.offsetWidth;
                    bubble.classList.add('is-pop');

                    z2Trigger.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.09) rotate(-4deg)', offset: 0.4 },
                        { transform: 'scale(1)' }
                    ], { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                    const rect = z2Trigger.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#f472b6', '#ef4444', '#ffffff'], 16);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    playBeep(659.25, 0.07, 'sine', 0.04);
                    setTimeout(() => playBeep(880.00, 0.11, 'triangle', 0.04), 70);
                });
            }

            STATE.onOpenCard.push((openedCard) => {
                requestAnimationFrame(() => {
                    if (openedCard === nakanoCard && isZeroTwo) {
                        renderZeroTwoDuoPanel();
                    } else if (DOM.panelImageContainer) {
                        DOM.panelImageContainer.classList.remove('is-duo-split');
                    }
                });
                return false;
            });

            STATE.onClosePanel.push(() => {
                if (DOM.panelImageContainer) {
                    DOM.panelImageContainer.classList.remove('is-duo-split');
                }
            });

            nakanoCard.addEventListener('click', (e) => {
                if (e.detail === 1 && !isZeroTwo) {
                    spawnBadge(nakanoCard, 'メリークリスマス! ', 'quirk-manga-bubble', 1100);
                    playBeep(587.33, 0.07, 'sine', 0.035);
                    setTimeout(() => playBeep(783.99, 0.1, 'sine', 0.035), 75);
                }

                if (e.detail !== 3) return;
                isZeroTwo = !isZeroTwo;

                nakanoCard.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], {
                    duration: 550,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });

                setTimeout(() => {
                    const monoEl = nakanoCard.querySelector('.monogram-avatar');
                    if (isZeroTwo) {
                        if (monoEl) monoEl.style.display = 'none';
                        if (princeImg) {
                            princeImg.style.display = 'block';
                            princeImg.src = zeroTwoSrc;
                            princeImg.classList.add('is-zerotwo-pfp');
                        }
                    } else {
                        if (princeImg) {
                            princeImg.classList.remove('is-zerotwo-pfp');
                            if (monoEl) {
                                princeImg.style.display = 'none';
                                monoEl.style.display = 'flex';
                            } else {
                                princeImg.src = originalSrc;
                            }
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && nakanoCard.classList.contains('active')) {
                        if (isZeroTwo) {
                            renderZeroTwoDuoPanel();
                        } else {
                            DOM.panelImageContainer.classList.remove('is-duo-split');
                            const existingQuote = DOM.panelBody.querySelector('.panel-zerotwo-quote');
                            if (existingQuote) existingQuote.remove();
                            if (monoEl) {
                                DOM.panelImageContainer.innerHTML = `<div class="panel-avatar monogram-avatar" style="width:100%;height:100%;font-size:64px;">${monoEl.textContent}</div>`;
                            } else if (princeImg) {
                                DOM.panelImageContainer.innerHTML = `<img src="${originalSrc}" alt="Angeles, Prince Paulo B.">`;
                            }
                        }
                    }
                }, 275);

                const rect = nakanoCard.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#f472b6', '#ef4444', '#ffffff'], 22);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isZeroTwo ? 783.99 : 523.25, 0.08, 'triangle', 0.045);
                setTimeout(() => playBeep(isZeroTwo ? 1046.50 : 392.00, 0.14, 'triangle', 0.045), 75);
            });
        }

        const hazelCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('del rosario'));
        if (hazelCard) {
            const veronicaImg = hazelCard.querySelector('img');
            const carlSrc = 'otherPics/CarlGrimes.jfif';
            const carlLines = [
                'Coral!',
                'Stay back, I got this!',
                'We can still make it through, Veronica.',
                'Don\'t talk, think!',
                'We\'re the ones who live!',
                'You clicked me again... stay sharp!',
                'I\'m not dying today.',
                'Nobody else has to die anymore.',
                'Put the gun down, I\'ve got point.',
                'Always keep an eye on the perimeter, Veronica.',
                'I found another giant can of chocolate pudding!',
                'My dad taught me how to survive! we\'re ready for Dec 15!',
                'You can\'t beat the sheriff\'s hat, Veronica.',
                'No more kid stuff. Let\'s do this.',
                'Even in a Burj Khalifa lockdown, we hold the line!',
                'I\'m gonna keep you safe, no matter what.',
                'Watch the blind spots! walkers could be anywhere!',
                'Forget the mukbang, pass the chocolate pudding!',
                'Alexandria, Dubai, Antipolo! we protect our people.',
                'Still standing. Still fighting.'
            ];

            let isCarl = false;
            let carlLineIdx = -1;
            const originalVeronicaSrc = veronicaImg ? veronicaImg.getAttribute('src') : '';

            function bindPanelCarlClick() {
                if (!isCarl || !DOM.panelImageContainer) return;
                const drawerImg = DOM.panelImageContainer.querySelector('img');
                if (!drawerImg || drawerImg.dataset.carlBound === 'true') return;

                drawerImg.dataset.carlBound = 'true';
                drawerImg.style.cursor = 'pointer';
                drawerImg.title = 'Click Carl Grimes!';

                drawerImg.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let nextIdx = Math.floor(Math.random() * carlLines.length);
                    if (carlLines.length > 1 && nextIdx === carlLineIdx) {
                        nextIdx = (nextIdx + 1) % carlLines.length;
                    }
                    carlLineIdx = nextIdx;

                    let bubble = DOM.panelBody.querySelector('.panel-carl-quote');
                    if (!bubble) {
                        bubble = document.createElement('div');
                        bubble.className = 'panel-carl-quote';
                        DOM.panelBody.prepend(bubble);
                    }

                    bubble.textContent = ` "${carlLines[carlLineIdx]}"`;
                    bubble.classList.remove('is-pop');
                    void bubble.offsetWidth;
                    bubble.classList.add('is-pop');

                    DOM.panelImageContainer.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.07) rotate(3deg)', offset: 0.4 },
                        { transform: 'scale(1)' }
                    ], { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                    const rect = DOM.panelImageContainer.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#d97706', '#78350f', '#fef08a'], 16);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    playBeep(329.63, 0.08, 'triangle', 0.045);
                    setTimeout(() => playBeep(440.00, 0.12, 'triangle', 0.045), 75);
                });
            }

            STATE.onOpenCard.push((openedCard) => {
                if (openedCard === hazelCard && isCarl) {
                    requestAnimationFrame(bindPanelCarlClick);
                }
                return false;
            });

            hazelCard.addEventListener('click', (e) => {
                if (e.detail === 1 && !isCarl) {
                    spawnBadge(hazelCard, '', 'quirk-float-pop', 900);
                    playBeep(659.25, 0.06, 'triangle', 0.035);
                    setTimeout(() => playBeep(880.00, 0.09, 'triangle', 0.035), 65);
                }

                if (e.detail !== 3) return;
                isCarl = !isCarl;

                hazelCard.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], {
                    duration: 550,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });

                setTimeout(() => {
                    const monoEl = hazelCard.querySelector('.monogram-avatar');
                    if (isCarl) {
                        if (monoEl) monoEl.style.display = 'none';
                        if (veronicaImg) {
                            veronicaImg.style.display = 'block';
                            veronicaImg.src = carlSrc;
                            veronicaImg.classList.add('is-carl-pfp');
                        }
                    } else {
                        if (veronicaImg) {
                            veronicaImg.classList.remove('is-carl-pfp');
                            if (monoEl) {
                                veronicaImg.style.display = 'none';
                                monoEl.style.display = 'flex';
                            } else {
                                veronicaImg.src = originalVeronicaSrc;
                            }
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && hazelCard.classList.contains('active')) {
                        if (isCarl) {
                            DOM.panelImageContainer.innerHTML = `<img src="${carlSrc}" alt="Carl Grimes" class="is-carl-pfp">`;
                            bindPanelCarlClick();
                        } else {
                            const existingQuote = DOM.panelBody.querySelector('.panel-carl-quote');
                            if (existingQuote) existingQuote.remove();
                            if (monoEl) {
                                DOM.panelImageContainer.innerHTML = `<div class="panel-avatar monogram-avatar" style="width:100%;height:100%;font-size:64px;">${monoEl.textContent}</div>`;
                            } else if (veronicaImg) {
                                DOM.panelImageContainer.innerHTML = `<img src="${originalVeronicaSrc}" alt="${hazelCard.querySelector('.overlay-text').textContent.trim()}">`;
                            }
                        }
                    }
                }, 275);

                const rect = hazelCard.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#d97706', '#78350f', '#fef08a'], 22);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isCarl ? 440.00 : 329.63, 0.08, 'triangle', 0.045);
                setTimeout(() => playBeep(isCarl ? 587.33 : 261.63, 0.14, 'triangle', 0.045), 75);
            });
        }

        const jennCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('arles'));
        if (jennCard) {
            jennCard.addEventListener('click', () => {
                spawnBadge(jennCard, '', 'quirk-star-glow', 1000);
                playBeep(523.25, 0.1, 'sine', 0.03);
                setTimeout(() => playBeep(659.25, 0.12, 'sine', 0.03), 80);
                setTimeout(() => playBeep(1046.50, 0.18, 'sine', 0.035), 160);
            });
        }
        
        const sophieCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('suzon'));
        if (sophieCard) {
            const sophieImg = sophieCard.querySelector('img');
            const cortisGroupSrc = 'otherPics/CortisGroup.jpg';
            const cortisMembers = [
                {
                    name: 'Martin (Leader • Main Rapper)',
                    realName: 'Martin Edwards Park',
                    nationality: 'Korean-Canadian',
                    birthday: 'March 20, 2008',
                    zodiac: 'Pisces ',
                    mbti: 'ENFP',
                    emoji: '',
                    themeColor: '#FF4B4B',
                    weight: 14,
                    rarityTag: 'Member',
                    src: 'otherPics/CortisMartin.jpg',
                    songRec: 'What You Want',
                    fanTitle: 'Lead Producer of Grade 7 – Psalms',
                    line: 'Hello! We are CORTIS! Ready to Color Outside The Lines with you, Sophie!',
                    extraLines: [
                        'As leader, I promise Grade 7 – Psalms is going to have the best December 15 ever!',
                        'Tell me "What You Want," Sophie! let’s make Beyond The Manger unforgettable!',
                        'I stayed up in the studio mixing a special intro just for Sophie’s entrance!',
                        'Remember: always color outside the lines, both in music and in class!'
                    ],
                    secretNote: 'P.S. Sophie, you’re officially promoted to honorary CORTIS co-producer!',
                    funFact: 'A production prodigy who has written and produced tracks for groups like TXT and ENHYPEN.'
                },
                {
                    name: 'James (Main Dancer • Rapper)',
                    realName: 'Chao Yufan',
                    nationality: 'Thai-Taiwanese',
                    birthday: 'October 14, 2005',
                    zodiac: 'Libra ',
                    mbti: 'INTP',
                    emoji: '',
                    themeColor: '#2ECC71',
                    weight: 14,
                    rarityTag: 'Member',
                    src: 'otherPics/CortisJames.jpg',
                    songRec: 'GO!',
                    fanTitle: 'Main Choreographer for Beyond The Manger',
                    line: 'Let’s bring full energy to the stage on December 15, Sophie!',
                    extraLines: [
                        'Time to turn up the energy and "GO!" all out for Beyond The Manger!',
                        'Seeing a dedicated COER like Sophie in Grade 7 – Psalms gives me total "JoyRide" vibes!',
                        'Need a quick energy boost before December 15? Let’s run the choreography together, Sophie!',
                        'From ice hockey rinks to the CORTIS stage! nothing beats hyping up a true fan like you!'
                    ],
                    secretNote: 'P.S. Save me a front-row seat at Beyond The Manger, Sophie!',
                    funFact: 'The oldest member and performance pillar who trained in taekwondo and ice hockey before dancing.'
                },
                {
                    name: 'Juhoon (Vocalist • Visual)',
                    realName: 'Kim Ju-hoon',
                    nationality: 'South Korean',
                    birthday: 'January 3, 2008',
                    zodiac: 'Capricorn ',
                    mbti: 'ISFP',
                    emoji: '',
                    themeColor: '#3498DB',
                    weight: 44,
                    rarityTag: 'Favorite',
                    src: 'otherPics/CortisJuhoon.jpg',
                    songRec: 'FaSHioN',
                    fanTitle: 'Visual Director of COER',
                    line: 'Stay chill and shine bright at Beyond The Manger, Sophie!',
                    extraLines: [
                        'Bringing smooth R&B vibes and top-tier "FaSHioN" straight to Sophie’s screen!',
                        'Don’t stress about schoolwork! take a breather and enjoy the holiday season, Sophie!',
                        'Slow and steady wins the race, Sophie. Take your time and enjoy every moment!',
                        'Your style is already 10/10, Sophie! pure "FaSHioN" icon energy!',
                        'You pulled your bias again, Sophie. Guess we’re on the exact same wavelength today!',
                        'Even in a crowded Burj Khalifa meet-and-greet, Sophie’s COER energy stands out effortlessly.',
                        'Capricorn calm meets Grade 7 – Psalms chaos! don’t worry, Sophie, I’ve got your back!',
                        'If you ever need a calm reset before December 15, just put on some smooth R&B and breathe, Sophie.',
                        'The other members are loud, so I came by quietly just to cheer for Sophie!',
                        'Runway pose locked in! Sophie, you’re officially styled for the Paskong AFCS main stage!',
                        'Between props, rehearsals, and classes, make sure you’re getting enough rest, Sophie.',
                        'ISFP intuition says Grade 7 – Psalms is going to steal the whole show! especially you, Sophie!',
                        'A rare Juhoon check-in just for Sophie. Keep being effortlessly cool!',
                        'No rushing, no panicking! walk onto that stage on December 15 like you own the runway, Sophie!'
                    ],
                    secretNote: 'P.S. Keep shining effortlessly, Sophie. You’ve got this!',
                    funFact: 'A former youth model known for his sophisticated R&B vocals and calm, thoughtful personality.'
                },
                {
                    name: 'Seonghyeon (Main Vocalist)',
                    realName: 'Eom Sung-hyun',
                    nationality: 'South Korean',
                    birthday: 'January 13, 2009',
                    zodiac: 'Capricorn ',
                    mbti: 'INTJ',
                    emoji: '',
                    themeColor: '#2C3E50',
                    weight: 14,
                    rarityTag: 'Member',
                    src: 'otherPics/CortisSeonghyeon.jpg',
                    songRec: 'REDRED',
                    fanTitle: 'Chief Melody Maker for Sophie',
                    line: 'Writing a brand-new track just for Grade 7 – Psalms!',
                    extraLines: [
                        'If you ever need a break after class, I’ll sing a "Lullaby" just for you, Sophie!',
                        'Working on a secret remix of "REDRED" dedicated to our #1 COER, Sophie!',
                        'Every great song needs a catchy hook, and Sophie is the #1 hook of Grade 7 – Psalms!',
                        'Warming up my vocals right now so I can sing happy holidays to Sophie!'
                    ],
                    secretNote: 'P.S. Let me know which melody is stuck in your head today, Sophie!',
                    funFact: 'Known as CORTIS’s "hook machine" who helped write and produce every track on their debut EP.'
                },
                {
                    name: 'Keonho (Vocalist • Maknae)',
                    realName: 'Ahn Geon-ho',
                    nationality: 'South Korean',
                    birthday: 'February 14, 2009',
                    zodiac: 'Aquarius ',
                    mbti: 'ENTP',
                    emoji: '',
                    themeColor: '#F1C40F',
                    weight: 14,
                    rarityTag: 'Member',
                    src: 'otherPics/CortisKeonho.jpg',
                    songRec: 'JoyRide',
                    fanTitle: 'Official Maknae Bestie',
                    line: 'COER forever! Thanks for supporting all 5 of us, Sophie!',
                    extraLines: [
                        'Sending big maknae energy to Sophie and everyone in Grade 7 – Psalms!',
                        'Count me in for Beyond The Manger on December 15! we’re cheering for you, Sophie!',
                        'I’m the youngest in CORTIS, so it’s my official job to keep Sophie smiling all day!',
                        'Whether it’s swimming laps or practicing vocals, I’m always rooting for you, Sophie!'
                    ],
                    secretNote: 'P.S. Don’t forget to hydrate and have fun on December 15, Sophie!',
                    funFact: 'The youngest member (maknae) who used to be a competitive swimmer before debuting.'
                }
            ];

            const coSrtisGroupInfo = {
                groupName: 'CORTIS',
                meaning: 'Color Outside The Lines',
                fandomName: 'COER',
                debutDate: 'August 18, 2025',
                allMembersUnlockedMessage: ' OT5 UNLOCKED! All 5 members of CORTIS are officially cheering for Sophie and Grade 7 – Psalms at Beyond The Manger on December 15! COER forever! '
            };
            let isCortis = false;
            let seenMembers = new Set();
            let ot5Celebrated = false;
            let lastJuhoonLine = '';
            const originalSophieSrc = sophieImg ? sophieImg.getAttribute('src') : '';

            function pickWeightedMemberIndex() {
                const totalWeight = cortisMembers.reduce((sum, m) => sum + (m.weight || 1), 0);
                let roll = Math.random() * totalWeight;
                for (let i = 0; i < cortisMembers.length; i++) {
                    roll -= (cortisMembers[i].weight || 1);
                    if (roll <= 0) return i;
                }
                return 0;
            }

            function bindPanelCortisClick() {
                if (!isCortis || !DOM.panelImageContainer) return;
                const drawerImg = DOM.panelImageContainer.querySelector('img');
                if (!drawerImg || drawerImg.dataset.cortisBound === 'true') return;

                drawerImg.dataset.cortisBound = 'true';
                drawerImg.style.cursor = 'pointer';
                drawerImg.title = 'Click to pull a CORTIS member!';

                drawerImg.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const currentIdx = pickWeightedMemberIndex();
                    const member = cortisMembers[currentIdx];
                    seenMembers.add(currentIdx);

                    const allLines = [member.line, ...member.extraLines];
                    let chosenLine = allLines[Math.floor(Math.random() * allLines.length)];
                    if (allLines.length > 1 && chosenLine === lastJuhoonLine) {
                        chosenLine = allLines[(allLines.indexOf(chosenLine) + 1) % allLines.length];
                    }
                    lastJuhoonLine = chosenLine;

                    drawerImg.src = member.src;
                    drawerImg.alt = member.name;

                    const activeBorder = member.themeColor === '#2C3E50' ? '#94a3b8' : member.themeColor;
                    DOM.panelImageContainer.style.borderColor = activeBorder;
                    DOM.panelImageContainer.style.boxShadow = `0 0 26px ${activeBorder}`;

                    let cardBox = DOM.panelBody.querySelector('.panel-cortis-card');
                    if (!cardBox) {
                        cardBox = document.createElement('div');
                        cardBox.className = 'panel-cortis-card';
                        DOM.panelBody.prepend(cardBox);
                    }

                    const justUnlockedOT5 = seenMembers.size === cortisMembers.length && !ot5Celebrated;
                    if (justUnlockedOT5) ot5Celebrated = true;

                    const ot5BannerHTML = seenMembers.size === cortisMembers.length
                        ? `<div class="cortis-ot5-banner">${cortisGroupInfo.allMembersUnlockedMessage}</div>`
                        : `<div class="cortis-progress-pill"> ${cortisGroupInfo.groupName} (${cortisGroupInfo.meaning}) • ${member.rarityTag} • ${seenMembers.size}/${cortisMembers.length} Unlocked</div>`;

                    cardBox.style.borderColor = activeBorder;
                    cardBox.style.boxShadow = `0 0 22px ${activeBorder}55`;
                    cardBox.innerHTML = [
                        ot5BannerHTML,
                        `<div class="cortis-card-top"><span class="cortis-member-name">${member.emoji} ${member.name}</span><span class="cortis-fan-title"> ${member.fanTitle}</span></div>`,
                        `<p class="cortis-main-quote">"${chosenLine}"</p>`,
                        `<div class="cortis-meta-grid">`,
                        `<span><strong>Real Name:</strong> ${member.realName}</span>`,
                        `<span><strong>Origin:</strong> ${member.nationality}</span>`,
                        `<span><strong>Birthday:</strong> ${member.birthday} (${member.zodiac})</span>`,
                        `<span><strong>MBTI:</strong> ${member.mbti} • <strong>Song:</strong>  ${member.songRec}</span>`,
                        `</div>`,
                        `<p class="cortis-fun-fact"> <strong>Fun Fact:</strong> ${member.funFact}</p>`,
                        `<p class="cortis-secret-note"> ${member.secretNote}</p>`
                    ].join('');

                    cardBox.classList.remove('is-pop');
                    void cardBox.offsetWidth;
                    cardBox.classList.add('is-pop');

                    DOM.panelImageContainer.animate([
                        { transform: 'scale(1) rotate(0deg)' },
                        { transform: 'scale(1.08) rotate(-4deg)', offset: 0.4 },
                        { transform: 'scale(1) rotate(0deg)' }
                    ], { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                    const rect = DOM.panelImageContainer.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, [activeBorder, '#facc15', '#ffffff'], justUnlockedOT5 ? 40 : 20);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                    if (justUnlockedOT5) {
                        [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
                            setTimeout(() => playBeep(f, 0.16, 'triangle', 0.05), idx * 80);
                        });
                    } else {
                        playBeep(587.33, 0.07, 'triangle', 0.045);
                        setTimeout(() => playBeep(880.00, 0.12, 'triangle', 0.045), 70);
                    }
                });
            }
            STATE.onOpenCard.push((openedCard) => {
                if (openedCard === sophieCard && isCortis) {
                    requestAnimationFrame(bindPanelCortisClick);
                }
                return false;
            });

            sophieCard.addEventListener('click', (e) => {
                if (e.detail !== 3) return;
                isCortis = !isCortis;

                sophieCard.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], {
                    duration: 550,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });

                setTimeout(() => {
                    const monoEl = sophieCard.querySelector('.monogram-avatar');
                    if (isCortis) {
                        if (monoEl) monoEl.style.display = 'none';
                        if (sophieImg) {
                            sophieImg.style.display = 'block';
                            sophieImg.src = cortisGroupSrc;
                            sophieImg.classList.add('is-cortis-pfp');
                        }
                    } else {
                        if (sophieImg) {
                            sophieImg.classList.remove('is-cortis-pfp');
                            if (monoEl) {
                                sophieImg.style.display = 'none';
                                monoEl.style.display = 'flex';
                            } else {
                                sophieImg.src = originalSophieSrc;
                            }
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && sophieCard.classList.contains('active')) {
                        if (isCortis) {
                            DOM.panelImageContainer.innerHTML = `<img src="${cortisGroupSrc}" alt="CORTIS" class="is-cortis-pfp">`;
                            bindPanelCortisClick();
                        } else {
                            const existingCard = DOM.panelBody.querySelector('.panel-cortis-card');
                            if (existingCard) existingCard.remove();
                            if (monoEl) {
                                DOM.panelImageContainer.innerHTML = `<div class="panel-avatar monogram-avatar" style="width:100%;height:100%;font-size:64px;">${monoEl.textContent}</div>`;
                            } else if (sophieImg) {
                                DOM.panelImageContainer.innerHTML = `<img src="${originalSophieSrc}" alt="${sophieCard.querySelector('.overlay-text').textContent.trim()}">`;
                            }
                        }
                    }
                }, 275);

                const rect = sophieCard.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#38bdf8', '#a3e635', '#f472b6', '#ffffff'], 24);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isCortis ? 659.25 : 440.00, 0.08, 'triangle', 0.045);
                setTimeout(() => playBeep(isCortis ? 987.77 : 329.63, 0.14, 'triangle', 0.045), 75);
            });
        }


        const kiefCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('dela cruz'));
        if (kiefCard) {
            const kiefImg = kiefCard.querySelector('img');
            const kobeSrc = 'otherPics/Kobe.jpg';
            const kobeLines = [
                'Mamba Mentality!',
                'Job’s not finished. Job finished? I don’t think so.',
                '24 & 8 !  Forever on the court, Kief!',
                'Everything negative !  pressure, challenges !  is all an opportunity to rise.',
                'From 2823-rated Chess Grandmaster to dropping 81 on January 22!',
                'Rest at the end, not in the middle!',
                'Kobe! *fades away for the buzzer beater*',
                'Heroes come and go, but legends are forever.',
                'The most important thing is to try and inspire people so that they can be great in whatever they want to do.',
                'If you’re afraid to fail, then you’re probably going to fail.',
                'We don’t quit, we don’t cower, we don’t run. We endure and conquer.',
                'Great things come from hard work and perseverance. No excuses.',
                'I’ll do whatever it takes to win games, whether it’s sitting on a bench waving a towel, handing a cup of water to a teammate, or hitting the game-winning shot.',
                '5 Rings, 2 Finals MVPs, 18 All-Star appearances. Pure greatness.',
                '60 points in the final game. Mamba out!',
                '33,643 career points !  nothing but net and relentless work ethic.',
                'Two torn Achilles tendons? Still walks up to the line and drains both free throws.',
                '4 AM workouts while the rest of the world is still asleep.',
                'From Lower Merion to Staples Center !  20 seasons in Purple and Gold.',
                'Channeling that 4th-quarter Black Mamba clutch gene today, Kief!',
                'No shortcuts, no excuses !  attack the day like Kobe in Game 7, Kief!',
                'Mamba Mentality activated. Go dominate the board, Kief!',
                'Details matter. Footwork, focus, and Mamba Mentality !  you got this, Kief!'
            ];

            let isKobe = false;
            let kobeLineIdx = -1;
            const originalKiefSrc = kiefImg ? kiefImg.getAttribute('src') : '';

            function bindPanelKobeClick() {
                if (!isKobe || !DOM.panelImageContainer) return;
                const drawerImg = DOM.panelImageContainer.querySelector('img');
                if (!drawerImg || drawerImg.dataset.kobeBound === 'true') return;

                drawerImg.dataset.kobeBound = 'true';
                drawerImg.style.cursor = 'pointer';
                drawerImg.title = 'Click Kobe Bryant!';

                drawerImg.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let nextIdx = Math.floor(Math.random() * kobeLines.length);
                    if (kobeLines.length > 1 && nextIdx === kobeLineIdx) {
                        nextIdx = (nextIdx + 1) % kobeLines.length;
                    }
                    kobeLineIdx = nextIdx;

                    let bubble = DOM.panelBody.querySelector('.panel-kobe-quote');
                    if (!bubble) {
                        bubble = document.createElement('div');
                        bubble.className = 'panel-kobe-quote';
                        DOM.panelBody.prepend(bubble);
                    }

                    bubble.textContent = ` "${kobeLines[kobeLineIdx]}"`;
                    bubble.classList.remove('is-pop');
                    void bubble.offsetWidth;
                    bubble.classList.add('is-pop');

                    DOM.panelImageContainer.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.07) rotate(-3deg)', offset: 0.4 },
                        { transform: 'scale(1)' }
                    ], { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                    const rect = DOM.panelImageContainer.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#facc15', '#a855f7', '#ffffff'], 18);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    playBeep(587.33, 0.08, 'triangle', 0.045);
                    setTimeout(() => playBeep(880.00, 0.14, 'triangle', 0.045), 75);
                });
            }

            STATE.onOpenCard.push((openedCard) => {
                if (openedCard === kiefCard && isKobe) {
                    requestAnimationFrame(bindPanelKobeClick);
                }
                return false;
            });

            kiefCard.addEventListener('click', (e) => {
                if (e.detail === 1 && !isKobe) {
                    spawnBadge(kiefCard, '♞ 2823', 'quirk-star-glow', 950);
                    playBeep(310, 0.05, 'triangle', 0.04);
                    setTimeout(() => playBeep(465, 0.08, 'triangle', 0.04), 70);
                }

                if (e.detail !== 3) return;
                isKobe = !isKobe;

                kiefCard.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], {
                    duration: 550,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });

                setTimeout(() => {
                    const monoEl = kiefCard.querySelector('.monogram-avatar');
                    if (isKobe) {
                        if (monoEl) monoEl.style.display = 'none';
                        if (kiefImg) {
                            kiefImg.style.display = 'block';
                            kiefImg.src = kobeSrc;
                            kiefImg.classList.add('is-kobe-pfp');
                        }
                    } else {
                        if (kiefImg) {
                            kiefImg.classList.remove('is-kobe-pfp');
                            if (monoEl) {
                                kiefImg.style.display = 'none';
                                monoEl.style.display = 'flex';
                            } else {
                                kiefImg.src = originalKiefSrc;
                            }
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && kiefCard.classList.contains('active')) {
                        if (isKobe) {
                            DOM.panelImageContainer.innerHTML = `<img src="${kobeSrc}" alt="Kobe Bryant" class="is-kobe-pfp">`;
                            bindPanelKobeClick();
                        } else {
                            const existingQuote = DOM.panelBody.querySelector('.panel-kobe-quote');
                            if (existingQuote) existingQuote.remove();
                            if (monoEl) {
                                DOM.panelImageContainer.innerHTML = `<div class="panel-avatar monogram-avatar" style="width:100%;height:100%;font-size:64px;">${monoEl.textContent}</div>`;
                            } else if (kiefImg) {
                                DOM.panelImageContainer.innerHTML = `<img src="${originalKiefSrc}" alt="${kiefCard.querySelector('.overlay-text').textContent.trim()}">`;
                            }
                        }
                    }
                }, 275);

                const rect = kiefCard.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#facc15', '#a855f7', '#ffffff'], 26);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isKobe ? 587.33 : 440.00, 0.08, 'triangle', 0.045);
                setTimeout(() => playBeep(isKobe ? 880.00 : 329.63, 0.14, 'triangle', 0.045), 75);
            });
        }
        
        const escCfg = CONFIG.cynEscalationConfig;
        const uziCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('abrena'));
        if (uziCard && localStorage.getItem(escCfg.storageKey) === 'true') {
            const uziWrapper = uziCard.parentElement;
            if (uziWrapper && !uziWrapper.querySelector('.pip-solver-uzi')) {
                const solverPip = document.createElement('span');
                solverPip.className = 'portrait-role-pip pip-solver-uzi';
                solverPip.textContent = '⬡';
                solverPip.title = 'Absolute Solver Host (Callback Ping)';
                uziWrapper.appendChild(solverPip);
            }
        }

        const cacebCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('abrena'));
        if (cacebCard) {
            const cynImageSrc = 'otherPics/Cyn.jpg';
            const solverSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="#090702"/>
                    <circle cx="100" cy="100" r="88" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="8 6" opacity="0.5"/>
                    <g fill="none" stroke="#facc15" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
                        <polygon points="100,66 130,118 70,118"/>
                        <line x1="100" y1="66" x2="100" y2="24"/>
                        <polygon points="100,16 91,30 109,30" fill="#facc15"/>
                        <line x1="130" y1="118" x2="166" y2="139"/>
                        <polygon points="174,144 157,144 166,129" fill="#facc15"/>
                        <line x1="70" y1="118" x2="34" y2="139"/>
                        <polygon points="26,144 43,144 34,129" fill="#facc15"/>
                    </g>
                    <circle cx="100" cy="101" r="7" fill="#fef08a"/>
                </svg>
            `)}`;

            let resolvedCynSrc = cynImageSrc;
            const probeCyn = new Image();
            probeCyn.onerror = () => {
                resolvedCynSrc = solverSvg;
            };
            probeCyn.src = cynImageSrc;

            let tripleIndex = 0;
            let panelBag = [];
            let lastCynSpeech = CONFIG.cynTripleClickLines.speech;
            let mainCardClickCount = 0;
            let callbackRunning = false;
            const cardImg = cacebCard.querySelector('img');
            const originalImageSrc = cardImg ? cardImg.src : '';

            function getNextPanelLine() {
                if (!panelBag.length) {
                    panelBag = [...CONFIG.cynPanelClickLines].sort(() => Math.random() - 0.5);
                }
                return panelBag.pop();
            }
            function pickCynVoice() {
                if (!('speechSynthesis' in window)) return null;
                const voices = window.speechSynthesis.getVoices();
                if (!voices.length) return null;

                const femaleKeywords = ['zira', 'aria', 'jenny', 'samantha', 'victoria', 'google us english', 'google uk english female', 'female', 'woman', 'hazel', 'susan', 'eva', 'natasha'];
                const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
                const pool = enVoices.length ? enVoices : voices;

                for (const kw of femaleKeywords) {
                    const match = pool.find(v => v.name.toLowerCase().includes(kw));
                    if (match) return match;
                }
                return pool.find(v => !v.name.toLowerCase().includes('david') && !v.name.toLowerCase().includes('mark') && !v.name.toLowerCase().includes('male')) || pool[0];
            }

            if ('speechSynthesis' in window) {
                preferredCynVoice = pickCynVoice();
                window.speechSynthesis.onvoiceschanged = () => {
                    preferredCynVoice = pickCynVoice();
                };
            }

                        function getCynPhonemeTokens(word) {
                const overrides = {
                    'wave':          ['w', 'ay', 'v'],
                    'game':          ['g', 'ay', 'm'],
                    'make':          ['m', 'ay', 'k'],
                    'take':          ['t', 'ay', 'k'],
                    'late':          ['l', 'ay', 't'],
                    'face':          ['f', 'ay', 's'],
                    'place':         ['p', 'l', 'ay', 's'],
                    'save':          ['s', 'ay', 'v'],
                    'giggle':        ['g', 'i', 'g', 'l'],
                    'little':        ['l', 'i', 't', 'l'],
                    'people':        ['p', 'ee', 'p', 'l'],
                    'firewall':      ['f', 'ai', 'r', 'w', 'o', 'l'],
                    'motherboard':   ['m', 'u', 'th', 'r', 'b', 'o', 'r', 'd'],
                    'assimilate':    ['u', 's', 'i', 'm', 'i', 'l', 'ay', 't'],
                    'assimilation':  ['u', 's', 'i', 'm', 'i', 'l', 'ay', 'sh', 'n'],
                    'administrator': ['a', 'd', 'm', 'i', 'n', 'i', 's', 't', 'r', 'ay', 't', 'r'],
                    'invitation':    ['i', 'n', 'v', 'i', 't', 'ay', 'sh', 'n'],
                    'curiosity':     ['k', 'y', 'oo', 'r', 'ee', 'o', 's', 'i', 't', 'ee'],
                    'delicious':     ['d', 'i', 'l', 'i', 'sh', 'u', 's'],
                    'annoyed':       ['u', 'n', 'o', 'y', 'd'],
                    'expression':    ['e', 'k', 's', 'p', 'r', 'e', 'sh', 'n'],
                    'patience':      ['p', 'ay', 'sh', 'n', 's'],
                    'reformat':      ['r', 'ee', 'f', 'o', 'r', 'm', 'a', 't'],
                    'permission':    ['p', 'r', 'm', 'i', 'sh', 'n'],
                    'permissions':   ['p', 'r', 'm', 'i', 'sh', 'n', 'z'],
                    'predictable':   ['p', 'r', 'i', 'd', 'i', 'k', 't', 'u', 'b', 'l'],
                    'directives':    ['d', 'i', 'r', 'e', 'k', 't', 'i', 'v', 'z'],
                    'repetitive':    ['r', 'i', 'p', 'e', 't', 'i', 't', 'i', 'v'],
                    'irritated':     ['i', 'r', 'i', 't', 'ay', 't', 'i', 'd'],
                    'irritation':    ['i', 'r', 'i', 't', 'ay', 'sh', 'n'],
                    'processing':    ['p', 'r', 'o', 's', 'e', 's', 'i', 'ng'],
                    'calculating':   ['k', 'a', 'l', 'k', 'y', 'oo', 'l', 'ay', 't', 'i', 'ng'],
                    'engagement':    ['e', 'n', 'g', 'ay', 'j', 'm', 'n', 't'],
                    'metrics':       ['m', 'e', 't', 'r', 'i', 'k', 's'],
                    'coordinates':   ['k', 'o', 'o', 'r', 'd', 'i', 'n', 'ay', 't', 's'],
                    'overwriting':   ['o', 'v', 'r', 'r', 'ai', 't', 'i', 'ng'],
                    'established':   ['e', 's', 't', 'a', 'b', 'l', 'i', 'sh', 't'],
                    'connection':    ['k', 'u', 'n', 'e', 'k', 'sh', 'n'],
                    'initiated':     ['i', 'n', 'i', 'sh', 'ee', 'ay', 't', 'i', 'd'],
                    'imminent':      ['i', 'm', 'i', 'n', 'n', 't'],
                    'persistent':    ['p', 'r', 's', 'i', 's', 't', 'n', 't'],
                    'together':      ['t', 'oo', 'g', 'e', 'th', 'r'],
                    'naughty':       ['n', 'o', 't', 'ee'],
                    'light':         ['l', 'ai', 't'],
                    'tight':         ['t', 'ai', 't'],
                    'bite':          ['b', 'ai', 't'],
                    'smile':         ['s', 'm', 'ai', 'l'],
                    'wide':          ['w', 'ai', 'd'],
                    'inside':        ['i', 'n', 's', 'ai', 'd'],
                    'outside':       ['ou', 't', 's', 'ai', 'd'],
                    'polite':        ['p', 'o', 'l', 'ai', 't'],
                    'quite':         ['k', 'w', 'ai', 't'],
                    'nice':          ['n', 'ai', 's'],
                    'nicely':        ['n', 'ai', 's', 'l', 'ee'],
                    'cease':         ['s', 'ee', 's'],
                    'please':        ['p', 'l', 'ee', 'z'],
                    'mercy':         ['m', 'r', 's', 'ee'],
                    'already':       ['o', 'l', 'r', 'e', 'd', 'ee'],
                    'really':        ['r', 'ee', 'l', 'ee'],
                    'funny':         ['f', 'u', 'n', 'ee'],
                    'sneaky':        ['s', 'n', 'ee', 'k', 'ee'],
                    'creepy':        ['k', 'r', 'ee', 'p', 'ee'],
                    'tasty':         ['t', 'ay', 's', 't', 'ee'],
                    'scary':         ['s', 'k', 'e', 'r', 'ee'],
                    'eldritch':      ['e', 'l', 'd', 'r', 'i', 'ch'],
                    'mango':         ['m', 'a', 'ng', 'g', 'o'],
                    'oil':           ['o', 'y', 'l'],
                    'void':          ['v', 'o', 'y', 'd'],
                    'core':          ['k', 'o', 'r'],
                    'cores':         ['k', 'o', 'r', 'z'],
                    'more':          ['m', 'o', 'r'],
                    'before':        ['b', 'i', 'f', 'o', 'r'],
                    'here':          ['h', 'i', 'r'],
                    'there':         ['th', 'e', 'r'],
                    'where':         ['w', 'e', 'r'],
                    'wear':          ['w', 'e', 'r'],
                    'glare':         ['g', 'l', 'e', 'r'],
                    'stare':         ['s', 't', 'e', 'r'],
                    'are':           ['a', 'r'],
                    'aren':          ['a', 'r', 'n'],
                    'you':           ['y', 'oo'],
                    'your':          ['y', 'o', 'r'],
                    'the':           ['th', 'u'],
                    'to':            ['t', 'oo'],
                    'too':           ['t', 'oo'],
                    'do':            ['d', 'oo'],
                    'who':           ['h', 'oo'],
                    'nowhere':       ['n', 'o', 'w', 'e', 'r'],
                    'monotone':      ['m', 'o', 'n', 'o', 't', 'o', 'n'],
                    'drone':         ['d', 'r', 'o', 'n'],
                    'alone':         ['u', 'l', 'o', 'n'],
                    'close':         ['k', 'l', 'o', 's'],
                    'poke':          ['p', 'o', 'k'],
                    'poking':        ['p', 'o', 'k', 'i', 'ng'],
                    'broken':        ['b', 'r', 'o', 'k', 'n'],
                    'flesh':         ['f', 'l', 'e', 'sh'],
                    'fleshbag':      ['f', 'l', 'e', 'sh', 'b', 'a', 'g'],
                    'eye':           ['ai'],
                    'eyes':          ['ai', 'z']
                };

                const phonemes = {
                    'ee': { f1: 310, f2: 2650, f3: 3300, dur: 0.115, voiced: true, vowel: true },
                    'ea': { f1: 330, f2: 2550, f3: 3200, dur: 0.110, voiced: true, vowel: true },
                    'oo': { f1: 330, f2: 880,  f3: 2350, dur: 0.115, voiced: true, vowel: true },
                    'ou': { f1: 590, f2: 920,  f3: 2450, dur: 0.115, voiced: true, vowel: true },
                    'ai': { f1: 480, f2: 2150, f3: 2850, dur: 0.110, voiced: true, vowel: true },
                    'ay': { f1: 480, f2: 2150, f3: 2850, dur: 0.115, voiced: true, vowel: true },
                    'oy': { f1: 520, f2: 1450, f3: 2650, dur: 0.115, voiced: true, vowel: true },
                    'sh': { f1: 300, f2: 1950, f3: 3600, dur: 0.085, voiced: false, noise: 0.65, nFreq: 3400 },
                    'ch': { f1: 280, f2: 2050, f3: 3700, dur: 0.075, voiced: false, noise: 0.70, nFreq: 3600, stop: true },
                    'th': { f1: 340, f2: 1550, f3: 2700, dur: 0.068, voiced: true,  noise: 0.35, nFreq: 4200 },
                    'ng': { f1: 270, f2: 1950, f3: 2600, dur: 0.078, voiced: true,  nasal: true },
                    'a':  { f1: 760, f2: 1220, f3: 2650, dur: 0.102, voiced: true, vowel: true },
                    'e':  { f1: 540, f2: 1980, f3: 2750, dur: 0.095, voiced: true, vowel: true },
                    'i':  { f1: 320, f2: 2500, f3: 3200, dur: 0.092, voiced: true, vowel: true },
                    'o':  { f1: 560, f2: 910,  f3: 2550, dur: 0.105, voiced: true, vowel: true },
                    'u':  { f1: 360, f2: 1020, f3: 2400, dur: 0.098, voiced: true, vowel: true },
                    'y':  { f1: 320, f2: 2450, f3: 3150, dur: 0.085, voiced: true, vowel: true },
                    'm':  { f1: 270, f2: 950,  f3: 2350, dur: 0.072, voiced: true, nasal: true },
                    'n':  { f1: 270, f2: 1550, f3: 2450, dur: 0.072, voiced: true, nasal: true },
                    'l':  { f1: 370, f2: 1380, f3: 2750, dur: 0.068, voiced: true },
                    'r':  { f1: 440, f2: 1420, f3: 1780, dur: 0.068, voiced: true },
                    'w':  { f1: 310, f2: 780,  f3: 2350, dur: 0.068, voiced: true },
                    'v':  { f1: 330, f2: 1250, f3: 2450, dur: 0.065, voiced: true, noise: 0.30, nFreq: 3500 },
                    'z':  { f1: 310, f2: 1750, f3: 2900, dur: 0.075, voiced: true, noise: 0.48, nFreq: 4800 },
                    'b':  { f1: 230, f2: 880,  f3: 2250, dur: 0.052, voiced: true, stop: true },
                    'd':  { f1: 250, f2: 1750, f3: 2700, dur: 0.052, voiced: true, stop: true },
                    'g':  { f1: 250, f2: 1320, f3: 2300, dur: 0.055, voiced: true, stop: true },
                    's':  { f1: 300, f2: 1900, f3: 4400, dur: 0.078, voiced: false, noise: 0.72, nFreq: 5400 },
                    'f':  { f1: 310, f2: 1300, f3: 3400, dur: 0.072, voiced: false, noise: 0.48, nFreq: 4400 },
                    'h':  { f1: 520, f2: 1650, f3: 2750, dur: 0.062, voiced: false, noise: 0.42, nFreq: 2600 },
                    'p':  { f1: 230, f2: 880,  f3: 2250, dur: 0.052, voiced: false, noise: 0.55, nFreq: 2800, stop: true },
                    't':  { f1: 250, f2: 1850, f3: 2950, dur: 0.052, voiced: false, noise: 0.62, nFreq: 4200, stop: true },
                    'k':  { f1: 250, f2: 1400, f3: 2450, dur: 0.055, voiced: false, noise: 0.58, nFreq: 3100, stop: true },
                    'c':  { f1: 250, f2: 1400, f3: 2450, dur: 0.055, voiced: false, noise: 0.58, nFreq: 3100, stop: true },
                    'q':  { f1: 250, f2: 1200, f3: 2300, dur: 0.058, voiced: false, noise: 0.55, nFreq: 2900 },
                    'x':  { f1: 300, f2: 1850, f3: 4100, dur: 0.085, voiced: false, noise: 0.68, nFreq: 4900 },
                    'j':  { f1: 290, f2: 2050, f3: 2900, dur: 0.068, voiced: true, noise: 0.42, nFreq: 3600 }
                };
                if (overrides[word]) {
                return overrides[word].map(k => phonemes[k] || phonemes['e']);
                }
                let normalized = word
                .replace(/tion\b/g, 'shn')
                .replace(/sion\b/g, 'shn')
                .replace(/ight\b/g, 'ait')
                .replace(/([bcdfghjklmnpqrstvwxz])\1+/g, '$1');
                if (normalized.length > 3 && normalized.endsWith('e') && !normalized.endsWith('ee')) {
                normalized = normalized.slice(0, -1);
            }
            const out = [];
            let idx = 0;
            while (idx < normalized.length) {
            const pair = normalized.slice(idx, idx + 2);
            if (phonemes[pair]) {
            out.push(phonemes[pair]);
            idx += 2;
            } else {
            out.push(phonemes[normalized[idx]] || phonemes['e']);
            idx += 1;
            }
            }
            return out;
        }
            function buildCynSynthGraph(ctx, now) {
                const glottalOsc = ctx.createOscillator();
                const formantPulse = ctx.createOscillator();
                glottalOsc.type = 'sawtooth';
                formantPulse.type = 'square';

                const pulseMix = ctx.createGain();
                pulseMix.gain.setValueAtTime(0.22, now);
                formantPulse.connect(pulseMix);

                const tremorLfo = ctx.createOscillator();
                const tremorDepth = ctx.createGain();
                tremorLfo.type = 'sine';
                tremorLfo.frequency.setValueAtTime(29, now);
                tremorDepth.gain.setValueAtTime(3.5, now);
                tremorLfo.connect(tremorDepth);
                tremorDepth.connect(glottalOsc.frequency);
                tremorDepth.connect(formantPulse.frequency);

                const voiceGain = ctx.createGain();
                voiceGain.gain.setValueAtTime(0.0001, now);

                const f1 = ctx.createBiquadFilter();
                const f2 = ctx.createBiquadFilter();
                const f3 = ctx.createBiquadFilter();
                f1.type = 'bandpass';
                f2.type = 'bandpass';
                f3.type = 'bandpass';
                f1.Q.setValueAtTime(3.4, now);
                f2.Q.setValueAtTime(4.2, now);
                f3.Q.setValueAtTime(4.8, now);

                const f1Gain = ctx.createGain();
                const f2Gain = ctx.createGain();
                const f3Gain = ctx.createGain();
                f1Gain.gain.setValueAtTime(0.95, now);
                f2Gain.gain.setValueAtTime(0.85, now);
                f3Gain.gain.setValueAtTime(0.65, now);

                const clarityShelf = ctx.createBiquadFilter();
                clarityShelf.type = 'highshelf';
                clarityShelf.frequency.setValueAtTime(2600, now);
                clarityShelf.gain.setValueAtTime(9.5, now);

                const highpass = ctx.createBiquadFilter();
                highpass.type = 'highpass';
                highpass.frequency.setValueAtTime(190, now);

                const bufferSize = Math.floor(ctx.sampleRate * 1.5);
                const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noiseSource = ctx.createBufferSource();
                noiseSource.buffer = noiseBuffer;
                noiseSource.loop = true;

                const noiseFilter = ctx.createBiquadFilter();
                noiseFilter.type = 'bandpass';
                noiseFilter.frequency.setValueAtTime(4200, now);
                noiseFilter.Q.setValueAtTime(1.8, now);

                const noiseGain = ctx.createGain();
                noiseGain.gain.setValueAtTime(0.0001, now);

                const masterGain = ctx.createGain();
                masterGain.gain.setValueAtTime(0.26, now);

                glottalOsc.connect(voiceGain);
                pulseMix.connect(voiceGain);

                voiceGain.connect(f1);
                voiceGain.connect(f2);
                voiceGain.connect(f3);

                f1.connect(f1Gain);
                f2.connect(f2Gain);
                f3.connect(f3Gain);

                f1Gain.connect(clarityShelf);
                f2Gain.connect(clarityShelf);
                f3Gain.connect(clarityShelf);

                noiseSource.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(clarityShelf);

                clarityShelf.connect(highpass);
                highpass.connect(masterGain);
                masterGain.connect(ctx.destination);

                return {
                    glottalOsc, formantPulse, tremorLfo, tremorDepth,
                    voiceGain, f1, f2, f3, noiseSource, noiseFilter, noiseGain, masterGain
                };
            }
            function speakCynLine(speechText) {
                [880, 622.25, 932.33, 440].forEach((freq, i) => {
                    setTimeout(() => playBeep(freq, 0.055, 'sawtooth', 0.03), i * 50);
                });

                if (STATE.soundMuted) return;
                const ctx = getAudioContext();
                if (!ctx) return;

                if (window._cynStopActiveSpeech) {
                    window._cynStopActiveSpeech();
                }

                const isThreat = /assimilate|reformat|skin|eat|consume|motherboard|snap|error|warning|override|delete|host|imminent|end|dead|kill/i.test(speechText);

                const cleanText = speechText
                    .replace(/\[.*?\]/g, '')
                    .toLowerCase()
                    .replace(/[^a-z0-9\s.,!?']/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();

                if (!cleanText) return;

                const now = ctx.currentTime + 0.03;
                const g = buildCynSynthGraph(ctx, now);

                const sentences = cleanText.split(/(?<=[.!?])\s+/).filter(Boolean);
                let t = now;

                g.glottalOsc.frequency.setValueAtTime(311.13, t);
                g.formantPulse.frequency.setValueAtTime(311.13, t);

                sentences.forEach((sentence, sIdx) => {
                    const words = sentence.split(' ').filter(Boolean);
                    const isStagePrompt = sIdx === 0 && sentences.length > 1 && words.length <= 3;
                    const isMenacingSentence = isThreat && sIdx === sentences.length - 1 && sentences.length > 1;

                    words.forEach((word, wIdx) => {
                        const rawWord = word.replace(/[.,!?']/g, '');
                        if (!rawWord) return;

                        const tokens = getCynPhonemeTokens(rawWord);
                        const isLastWord = wIdx === words.length - 1;
                        const isQuestion = word.endsWith('?');

                        let baseFreq;
                        if (isStagePrompt) {
                            baseFreq = 293.66;
                        } else if (isMenacingSentence) {
                            baseFreq = isLastWord ? 196.00 : 220.00;
                        } else if (isQuestion && isLastWord) {
                            baseFreq = 349.23;
                        } else if (isLastWord) {
                            baseFreq = 277.18;
                        } else {
                            baseFreq = 311.13;
                        }

                        g.glottalOsc.frequency.setValueAtTime(baseFreq, t);
                        g.formantPulse.frequency.setValueAtTime(baseFreq, t);

                        if (isMenacingSentence) {
                            g.tremorDepth.gain.setValueAtTime(7.0, t);
                            g.tremorLfo.frequency.setValueAtTime(34, t);
                        } else if (isStagePrompt) {
                            g.tremorDepth.gain.setValueAtTime(0.9, t);
                            g.tremorLfo.frequency.setValueAtTime(22, t);
                        } else {
                            g.tremorDepth.gain.setValueAtTime(1.6, t);
                            g.tremorLfo.frequency.setValueAtTime(26, t);
                        }

                        tokens.forEach((spec, pIdx) => {
                            const stretch = (!isStagePrompt && spec.vowel && (isLastWord && pIdx === tokens.length - 1)) ? 1.25 : 0.90;
                            const dur = spec.dur * stretch;

                            const formantScale = isMenacingSentence ? 1.04 : 1.18;
                            g.f1.frequency.setTargetAtTime(spec.f1 * formantScale, t, 0.008);
                            g.f2.frequency.setTargetAtTime(spec.f2 * formantScale, t, 0.008);
                            g.f3.frequency.setTargetAtTime(spec.f3 * formantScale, t, 0.008);

                            if (spec.nFreq) {
                                g.noiseFilter.frequency.setTargetAtTime(spec.nFreq, t, 0.006);
                            }

                            if (spec.stop) {
                                g.voiceGain.gain.setTargetAtTime(0.0001, t, 0.004);
                                g.noiseGain.gain.setTargetAtTime(0.0001, t, 0.004);
                                const burstAt = t + dur * 0.45;
                                g.voiceGain.gain.setTargetAtTime(spec.voiced ? 0.92 : 0.0001, burstAt, 0.005);
                                g.noiseGain.gain.setTargetAtTime(spec.noise ? spec.noise * 0.48 : 0.0001, burstAt, 0.005);
                            } else {
                                g.voiceGain.gain.setTargetAtTime(spec.voiced ? (spec.nasal ? 0.62 : 0.95) : 0.0001, t, 0.007);
                                g.noiseGain.gain.setTargetAtTime(spec.noise ? spec.noise * 0.44 : 0.0001, t, 0.007);
                            }

                            t += dur;
                        });

                        g.voiceGain.gain.setTargetAtTime(0.0001, t, 0.006);
                        g.noiseGain.gain.setTargetAtTime(0.0001, t, 0.006);
                        t += isLastWord ? 0.16 : 0.036;
                    });
                });

                const stopTime = t + 0.08;
                g.glottalOsc.start(now);
                g.formantPulse.start(now);
                g.tremorLfo.start(now);
                g.noiseSource.start(now);

                g.glottalOsc.stop(stopTime);
                g.formantPulse.stop(stopTime);
                g.tremorLfo.stop(stopTime);
                g.noiseSource.stop(stopTime);

                window._cynStopActiveSpeech = () => {
                    try {
                        const killTime = ctx.currentTime;
                        g.masterGain.gain.cancelScheduledValues(killTime);
                        g.masterGain.gain.setValueAtTime(0.0001, killTime);
                        g.glottalOsc.stop(killTime + 0.01);
                        g.formantPulse.stop(killTime + 0.01);
                        g.tremorLfo.stop(killTime + 0.01);
                        g.noiseSource.stop(killTime + 0.01);
                    } catch (_) { }
                    window._cynStopActiveSpeech = null;
                };
            }



            function runCallbackPingSequence() {
                if (callbackRunning) return;
                callbackRunning = true;

                document.body.classList.add('cyn-input-lockdown');
                window.addEventListener('keydown', (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                }, true);

                closePanel();

                const overlay = document.createElement('div');
                overlay.className = 'cyn-callback-overlay';
                overlay.innerHTML = `
                    <div class="cyn-callback-ping-tag" id="cynPingTag">⬡ [CALLBACK PING]</div>
                    <div class="cyn-callback-smile" id="cynPingText">INITIALIZING...</div>
                `;
                document.body.appendChild(overlay);

                const tagEl = overlay.querySelector('#cynPingTag');
                const textEl = overlay.querySelector('#cynPingText');

                escCfg.callbackPingSequence.forEach((step, idx) => {
                    setTimeout(() => {
                        const cleanBody = step.speech.replace(/^\[CALLBACK PING\]\.?\s*/i, '');
                        tagEl.textContent = `⬡ [CALLBACK PING // 0${idx + 1}]`;
                        textEl.textContent = cleanBody;

                        triggerScreenGlitch(180);
                        speakCynLine(step.speech);

                        const rx = window.innerWidth * (0.2 + Math.random() * 0.6);
                        const ry = window.innerHeight * (0.2 + Math.random() * 0.6);
                        spawnBurst(rx, ry, ['#facc15', '#c084fc', '#ffffff'], 34);
                        if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                        if (idx === escCfg.callbackPingSequence.length - 1) {
                            localStorage.setItem(escCfg.storageKey, 'true');
                            setTimeout(() => {
                                window.location.reload();
                            }, escCfg.refreshDelay);
                        }
                    }, idx * escCfg.sequenceStepDelay);
                });
            }

            function clearCynCaptions() {
                document.querySelectorAll('.cyn-voice-caption').forEach(el => el.remove());
            }

            function clearCynCaptions() {
                document.querySelectorAll('.cyn-voice-caption').forEach(el => el.remove());
            }

            function syncCynSidePanel(speechText) {
                if (!DOM.panel || !DOM.panel.classList.contains('active')) return;
                const activeCard = document.querySelector('.PeoplePics.active');
                const isSolverOnCaceb = activeCard === cacebCard && cacebCard.classList.contains('quirk-cyn-solver');

                DOM.panelImageContainer.classList.toggle('cyn-voice-ready', isSolverOnCaceb);
                if (!isSolverOnCaceb) {
                    clearCynCaptions();
                    return;
                }

                const panelImg = DOM.panelImageContainer.querySelector('img');
                const panelName = DOM.panelBody.querySelector('.panel-name');
                const bioText = DOM.panelBody.querySelector('.bio-text');

                if (panelImg) panelImg.src = resolvedCynSrc;
                if (panelName) panelName.innerHTML = 'Abrena, Caleb <span style="color:var(--solver-color);">[CYN // SOLVER]</span>';
                if (bioText) bioText.textContent = 'Hello, User.';

                let captionBox = document.querySelector('.cyn-voice-caption');
                if (!captionBox) {
                    captionBox = document.createElement('div');
                    captionBox.className = 'cyn-voice-caption';
                    DOM.panelImageContainer.insertAdjacentElement('afterend', captionBox);
                }
                captionBox.textContent = `${speechText}`;
            }

            STATE.onOpenCard.push((card) => {
                requestAnimationFrame(() => {
                    if (card === cacebCard && cacebCard.classList.contains('quirk-cyn-solver')) {
                        syncCynSidePanel(lastCynSpeech);
                    } else {
                        DOM.panelImageContainer.classList.remove('cyn-voice-ready');
                        clearCynCaptions();
                    }
                });
                return false;
            });

            DOM.panelImageContainer.addEventListener('click', () => {
                const activeCard = document.querySelector('.PeoplePics.active');
                if (activeCard !== cacebCard || !cacebCard.classList.contains('quirk-cyn-solver')) return;

                const lineObj = getNextPanelLine();
                lastCynSpeech = lineObj.speech;

                speakCynLine(lastCynSpeech);
                syncCynSidePanel(lastCynSpeech);
                triggerScreenGlitch(90);

                const rect = DOM.panelImageContainer.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#facc15', '#fef08a', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
            });

            STATE.onClosePanel.push(() => {
                DOM.panelImageContainer.classList.remove('cyn-voice-ready');
                clearCynCaptions();
            });

            cacebCard.addEventListener('click', (e) => {
                if (callbackRunning) return;

                if (cacebCard.classList.contains('quirk-cyn-solver')) {
                    mainCardClickCount++;

                    if (mainCardClickCount > escCfg.clickThreshold) {
                        const annoyIdx = mainCardClickCount - (escCfg.clickThreshold + 1);
                        if (annoyIdx < escCfg.annoyanceLines.length) {
                            const lineSpeech = escCfg.annoyanceLines[annoyIdx].speech;
                            spawnBadge(cacebCard, `⬡ ${lineSpeech}`, 'quirk-cyn-badge', 1600);
                            speakCynLine(lineSpeech);
                            triggerScreenGlitch(110);
                        } else {
                            runCallbackPingSequence();
                        }
                        return;
                    }
                }

                if (e.detail !== 3) return;
                const isSolverActive = cacebCard.classList.toggle('quirk-cyn-solver');
                mainCardClickCount = 0;
                const rect = cacebCard.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                if (isSolverActive) {
                    const lineObj = CONFIG.cynTripleClickLines[tripleIndex % CONFIG.cynTripleClickLines.length];
                    tripleIndex++;
                    lastCynSpeech = lineObj.speech;
                    if (cardImg) cardImg.src = resolvedCynSrc;
                    spawnBadge(cacebCard,`${lineObj.badge} ${lineObj.speech}`, 'quirk-cyn-badge', 1600);
                    speakCynLine(lastCynSpeech);
                    triggerScreenGlitch(140);
                    spawnBurst(cx, cy, ['#facc15', '#fef08a', '#ffffff', '#000000'], 32);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    requestAnimationFrame(() => syncCynSidePanel(lastCynSpeech));
                } else {
                    if (cardImg && originalImageSrc) cardImg.src = originalImageSrc;
                    DOM.panelImageContainer.classList.remove('cyn-voice-ready');
                    clearCynCaptions();
                    spawnBadge(cacebCard, '⬡ [SOLVER SUPPRESSED]', 'quirk-cyn-badge', 1000);
                    playBeep(330, 0.1, 'sine', 0.03);
                    openCard(cacebCard);
                }
            });
        }

        const giechelleCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('tan'));
        const reccaCard = cards.find(c => c.querySelector('.overlay-text').textContent.toLowerCase().includes('amadora'));

        if (giechelleCard && reccaCard) {
             function popPartnerHeart(targetCard) {
                const rect = targetCard.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                targetCard.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.12)', offset: 0.4 },
                    { transform: 'scale(1)' }
                ], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                const heartPop = document.createElement('div');
                heartPop.className = 'gxr-floating-heart';
                heartPop.textContent = '';
                heartPop.style.left = `${cx}px`;
                heartPop.style.top = `${cy}px`;
                document.body.appendChild(heartPop);
                setTimeout(() => heartPop.remove(), 1450);

                spawnBurst(cx, cy, ['#f472b6', '#ef4444', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
                    setTimeout(() => playBeep(f, 0.12, 'triangle', 0.045), i * 70);
                });
            }

            giechelleCard.addEventListener('click', (e) => {
                if (e.detail === 3) popPartnerHeart(reccaCard);
            });
            reccaCard.addEventListener('click', (e) => {
                if (e.detail === 3) popPartnerHeart(giechelleCard);
            });

            function triggerGxRHearts() {
                const heartSymbols = ['', '', '', '', ''];
                const pair = [giechelleCard, reccaCard];

                pair.forEach((card, cardIdx) => {
                    if (card.classList.contains('is-filtered-out')) return;
                    const rect = card.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;

                    card.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.14)', offset: 0.4 },
                        { transform: 'scale(1)' }
                    ], { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                    spawnBurst(cx, cy, ['#f472b6', '#ef4444', '#fde047', '#ffffff'], 26);

                    for (let i = 0; i < 7; i++) {
                        setTimeout(() => {
                            const h = document.createElement('div');
                            h.className = 'gxr-floating-heart';
                            h.textContent = heartSymbols[(i + cardIdx) % heartSymbols.length];
                            const offsetX = (Math.random() - 0.5) * 76;
                            const offsetY = (Math.random() - 0.5) * 30;
                            h.style.left = `${cx + offsetX}px`;
                            h.style.top = `${cy + offsetY}px`;
                            document.body.appendChild(h);
                            setTimeout(() => h.remove(), 1450);
                        }, i * 110);
                    }
                });

                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                const banner = document.createElement('div');
                banner.className = 'gxr-love-banner';
                banner.textContent = ' G × R ';
                document.body.appendChild(banner);
                setTimeout(() => banner.remove(), 2200);

                [523.25, 659.25, 783.99, 987.77, 1046.50].forEach((freq, idx) => {
                    setTimeout(() => playBeep(freq, 0.16, 'sine', 0.045), idx * 85);
                });
            }

            let gxrBuffer = '';
            window.addEventListener('keydown', (e) => {
                if (e.key.length !== 1) return;
                const ch = e.key.toUpperCase();
                if (ch === ' ') return;
                gxrBuffer = (gxrBuffer + ch).slice(-3);
                if (gxrBuffer === 'GXR') {
                    gxrBuffer = '';
                    triggerGxRHearts();
                }
            });

            if (DOM.searchInput) {
                DOM.searchInput.addEventListener('input', () => {
                    const compact = DOM.searchInput.value.toLowerCase().replace(/\s+/g, '');
                    if (compact === 'gxr') {
                        DOM.searchInput.value = '';
                        filterCards();
                        triggerGxRHearts();
                    }
                });
            }
        }
        /*
            SIR BEFORE YOU FLAME ME FOR TS
            THEY CONSENTED TO THIS
            THEY AGREED TO IT
            SUPPOSE IT DOESN'T WORK OUT
            THEN
            I'LL REMOVE IT
        */
    }
    function startCornerstoneShimmer() {
        [document.querySelector('.center-text'), document.querySelector('.theme-banner')]
            .filter(Boolean)
            .forEach(el => {
                el.style.cursor = 'pointer';
                el.style.userSelect = 'none';

                el.addEventListener('click', (e) => {
                    if (e.detail !== 3) return;
                    const banner = document.querySelector('.theme-banner');
                    if (banner) {
                        banner.classList.remove('cornerstone-shimmer');
                        void banner.offsetWidth;
                        banner.classList.add('cornerstone-shimmer');
                    }
                    playBeep(523.25, 0.14, 'triangle', 0.045);
                    setTimeout(() => playBeep(659.25, 0.14, 'triangle', 0.045), 90);
                    setTimeout(() => playBeep(783.99, 0.24, 'triangle', 0.05), 180);
                    spawnBurst(e.clientX, e.clientY, ['#facc15', '#fef08a'], 24);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                });
            });
    }
    function startPersonRecognitionProtocol() {
        const synopsisCard = document.querySelector('.synopsis-card');
        if (!synopsisCard) return;

        const rosterPool = getCards().filter(c => c.dataset.role !== 'Teacher');
        if (rosterPool.length < 4) return;

        let streak = 0;
        let currentAnswer = null;
        let roundLocked = false;

        const box = document.createElement('div');
        box.className = 'reactor-guess-box';
        box.innerHTML = [
            '<div class="reactor-guess-header">',
            '<span> REACTOR TERMINAL // GUESS THE PERSON</span>',
            '<span id="reactorStreak">STREAK: 0</span>',
            '</div>',
            '<div class="reactor-clues" id="reactorClues"></div>',
            '<div class="reactor-status-msg" id="reactorStatus">Identify the Grade 7 – Psalms member from their clues:</div>',
            '<div class="reactor-options" id="reactorOptions"></div>',
            '<div class="reactor-footer-row">',
            '<button type="button" class="scripture-btn" id="reactorHintBtn" style="border-color:#00bcff;color:#00bcff;"> Initials Hint</button>',
            '<button type="button" class="scripture-btn" id="reactorNextBtn" style="border-color:#00ff66;color:#00ff66;">↻ Next Target</button>',
            '</div>'
        ].join('');

        const scriptureBox = synopsisCard.querySelector('.scripture-card');
        const themeBanner = synopsisCard.querySelector('.theme-banner');
        if (scriptureBox) scriptureBox.insertAdjacentElement('afterend', box);
        else if (themeBanner) themeBanner.insertAdjacentElement('afterend', box);
        else synopsisCard.appendChild(box);

        const streakEl = box.querySelector('#reactorStreak');
        const cluesEl = box.querySelector('#reactorClues');
        const statusEl = box.querySelector('#reactorStatus');
        const optionsEl = box.querySelector('#reactorOptions');
        const hintBtn = box.querySelector('#reactorHintBtn');
        const nextBtn = box.querySelector('#reactorNextBtn');

        function getCleanName(card) {
            return card.querySelector('.overlay-text').textContent.trim();
        }

        function buildClues(card) {
            const clues = [];
            const isOfficer = card.dataset.filter === 'officer';
            const baseRole = card.dataset.displayRole || card.dataset.role || 'Student';
            const team = card.dataset.team || '';
            const character = card.dataset.character || '';
            const faction = CONFIG.factionLabels[card.dataset.faction] || '';

            clues.push(isOfficer ? ` Officer: ${baseRole}` : ' Class Member');
            clues.push(character ? ` ${character}` : ' Behind-the-Scenes Crew');
            if (team) clues.push(` ${team}`);
            else if (!isOfficer && baseRole !== 'Student') clues.push(` ${baseRole}`);
            if (faction) clues.push(` ${faction}`);

            return clues;
        }

        function startRound() {
            roundLocked = false;
            const shuffled = [...rosterPool].sort(() => Math.random() - 0.5);
            currentAnswer = shuffled.at(0);
            const choices = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);

            cluesEl.innerHTML = buildClues(currentAnswer)
                .map(c => `<span class="reactor-clue-pill">${c}</span>`)
                .join('');

            statusEl.style.color = '#00bcff';
            statusEl.textContent = 'Identify the Grade 7 – Psalms member from their clues:';

            optionsEl.innerHTML = '';
            choices.forEach(choiceCard => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'reactor-opt-btn';
                btn.textContent = getCleanName(choiceCard);

                btn.addEventListener('click', () => {
                    if (roundLocked) return;
                    roundLocked = true;

                    const allBtns = optionsEl.querySelectorAll('.reactor-opt-btn');
                    allBtns.forEach(b => { b.disabled = true; });

                    if (choiceCard === currentAnswer) {
                        btn.classList.add('is-correct');
                        streak++;
                        streakEl.textContent = `STREAK: ${streak}`;
                        statusEl.style.color = '#00ff66';
                        statusEl.textContent = ` MATCH CONFIRMED !  ${getCleanName(currentAnswer)}!`;

                        const rect = btn.getBoundingClientRect();
                        spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#00ff66', '#00bcff', '#ffffff'], 24);
                        if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                        playBeep(523.25, 0.08, 'square', 0.045);
                        setTimeout(() => playBeep(783.99, 0.14, 'square', 0.045), 75);
                    } else {
                        btn.classList.add('is-wrong');
                        allBtns.forEach(b => {
                            if (b.textContent === getCleanName(currentAnswer)) b.classList.add('is-correct');
                        });
                        streak = 0;
                        streakEl.textContent = 'STREAK: 0';
                        statusEl.style.color = '#f87171';
                        statusEl.textContent = ` ACCESS DENIED !  Answer: ${getCleanName(currentAnswer)}`;
                        playBeep(190, 0.22, 'sawtooth', 0.05);
                    }
                });

                optionsEl.appendChild(btn);
            });
        }

        hintBtn.addEventListener('click', () => {
            if (!currentAnswer || roundLocked) return;
            const words = getCleanName(currentAnswer).replace(/,/g, '').split(/\s+/).filter(Boolean);
            const initials = words.map(w => `${w.charAt(0).toUpperCase()}.`).join(' ');
            statusEl.style.color = '#fde047';
            statusEl.textContent = ` INITIALS HINT: ${initials}`;
            playBeep(660, 0.06, 'sine', 0.035);
        });

        nextBtn.addEventListener('click', () => {
            playBeep(480, 0.05, 'square', 0.035);
            startRound();
        });

        startRound();
    }
    function unlockDoomsdayTheme() {
        localStorage.setItem('afcs_doomsday_unlocked', 'true');
        if (typeof window.applySecretTheme === 'function') {
            window.applySecretTheme('doomsday');
        } else {
            document.body.classList.remove('search-fx-cornerstone', 'search-fx-dubai', 'party-mode');
            document.body.classList.add('theme-doomsday');
        }

        const banner = document.createElement('div');
        banner.className = 'doomsday-unlock-banner';
        banner.textContent = ' MULTIVERSE INCURSION UNLOCKED // DOOMSDAY EMERALD';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 2800);

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        STATE.particles.push({
            type: 'SHOCKWAVE',
            x: cx,
            y: cy,
            radius: 10,
            maxRadius: Math.max(cx, cy) * 0.85,
            alpha: 1.0,
            color: '#10b981'
        });
        spawnBurst(cx, cy, ['#10b981', '#a7f3d0', '#e2e8f0', '#facc15'], 48);
        if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

        const doomChord = [73.42, 110.00, 146.83, 174.61, 293.66];
        doomChord.forEach((freq, idx) => {
            setTimeout(() => playBeep(freq, 0.65, 'sawtooth', 0.045), idx * 95);
        });
    }
    function unlockFaithianTheme() {
        localStorage.setItem('afcs_faithian_unlocked', 'true');
        if (typeof window.applySecretTheme === 'function') {
            window.applySecretTheme('faithian');
        } else {
            document.body.classList.remove('search-fx-cornerstone', 'search-fx-dubai', 'party-mode', 'theme-doomsday');
            document.body.classList.add('theme-faithian');
        }

        const banner = document.createElement('div');
        banner.className = 'faithian-unlock-banner';
        banner.textContent = ' CALLED FOR A PURPOSE // AFCS FAITHIAN THEME UNLOCKED';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 2800);

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        STATE.particles.push({
            type: 'SHOCKWAVE',
            x: cx,
            y: cy,
            radius: 10,
            maxRadius: Math.max(cx, cy) * 0.85,
            alpha: 1.0,
            color: '#ef4444'
        });
        spawnBurst(cx, cy, ['#ef4444', '#2563eb', '#ffffff', '#facc15'], 48);
        if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

        const faithianChord = [261.63, 329.63, 392.00, 523.25, 659.25];
        faithianChord.forEach((freq, idx) => {
            setTimeout(() => playBeep(freq, 0.55, 'triangle', 0.045), idx * 85);
        });
    }
    function lebronJames() {
        if (!DOM.container) return;

        let dunkInProgress = false;
        let homeScore = 0;
        let awayScore = 0;
        let timerSeconds = 300;
        let timerInterval = null;
        let rivalTimeout = null;
        let scoreboardEl = null;

        function ensureScoreboard() {
            if (!scoreboardEl) {
                scoreboardEl = document.createElement('div');
                scoreboardEl.className = 'lebron-led-scoreboard';
                scoreboardEl.innerHTML = [
                    '<div class="sb-top-row">',
                    '<span class="sb-arrow active" id="sbHomeArrow"></span>',
                    '<div class="sb-clock" id="lbClock">05:00</div>',
                    '<span class="sb-arrow" id="sbAwayArrow"></span>',
                    '</div>',
                    '<div class="sb-mid-row">',
                    '<span class="sb-period-dot active"></span>',
                    '<span class="sb-period-dot"></span>',
                    '<span class="sb-period-dot"></span>',
                    '<span class="sb-period-dot"></span>',
                    '</div>',
                    '<div class="sb-scores-row">',
                    '<div class="sb-team-box"><span class="sb-label">LEBRON (HOME)</span><span class="sb-digits" id="lbHomeScore">00</span></div>',
                    '<div class="sb-shot-box"><span class="sb-label">SHOT</span><span class="sb-shot-digits" id="lbShotClock">24</span></div>',
                    '<div class="sb-team-box"><span class="sb-label">KAWHI (AWAY)</span><span class="sb-digits is-away" id="lbAwayScore">00</span></div>',
                    '</div>'
                ].join('');
                document.body.appendChild(scoreboardEl);
            }
            requestAnimationFrame(() => scoreboardEl.classList.add('is-dropped'));
            return scoreboardEl;
        }
        function updateScoreboardDisplay(lastScorer = null) {
            if (!scoreboardEl) return;
            const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
            const secs = String(timerSeconds % 60).padStart(2, '0');
            const clockEl = scoreboardEl.querySelector('#lbClock');
            const homeEl = scoreboardEl.querySelector('#lbHomeScore');
            const awayEl = scoreboardEl.querySelector('#lbAwayScore');
            const homeArrow = scoreboardEl.querySelector('#sbHomeArrow');
            const awayArrow = scoreboardEl.querySelector('#sbAwayArrow');

            if (clockEl) clockEl.textContent = `${mins}:${secs}`;
            if (homeEl) homeEl.textContent = String(homeScore).padStart(2, '0');
            if (awayEl) awayEl.textContent = String(awayScore).padStart(2, '0');

            if (lastScorer === 'home') {
                if (homeArrow) homeArrow.classList.add('active');
                if (awayArrow) awayArrow.classList.remove('active');
            } else if (lastScorer === 'away') {
                if (awayArrow) awayArrow.classList.add('active');
                if (homeArrow) homeArrow.classList.remove('active');
            }
        }

        function stopRivalLoop() {
            clearTimeout(rivalTimeout);
            rivalTimeout = null;
        }

        function triggerRivalAutoScore(side) {
            if (!timerInterval) return;

            const targetSelector = side === 'away' ? '#lbAwayScore' : '#lbHomeScore';
            const digitEl = scoreboardEl ? scoreboardEl.querySelector(targetSelector) : null;

            if (side === 'away') {
                awayScore = Math.min(199, awayScore + 2);
                updateScoreboardDisplay('away');
            } else {
                homeScore = Math.min(199, homeScore + 2);
                updateScoreboardDisplay('home');
            }

            if (digitEl) {
                digitEl.classList.remove('score-pop');
                void digitEl.offsetWidth;
                digitEl.classList.add('score-pop');

                const rect = digitEl.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const popTag = document.createElement('div');
                popTag.className = 'quirk-float-pop';
                popTag.textContent = side === 'away' ? ' KAWHI +2!' : ' LEBRON +2!';
                popTag.style.cssText = `left:${cx}px;top:${cy + 28}px;font-size:14px;font-weight:900;color:${side === 'away' ? '#38bdf8' : '#facc15'};text-shadow:0 2px 10px #000;`;
                document.body.appendChild(popTag);
                setTimeout(() => popTag.remove(), 900);

                spawnBurst(cx, cy, side === 'away' ? ['#38bdf8', '#ffffff'] : ['#facc15', '#a855f7'], 14);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
            }

            playBeep(side === 'away' ? 493.88 : 587.33, 0.09, 'triangle', 0.04);
            setTimeout(() => playBeep(side === 'away' ? 659.25 : 783.99, 0.14, 'triangle', 0.045), 75);
        }

        function scheduleRivalScore(rivalSide) {
            stopRivalLoop();
            if (!timerInterval) return;
            const delayMs = 2000 + Math.floor(Math.random() * 5000);
            rivalTimeout = setTimeout(() => {
                if (!timerInterval) return;
                triggerRivalAutoScore(rivalSide);
                scheduleRivalScore(rivalSide);
            }, delayMs);
        }

        function startMatchClock(activeUserSide) {
            const rivalSide = activeUserSide === 'home' ? 'away' : 'home';
            if (!timerInterval) {
                timerSeconds = 300;
                updateScoreboardDisplay(activeUserSide);

                timerInterval = setInterval(() => {
                    timerSeconds--;
                    updateScoreboardDisplay();

                    if (timerSeconds <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        stopRivalLoop();

                        playBeep(146.83, 0.45, 'sawtooth', 0.08);
                        setTimeout(() => playBeep(110.00, 0.75, 'sawtooth', 0.09), 220);

                        if (scoreboardEl) {
                            scoreboardEl.classList.add('is-buzzer');
                            setTimeout(() => {
                                homeScore = 0;
                                awayScore = 0;
                                timerSeconds = 300;
                                updateScoreboardDisplay('home');
                                scoreboardEl.classList.remove('is-buzzer', 'is-dropped');
                            }, 2200);
                        } else {
                            homeScore = 0;
                            awayScore = 0;
                            timerSeconds = 300;
                        }
                    }
                }, 1000);
            }
            scheduleRivalScore(rivalSide);
        }
        function triggerHeroSlamDunk(startX, startY, side = 'home') {
            if (dunkInProgress) return;
            dunkInProgress = true;

            setTimeout(() => closePanel(), 10);

            const ball = document.createElement('div');
            ball.className = 'lebron-dunk-ball';
            ball.textContent = '';
            ball.style.left = `${startX}px`;
            ball.style.top = `${startY}px`;
            document.body.appendChild(ball);

            const floorY = window.innerHeight - 44;
            const endX = Math.min(window.innerWidth - 70, Math.max(90, window.innerWidth * 0.82));
            const stepX = (endX - startX) / 4;

            const dribbleAnim = ball.animate([
                { left: `${startX}px`, top: `${startY}px`, transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
                { left: `${startX + stepX * 0.5}px`, top: `${floorY}px`, transform: 'translate(-50%, -50%) scale(1.18, 0.82) rotate(90deg)', offset: 0.12 },
                { left: `${startX + stepX}px`, top: `${floorY - 125}px`, transform: 'translate(-50%, -50%) scale(0.96, 1.05) rotate(180deg)', offset: 0.25 },
                { left: `${startX + stepX * 1.5}px`, top: `${floorY}px`, transform: 'translate(-50%, -50%) scale(1.18, 0.82) rotate(270deg)', offset: 0.37 },
                { left: `${startX + stepX * 2}px`, top: `${floorY - 130}px`, transform: 'translate(-50%, -50%) scale(0.96, 1.05) rotate(360deg)', offset: 0.50 },
                { left: `${startX + stepX * 2.5}px`, top: `${floorY}px`, transform: 'translate(-50%, -50%) scale(1.18, 0.82) rotate(450deg)', offset: 0.62 },
                { left: `${startX + stepX * 3}px`, top: `${floorY - 135}px`, transform: 'translate(-50%, -50%) scale(0.96, 1.05) rotate(540deg)', offset: 0.75 },
                { left: `${startX + stepX * 3.5}px`, top: `${floorY}px`, transform: 'translate(-50%, -50%) scale(1.22, 0.78) rotate(630deg)', offset: 0.88 },
                { left: `${endX}px`, top: `${floorY - 90}px`, transform: 'translate(-50%, -50%) scale(1.1) rotate(720deg)', offset: 1 }
            ], {
                duration: 2000,
                easing: 'linear',
                fill: 'forwards'
            });

            const bounceTimes = [240, 740, 1240, 1760];
            bounceTimes.forEach((ms, i) => {
                setTimeout(() => {
                    const bx = startX + stepX * (i + 0.5);
                    playBeep(115 + i * 8, 0.08, 'sine', 0.08);
                    spawnBurst(bx, floorY + 12, side === 'away' ? ['#38bdf8', '#94a3b8'] : ['#fb923c', '#facc15'], 8);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                }, ms);
            });

            dribbleAnim.onfinish = () => {
                ball.remove();

                const launchBall = document.createElement('div');
                launchBall.className = 'lebron-dunk-ball';
                launchBall.textContent = '';
                launchBall.style.left = `${endX}px`;
                launchBall.style.top = `${floorY - 90}px`;
                document.body.appendChild(launchBall);

                requestAnimationFrame(() => {
                    launchBall.style.transition = 'top 0.65s cubic-bezier(0.22, 1, 0.36, 1), left 0.65s ease-out, transform 0.65s ease-out';
                    launchBall.style.top = '-70px';
                    launchBall.style.left = `${Math.max(140, endX - 90)}px`;
                    launchBall.style.transform = 'translate(-50%, -50%) scale(1.25) rotate(-540deg)';
                });

                playBeep(320, 0.14, 'triangle', 0.055);
                window.scrollTo({ top: 0, behavior: 'smooth' });

                const hoop = document.createElement('div');
                hoop.className = 'lebron-hero-hoop';
                hoop.innerHTML = '<div class="hoop-pole"></div><div class="hoop-arm"></div><div class="hoop-backboard"></div><div class="hoop-rim"></div><div class="hoop-net"></div>';
                document.body.appendChild(hoop);

                requestAnimationFrame(() => hoop.classList.add('is-visible'));

                setTimeout(() => {
                    launchBall.remove();

                    const incomingBall = document.createElement('div');
                    incomingBall.className = 'lebron-dunk-ball';
                    incomingBall.textContent = '';
                    const startArcX = Math.min(window.innerWidth - 60, window.innerWidth * 0.78);
                    const startArcY = window.innerHeight + 50;
                    incomingBall.style.left = `${startArcX}px`;
                    incomingBall.style.top = `${startArcY}px`;
                    document.body.appendChild(incomingBall);

                    const rimEl = hoop.querySelector('.hoop-rim');
                    const rimRect = rimEl.getBoundingClientRect();
                    const rimX = rimRect.left + rimRect.width / 2;
                    const rimY = rimRect.top + rimRect.height / 2;

                    const arcAnim = incomingBall.animate([
                        {
                            left: `${startArcX}px`,
                            top: `${startArcY}px`,
                            transform: 'translate(-50%, -50%) scale(1.3) rotate(0deg)'
                        },
                        {
                            left: `${rimX + 140}px`,
                            top: `${Math.max(55, rimY - 115)}px`,
                            transform: 'translate(-50%, -50%) scale(1.45) rotate(-260deg)',
                            offset: 0.62
                        },
                        {
                            left: `${rimX}px`,
                            top: `${rimY - 6}px`,
                            transform: 'translate(-50%, -50%) scale(1.15) rotate(-420deg)',
                            offset: 0.85
                        },
                        {
                            left: `${rimX}px`,
                            top: `${rimY + 62}px`,
                            transform: 'translate(-50%, -50%) scale(0.95) rotate(-520deg)',
                            opacity: 0
                        }
                    ], {
                        duration: 850,
                        easing: 'cubic-bezier(0.25, 0.9, 0.35, 1)',
                        fill: 'forwards'
                    });

                    setTimeout(() => {
                        hoop.classList.add('is-dunked');
                        document.body.classList.add('quirk-bomb-shake');

                        const fire = document.createElement('div');
                        fire.className = 'lebron-dunk-fire';
                        fire.textContent = side === 'away' ? '' : '';
                        fire.style.left = `${rimX}px`;
                        fire.style.top = `${rimY}px`;
                        document.body.appendChild(fire);
                        setTimeout(() => fire.remove(), 1100);

                        ensureScoreboard();
                        if (side === 'away') {
                            awayScore = Math.min(199, awayScore + 2);
                        } else {
                            homeScore = Math.min(199, homeScore + 2);
                        }
                        updateScoreboardDisplay(side);
                        startMatchClock(side);

                        const targetDigitSelector = side === 'away' ? '#lbAwayScore' : '#lbHomeScore';
                        const activeDigits = scoreboardEl.querySelector(targetDigitSelector);
                        if (activeDigits) {
                            activeDigits.classList.remove('score-pop');
                            void activeDigits.offsetWidth;
                            activeDigits.classList.add('score-pop');
                        }

                        spawnBurst(rimX, rimY, side === 'away' ? ['#38bdf8', '#ef4444', '#ffffff'] : ['#fb923c', '#facc15', '#ef4444', '#ffffff'], 36);
                        if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                        playBeep(110, 0.22, 'sawtooth', 0.08);
                        setTimeout(() => playBeep(65, 0.3, 'square', 0.07), 50);
                        setTimeout(() => playBeep(783.99, 0.16, 'triangle', 0.05), 140);
                        setTimeout(() => playBeep(1046.50, 0.24, 'triangle', 0.055), 220);

                        setTimeout(() => {
                            document.body.classList.remove('quirk-bomb-shake');
                        }, 480);
                    }, 710);

                    arcAnim.onfinish = () => {
                        incomingBall.remove();
                        setTimeout(() => {
                            hoop.classList.remove('is-visible');
                            setTimeout(() => {
                                hoop.remove();
                                dunkInProgress = false;
                            }, 380);
                        }, 650);
                    };
                }, 680);
            };
        }
        function spawnLegendCard(config, animate = false) {
            if (document.getElementById(config.wrapperId)) return;

            const wrapper = document.createElement('div');
            wrapper.id = config.wrapperId;
            wrapper.className = 'PersonWrapper reveal-on-scroll is-visible';

            const card = document.createElement('div');
            card.className = `PeoplePics ${config.cardClass}`;
            card.dataset.role = 'Guest Legend';
            card.dataset.displayRole = 'VIP Guest Star';
            card.dataset.character = config.character;
            card.dataset.birthday = config.birthday;
            card.dataset.bio = config.bio;

            const img = document.createElement('img');
            img.src = config.imgSrc;
            img.alt = config.fullName;

            const label = document.createElement('p');
            label.className = 'overlay-text';
            label.textContent = config.fullName;

            const pip = document.createElement('span');
            pip.className = `portrait-role-pip ${config.pipClass}`;
            pip.textContent = config.pipEmoji;
            pip.title = config.pipTitle;

            card.appendChild(img);
            card.appendChild(label);
            wrapper.appendChild(card);
            wrapper.appendChild(pip);
            DOM.container.appendChild(wrapper);

            card.addEventListener('click', (e) => {
                if (e.detail !== 3) return;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                card.classList.remove('quirk-lebron-dribble');
                void card.offsetWidth;
                card.classList.add('quirk-lebron-dribble');

                triggerHeroSlamDunk(cx, cy, config.side);
            });

            if (animate) {
                card.classList.add('quirk-lebron-dribble');
                setTimeout(() => card.classList.remove('quirk-lebron-dribble'), 650);
            }

            filterCards();
        }

        const lebronConfig = {
            wrapperId: 'lebronSecretWrapper',
            cardClass: 'is-lebron-card',
            pipClass: 'pip-lebron',
            pipEmoji: '🏀',
            pipTitle: 'Basketball Legend',
            fullName: 'James, LeBron',
            imgSrc: 'otherPics/Lebron.jpg',
            character: 'Artist 6 - Basketball Legend',
            birthday: 'December 30, 1984',
           bio: 'widely regarded as one of the greatest basketball players of all time, LeBron "King" James is a 4× NBA Champion, 4× NBA MVP, 3× Olympic Gold Medalist, and the first player in NBA history to surpass 40,000 career points. Taking a break from rewriting the record books, he is making a surprise VIP guest appearance high above Dubai at the Burj Khalifa Christmas Meet & Greet for Paskong AFCS 2026 — bringing championship energy and festive cheer to Grade 7 – Psalms and guests!',
        };

        const kawhiConfig = {
            wrapperId: 'kawhiSecretWrapper',
            cardClass: 'is-kawhi-card',
            pipClass: 'pip-kawhi',
            pipEmoji: '🏀',
            pipTitle: 'The Klaw',
            fullName: 'Leonard, Kawhi',
            imgSrc: 'otherPics/kawhi.jpg',
            character: 'Artist 7 - Two-Way Superstar',
            birthday: 'June 29, 1991',
           bio: 'One of the most dominant two-way superstars in basketball history, Kawhi "The Klaw" Leonard is a 2× NBA Champion, 2× Finals MVP, and 2× Defensive Player of the Year famous for his four-bounce buzzer-beater and stoic intensity. Trading the hardwood for Dubai\'s skyline, he is stepping onto the Burj Khalifa stage to go head-to-head with LeBron James in an epic Paskong AFCS 2026 Christmas showdown for Grade 7 – Psalms and guests!',
            side: 'away'
        };

        if (localStorage.getItem('afcs_lebron_unlocked') === 'true') {
            spawnLegendCard(lebronConfig, false);
        }
        if (localStorage.getItem('afcs_kawhi_unlocked') === 'true') {
            spawnLegendCard(kawhiConfig, false);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                const val = DOM.searchInput.value.toLowerCase().trim();
                if (val === 'lebron' && localStorage.getItem('afcs_lebron_unlocked') !== 'true') {
                    localStorage.setItem('afcs_lebron_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#fb923c', '#facc15', '#a855f7'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [392.00, 493.88, 587.33, 783.99].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.14, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnLegendCard(lebronConfig, true);

                    const addedCard = document.querySelector('#lebronSecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                } else if (val === 'kawhi' && localStorage.getItem('afcs_kawhi_unlocked') !== 'true') {
                    localStorage.setItem('afcs_kawhi_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#38bdf8', '#ef4444', '#ffffff'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [329.63, 440.00, 523.25, 659.25].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.14, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnLegendCard(kawhiConfig, true);

                    const addedCard = document.querySelector('#kawhiSecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                }
            });
        }
    }
    function startLeonhardEuler() {
        if (!DOM.container) return;

        const eulerFormulas = [
            'e^(iπ) + 1 = 0 ',
            'e ≈ 2.718281828459... ',
            'V − E + F = 2 ',
            'ζ(2) = ∑ 1/n² = π² / 6 ',
            'e^(ix) = cos(x) + i·sin(x)',
            'f(x), Function Notation! ',
            'γ ≈ 0.577215664901... ',
            'ζ(s) = ∑ 1/nˢ = ∏ (1 - p⁻ˢ)⁻¹ ',
            'a^φ(n) ≡ 1 (mod n) ',
            '∂u/∂t + (u·∇)u = -∇p/ρ + g ',
            'x·∂f/∂x + y·∂f/∂y = n·f(x,y) ',
            'P_cr = π²EI / (KL)² ',
            'e = ∑ 1/n! ',
            'i^i = e^(-π/2) ≈ 0.207879576... ',
            'x(d²y/dx²) + dy/dx + xy = 0 ',
            '∑ (from n=1 to ∞) (-1)^(n-1) / n = ln(2) ',
            'Euler Line: H, G, and O are collinear ',
            '∫₀^∞ e^(-x²) dx = √π / 2 ',
            'Γ(n) = (n − 1)! ',
            'Γ(z) = ∫₀^∞ t^(z−1) e^(-t) dt ',
            'B(x, y) = Γ(x)Γ(y) / Γ(x + y) ',
            'π / 4 = 1 − 1/3 + 1/5 − 1/7 + ... ',
            'π / 4 = 4·arctan(1/5) − arctan(1/239) ',
            'sin(x) = x · ∏ (1 − x² / (n²π²)) ',
            'cos(x) = ∏ (1 − 4x² / ((2n−1)²π²)) ',
            'sin(x) = (e^(ix) − e^(-ix)) / (2i) ',
            'cos(x) = (e^(ix) + e^(-ix)) / 2 ',
            'ln(−1) = iπ ',
            'ζ(4) = ∑ 1/n⁴ = π⁴ / 90 ',
            'ζ(6) = ∑ 1/n⁶ = π⁶ / 945 ',
            '1 − 2 + 3 − 4 + ... = 1/4 ',
            '1 − 1 + 1 − 1 + ... = 1/2 ',
            'φ(n) = n · ∏ (1 − 1/p) ',
            'a^(p−1) ≡ 1 (mod p) ',
            'M_p = 2^p − 1 (Mersenne Primes) ',
            '2^(p−1)(2^p − 1) = Even Perfect Numbers ',
            '641 divides 2³² + 1 ',
            'R² = d(d − 2r) (Euler Triangle Theorem) ',
            'Area = √(s(s−a)(s−b)(s−c)) ',
            '9-Point Circle: Euler\'s Circle! ',
            'χ = V − E + F = 2 − 2g ',
            'Seven Bridges of Königsberg: No Eulerian Path! ',
            'd/dt (I·ω) + ω × (I·ω) = τ ',
            'dL/dt = τ (Euler\'s Second Law) ',
            'L = T − V (Euler-Lagrange: ∂L/∂q − d/dt(∂L/∂q̇) = 0) ',
            'κ_n = κ₁·cos²(θ) + κ₂·sin²(θ) ',
            'T₂ = T₁ · e^(μβ) (Capstan Equation) ',
            'f(x + h) ≈ f(x) + h·f\'(x) (Euler\'s Method) ',
            '∏ (1 − xⁿ)⁻¹ = ∑ p(n)xⁿ (Partition Function) ',
            '∑ (from k=1 to ∞) 1 / k² = 3 · ∑ 1 / (k²·C(2k,k)) ',
            'i = √(−1), Imaginary Unit Notation! ',
            '∑, Sigma Summation Notation! ',
            'Δy, Finite Difference Notation! '
        ];
        let formulaIdx = -1;

        function spawnEulerCard(animate = false) {
            if (document.getElementById('eulerSecretWrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.id = 'eulerSecretWrapper';
            wrapper.className = 'PersonWrapper reveal-on-scroll is-visible';
            
            const card = document.createElement('div');
            card.className = 'PeoplePics is-euler-card';
            card.dataset.role = 'Guest Legend';
            card.dataset.displayRole = 'VIP Math Legend';
            card.dataset.character = 'Artist 8 - Grandmaster of Mathematics';
            card.dataset.birthday = 'April 15, 1707';
            card.dataset.bio = '18th-century Swiss mathematician, physicist, and creator of e^(iπ) + 1 = 0, stopping by the Burj Khalifa Christmas Meet & Greet for Paskong AFCS 2026!';

            const img = document.createElement('img');
            img.src = 'otherPics/euler.jpg';
            img.alt = 'Euler, Leonhard';

            const label = document.createElement('p');
            label.className = 'overlay-text';
            label.textContent = 'Euler, Leonhard';

            const pip = document.createElement('span');
            pip.className = 'portrait-role-pip pip-euler';
            pip.textContent = '∑';
            pip.title = 'Leonhard Euler (e ≈ 2.71828)';

            const orbitRingBack = document.createElement('div');
            orbitRingBack.className = 'euler-orbit-ring is-back';

            const orbitRingFront = document.createElement('div');
            orbitRingFront.className = 'euler-orbit-ring is-front';

            const orbitSatellite = document.createElement('div');
            orbitSatellite.className = 'euler-unit-circle';
            orbitSatellite.title = 'Unit Circle (x² + y² = 1)';
            orbitSatellite.innerHTML = [
                '<svg viewBox="0 0 36 36" width="34" height="34">',
                '<line x1="2" y1="18" x2="33" y2="18" stroke="#050a23" stroke-width="1.3" stroke-linecap="round"/>',
                '<line x1="18" y1="34" x2="18" y2="3" stroke="#050a23" stroke-width="1.3" stroke-linecap="round"/>',
                '<polygon points="34,18 30.5,16.2 30.5,19.8" fill="#050a23"/>',
                '<polygon points="18,2 16.2,5.5 19.8,5.5" fill="#050a23"/>',
                '<circle cx="18" cy="18" r="10" fill="none" stroke="#1d4ed8" stroke-width="1.8"/>',
                '<polyline points="18,14.5 21.5,14.5 21.5,18" fill="none" stroke="#16a34a" stroke-width="1.2"/>',
                '<line x1="18" y1="18" x2="18" y2="8" stroke="#16a34a" stroke-width="1.8" stroke-linecap="round"/>',
                '<line x1="18" y1="18" x2="28" y2="18" stroke="#f97316" stroke-width="1.8" stroke-linecap="round"/>',
                '</svg>'
            ].join('');

            card.appendChild(img);
            card.appendChild(label);
            wrapper.appendChild(orbitRingBack);
            wrapper.appendChild(card);
            wrapper.appendChild(orbitRingFront);
            wrapper.appendChild(orbitSatellite);
            wrapper.appendChild(pip);
            DOM.container.appendChild(wrapper);
            

            card.addEventListener('click', () => {
                let nextIdx = Math.floor(Math.random() * eulerFormulas.length);
                if (eulerFormulas.length > 1 && nextIdx === formulaIdx) {
                    nextIdx = (nextIdx + 1) % eulerFormulas.length;
                }
                formulaIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                card.animate([
                    { transform: 'rotate(0deg) scale(1)' },
                    { transform: 'rotate(-10deg) scale(1.12)', offset: 0.35 },
                    { transform: 'rotate(10deg) scale(1.12)', offset: 0.7 },
                    { transform: 'rotate(0deg) scale(1)' }
                ], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                const badge = document.createElement('div');
                badge.className = 'quirk-euler-bubble';
                badge.textContent = eulerFormulas[formulaIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                STATE.particles.push({
                    type: 'SHOCKWAVE',
                    x: cx,
                    y: cy,
                    radius: 8,
                    maxRadius: 95,
                    alpha: 1.0,
                    color: '#facc15'
                });
                spawnBurst(cx, cy, ['#facc15', '#38bdf8', '#fef08a', '#ffffff'], 24);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();

                [271.83, 314.16, 440.00, 543.66].forEach((freq, i) => {
                    setTimeout(() => playBeep(freq, 0.1, 'triangle', 0.04), i * 60);
                });
            });

            if (animate) {
                card.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.12)', offset: 0.5 },
                    { transform: 'scale(1)' }
                ], { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
            }

            filterCards();
        }

        if (localStorage.getItem('afcs_euler_unlocked') === 'true') {
            spawnEulerCard(false);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                const val = DOM.searchInput.value.toLowerCase().trim();
                if ((val === 'euler' || val === '2.71828') && localStorage.getItem('afcs_euler_unlocked') !== 'true') {
                    localStorage.setItem('afcs_euler_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#facc15', '#38bdf8', '#ffffff'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [271.83, 314.16, 440.00, 628.32].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.15, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnEulerCard(true);

                    const addedCard = document.querySelector('#eulerSecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                }
            });
        }
    }
    function startNewtonAlterEgo() {
        const newtonFormulas = [
            'F = m · a (Second Law of Motion)',
            'F = G · (m₁m₂) / r² (Universal Gravitation)',
            'Every action has an equal and opposite reaction! ',
            'An object at rest stays at rest unless acted upon! ',
            'd/dx (xⁿ) = n·xⁿ⁻¹ (Method of Fluxions!) ',
            '∫ f(x) dx — Fundamental Theorem of Calculus! ∫',
            'White light splits into ROYGBIV through a prism! ',
            'g ≈ 9.80665 m/s² — Watch out for falling apples! ',
            'If I have seen further, it is by standing on the shoulders of giants.',
            'Principia Mathematica (1687) — Laws of the Cosmos! ',
            'v = u + a·t | s = u·t + ½a·t² ',
            'p = m · v (Conservation of Momentum) ',
            'T_cool(t) = T_env + (T₀ − T_env)·e^(-kt) ',
            '(a + b)ⁿ = ∑ C(n,k) aⁿ⁻ᵏ bᵏ (Generalized Binomial Theorem!) ',
            'xₙ₊₁ = xₙ − f(xₙ) / f\'(xₙ) (Newton-Raphson Method!) ',
            'F = dp / dt (Force is the rate of change of momentum!) ',
            'J = F · Δt = Δp (Impulse-Momentum Theorem) ',
            'v² = u² + 2·a·s (Torricelli / Kinematic Equation) ',
            's = ½(u + v)·t (Average Velocity Displacement) ',
            'F_c = m·v² / r (Centripetal Force) ',
            'a_c = v² / r = ω²·r (Centripetal Acceleration) ',
            'g = G·M / R² (Gravitational Field Strength) ',
            'U_g = −G·(m₁m₂) / r (Gravitational Potential Energy) ',
            'v_esc = √(2GM / R) (Escape Velocity) ',
            'v_orb = √(GM / r) (Orbital Velocity) ',
            'T² = (4π² / GM)·r³ (Newton\'s Form of Kepler\'s Third Law) ',
            'd²r / dt² = −(GM / r²)·r̂ (Inverse-Square Orbital Acceleration) ',
            'P = F / A (Pressure Definition — 1 Pa = 1 N/m²) ',
            'W = F · d · cos(θ) (Mechanical Work) ',
            'KE = ½m·v² (Kinetic Energy) ',
            'PE = m·g·h (Near-Surface Gravitational Potential Energy) ',
            'P = W / t = F · v (Mechanical Power) ',
            'τ = r × F = I · α (Torque and Angular Acceleration) ',
            'L = I · ω = r × p (Angular Momentum) ',
            'dT / dt = −k·(T − T_env) (Newton\'s Law of Cooling — Differential Form) ',
            'τ_shear = μ · (du / dy) (Newtonian Fluid Viscosity!) ',
            'v_sound = √(P / ρ) (Newton\'s Formula for Speed of Sound) ',
            '1 / f = (n − 1)·(1/R₁ − 1/R₂) (Lensmaker\'s Equation) ',
            'rₙ = √(n · λ · R) (Newton\'s Rings Interference Radius!) ',
            'f_total = f₁ + f₂ (Power of Thin Lenses in Contact) ',
            '1 N = 1 kg·m/s² (The Newton — SI Unit of Force!) ',
            'G ≈ 6.67430 × 10⁻¹¹ N·m²/kg² (Universal Gravitational Constant) ',
            'd/dx [u(x)·v(x)] = u\'v + uv\' (Product Rule of Fluxions) ',
            'd/dx [u(x)/v(x)] = (u\'v − uv\') / v² (Quotient Rule of Fluxions) ',
            'dy/dx = (dy/dt) / (dx/dt) (Parametric Fluxions!) ',
            'A = ∫ₐᵇ f(x) dx (Area Under a Curve via Quadrature) ',
            'R = [1 + (dy/dx)²]^(3/2) / |d²y/dx²| (Radius of Curvature) ',
            'Pₙ(x) = f[x₀] + f[x₀,x₁](x−x₀) + ... (Newton\'s Divided Difference Polynomial) ',
            'Δⁿf(x) = ∑ (-1)ⁿ⁻ᵏ C(n,k) f(x + k·h) (Newton\'s Forward Difference Formula) ',
            'e = −(v₂ − v₁) / (u₂ − u₁) (Newton\'s Law of Restitution — Collisions!) ',
            'Opticks (1704) — Corpuscular Theory of Light & Prisms! ',
            'Reflecting Telescope (1668) — No Chromatic Aberration! ',
            'Absolute Space and Absolute Time — Principia Scholium! ',
            'Bucket Argument — Rotating Water & True Rotational Motion! ',
            'What goes up must come down! ',
            'Nature is pleased with simplicity, and affects not the pomp of superfluous causes. ',
            'Truth is ever to be found in simplicity, and not in the multiplicity and confusion of things. ',
            'To every action there is always opposed an equal reaction. ',
            'Gravity explains the motions of the planets, but it cannot explain who sets the planets in motion. ',
            'I can calculate the motion of heavenly bodies, but not the madness of people. ',
            'Tact is the knack of making a point without making an enemy. ',
            'Genius is patience. ',
            'No great discovery was ever made without a bold guess. ',
            'A man may imagine things that are false, but he can only understand things that are true. ',
            'To myself I am only a child playing on the beach, while vast oceans of truth lie undiscovered before me. '
        ];

        let isNewton = false;
        let newtonIdx = -1;
        let savedEulerState = null;

        function bindPanelNewtonClick() {
            if (!isNewton || !DOM.panelImageContainer) return;
            const drawerImg = DOM.panelImageContainer.querySelector('img');
            if (!drawerImg || drawerImg.dataset.newtonBound === 'true') return;

            drawerImg.dataset.newtonBound = 'true';
            drawerImg.style.cursor = 'pointer';
            drawerImg.title = 'Click Sir Isaac Newton for a Law or Fluxion!';

            drawerImg.addEventListener('click', (e) => {
                e.stopPropagation();
                let nextIdx = Math.floor(Math.random() * newtonFormulas.length);
                if (newtonFormulas.length > 1 && nextIdx === newtonIdx) {
                    nextIdx = (nextIdx + 1) % newtonFormulas.length;
                }
                newtonIdx = nextIdx;

                let bubble = DOM.panelBody.querySelector('.panel-newton-quote');
                if (!bubble) {
                    bubble = document.createElement('div');
                    bubble.className = 'panel-newton-quote';
                    DOM.panelBody.prepend(bubble);
                }

                bubble.textContent = newtonFormulas[newtonIdx];
                bubble.classList.remove('is-pop');
                void bubble.offsetWidth;
                bubble.classList.add('is-pop');

                const rect = DOM.panelImageContainer.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#ef4444', '#22c55e', '#facc15'], 18);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(392.00, 0.08, 'triangle', 0.045);
                setTimeout(() => playBeep(587.33, 0.14, 'triangle', 0.045), 70);
            });
        }

        STATE.onOpenCard.push((openedCard) => {
            if (isNewton && openedCard && openedCard.closest('#eulerSecretWrapper')) {
                requestAnimationFrame(bindPanelNewtonClick);
            }
            return false;
        });

        document.addEventListener('click', (e) => {
            const wrapper = e.target.closest('#eulerSecretWrapper');
            if (!wrapper) return;
            const card = wrapper.querySelector('.PeoplePics');
            if (!card) return;

            if (e.detail === 3) {
                isNewton = !isNewton;

                const img = card.querySelector('img');
                const label = card.querySelector('.overlay-text');
                const pip = wrapper.querySelector('.portrait-role-pip');
                const rings = wrapper.querySelectorAll('.euler-orbit-ring');
                const satellite = wrapper.querySelector('.euler-unit-circle');

                if (!savedEulerState && satellite) {
                    savedEulerState = {
                        satelliteHTML: satellite.innerHTML,
                        satelliteTitle: satellite.title
                    };
                }

                card.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], {
                    duration: 550,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });

                setTimeout(() => {
                    if (isNewton) {
                        card.classList.remove('is-euler-card');
                        card.classList.add('is-newton-card');
                        card.dataset.displayRole = 'VIP Physics Legend';
                        card.dataset.character = 'Artist 8 - Father of Calculus & Gravity';
                        card.dataset.birthday = 'January 4, 1643';
                        card.dataset.bio = 'English mathematician, physicist, and astronomer who discovered Universal Gravitation and Calculus, dropping into Paskong AFCS 2026!';
                        if (img) {
                            img.src = 'otherPics/Newton.jpg';
                            img.alt = 'Newton, Isaac';
                            img.classList.add('is-newton-pfp');
                        }
                        if (label) label.textContent = 'Newton, Isaac';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-newton';
                            pip.textContent = '🍎';
                            pip.title = 'Sir Isaac Newton (F = ma)';
                        }
                        rings.forEach(r => r.classList.add('is-newton-ring'));
                        if (satellite) {
                            satellite.classList.add('is-newton-apple');
                            satellite.title = 'Gravity Apple (g ≈ 9.81 m/s²)';
                            satellite.innerHTML = '';
                        }
                    } else {
                        card.classList.remove('is-newton-card');
                        card.classList.add('is-euler-card');
                        card.dataset.displayRole = 'VIP Math Legend';
                        card.dataset.character = 'Artist 8 - Grandmaster of Mathematics';
                        card.dataset.birthday = 'April 15, 1707';
                        card.dataset.bio = '18th-century Swiss mathematician, physicist, and creator of e^(iπ) + 1 = 0, stopping by the Burj Khalifa Christmas Meet & Greet for Paskong AFCS 2026!';
                        if (img) {
                            img.src = 'otherPics/euler.jpg';
                            img.alt = 'Euler, Leonhard';
                            img.classList.remove('is-newton-pfp');
                        }
                        if (label) label.textContent = 'Euler, Leonhard';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-euler';
                            pip.textContent = '∑';
                            pip.title = 'Leonhard Euler (e ≈ 2.71828)';
                        }
                        rings.forEach(r => r.classList.remove('is-newton-ring'));
                        if (satellite && savedEulerState) {
                            satellite.classList.remove('is-newton-apple');
                            satellite.title = savedEulerState.satelliteTitle;
                            satellite.innerHTML = savedEulerState.satelliteHTML;
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && card.classList.contains('active')) {
                        openCard(card);
                        if (isNewton) bindPanelNewtonClick();
                    }
                }, 275);

                const rect = card.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, isNewton ? ['#ef4444', '#22c55e', '#facc15'] : ['#facc15', '#38bdf8', '#ffffff'], 28);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isNewton ? 392.00 : 543.66, 0.09, 'triangle', 0.045);
                setTimeout(() => playBeep(isNewton ? 587.33 : 440.00, 0.14, 'triangle', 0.045), 75);
                return;
            }

            if (isNewton) {
                setTimeout(() => {
                    const bubble = document.querySelector('.quirk-euler-bubble');
                    if (bubble) {
                        let nextIdx = Math.floor(Math.random() * newtonFormulas.length);
                        if (newtonFormulas.length > 1 && nextIdx === newtonIdx) {
                            nextIdx = (nextIdx + 1) % newtonFormulas.length;
                        }
                        newtonIdx = nextIdx;
                        bubble.textContent = newtonFormulas[newtonIdx];
                    }
                }, 0);
            }
        });
    }
    function startCurryGuest() {
        if (!DOM.container) return;

        const curryQuotes = [
            'BANG! From way downtown! ',
            'Night, night! ',
            'Chef Curry with the shot! ',
            'I can do all things! — Philippians 4:13 ',
            'You don\'t want to see us next year. ',
            'Success is not an accident, success is actually a choice. ',
            'Be the best version of yourself in anything that you do. You don\'t have to live anybody else\'s story. ',
            'I\'ve never been afraid of big moments. I get butterflies. I get nervous and anxious, but I think those are all good signs that I\'m ready for the moment. ',
            'What are they gonna say now?! ',
            'Make sure you live in the moment and work your butt off every single day, and I hope I inspire people all around the world to just be themselves, be humble, and be grateful for all the blessings in your life. ',
            'There\'s more to life than basketball. The most important thing is your family and taking care of each other and loving each other no matter what. ',
            'If you don\'t fall, how are you going to know what getting up is like? ',
            'Every time I rise up, I have confidence that I\'m going to make it. ',
            'Play like you\'re in first, train like you\'re in second. ',
            'I try to make it look easy, but the behind-the-scenes stuff is the challenge. ',
            'People are going to doubt you. People are going to hate on you. Just let your game do the talking. ',
            'You have to be able to accept failure to get better. ',
            'No matter where you come from, what you have or don\'t have, what you lack or what you have too much of... all you need to have is faith in God, an undying passion for what you do, what you choose to do in this life, and a relentless drive and the will to do whatever it takes to be successful in whatever you put your mind to. ',
            'I\'m not the guy who\'s afraid of failure. I like to take risks, take the big shot and all that. ',
            'If you take time to realize what your dream is and what you really want in life — no matter what it is, whether it\'s sports or in other fields — you have to realize that there is always work to do, and you want to be the hardest working person in whatever you do. ',
            'When you step on the floor, you have to have the mindset that nobody can guard you. ',
            'The joy of the game is what keeps me going every single day. ',
            'I want to be known as someone who changed the way the game was played. ',
            'Greatness is a lot of small things done well, day after day. ',
            'Keep shooting. Eventually, the rim gets as big as the ocean. ',
            'Shimmy on \'em! ',
            'Look away before it even drops! ',
            '402 three-pointers in a single regular season! ',
            'First unanimous MVP in NBA history! ',
            'Four NBA championships and counting! ',
            'Golden State\'s finest — Splash Brothers forever! ',
            'From Davidson College to the top of the basketball world! ',
            'Logo three from thirty-five feet — nothing but net! ',
            'Ruining the game? No, just rewriting the playbook. ',
            'Gravity on the court pulls the whole defense out to half-court. ',
            'Keep moving off the ball until the defense breaks. ',
            'Faith, family, and basketball — in that order. ',
            'My faith is tested every day, on and off the court, and that\'s what grounds me. ',
            'I\'m blessed to play a game I love at the highest level. ',
            'Stay hungry, stay humble, and trust your preparation. ',
            'You can\'t skip steps if you want to reach the mountaintop. ',
            'Every shot I take in a game is a shot I\'ve practiced a thousand times in the dark. ',
            'Confidence comes from preparation, not from wishful thinking. ',
            'When you\'re locked in, the noise in the arena completely disappears. ',
            'We thrive in the chaos when everyone counts us out. ',
            'Ring me! ',
            '50 points in a Game 7 — clutch gene activated! ',
            'Double bang! From way downtown! ',
            'One motion, pure release, splash! ',
            'Don\'t let anybody tell you that you\'re too small to dominate. ',
            'Underrated? Never again. ',
            'Work in silence, let the scoreboard make the noise. ',
            'Every championship has its own story and its own battle scars. ',
            'The journey is always better than the destination when you share it with the right teammates. ',
            'You earn respect in June, not in October. ',
            'Respect the game, and the game will respect you back. ',
            'Never settle for good when greatness is within reach. ',
            'Smile through the pressure — that\'s when you know you\'re having fun. ',
            'From the tunnel shot before tip-off to the final buzzer! ',
            'Steph gonna Steph! ',
            'A quick trigger that leaves defenders reaching at air. ',
            'All-time three-point king of the NBA! ',
            'Olympic gold medalist — Nuit, nuit in Paris! ',
            'Four golden daggers to seal the gold! ',
            'Put the defenders to sleep and cue the celebration! '
        ];
        let quoteIdx = -1;

        function spawnCurryCard(animate = false) {
            if (document.getElementById('currySecretWrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.id = 'currySecretWrapper';
            wrapper.className = 'PersonWrapper reveal-on-scroll is-visible';

            const card = document.createElement('div');
            card.className = 'PeoplePics is-curry-card';
            card.dataset.role = 'Guest Legend';
            card.dataset.displayRole = 'VIP Basketball Legend';
            card.dataset.character = 'Artist 9 - Greatest Shooter Ever';
            card.dataset.birthday = 'March 14, 1988';
            card.dataset.bio = '4× NBA Champion and all-time 3-point king raining deep shots from the Burj Khalifa observation deck!';

            const img = document.createElement('img');
            img.src = 'otherPics/Curry.jpg';
            img.alt = 'Curry, Stephen';
            img.className = 'is-guest-alter-pfp';

            const label = document.createElement('p');
            label.className = 'overlay-text';
            label.textContent = 'Curry, Stephen';

            const pip = document.createElement('span');
            pip.className = 'portrait-role-pip pip-curry';
            pip.textContent = '🏀';
            pip.title = 'Chef Curry (3PT King)';

            card.appendChild(img);
            card.appendChild(label);
            wrapper.appendChild(card);
            wrapper.appendChild(pip);
            DOM.container.appendChild(wrapper);

            card.addEventListener('click', () => {
                if (card.classList.contains('is-jordan-card')) return;
                let nextIdx = Math.floor(Math.random() * curryQuotes.length);
                if (curryQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % curryQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = curryQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#38bdf8', '#facc15', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(523.25, 0.07, 'triangle', 0.04);
            });

            if (animate) {
                card.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.12)', offset: 0.5 },
                    { transform: 'scale(1)' }
                ], { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
            }

            filterCards();
        }

        if (localStorage.getItem('afcs_curry_unlocked') === 'true') {
            spawnCurryCard(false);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                const val = DOM.searchInput.value.toLowerCase().trim();
                if ((val === 'curry' || val === 'chef') && localStorage.getItem('afcs_curry_unlocked') !== 'true') {
                    localStorage.setItem('afcs_curry_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#38bdf8', '#facc15', '#ffffff'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [392.00, 523.25, 659.25, 783.99].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.14, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnCurryCard(true);

                    const addedCard = document.querySelector('#currySecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                }
            });
        }
    }
    function startJordanAlterEgo() {
        const jordanQuotes = [
            'And I took that personally. ',
            'Fly like an eagle — Air Jordan! ',
            '6 Rings, 6 Finals MVPs! ',
            'Limits, like fears, are often just an illusion.',
            'I can accept failure, everyone fails at something. But I can\'t accept not trying. ',
            'Talent wins games, but teamwork and intelligence win championships. ',
            'I\'ve missed more than 9,000 shots in my career. I\'ve lost almost 300 games. 26 times, I\'ve been trusted to take the game winning shot and missed. I\'ve failed over and over and over again in my life. And that is why I succeed. ',
            'Some people want it to happen, some wish it would happen, others make it happen. ',
            'Obstacles don\'t have to stop you. If you run into a wall, don\'t turn around and give up. Figure out how to climb it, go through it, or work around it. ',
            'To be successful you have to be selfish, or else you never achieve. And once you get to your highest level, then you have to be unselfish. ',
            'My attitude is that if you push me towards something that you think is a weakness, then I will turn that perceived weakness into a strength. ',
            'I\'ve never been afraid to fail. ',
            'You must expect great things of yourself before you can do them. ',
            'Always turn a negative situation into a positive situation. ',
            'If you\'re trying to achieve, there will be roadblocks. I\'ve had them; everybody has had them. ',
            'I play to win, whether during practice or a real game. And I will not let anything get in the way of me and my competitive enthusiasm to win. ',
            'Heart is what separates the good from the great. ',
            'The key to success is failure. ',
            'Earn your leadership every day. ',
            'Never say never, because limits, like fears, are often just an illusion. ',
            'You have to expect things of yourself before you can do them. ',
            'If you quit once it becomes a habit. Never quit! ',
            'Just play. Have fun. Enjoy the game. ',
            'The minute you get away from fundamentals — whether it\'s proper technique, work ethic or mental preparation — the bottom can fall out of your game, your schoolwork, your job, whatever you\'re doing. ',
            'I realized that if I was going to achieve anything in life I had to be aggressive. I had to get out there and go for it. ',
            'Once I made a decision, I never thought about it again. ',
            'Get the fundamentals down and the level of everything you do will rise. ',
            'There is no "i" in team but there is in win. ',
            'I don\'t do things half-heartedly. Because I know if I do, then I can expect half-hearted results. ',
            'To learn to succeed, you must first learn to fail. ',
            'My body could stand the crutches, but my mind couldn\'t stand the sideline. ',
            'I never looked at the consequences of missing a big shot... when you think about the consequences you always think of a negative result. ',
            'Step by step. I can\'t see any other way of accomplishing anything. ',
            'What is love? Love is playing every game as if it\'s your last. ',
            'I\'m not out there sweating for three hours every day just to find out what it feels like to sweat. ',
            'If you accept the expectations of others, especially negative ones, then you never will change the outcome. ',
            'My best skill was that I was coachable. I was a sponge and aggressive to learn. ',
            'Practice like you\'ve never won. Perform like you\'ve never lost. ',
            'Champions do not become champions when they win the event, but in the hours, weeks, months and years they spend preparing for it. ',
            'When I lose the sense of motivation and the sense to prove something as a basketball player, it\'s time for me to move away from the game. ',
            'Why would I think about missing a shot I haven\'t taken yet? ',
            'Even when I\'m old and grey, I won\'t be able to play it, but I\'ll still love the game. ',
            'Be true to the game, because the game will be true to you. ',
            'You can practice shooting eight hours a day, but if your technique is wrong, then all you become is very good at shooting the wrong way. ',
            'I built my talents on the shoulders of someone else\'s talent. ',
            'If you do the work you get rewarded. There are no shortcuts in life. ',
            'A champion is afraid of losing. Everyone else is afraid of winning. ',
            'It\'s heavy at the top, and every time you go out onto the floor, there\'s a target on your back. ',
            'Winning isn\'t always championships. Sometimes it\'s getting through the day. ',
            'You don\'t achieve anything without hard work. ',
            'If you run into a wall, don\'t turn around and give up. ',
            'The game has its ups and downs, but you can never lose focus of your individual goals. ',
            'I didn\'t lose the game; I just ran out of time. ',
            'Greatness is not defined by what you achieve, it\'s defined by what you overcome. ',
            'I wanted to be the best player ever to play the game, and every day I worked toward that goal. ',
            'Nobody can take away what you\'ve earned on the court. ',
            'When the pressure is on, that\'s when you find out who you really are. ',
            'Be the player everyone wants on their team when the clock hits zero. ',
            '72-10 don\'t mean a thing without the ring. ',
            'The ceiling is the roof! ',
            'I\'m back. ',
            '63 points in the Boston Garden — and they still couldn\'t stop him. ',
            'From the free-throw line, defying gravity! ',
            'The Flu Game: 38 points when he could barely stand! ',
            'The Last Shot in Utah — Championship number six! '
        ];
        let isJordan = false;
        let quoteIdx = -1;

        document.addEventListener('click', (e) => {
            const wrapper = e.target.closest('#currySecretWrapper');
            if (!wrapper) return;
            const card = wrapper.querySelector('.PeoplePics');
            if (!card) return;

            if (e.detail === 3) {
                e.stopPropagation();
                isJordan = !isJordan;
                quoteIdx = -1;

                const img = card.querySelector('img');
                const label = card.querySelector('.overlay-text');
                const pip = wrapper.querySelector('.portrait-role-pip');

                card.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                setTimeout(() => {
                    if (isJordan) {
                        card.classList.remove('is-curry-card');
                        card.classList.add('is-jordan-card');
                        card.dataset.displayRole = 'VIP GOAT Legend';
                        card.dataset.character = 'Artist 9 - Air Jordan';
                        card.dataset.birthday = 'February 17, 1963';
                        card.dataset.bio = '6× NBA Champion, 6× Finals MVP, and the undisputed Air Jordan taking flight at Paskong AFCS 2026!';
                        if (img) {
                            img.src = 'otherPics/Jordan.jpg';
                            img.alt = 'Jordan, Michael';
                        }
                        if (label) label.textContent = 'Jordan, Michael';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-jordan';
                            pip.textContent = '🏀f';
                            pip.title = 'His Airness (6× Champ)';
                        }
                    } else {
                        card.classList.remove('is-jordan-card');
                        card.classList.add('is-curry-card');
                        card.dataset.displayRole = 'VIP Basketball Legend';
                        card.dataset.character = 'Artist 9 - Greatest Shooter Ever';
                        card.dataset.birthday = 'March 14, 1988';
                        card.dataset.bio = '4× NBA Champion and all-time 3-point king raining deep shots from the Burj Khalifa observation deck!';
                        if (img) {
                            img.src = 'otherPics/Curry.jpg';
                            img.alt = 'Curry, Stephen';
                        }
                        if (label) label.textContent = 'Curry, Stephen';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-curry';
                            pip.textContent = '';
                            pip.title = 'Chef Curry (3PT King)';
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && card.classList.contains('active')) {
                        openCard(card);
                    }
                }, 275);

                const rect = card.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, isJordan ? ['#ef4444', '#ffffff', '#09090b'] : ['#38bdf8', '#facc15', '#ffffff'], 28);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isJordan ? 587.33 : 440.00, 0.09, 'triangle', 0.045);
                setTimeout(() => playBeep(isJordan ? 880.00 : 329.63, 0.14, 'triangle', 0.045), 75);
                return;
            }

            if (isJordan && e.detail === 1) {
                let nextIdx = Math.floor(Math.random() * jordanQuotes.length);
                if (jordanQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % jordanQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = jordanQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#ef4444', '#ffffff', '#09090b'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(493.88, 0.07, 'triangle', 0.04);
            }
        }, true);
    }
    function startHamiltonGuest() {
        if (!DOM.container) return;

       const hamiltonQuotes = [
            'I am not throwing away my shot! ★',
            'Why do you write like you’re running out of time? ',
            'Rise up! History has its eyes on Grade 7 – Psalms!',
            'Just you wait! ',
            'My name is Alexander Hamilton, and there\'s a million things I haven\'t done! ',
            'I\'m young, scrappy, and hungry! ',
            'Look around, look around at how lucky we are to be alive right now! ',
            'Legacy. What is a legacy? It\'s planting seeds in a garden you never get to see. ',
            'Immigrants: we get the job done! ',
            'I\'s past patiently waitin\', I\'s passionately smashin\' every expectation! ',
            'Every action\'s an act of creation! ',
            'I\'s laughin\' in the face of casualties and sorrow! ',
            'For the first time, I\'s thinkin\' past tomorrow! ',
            'Dying is easy, young man. Living is harder. ',
            'If you stand for nothing, Burr, what\'ll you fall for? ',
            'I\'s ll write my way out! ',
            'Write everything down far as I can see! ',
            'I\'s ll write my way out, overwhelm them with honesty! ',
            'This is the eye of the hurricane, this is the only way I can protect my legacy! ',
            'Wait for it, wait for it, wait! ',
            'I was chosen for the Constitutional Convention! ',
            'Why do you write like you need it to survive? ',
            'Why do you write every second you\'s re alive? ',
            'Why do you assume you\'s re the smartest in the room? ',
            'Soon that attitude may be your doom! ',
            'Hey yo, I\'s m just like my country, I\'s m young, scrappy and hungry! ',
            'Only nineteen but my mind is older! ',
            'These New York City streets get colder, I shoulder every burden, every disadvantage! ',
            'I have learned to manage, I don\'t have a gun to brandish, I walk these streets famished! ',
            'The plan is to fan this spark into a flame! ',
            'Put a pencil to his temple, connected it to his brain! ',
            'And he wrote his first refrain, a testament to his pain! ',
            'In New York you can be a new man! ',
            'Don\'t be shocked when your history book mentions me! ',
            'I will lay down my life if it sets us free! ',
            'Eventually, you\'s ll see my ascendancy! ',
            'And I am not throwing away my shot! ',
            'Let\'s hatch a plot blacker than the kettle callin\' the pot! ',
            'What are the odds the gods would put us all in one spot? ',
            'Poppin\' a squat on conventional wisdom, like it or not! ',
            'A bunch of revolutionary manumission abolitionists? Give me a position, show me where the ammunition is! ',
            'Oh, am I talkin\' too loud? Sometimes I get over excited, shoot off at the mouth! ',
            'I never had a group of friends before, I promise that I\'s ll make y\'s all proud! ',
            'I imagine death so much it feels more like a memory. ',
            'Is this where it gets me, on my feet, several feet ahead of me? ',
            'See, I never thought I\'s d live past twenty. ',
            'Where I come from some get half as many. ',
            'Ask anybody why we livin\' fast and we laugh, reach for a flask, we have to make this moment last, that\'s plenty! ',
            'Scratch that, this is not a moment, it\'s the movement! ',
            'Where all the hungriest brothers with something to prove went? ',
            'Foes oppose us, we take an honest stand, we roll like Moses, claimin\' our promised land! ',
            'And? If we win our independence? Is that a guarantee of freedom for our descendants? ',
            'Or will the blood we shed begin an endless cycle of vengeance and death with no defendants? ',
            'I know the action in the street is excitin\', but Jesus, between all the bleedin\' \'n fightin\' I\'s ve been readin\' \'n writin\'! ',
            'We need to handle our financial situation! ',
            'Are we a nation of states? What\'s the state of our nation? ',
            'I\'s m past patiently waitin\', I\'s m passionately smashin\' every expectation! ',
            'Who lives, who dies, who tells your story? ',
            'You have no control who lives, who dies, who tells your story. ',
            'Alexander Hamilton, troops are waiting in the field for you! ',
            'If you join us right now, together we can turn the tide! ',
            'Oh, Alexander Hamilton, we have soldiers that will yield for you! ',
            'If we manage to get this right, they\'s ll surrender by early light! ',
            'The world will never be the same, Alexander! ',
            'Those who stand for nothing fall for anything. '
        ];
        let quoteIdx = -1;

        function spawnHamiltonCard(animate = false) {
            if (document.getElementById('hamiltonSecretWrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.id = 'hamiltonSecretWrapper';
            wrapper.className = 'PersonWrapper reveal-on-scroll is-visible';

            const card = document.createElement('div');
            card.className = 'PeoplePics is-hamilton-card';
            card.dataset.role = 'Guest Legend';
            card.dataset.displayRole = 'VIP Broadway Legend';
            card.dataset.character = 'Artist 10 - Founding Father';
            card.dataset.birthday = 'January 11, 1757';
            card.dataset.bio = 'Non-stop writer and Founding Father bringing Broadway energy to the Burj Khalifa stage!';

            const img = document.createElement('img');
            img.src = 'otherPics/Hamilton.jpg';
            img.alt = 'Hamilton, Alexander';
            img.className = 'is-guest-alter-pfp';

            const label = document.createElement('p');
            label.className = 'overlay-text';
            label.textContent = 'Hamilton, Alexander';

            const pip = document.createElement('span');
            pip.className = 'portrait-role-pip pip-hamilton';
            pip.textContent = '★';
            pip.title = 'Alexander Hamilton';

            card.appendChild(img);
            card.appendChild(label);
            wrapper.appendChild(card);
            wrapper.appendChild(pip);
            DOM.container.appendChild(wrapper);

            card.addEventListener('click', () => {
                if (card.classList.contains('is-burr-card')) return;
                let nextIdx = Math.floor(Math.random() * hamiltonQuotes.length);
                if (hamiltonQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % hamiltonQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = hamiltonQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#eab308', '#fef3c7', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(587.33, 0.07, 'triangle', 0.04);
            });

            if (animate) {
                card.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.12)', offset: 0.5 },
                    { transform: 'scale(1)' }
                ], { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
            }

            filterCards();
        }

        if (localStorage.getItem('afcs_hamilton_guest_unlocked') === 'true') {
            spawnHamiltonCard(false);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                const val = DOM.searchInput.value.toLowerCase().trim();
                if ((val === 'hamilton' || val === 'burr') && localStorage.getItem('afcs_hamilton_guest_unlocked') !== 'true') {
                    localStorage.setItem('afcs_hamilton_guest_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#eab308', '#fef3c7', '#ffffff'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [293.66, 369.99, 440.00, 587.33].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.14, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnHamiltonCard(true);

                    const addedCard = document.querySelector('#hamiltonSecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                }
            });
        }
    }
    function startBurrAlterEgo() {
        const burrQuotes = [
            'Talk less. Smile more. ',
            'I wanna be in the room where it happens! ',
            'I am the one thing in life I can control — Wait for it! ',
            'Pardon me, are you Aaron Burr, sir? ',
            'Don\'t let them know what you\'re against or what you\'re for. ',
            'I\'m willing to wait for it. ',
            'I am inimitable, I am an original. ',
            'I\'m not falling behind or running late. ',
            'I\'m not standing still, I am lying in wait. ',
            'If you stand for nothing, Burr, what\'ll you fall for? ',
            'You can\'t be serious. ',
            'Fools who run their mouths off wind up dead. ',
            'What time is it? Show time! Like I said... ',
            'Heed not the rabble who scream revolution. ',
            'They have not your interests at heart. ',
            'Chaos and bloodshed are not a solution. ',
            'Don\'t let them lead you astray. ',
            'This Congress does not speak for me. ',
            'Let him be. ',
            'Now I\'m the villain in your history. ',
            'I was too young and blind to see. ',
            'I should\'ve known the world was wide enough for both Hamilton and me. ',
            'Death doesn\'t discriminate between the sinners and the saints. ',
            'It takes and it takes and it takes, and we keep living anyway. ',
            'We rise and we fall and we break and we make our mistakes. ',
            'And if there\'s a reason I\'m still alive when so many have died, then I\'m willing to wait for it. ',
            'Love doesn\'t discriminate between the sinners and the saints. ',
            'Life doesn\'t discriminate between the sinners and the saints. ',
            'You got to be carefully taught: if you talk, you\'re gonna get shot. ',
            'Let me offer you some free advice. ',
            'Keep your plans close to your chest. ',
            'No one really knows how the game is played, the art of the trade, how the sausage gets made. ',
            'We just assume that it happens, but no one else is in the room where it happens. ',
            'Click-boom! Then it happened. ',
            'My grandfather was a fire and brimstone preacher. ',
            'My mother was a genius, my father commanded respect. ',
            'When they died they left no instructions, just a legacy to protect. ',
            'Hamilton doesn\'t hesitate; he exhibits no restraint. ',
            'He takes and he takes and he takes, and he keeps winning anyway. ',
            'He changes the game, he plays and he raises the stakes. ',
            'And if there\'s a reason he seems to thrive when so few survive, then Goddamnit I\'m willing to wait for it. ',
            'Dear Theodosia, what to say to you? ',
            'You have my eyes, you have your mother\'s name. ',
            'When you came into the world, you cried and it broke my heart. ',
            'I\'m dedicating every day to you. ',
            'Domestic life was never quite my style. ',
            'When you smile, you knock me out, I fall apart. ',
            'And I thought I was so smart. ',
            'You will come of age with our young nation. ',
            'We\'ll bleed and fight for you, we\'ll make it right for you. ',
            'If we lay a strong enough foundation, we\'ll pass it on to you, we\'ll give the world to you. ',
            'And you\'ll blow us all away. ',
            'Someday, someday, yeah, you\'ll blow us all away. ',
            'Gentlemen of the jury, I\'m curious, bear with me. ',
            'Are you aware that we\'re making history? ',
            'This is the first murder trial of our brand-new nation. ',
            'The liberty behind deliberation. ',
            'How does a bastard, orphan, son of a whore and a Scotsman, dropped in the middle of a forgotten spot in the Caribbean... ',
            'By providence, impoverished, in squalor, grow up to be a hero and a scholar? ',
            'Me? I\'m the damn fool that shot him. ',
            'I have the honor to be Your Obedient Servant, A. Burr. ',
            'Law is whatever is boldly asserted and plausibly maintained. ',
            'Never do today what you can put off till tomorrow — delay may give clearer light as to what is best to be done. ',
            'Had I read Sterne more and Voltaire less, I should have known the world was wide enough for Hamilton and me. ',
            'Great souls are always loyally attached to fixed principles. '
        ];
        let isBurr = false;
        let quoteIdx = -1;

        document.addEventListener('click', (e) => {
            const wrapper = e.target.closest('#hamiltonSecretWrapper');
            if (!wrapper) return;
            const card = wrapper.querySelector('.PeoplePics');
            if (!card) return;

            if (e.detail === 3) {
                e.stopPropagation();
                isBurr = !isBurr;
                quoteIdx = -1;

                const img = card.querySelector('img');
                const label = card.querySelector('.overlay-text');
                const pip = wrapper.querySelector('.portrait-role-pip');

                card.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                setTimeout(() => {
                    if (isBurr) {
                        card.classList.remove('is-hamilton-card');
                        card.classList.add('is-burr-card');
                        card.dataset.displayRole = 'VIP Broadway Rival';
                        card.dataset.character = 'Artist 10 - The Room Where It Happens';
                        card.dataset.birthday = 'February 6, 1756';
                        card.dataset.bio = 'Patient strategist waiting in the wings of the Burj Khalifa for the Room Where It Happens!';
                        if (img) {
                            img.src = 'otherPics/Burr.jpg';
                            img.alt = 'Burr, Aaron';
                        }
                        if (label) label.textContent = 'Burr, Aaron';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-burr';
                            pip.textContent = '🔥';
                            pip.title = 'Aaron Burr, Sir';
                        }
                    } else {
                        card.classList.remove('is-burr-card');
                        card.classList.add('is-hamilton-card');
                        card.dataset.displayRole = 'VIP Broadway Legend';
                        card.dataset.character = 'Artist 10 - Founding Father';
                        card.dataset.birthday = 'January 11, 1757';
                        card.dataset.bio = 'Non-stop writer and Founding Father bringing Broadway energy to the Burj Khalifa stage!';
                        if (img) {
                            img.src = 'otherPics/Hamilton.jpg';
                            img.alt = 'Hamilton, Alexander';
                        }
                        if (label) label.textContent = 'Hamilton, Alexander';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-hamilton';
                            pip.textContent = '★';
                            pip.title = 'Alexander Hamilton';
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && card.classList.contains('active')) {
                        openCard(card);
                    }
                }, 275);

                const rect = card.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, isBurr ? ['#6366f1', '#c7d2fe', '#ffffff'] : ['#eab308', '#fef3c7', '#ffffff'], 28);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isBurr ? 440.00 : 587.33, 0.09, 'triangle', 0.045);
                setTimeout(() => playBeep(isBurr ? 329.63 : 880.00, 0.14, 'triangle', 0.045), 75);
                return;
            }

            if (isBurr && e.detail === 1) {
                let nextIdx = Math.floor(Math.random() * burrQuotes.length);
                if (burrQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % burrQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = burrQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#6366f1', '#c7d2fe', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(392.00, 0.07, 'triangle', 0.04);
            }
        }, true);
    }
        function startEinsteinGuest() {
        if (!DOM.container) return;

        const einsteinQuotes = [
            'E = mc² — Energy equals mass times the speed of light squared! ',
            'Imagination is more important than knowledge. ',
            'Time is relative — especially during Burj Khalifa lockdowns! ',
            'Everything should be made as simple as possible, but not simpler.',
            'Life is like riding a bicycle. To keep your balance, you must keep moving. ',
            'A person who never made a mistake never tried anything new. ',
            'Try not to become a man of success, but rather try to become a man of value. ',
            'In the middle of difficulty lies opportunity. ',
            'Logic will get you from A to B. Imagination will take you everywhere. ',
            'The important thing is not to stop questioning. Curiosity has its own reason for existing. ',
            'Anyone who has never made a mistake has never tried anything new. ',
            'Look deep into nature, and then you will understand everything better. ',
            'Peace cannot be kept by force; it can only be achieved by understanding. ',
            'Strive not to be a success, but rather to be of value. ',
            'The true sign of intelligence is not knowledge but imagination. ',
            'We cannot solve our problems with the same thinking we used when we created them. ',
            'If you can\'t explain it simply, you don\'t understand it well enough. ',
            'I have no special talent. I am only passionately curious. ',
            'Once you stop learning, you start dying. ',
            'Coincidence is God\'s way of remaining anonymous. ',
            'Education is what remains after one has forgotten what one has learned in school. ',
            'The measure of intelligence is the ability to change. ',
            'It is not that I\'m so smart. But I stay with the questions much longer. ',
            'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe. ',
            'Creativity is intelligence having fun. ',
            'A clever person solves a problem. A wise person avoids it. ',
            'Insanity is doing the same thing over and over again and expecting different results. ',
            'Great spirits have always encountered violent opposition from mediocre minds. ',
            'Learn from yesterday, live for today, hope for tomorrow. ',
            'Weakness of attitude becomes weakness of character. ',
            'Only a life lived for others is a life worthwhile. ',
            'The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking. ',
            'Science without religion is lame, religion without science is blind. ',
            'The only source of knowledge is experience. ',
            'Gravitation is not responsible for people falling in love. ',
            'Never memorize something that you can look up. ',
            'Reality is merely an illusion, albeit a very persistent one. ',
            'When you are courting a nice girl an hour seems like a second. When you sit on a red-hot cinder a second seems like an hour. That\'s relativity. ',
            'The difference between stupidity and genius is that genius has its limits. ',
            'A table, a chair, a bowl of fruit and a violin; what else does a man need to be happy? ',
            'Intellectual growth should commence at birth and cease only at death. ',
            'Out of clutter, find simplicity. From discord, find harmony. In the middle of difficulty lies opportunity. ',
            'The most beautiful experience we can have is the mysterious. ',
            'If A is a success in life, then A equals x plus y plus z. Work is x; y is play; and z is keeping your mouth shut. ',
            'Joy in looking and comprehending is nature\'s most beautiful gift. ',
            'Few are those who see with their own eyes and feel with their own hearts. ',
            'Common sense is the collection of prejudices acquired by age eighteen. ',
            'It is a miracle that curiosity survives formal education. ',
            'The pursuit of truth and beauty is a sphere of activity in which we are permitted to remain children all our lives. ',
            'Black holes are where God divided by zero. ',
            'God does not play dice with the universe. ',
            'Subtle is the Lord, but malicious He is not. ',
            'Information is not knowledge. ',
            'Any fool can know. The point is to understand. ',
            'You never fail until you stop trying. ',
            'What is right is not always popular and what is popular is not always right. ',
            'The value of a man should be seen in what he gives and not in what he is able to receive. ',
            'Blind belief in authority is the greatest enemy of truth. ',
            'Small is the number of people who see with their eyes and think with their minds. ',
            'Nothing happens until something moves. ',
            'The monotony and solitude of a quiet life stimulates the creative mind. ',
            'Time and space are modes by which we think and not conditions in which we live. ',
            'To raise new questions, new possibilities, to regard old problems from a new angle, requires creative imagination and marks real advance in science. ',
            'If we knew what it was we were doing, it would not be called research, would it? ',
            'At the top of the Burj Khalifa, clocks tick just a tiny fraction faster than at street level — general relativity in action! '
        ];
                let quoteIdx = -1;

        function spawnEinsteinCard(animate = false) {
            if (document.getElementById('einsteinSecretWrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.id = 'einsteinSecretWrapper';
            wrapper.className = 'PersonWrapper reveal-on-scroll is-visible';

            const card = document.createElement('div');
            card.className = 'PeoplePics is-einstein-card';
            card.dataset.role = 'Guest Legend';
            card.dataset.displayRole = 'VIP Physics Legend';
            card.dataset.character = 'Artist 11 - Master of Relativity';
            card.dataset.birthday = 'March 14, 1879';
            card.dataset.bio = 'Theoretical physicist who unlocked E = mc² and space-time relativity, visiting Dubai for Paskong AFCS 2026!';

            const img = document.createElement('img');
            img.src = 'otherPics/Einstein.jpg';
            img.alt = 'Einstein, Albert';
            img.className = 'is-guest-alter-pfp';

            const label = document.createElement('p');
            label.className = 'overlay-text';
            label.textContent = 'Einstein, Albert';

            const pip = document.createElement('span');
            pip.className = 'portrait-role-pip pip-einstein';
            pip.textContent = '';
            pip.title = 'Albert Einstein (E = mc²)';

            card.appendChild(img);
            card.appendChild(label);
            wrapper.appendChild(card);
            wrapper.appendChild(pip);
            DOM.container.appendChild(wrapper);

            card.addEventListener('click', (e) => {
                if (e.detail !== 1 || card.classList.contains('is-galileo-card')) return;

                let nextIdx = Math.floor(Math.random() * einsteinQuotes.length);
                if (einsteinQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % einsteinQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = einsteinQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#a855f7', '#38bdf8', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(523.25, 0.07, 'triangle', 0.04);
            });

            if (animate) {
                card.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.12)', offset: 0.5 },
                    { transform: 'scale(1)' }
                ], { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
            }

            filterCards();
        }

        if (localStorage.getItem('afcs_einstein_unlocked') === 'true') {
            spawnEinsteinCard(false);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                const val = DOM.searchInput.value.toLowerCase().trim();
                if ((val === 'e=mc^2' || val === 'relativity' || val === 'galileo') && localStorage.getItem('afcs_einstein_unlocked') !== 'true') {
                    localStorage.setItem('afcs_einstein_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#a855f7', '#38bdf8', '#ffffff'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [392.00, 493.88, 659.25, 880.00].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.14, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnEinsteinCard(true);

                    const addedCard = document.querySelector('#einsteinSecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                }
            });
        }
    }
    function startNGuest() {
        if (!DOM.container) return;

        const nQuotes = [
            'I love doing anything! =3 💛',
            'Hi! I’m Serial Designation N, nice to meet you! 👋✨',
            'Biscuits! Did someone say biscuits?! 🍪',
            'Golden Retriever energy reporting for duty at the Burj Khalifa! 🐕💛',
            'Whatever happens on December 15, we’re gonna crush it together! 🌟'
        ];
        let quoteIdx = -1;

        function spawnNCard(animate = false) {
            if (document.getElementById('nDroneSecretWrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.id = 'nDroneSecretWrapper';
            wrapper.className = 'PersonWrapper reveal-on-scroll is-visible';

            const card = document.createElement('div');
            card.className = 'PeoplePics is-n-drone-card';
            card.dataset.role = 'Guest Legend';
            card.dataset.displayRole = 'VIP Disassembly Drone';
            card.dataset.character = 'Artist 12 - Serial Designation N';
            card.dataset.birthday = 'November 18, 3071';
            card.dataset.bio = 'Cheerful, loyal Disassembly Drone from Copper-9 visiting Dubai with maximum Golden Retriever energy!';

            const img = document.createElement('img');
            img.src = 'otherPics/NDrone.jpg';
            img.alt = 'Designation N, Serial';
            img.className = 'is-guest-alter-pfp';

            const label = document.createElement('p');
            label.className = 'overlay-text';
            label.textContent = 'Designation N, Serial';

            const pip = document.createElement('span');
            pip.className = 'portrait-role-pip pip-n-drone';
            pip.textContent = '💛';
            pip.title = 'Serial Designation N';

            card.appendChild(img);
            card.appendChild(label);
            wrapper.appendChild(card);
            wrapper.appendChild(pip);
            DOM.container.appendChild(wrapper);

            card.addEventListener('click', (e) => {
                if (e.detail !== 1 || card.classList.contains('is-uzi-drone-card')) return;

                let nextIdx = Math.floor(Math.random() * nQuotes.length);
                if (nQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % nQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = nQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#facc15', '#fef08a', '#ffffff'], 22);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(587.33, 0.07, 'triangle', 0.04);
                setTimeout(() => playBeep(880.00, 0.1, 'triangle', 0.04), 65);
            });

            if (animate) {
                card.animate([
                    { transform: 'scale(0.8)' },
                    { transform: 'scale(1.12)', offset: 0.5 },
                    { transform: 'scale(1)' }
                ], { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
            }

            filterCards();
        }

        if (localStorage.getItem('afcs_ndrone_unlocked') === 'true') {
            spawnNCard(false);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', () => {
                const val = DOM.searchInput.value.toLowerCase().trim();
                if ((val === 'serial designation n' || val === 'nuzi' || val === 'biscuits') && localStorage.getItem('afcs_ndrone_unlocked') !== 'true') {
                    localStorage.setItem('afcs_ndrone_unlocked', 'true');
                    const rect = DOM.searchInput.getBoundingClientRect();
                    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#facc15', '#c084fc', '#ffffff'], 36);
                    if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                    [440.00, 554.37, 659.25, 880.00].forEach((f, idx) => {
                        setTimeout(() => playBeep(f, 0.14, 'triangle', 0.05), idx * 75);
                    });

                    DOM.searchInput.value = '';
                    spawnNCard(true);

                    const addedCard = document.querySelector('#nDroneSecretWrapper .PeoplePics');
                    if (addedCard) {
                        setTimeout(() => {
                            addedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            openCard(addedCard);
                        }, 300);
                    }
                }
            });
        }
    }
     function startUziAlterEgo() {
        const uziQuotes = [
            'BITE ME! 😈💜',
            'I am a damaged OC! Back off! ⚡',
            'Behold! My sick-as-hell railgun! 🔫💜',
            'Ugh, this Burj Khalifa lockdown is SO dramatic! 🙄',
            'Callback ping THIS, Solver! ⬡💜'
        ];
        let isUzi = false;
        let quoteIdx = -1;

        document.addEventListener('click', (e) => {
            const wrapper = e.target.closest('#nDroneSecretWrapper');
            if (!wrapper) return;
            const card = wrapper.querySelector('.PeoplePics');
            if (!card) return;

            if (e.detail === 3) {
                e.stopPropagation();
                isUzi = !isUzi;
                quoteIdx = -1;

                const img = card.querySelector('img');
                const label = card.querySelector('.overlay-text');
                const pip = wrapper.querySelector('.portrait-role-pip');

                triggerScreenGlitch(110);

                card.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                setTimeout(() => {
                    if (isUzi) {
                        card.classList.remove('is-n-drone-card');
                        card.classList.add('is-uzi-drone-card');
                        card.dataset.displayRole = 'VIP Worker Drone';
                        card.dataset.character = 'Artist 12 - Uzi Doorman';
                        card.dataset.birthday = 'October 31, 3071';
                        card.dataset.bio = 'Edgy, rebellious Worker Drone wielding a sick-as-hell railgun and Absolute Solver powers!';
                        if (img) {
                            img.src = 'otherPics/UziDrone.jpg';
                            img.alt = 'Doorman, Uzi';
                        }
                        if (label) label.textContent = 'Doorman, Uzi';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-uzi-drone';
                            pip.textContent = '💜';
                            pip.title = 'Uzi Doorman (BITE ME!)';
                        }
                    } else {
                        card.classList.remove('is-uzi-drone-card');
                        card.classList.add('is-n-drone-card');
                        card.dataset.displayRole = 'VIP Disassembly Drone';
                        card.dataset.character = 'Artist 12 - Serial Designation N';
                        card.dataset.birthday = 'November 18, 3071';
                        card.dataset.bio = 'Cheerful, loyal Disassembly Drone from Copper-9 visiting Dubai with maximum Golden Retriever energy!';
                        if (img) {
                            img.src = 'otherPics/NDrone.jpg';
                            img.alt = 'Designation N, Serial';
                        }
                        if (label) label.textContent = 'Designation N, Serial';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-n-drone';
                            pip.textContent = '💛';
                            pip.title = 'Serial Designation N';
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && card.classList.contains('active')) {
                        openCard(card);
                    }
                }, 275);

                const rect = card.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, isUzi ? ['#a855f7', '#c084fc', '#09090b'] : ['#facc15', '#fef08a', '#ffffff'], 28);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isUzi ? 622.25 : 440.00, 0.09, 'sawtooth', 0.045);
                setTimeout(() => playBeep(isUzi ? 932.33 : 659.25, 0.14, 'triangle', 0.045), 75);
                return;
            }

            if (isUzi && e.detail === 1) {
                let nextIdx = Math.floor(Math.random() * uziQuotes.length);
                if (uziQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % uziQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = uziQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#a855f7', '#c084fc', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(523.25, 0.07, 'sawtooth', 0.04);
            }
        }, true);
    }
    function startGalileoAlterEgo() {
        const galileoQuotes = [
            'Eppur si muove — And yet it moves! ',
            'Measure what is measurable, and make measurable what is not! ',
            'Four moons orbiting Jupiter spotted from Floor 163! ',
            'Mathematics is the language in which God has written the universe. ',
            'All truths are easy to understand once they are discovered; the point is to discover them. ',
            'You cannot teach a man anything; you can only help him find it within himself. ',
            'In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual. ',
            'I have never met a man so ignorant that I couldn\'t learn something from him. ',
            'Where the senses fail us, reason must step in. ',
            'I do not feel obliged to believe that the same God who has endowed us with sense, reason, and intellect has intended us to forgo their use. ',
            'Doubt is the father of invention. ',
            'By denying scientific principles, one may maintain any paradox. ',
            'The Bible shows the way to go to heaven, not the way the heavens go. ',
            'Nature is relentless and unchangeable, and it is indifferent as to whether its hidden reasons and actions are understandable to man or not. ',
            'Knowing thyself, that is the greatest wisdom. ',
            'Wine is sunlight, held together by water. ',
            'Two truths cannot contradict one another. ',
            'Curiosity is the key to problem solving. ',
            'Passion is the genesis of genius. ',
            'See now the power of truth; the same experiment which at first glance seemed to show one thing, when more carefully examined, assures us of the contrary. ',
            'Facts which at first seem improbable will, even on scant explanation, drop the cloak which has hidden them and stand forth in naked and simple beauty. ',
            'The sun, with all those planets revolving around it and dependent on it, can still ripen a bunch of grapes as if it had nothing else in the universe to do. ',
            'The laws of nature are written by the hand of God in the language of mathematics. ',
            'It is surely harmful to souls to make it a heresy to believe what is proved. ',
            'Nothing can be taught to a man; it is only possible to help him to find it within himself. ',
            'To be humane, we must ever be ready to pronounce that wise, ingenious and modest statement "I do not know". ',
            'The Milky Way is nothing else but a mass of innumerable stars planted together in clusters. ',
            'I have loved the stars too fondly to be fearful of the night. ',
            'Names and attributes must be accommodated to the essence of things, and not the essence to the names, since things come first and names afterwards. ',
            'The universe cannot be read until we have learned the language and become familiar with the characters in which it is written. ',
            'With regard to matters requiring thought, the less people know and understand about them, the more positively they attempt to argue concerning them. ',
            'To understand the universe, you must understand the language in which it\'s written, the language of mathematics. ',
            'Philosophy is written in this grand book, the universe, which stands continually open to our gaze. ',
            'The deeper I go into the field of science, the more I realize how little I actually know. ',
            'Who would set a limit to the mind of man? Who would dare assert that we know all there is to be known? ',
            'It is a beautiful and delightful sight to behold the body of the Moon. ',
            'Long experience has taught me this about the status of mankind with regard to matters requiring thought: the less people know and understand about them, the more positively they attempt to argue concerning them. ',
            'Never before have there been seen any stars besides the fixed ones; yet now with the aid of the telescope we behold them in countless numbers. ',
            'I render infinite thanks to God for being so kind as to make me alone the first observer of marvels kept hidden in obscurity for all previous centuries. ',
            'They seemed to be crowded together in Saturn, and they move around Jupiter like messengers. ',
            'Ignorance has been the best teacher I have ever had; to make progress, one must first admit what one does not know. ',
            'Nature does not act by means of many things when it can act by means of few. ',
            'In the sciences, the authority of thousands of opinions is not worth as much as one tiny spark of reason in an individual man. ',
            'Infinite is the throng of fools. ',
            'If I were again beginning my studies, I would follow the advice of Plato and start with mathematics. ',
            'Human understanding can be understood in two modes, the intensive or the extensive. ',
            'The greatness of the human mind is no less marvelous than the vastness of the heavens it seeks to comprehend. ',
            'There are those who reason well, but they are greatly outnumbered by those who reason badly. ',
            'I prefer to discover one true cause than to gain the Kingdom of Persia. ',
            'A hundred years from now, people will laugh at those who refused to look through the telescope. ',
            'Truth is not determined by majority vote, nor by the antiquity of a belief. ',
            'Every body continues in its state of rest, or of uniform motion, unless compelled to change that state. ',
            'The book of nature is written in circles, triangles, and other geometric figures. ',
            'Without mathematics, one wanders about in a dark labyrinth. ',
            'To ask a question well is already halfway to knowing the answer. ',
            'The moon is not smooth, uniform, and precisely spherical, as a great number of philosophers believe, but uneven, rough, and full of cavities and prominences. ',
            'Sunspots are not illusions of the lens, nor blemishes of the eye, but real clouds drifting across the face of the sun. ',
            'Venus changes her shapes just as the Moon does, proving she circles the Sun. ',
            'Even in the darkest night, a single lens can reveal worlds never before imagined. ',
            'Reason is the compass by which we navigate the ocean of the unknown. ',
            'Observation is the anchor of every true philosophy. ',
            'Do not trust authority alone when your own eyes and intellect can test the truth. ',
            'The pendulum swings in steady rhythm, keeping time for nature\'s hidden laws. ',
            'From Pisa\'s tower to the farthest star, the same simple rules govern all falling things. ',
            'Look upward with wonder, measure with patience, and let nature speak for herself. '
        ];

        let isGalileo = false;
        let quoteIdx = -1;

        document.addEventListener('click', (e) => {
            const wrapper = e.target.closest('#einsteinSecretWrapper');
            if (!wrapper) return;
            const card = wrapper.querySelector('.PeoplePics');
            if (!card) return;

            if (e.detail === 3) {
                e.stopPropagation();
                isGalileo = !isGalileo;
                quoteIdx = -1;

                const img = card.querySelector('img');
                const label = card.querySelector('.overlay-text');
                const pip = wrapper.querySelector('.portrait-role-pip');

                card.animate([
                    { transform: 'perspective(600px) rotateY(0deg) scale(1.05)' },
                    { transform: 'perspective(600px) rotateY(90deg) scale(1.16)', offset: 0.35 },
                    { transform: 'perspective(600px) rotateY(270deg) scale(1.16)', offset: 0.65 },
                    { transform: 'perspective(600px) rotateY(360deg) scale(1.05)' }
                ], { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

                setTimeout(() => {
                    if (isGalileo) {
                        card.classList.remove('is-einstein-card');
                        card.classList.add('is-galileo-card');
                        card.dataset.displayRole = 'VIP Astronomy Legend';
                        card.dataset.character = 'Artist 11 - Father of Modern Science';
                        card.dataset.birthday = 'February 15, 1564';
                        card.dataset.bio = 'Italian astronomer and physicist peering through his telescope from the top of the Burj Khalifa!';
                        if (img) {
                            img.src = 'otherPics/Galilei.jpg';
                            img.alt = 'Galilei, Galileo';
                        }
                        if (label) label.textContent = 'Galilei, Galileo';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-galileo';
                            pip.textContent = '';
                            pip.title = 'Galileo Galilei';
                        }
                    } else {
                        card.classList.remove('is-galileo-card');
                        card.classList.add('is-einstein-card');
                        card.dataset.displayRole = 'VIP Physics Legend';
                        card.dataset.character = 'Artist 11 - Master of Relativity';
                        card.dataset.birthday = 'March 14, 1879';
                        card.dataset.bio = 'Theoretical physicist who unlocked E = mc² and space-time relativity, visiting Dubai for Paskong AFCS 2026!';
                        if (img) {
                            img.src = 'otherPics/Einstein.jpg';
                            img.alt = 'Einstein, Albert';
                        }
                        if (label) label.textContent = 'Einstein, Albert';
                        if (pip) {
                            pip.className = 'portrait-role-pip pip-einstein';
                            pip.textContent = '';
                            pip.title = 'Albert Einstein (E = mc²)';
                        }
                    }

                    if (DOM.panel && DOM.panel.classList.contains('active') && card.classList.contains('active')) {
                        openCard(card);
                    }
                }, 275);

                const rect = card.getBoundingClientRect();
                spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, isGalileo ? ['#14b8a6', '#facc15', '#ffffff'] : ['#a855f7', '#38bdf8', '#ffffff'], 28);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(isGalileo ? 659.25 : 440.00, 0.09, 'triangle', 0.045);
                setTimeout(() => playBeep(isGalileo ? 880.00 : 329.63, 0.14, 'triangle', 0.045), 75);
                return;
            }

            if (isGalileo && e.detail === 1) {
                let nextIdx = Math.floor(Math.random() * galileoQuotes.length);
                if (galileoQuotes.length > 1 && nextIdx === quoteIdx) {
                    nextIdx = (nextIdx + 1) % galileoQuotes.length;
                }
                quoteIdx = nextIdx;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const badge = document.createElement('div');
                badge.className = 'quirk-guest-bubble';
                badge.textContent = galileoQuotes[quoteIdx];
                badge.style.left = `${cx}px`;
                badge.style.top = `${cy}px`;
                document.body.appendChild(badge);
                setTimeout(() => badge.remove(), 1450);

                spawnBurst(cx, cy, ['#14b8a6', '#facc15', '#ffffff'], 20);
                if (typeof window.wakeParticleCanvas === 'function') window.wakeParticleCanvas();
                playBeep(587.33, 0.07, 'triangle', 0.04);
            }
        }, true);
    }
    function startHiddenBugBSOD() {
        let bsodActive = false;

        function playPowerDownAudio() {
            if (STATE.soundMuted) return;
            try {
                const ctx = getAudioContext();
                if (!ctx) return;

                const now = ctx.currentTime;
                const osc1 = ctx.createOscillator();
                const osc2 = ctx.createOscillator();
                const filter = ctx.createBiquadFilter();
                const gain = ctx.createGain();

                osc1.type = 'square';
                osc1.frequency.setValueAtTime(90, now);
                osc1.frequency.linearRampToValueAtTime(30, now + 1.8);

                osc2.type = 'sawtooth';
                osc2.frequency.setValueAtTime(93, now);
                osc2.frequency.linearRampToValueAtTime(31, now + 1.8);

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(300, now);

                gain.gain.setValueAtTime(0.32, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

                osc1.connect(filter);
                osc2.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 1.8);
                osc2.stop(now + 1.8);
            } catch (_) { }
        }

        function enterTrueFullscreen(el) {
            try {
                const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
                if (req) {
                    const promise = req.call(el);
                    if (promise && typeof promise.catch === 'function') {
                        promise.catch(() => { });
                    }
                }
            } catch (_) { }
        }

        function exitTrueFullscreen() {
            try {
                if (document.fullscreenElement || document.webkitFullscreenElement) {
                    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
                    if (exit) {
                        const promise = exit.call(document);
                        if (promise && typeof promise.catch === 'function') {
                            promise.catch(() => { });
                        }
                    }
                }
            } catch (_) { }
        }

        function createQrMatrix(size = 21) {
            const grid = Array.from({ length: size }, () => Array(size).fill(false));
            function placeFinder(ox, oy) {
                for (let y = 0; y < 7; y++) {
                    for (let x = 0; x < 7; x++) {
                        const isBorder = x === 0 || x === 6 || y === 0 || y === 6;
                        const isCenter = x >= 2 && x <= 4 && y >= 2 && y <= 4;
                        grid[oy + y][ox + x] = isBorder || isCenter;
                    }
                }
            }
            placeFinder(0, 0);
            placeFinder(size - 7, 0);
            placeFinder(0, size - 7);

            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const inTopLeft = x < 8 && y < 8;
                    const inTopRight = x >= size - 8 && y < 8;
                    const inBottomLeft = x < 8 && y >= size - 8;
                    if (!inTopLeft && !inTopRight && !inBottomLeft) {
                        grid[y][x] = Math.random() < 0.48;
                    }
                }
            }
            return grid;
        }

        function drawQrCode(ctx, x, y, boxSize, matrix) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(x, y, boxSize, boxSize);

            const pad = boxSize * 0.08;
            const inner = boxSize - pad * 2;
            const cell = inner / matrix.length;

            ctx.fillStyle = '#0078D7';
            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix.length; c++) {
                    if (matrix[r][c]) {
                        ctx.fillRect(
                            x + pad + c * cell,
                            y + pad + r * cell,
                            Math.ceil(cell),
                            Math.ceil(cell)
                        );
                    }
                }
            }
        }
        function triggerAFCSBsod(rareStopCode = 'BURJ_KHALIFA_MAINFRAME_FAULT', rareFailedWhat = 'BEYOND_THE_MANGER_0x00F155104', forceRare = false) {
            if (bsodActive) return;
            bsodActive = true;

            const isRareBurj = forceRare || Math.random() < 0.01;
            const realCodes = [
                { stop: 'CRITICAL_PROCESS_DIED', failed: 'ntoskrnl.exe' },
                { stop: 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED', failed: 'win32kfull.sys' },
                { stop: 'IRQL_NOT_LESS_OR_EQUAL', failed: 'dxgkrnl.sys' },
                { stop: 'MEMORY_MANAGEMENT', failed: 'ntoskrnl.exe' },
                { stop: 'PAGE_FAULT_IN_NONPAGED_AREA', failed: 'nvlddmkm.sys' }
            ];
            const pickedReal = realCodes[Math.floor(Math.random() * realCodes.length)];

            const headline1 = isRareBurj
                ? 'Your Burj Khalifa showcase ran into a problem and needs to restart. We\'re'
                : 'Your device ran into a problem and needs to restart. We\'re';
            const headline2 = 'just collecting some error info, and then we\'ll restart for you.';
            const infoUrl = isRareBurj
                ? 'For more information about this issue and possible fixes, visit https://afcs.edu.ph'
                : 'For more information about this issue and possible fixes, visit https://windows.com';
            const supportPrompt = isRareBurj
                ? 'If you call Grade 7 – Psalms Tech Team, give them this info:'
                : 'If you call a support person, give them this info:';
            const finalStopCode = isRareBurj ? rareStopCode : pickedReal.stop;
            const finalFailedWhat = isRareBurj ? rareFailedWhat : pickedReal.failed;

            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;cursor:none;';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

            enterTrueFullscreen(canvas);

            const ctx = canvas.getContext('2d');
            const qrMatrix = createQrMatrix(21);
            let bsodCounter = 0;
            let lastTime = performance.now();
            let pauseRemaining = 0;
            let stallCooldown = 1.2;

            playPowerDownAudio();

            function handleResize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', handleResize);

            function renderBsod(now) {
                const dt = Math.min((now - lastTime) / 1000, 0.1);
                lastTime = now;

                if (pauseRemaining > 0) {
                    pauseRemaining -= dt;
                } else {
                    stallCooldown -= dt;
                    if (bsodCounter > 8 && bsodCounter < 98 && stallCooldown <= 0 && Math.random() < 0.03) {
                        pauseRemaining = 0.7 + Math.random() * 1.4;
                        stallCooldown = 2.0 + Math.random() * 1.2;
                    } else if (bsodCounter < 100) {
                        bsodCounter += 16.5 * dt;
                    }
                }

                const displayPercent = Math.min(100, Math.floor(bsodCounter));

                ctx.fillStyle = '#0078D7';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';

                const scale = Math.max(canvas.width / 1320, 0.55);
                const marginX = canvas.width * 0.12;
                let currentY = canvas.height * 0.17;

                ctx.fillStyle = '#FFFFFF';
                ctx.font = `${120 * scale}px "Segoe UI", sans-serif`;
                ctx.fillText(':(', marginX, currentY);

                currentY += 150 * scale;
                ctx.font = `${22 * scale}px "Segoe UI", sans-serif`;
                ctx.fillText(headline1, marginX, currentY);

                currentY += 35 * scale;
                ctx.fillText(headline2, marginX, currentY);

                currentY += 55 * scale;
                ctx.fillText(`${displayPercent}% complete`, marginX, currentY);

                currentY += 65 * scale;
                const qrSize = 108 * scale;
                drawQrCode(ctx, marginX, currentY, qrSize, qrMatrix);

                const textX = marginX + qrSize + 22 * scale;
                let detailsY = currentY;

                ctx.fillStyle = '#FFFFFF';
                ctx.font = `${13 * scale}px "Segoe UI", sans-serif`;
                ctx.fillText(infoUrl, textX, detailsY);

                detailsY += 32 * scale;
                ctx.fillText(supportPrompt, textX, detailsY);

                detailsY += 24 * scale;
                ctx.fillText(`Stop code: ${finalStopCode}`, textX, detailsY);

                detailsY += 20 * scale;
                ctx.fillText(`What failed: ${finalFailedWhat}`, textX, detailsY);

                if (displayPercent >= 100) {
                    setTimeout(() => {
                        exitTrueFullscreen();
                        window.removeEventListener('resize', handleResize);
                        canvas.remove();
                        document.body.style.overflow = prevOverflow;
                        bsodActive = false;
                        playBeep(523.25, 0.12, 'sine', 0.05);
                        setTimeout(() => playBeep(659.25, 0.18, 'sine', 0.05), 90);
                    }, 850);
                    return;
                }

                requestAnimationFrame(renderBsod);
            }

            requestAnimationFrame(renderBsod);
        }

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter') return;
                const val = DOM.searchInput.value.toLowerCase().trim();
                if (val === 'bug' || val === 'crash' || val === '0/0') {
                    e.preventDefault();
                    DOM.searchInput.value = '';
                    filterCards();

                    try {
                        const reactorCore = null;
                        reactorCore.igniteFissionMania();
                    } catch (err) {
                        const code = val === '0/0' ? 'CRITICAL_DIVISION_BY_ZERO' : 'UNCAUGHT_FISSION_EXCEPTION';
                        triggerAFCSBsod(code, `${err.name.toUpperCase()}_0x00F155104`, false);
                    }
                }
            });
        }

        const footerCredits = document.querySelector('.footer-credits');
        if (footerCredits) {
            footerCredits.style.cursor = 'pointer';
            footerCredits.addEventListener('click', (e) => {
                if (e.detail === 5) {
                    try {
                        JSON.parse('{ broken_stage_cue: true ');
                    } catch (err) {
                        triggerAFCSBsod('STAGE_SCRIPT_SYNTAX_OVERFLOW', 'PLAYBILL_PARSER_0x007PSALMS', false);
                    }
                }
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                try {
                    const burjReactor = null;
                    burjReactor.forceEasterEgg();
                } catch (err) {
                    triggerAFCSBsod('BURJ_KHALIFA_MAINFRAME_FAULT', 'BEYOND_THE_MANGER_0x00F155104', true);
                }
            }
        });
    }
    //#endregion

    //#region START Everything
    function startAll() {
        createPeople();
        startAudioControls();
        startPraiseBGM();
        startNGuest();
        startUziAlterEgo();
        startLowDetailMode();
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
        startScrollEffects();
        startTimeOfDayTheme();
        startNightSkyStars();

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
        startSearchSecrets();
        lebronJames();
        startLeonhardEuler();
        startNewtonAlterEgo();
        startCurryGuest();
        startJordanAlterEgo();
        startHamiltonGuest();
        startBurrAlterEgo();
        startEinsteinGuest();
        startGalileoAlterEgo();
        startMusicalScale();
        startCharacterInteractions();
        startCornerstoneShimmer();
        startPersonRecognitionProtocol();
        startTrailerControls();
        startHiddenBugBSOD();
    }

    startAll();
    //#endregion
});