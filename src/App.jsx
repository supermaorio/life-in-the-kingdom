/* Life in the Kingdom: interactive Bible study. Curriculum content is unchanged from the original lesson PDF. */

import React, {useState, useEffect, useRef} from "react";

/* ================= Storage (per-viewer, local only) ================= */
const KEY = "life-in-the-kingdom-v1";
const DEFAULT = {mode:"kids", completed:{}, last:1, quiz:{}, memory:{}, notes:{}, needs:[], started:false};
function load(){ try{ const r=localStorage.getItem(KEY); return r?{...DEFAULT,...JSON.parse(r)}:{...DEFAULT}; }catch(e){ return {...DEFAULT}; } }
function save(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }

/* ================= ESV reference links (no ESV text is reproduced) ================= */
function esvUrl(ref){ return "https://www.esv.org/" + ref.replace(/\s+/g,"+") + "/"; }

/* ================= Curriculum (from "Bible Study Lesson 1-9") ================= */
const LESSONS = [
{
  id:1, title:"Entering the Kingdom of God", passage:"John 3:1–10",
  theme:["#132544","#1f3c66","#d9ab55"],
  kidsIntro:"Jesus once talked with a religious teacher named Nicodemus. He learned that God gives a brand-new start.",
  intro:"Supposing you were to die tonight, are you sure you are going to heaven? This lesson looks at John 3, where Nicodemus meets Jesus at night and learns how a person enters the Kingdom of God.",
  refs:[["John 3:1-10","Nicodemus meets Jesus"],["John 3:3","Memory verse: born again"],["Titus 3:5","Salvation is not earned"],["Ephesians 2:8-9","Saved by grace through faith"],["John 1:12","Receiving Christ"]],
  kidsTeach:["Nicodemus was a respected religious teacher. He came to Jesus at night with questions.","Jesus said a person must be born again to see God's Kingdom.","Nicodemus thought about a physical birth. Jesus meant a spiritual birth, a new life from God.","Being good, smart or important does not earn a new birth. It is God's gift.","When we receive Jesus as Savior and Lord, we become children of God."],
  teach:[
    {t:"Nicodemus was religious, educated, of good reputation and powerful. The study asks what his purpose was in coming to Jesus (vv.1, 4, 10)."},
    {t:"Jesus said that a person must be born again to see the Kingdom of God (v.3)."},
    {t:"Nicodemus took 'born again' in a physical sense. Jesus was speaking of spiritual birth, a birth from the Spirit (vv.4–6)."},
    {t:"Nicodemus was already physically born. What he needed was a spiritual birth, a new birth."},
    {t:"Credentials do not produce spiritual birth. Titus 3:5 and Ephesians 2:8–9 teach that salvation is God's gift, not something earned."},
    {t:"'Born again' means spiritual birth, born of God, or born from above. John 1:12 says those who receive Christ become children of God."},
    {x:true, t:"Additional explanation: the Greek word can mean 'again' or 'from above', which helps explain why Nicodemus was confused. A study Bible's footnotes can show this."}
  ],
  discovery:[
    {title:"A night visitor", text:"Nicodemus came at night. Many people in John's Gospel meet Jesus in different ways. What do you think made Nicodemus curious?", x:"22%", y:"62%"},
    {title:"Physical or spiritual?", text:"Physical birth brings us into this world. Spiritual birth brings us into God's family. Both are real, but they are not the same.", x:"52%", y:"40%"},
    {title:"Receive Him", text:"John 1:12 says those who receive Christ become children of God. Receiving is trusting Him, not earning Him.", x:"80%", y:"64%"}
  ],
  questions:[
    {q:"How would you describe Nicodemus? (vv.1, 4, 10)", hint:"He was a religious leader and a teacher."},
    {q:"What do you think was Nicodemus's purpose in approaching Jesus?", hint:"The study leaves this open. Look at what Nicodemus says in verse 2."},
    {q:"According to Jesus, how does a person see the Kingdom of God? (v.3)", hint:"Born again."},
    {q:"How did Nicodemus understand 'born again', and what did Jesus really mean? (vv.4–6)", hint:"Physical birth for Nicodemus; spiritual birth for Jesus."},
    {q:"With all his credentials, does Nicodemus still need to be born again? Why? (v.7; Titus 3:5; Eph. 2:8–9)", hint:"Credentials cannot create new life."},
    {q:"How then can a person be born again? (John 1:12)", hint:"By receiving Christ."},
    {q:"Would you like to receive Jesus as Savior and Lord of your life?", hint:"This is a big, personal question. Talk it over with a parent, guardian or church leader first. No one should be pressured."}
  ],
  interactive:[],
  quiz:[
    {q:"Who came to Jesus at night in this lesson?", opts:["Peter","Nicodemus","Paul","Zacchaeus"], a:1, why:"Nicodemus, a religious teacher, came to Jesus at night (John 3:1–2)."},
    {q:"What did Jesus say a person must be to see the Kingdom of God?", opts:["Very rich","Born again","Perfect","Famous"], a:1, why:"Jesus said a person must be born again (John 3:3)."},
    {q:"According to the study, 'born again' means:", opts:["Repeating a school grade","Moving to a new country","Spiritual birth, born of God","Being baptized in a river"], a:2, why:"The study explains that born again means spiritual birth, born of God or born from above."}
  ],
  memory:{ref:"John 3:3", note:"Say the verse from memory, then check the reference on ESV.org."},
  activity:{title:"Say the summary out loud", text:"Read these three summary statements aloud: 'I need to be born again to enter the Kingdom of God.' 'New birth is found only in Jesus Christ.' 'I become a child of God when I receive Christ as Lord and Savior into my life.'"},
  reflectionTeen:["Why is it hard to accept that a gift cannot be earned?","What does it mean to you to have Jesus as both Savior and Lord?"],
  reflectionKids:["What might a 'brand-new start' feel like?","Who can you talk with about questions you have about God?"],
  summary:["I need to be born again to enter the kingdom of God.","New birth is found only in Jesus Christ.","I become a child of God when I receive Christ as Lord & Savior into my life."],
  prayer:{title:"Optional invitation prayer", teenOnly:true, text:"Lord Jesus, I want to enter the Kingdom of God. I have learned from Your Word that to enter it I have to be born again by receiving You into my heart. In response to Your Word, I now repent from my sins. I now invite You to come into my life and receive You as my Savior and Lord. Forgive me of all my sins and take full control of my life. In Your name I pray, Amen.", kidsNote:"Prayers are always optional. Talk with a parent, guardian or church leader before praying this one."},
  kidsSummary:"New birth is a gift from God, and it comes through Jesus."
},
{
  id:2, title:"Our Life Outside and Inside the Kingdom of God", passage:"Ephesians 2:1–10",
  theme:["#14283f","#2b4a68","#e0b865"],
  kidsIntro:"God looked at us with great mercy. He made us alive in Christ, and that is a gift we receive by faith.",
  intro:"How would you rate yourself before God's holiness: good, fair, poor, or very poor? This lesson looks at our true standing before God and the wonderful things He did for us through Jesus Christ.",
  refs:[["Ephesians 2:1-10","Life outside and inside God's Kingdom"],["Ephesians 2:8-9","Memory verse: grace through faith"],["Romans 6:23","The wages of sin and God's gift"],["Acts 4:12","No other name"],["Ephesians 2:10","Created for good works"]],
  kidsTeach:["The Bible says we all need God's mercy.","Before Christ, we were spiritually dead, and that is a big problem.","God acted out of love and mercy and made us alive with Christ.","Grace is a gift we do not earn. Faith is trusting Jesus to save us.","Good works are what we do because God has saved us, not the way we earn salvation."],
  teach:[
    {t:"Before we know Christ, the Bible describes people as spiritually dead and living under sin (vv.1–2). Romans 6:23 says the wages of sin is death, and the study uses this to explain why we need a Savior."},
    {t:"The study notes that life outside God's Kingdom was lived in obedience to Satan. Eph. 2:3 describes the end result of sinfulness as God's wrath."},
    {t:"God acted out of mercy and great love. He made us alive together with Christ, raised us up, and seated us with Him (vv.4–6)."},
    {t:"Grace means unmerited favor, undeserved goodness given by a holy God to a sinful man. Salvation is by grace, through faith (vv.8–9)."},
    {t:"Salvation is a gift, not the result of works (v.9). Romans 6:23 names eternal life in Christ Jesus as the gift of God. Acts 4:12 says there is no other name by which we must be saved."},
    {t:"Good works are the evident result of salvation. God created us for good works (v.10)."},
    {x:true, t:"Additional explanation: the study separates earning salvation from the good works that come after it. Good works show the new life God has given. They do not buy it."}
  ],
  discovery:[
    {title:"Dead to alive", text:"Spiritually dead describes life apart from God. Made alive describes what God does through Christ.", x:"20%", y:"58%"},
    {title:"Grace", text:"Grace is God's undeserved goodness. We cannot earn it, and that is what makes it a gift.", x:"50%", y:"38%"},
    {title:"Good works", text:"Good works are the fruit of salvation, the way new life shows itself.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"What is the spiritual condition of man as a sinner? (v.1; Rom. 6:23)", hint:"Spiritually dead."},
    {q:"As a sinner, how does man live his life? (Eph. 2:2–3)", hint:"The study asks you to list what it observes."},
    {q:"What does the Bible say about the end result of man's sinfulness? (Eph. 2:3b)", hint:"God's wrath and separation from Him."},
    {q:"What did God do for us through Jesus Christ, and why did He do it? (vv.4–6)", hint:"Mercy and great love."},
    {q:"How is a person saved? (Eph. 2:8–9)", hint:"By grace, through faith."},
    {q:"What then is salvation: a gift or the result of works? (Eph. 2:9)", hint:"A gift."},
    {q:"How can we receive this gift of salvation, and in whom? (v.8; Rom. 6:23b)", hint:"By faith, in Christ Jesus."},
    {q:"Do you believe Jesus alone can save you from your sinful condition? (Acts 4:12)", hint:"Talk with a trusted church leader about this question."},
    {q:"What is the evident result of our salvation? (Eph. 2:10)", hint:"Good works God prepared beforehand."}
  ],
  interactive:[{type:"compare", label:"Before and After", rows:[
    {n:1, before:"Spiritually dead", after:"Made alive together with Christ"},
    {n:2, before:"Living by the ways of this world", after:"Raised up and seated with Christ"},
    {n:3, before:"Under God's wrath", after:"Saved by grace, through faith"},
    {n:4, before:"Obedient to Satan (the study's wording)", after:"Obedient to God and created for good works"}
  ]}],
  quiz:[
    {q:"According to Ephesians 2:8–9, we are saved by:", opts:["Grace through faith","Good works alone","Going to church","A good family"], a:0, why:"The passage says salvation is by grace through faith (vv.8–9)."},
    {q:"Grace means:", opts:["Something we earn","Undeserved goodness given by God","A reward for good behavior","Keeping the law"], a:1, why:"The study defines grace as unmerited favor, undeserved goodness given by a holy God."},
    {q:"Good works are:", opts:["The way to be saved","The result of salvation","Not important","Required before we believe"], a:1, why:"Good works are the evident result of salvation (v.10)."}
  ],
  memory:{ref:"Ephesians 2:8-9", note:"Say it from memory, then check on ESV.org."},
  activity:{title:"Before and after, in your own words", text:"Write one line for each side of the comparison above. Then talk with a parent or teacher about what you wrote."},
  reflectionTeen:["How does knowing salvation is a gift change the way you think about your effort to be good?"],
  reflectionKids:["What is a gift you have received? How did it feel?"],
  summary:["As a sinner I am spiritually dead and the object of God's wrath.","I am saved by the grace of God through faith.","Salvation is a free gift from God not the result of works."],
  prayer:{title:"Closing thought", text:"Thank God for His mercy and grace. Ask Him to help you live out the good works He has prepared.", kidsNote:"If you want to, thank God for the gift of new life."},
  kidsSummary:"God saves us by grace. It is a free gift we receive by faith."
},
{
  id:3, title:"Assurance of Receiving Eternal Life", passage:"1 John 5:9–13",
  theme:["#0f2038","#1d3b5f","#c7a04e"],
  kidsIntro:"Can a person know, while still alive, that they have eternal life? God's Word gives us a clear answer.",
  intro:"Is it possible for a person, while still alive, to be certain of going to heaven? This lesson looks at God's testimony about His Son and the assurance it gives.",
  refs:[["1 John 5:9-13","God's testimony about His Son"],["1 John 5:13","Memory verse: know you have eternal life"],["1 Peter 1:25","The Word endures"],["John 10:28-29","No one snatches them"],["1 John 2:2","Jesus is the atoning sacrifice"],["1 John 5:18","Keeping from sin"],["Romans 8:38-39","Nothing can separate"]],
  kidsTeach:["God always tells the truth, so His Word is reliable.","God says that eternal life is found in His Son, Jesus.","When we receive Jesus, we have eternal life. This is a present gift.","We can know it because God's Word says so, not because of our feelings.","Sin is serious. We turn back to Jesus and grow, and God keeps His promises."],
  teach:[
    {t:"God's testimony is more reliable than man's (v.9). Refusing to believe God's testimony treats Him as untrustworthy (v.10)."},
    {t:"God's testimony is that He has given us eternal life, and this life is in His Son (v.11)."},
    {t:"Whoever has the Son has life. Whoever does not have the Son does not have life (v.12)."},
    {t:"The verb 'has' is in the present perfect tense, which describes an action in the past that continues into the present (the study's note on v.12)."},
    {t:"John wrote so that believers may know they have eternal life (v.13). Assurance is based on God's Word, not wishful thinking. Verse 10 says faith in God, not presumption, is what leads to this knowledge."},
    {t:"Scripture points to security in Christ: the Word endures (1 Pet. 1:25), no one snatches believers from the Father's hand (John 10:28–29), Jesus is the atoning sacrifice (1 John 2:2), and nothing can separate us from His love (Rom. 8:38–39)."},
    {x:true, t:"Additional explanation on sin and assurance: the study asks what happens if we sin again. Scripture calls believers to confess sin, turn back to God, and keep growing (see Lesson 5 on confession, and 1 John 1:9). Assurance and repentance belong together. Talk through this with a pastor or mentor."}
  ],
  discovery:[
    {title:"God's testimony", text:"A testimony is a witness. God has spoken clearly about His Son.", x:"24%", y:"60%"},
    {title:"Know, not hope", text:"John 5:13 uses the word 'know'. Assurance is knowledge built on God's Word.", x:"54%", y:"40%"},
    {title:"Secure in Christ", text:"Romans 8:38–39 lists things that cannot separate us from God's love.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"Is it possible while still alive to be certain of going to heaven? Why?", hint:"Yes, when we rest on God's testimony."},
    {q:"Whose testimony is reliable, God's or man's? (v.9)", hint:"God's."},
    {q:"What do you make of God if you do not believe His testimony? (v.10)", hint:"Refusing to believe treats God as a liar."},
    {q:"What is God's testimony concerning His Son? (v.11)", hint:"He has given us eternal life, and this life is in His Son."},
    {q:"What do we have when we receive Jesus, and what happens if we reject Him? (vv.11–12)", hint:"Life, and no life without the Son."},
    {q:"When do we receive and experience eternal life? (v.12, present perfect tense)", hint:"Now, as a continuing reality."},
    {q:"Which word fits v.13: wish, hope, feel, dream, or know? Can we be sure based on God's Word?", hint:"Know. Yes, we can be sure."},
    {q:"Is it presumption, wishful thinking, boasting, or faith in God to know you have eternal life? (1 John 5:10)", hint:"Faith in God."},
    {q:"Where do you find assurance concerning your eternal life? (1 Pet. 1:25; John 10:28–29)", hint:"In God's Word and in His keeping."},
    {q:"If you sin again, would you lose your salvation? (John 10:28; 1 John 5:18; 1 John 2:2; Rom. 8:38–39)", hint:"Talk with a pastor. The passages speak of God's keeping and of Jesus as the sacrifice for sins."}
  ],
  interactive:[],
  quiz:[
    {q:"Whose testimony is reliable?", opts:["Friends","God's","Feelings","Popular opinion"], a:1, why:"The study asks whether God's or man's testimony is reliable (v.9). Scripture answers God's."},
    {q:"Which word fits 1 John 5:13?", opts:["Wish","Hope","Know","Dream"], a:2, why:"John writes so that believers may know that they have eternal life (v.13)."},
    {q:"Assurance of eternal life is based on:", opts:["Feelings","God's Word","Good works","Luck"], a:1, why:"The study says assurance is based on God's Word (1 John 5:13)."}
  ],
  memory:{ref:"1 John 5:13", note:"Say it from memory, then check on ESV.org."},
  activity:null,
  reflectionTeen:["How does trusting God's testimony differ from hoping in your feelings?"],
  reflectionKids:["Who in your life teaches you that God always tells the truth?"],
  summary:["Trusting in Jesus alone and receiving Him into my life is the only requirement to Eternal Life.","Personal relationship with Christ is my certainty in going to heaven."],
  prayer:{title:"Closing thought", text:"Thank God for giving eternal life through His Son. Ask Him for assurance and for help to grow.", kidsNote:"Thank God for His promise, if you want to."},
  kidsSummary:"God's Word tells us that eternal life is found in Jesus."
},
{
  id:4, title:"Our Role in the Kingdom of God", passage:"2 Corinthians 5:14–6:2",
  theme:["#1b2a44","#2f4a6e","#d9ab55"],
  kidsIntro:"When we trust Jesus, we become a new creation. God gives us the joy of telling others about Him.",
  intro:"When a baby is born, he begins his earthly life. When a person is born again, he experiences a new life. This lesson looks at what it means to be a new creation and to share the message of reconciliation.",
  refs:[["2 Corinthians 5:14-6:2","New creation and reconciliation"],["2 Corinthians 5:17","Memory verse: new creation"],["2 Corinthians 5:10","The judgment seat"],["2 Corinthians 6:2","Now is the day of salvation"]],
  kidsTeach:["When we belong to Christ, we become a new creation.","God makes us His friends and gives us a message of reconciliation.","We are Christ's ambassadors, which means we speak for Him.","We share the Good News with others because Christ's love moves us.","Now is the time to receive Christ."],
  teach:[
    {t:"A person who receives Christ becomes a new creation (v.17). The study asks what has changed, and the answer is a new life with a new direction."},
    {t:"Christ's love compels us. Christ died for all, so those who live should no longer live for themselves but for Him (vv.14–15)."},
    {t:"God reconciled us to Himself through Christ and gave us the ministry of reconciliation (vv.18–19)."},
    {t:"We are ambassadors for Christ. God makes His appeal through us (v.20). The message is to be reconciled to God."},
    {t:"Verse 21 explains that God made Christ, who knew no sin, to be sin for us, so that in Him we might become right with God."},
    {t:"Now is the acceptable time and the day of salvation (6:2). Verse 10 reminds us that everyone will appear before the judgment seat of Christ, which is a motivation for sharing the Gospel (vv.11, 14)."},
    {x:true, t:"Additional explanation: an ambassador speaks for another country. Christians speak for Christ, so the message comes from Him, not from our own opinions."}
  ],
  discovery:[
    {title:"New creation", text:"Old things pass away, and new things come. The new life starts when Christ is received.", x:"22%", y:"60%"},
    {title:"Ambassador", text:"An ambassador represents another. We represent Christ in how we live and what we say.", x:"52%", y:"40%"},
    {title:"Right now", text:"2 Corinthians 6:2 calls this the day of salvation. The time to respond is now.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"What happens when a person receives Christ as his personal Lord and Savior? (v.17)", hint:"He becomes a new creation."},
    {q:"What does it mean to be a new creation? (vv.14–16, 21)", hint:"Before Christ: living for self. After Christ: living for Him."},
    {q:"What is our new role now that we are reconciled to God, and how do we exercise it? (vv.20)", hint:"We are ambassadors for Christ, and God makes His appeal through us."},
    {q:"What message are we to tell others so they can be reconciled to God? (vv.18–21)", hint:"Be reconciled to God, through Christ."},
    {q:"When do we tell this message, and when must it be received? (2 Cor. 6:2b; 5:10)", hint:"Now. We all appear before Christ."},
    {q:"What is our motivation in sharing the Gospel? (vv.11, 14)", hint:"The love of Christ."}
  ],
  interactive:[
    {type:"compare", label:"Before Christ and After Christ", rows:[
      {n:1, before:"Separated from God", after:"Reconciled to God"},
      {n:2, before:"Living for ourselves", after:"Living for Him who died for us"},
      {n:3, before:"Old things", after:"A new creation"}
    ]},
    {type:"builder"}
  ],
  quiz:[
    {q:"What happens when a person receives Christ?", opts:["They become a new creation","Nothing changes","They lose their memory","They become perfect at once"], a:0, why:"2 Corinthians 5:17 says the person in Christ is a new creation."},
    {q:"An ambassador represents:", opts:["Himself","Christ","Their school","Their friends"], a:1, why:"Christians are Christ's ambassadors (v.20)."},
    {q:"The motivation for sharing the Gospel is:", opts:["Fame","Christ's love","Pressure from others","Convenience"], a:1, why:"The study lists the love of Christ as our motivation (vv.11, 14)."}
  ],
  memory:{ref:"2 Corinthians 5:17", note:"Say it from memory, then check on ESV.org."},
  activity:{title:"Assignment: share your new life", text:"Share the new life you have personally experienced in Christ with someone this week. Be ready to talk about this meaningful experience in the next study. Discuss it with a parent or trusted adult first."},
  reflectionTeen:["What has changed in your life since you began learning about Jesus?","Who could you talk to about the Good News?"],
  reflectionKids:["What is one thing you could share about Jesus this week?"],
  summary:["When I came to know Christ personally, I became a new creation.","Salvation or my new life with Christ has to be shared with others.","As Christ's Ambassador, I have the ministry of reconciliation."],
  prayer:{title:"Closing thought", text:"Ask God to help you live as a new creation and to find the words to share His love with someone you know.", kidsNote:"Thank God for making you new."},
  kidsSummary:"We are new in Christ, and we get to tell others about Him."
},
{
  id:5, title:"Communication in the Kingdom of God", passage:"Matthew 6:5–15",
  theme:["#132640","#274a72","#e3bd6a"],
  kidsIntro:"Prayer is talking with God. Jesus showed us a way to pray that is sincere and sensible.",
  intro:"A love relationship between you and God needs to be nurtured. Prayer is fellowship and communion with God. This lesson looks at how to pray truly and what Jesus taught in the Lord's Prayer.",
  refs:[["Matthew 6:5-15","How to pray"],["Matthew 6:9-13","Memory verses: the Lord's pattern"],["1 John 1:9","Confession and forgiveness"]],
  kidsTeach:["Prayer is talking with God, and God hears us.","Jesus said not to pray to be seen by others or to repeat empty words.","Jesus gave us a pattern: A, B, C, D, E, F.","God answers prayer in three ways: Yes, No, and Wait.","Prayer is always optional in this study, and it is good to pray with a parent or leader."],
  teach:[
    {t:"Two ways not to pray are to pray to be seen by others (v.5), which is hypocrisy, and to pray with empty repetition (v.7), which the study calls babbling."},
    {t:"Verse 6 suggests praying in private with your Father. Verse 8 reminds us that God knows our needs before we ask."},
    {t:"Verses 9–13 give a pattern. The study sets it out as the ABC pattern, with three more letters added."},
    {t:"Confession brings forgiveness of sin (1 John 1:9). Verses 14–15 link forgiveness from God with forgiving others."},
    {t:"Prayer is to be sincere and sensible, with specific needs cast and committed to God. The study also teaches that God is sovereign, so we trust His answer."},
    {x:true, t:"Additional explanation: the study's note says that God answers prayer in three ways: Yes, No, and Wait. A 'No' or 'Wait' is still an answer, and God's timing and wisdom are part of His answer."}
  ],
  discovery:[
    {title:"Sincere, not showy", text:"Prayer is between you and God. A quiet, honest prayer is never wasted.", x:"22%", y:"62%"},
    {title:"The pattern", text:"A through F give a shape to prayer. Use them as a guide, not as a rule that stops you from talking to God in your own words.", x:"52%", y:"40%"},
    {title:"Yes, No, Wait", text:"God's answers come in three ways, the study says. Trust His wisdom even when you do not understand.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"Give two ways on how not to pray, based on verses 5 and 7. Why?", hint:"Praying to be seen, and empty repetition."},
    {q:"How can we avoid praying like the hypocrite? (v.6)", hint:"Pray in private, to the Father."},
    {q:"What is babbling prayer? Give some examples. (v.7)", hint:"Many empty words with no sincere heart."},
    {q:"How can we avoid praying like a pagan or heathen? (v.8)", hint:"Remember that God already knows what we need."},
    {q:"What is the proper pattern for our prayer? (vv.9–13)", hint:"The ABCDEF pattern below."}
  ],
  interactive:[{type:"prayer"}],
  quiz:[
    {q:"Which is a way NOT to pray, according to the study?", opts:["Praying to be seen by people","Praying in private","Praying with a sincere heart","Praying to the Father"], a:0, why:"Verse 5 warns against praying to be seen by others."},
    {q:"In ABCDEF, what does A stand for?", opts:["Address the Father","Ask for money","Accept the answer","Agree with others"], a:0, why:"A is 'Address the Father'. Our prayer is addressed to God our Father."},
    {q:"The study says God answers prayer in three ways: Yes, No, and ___", opts:["Maybe","Wait","Later","Silence"], a:1, why:"The three ways are Yes, No, and Wait."}
  ],
  memory:{ref:"Matthew 6:9-13", note:"Say the pattern from memory, then check on ESV.org."},
  activity:{title:"Prayer activity", text:"Make a list of your specific needs and of people to pray for: family, friends, someone who is ill, and those who need to know Christ personally. Then have a conversational prayer using the ABC pattern."},
  reflectionTeen:["Which of the ABCDEF letters is hardest for you to pray, and why?"],
  reflectionKids:["Who is one person you could pray for this week?"],
  summary:["When we pray we must sincerely pray to God.","When we pray, we must sensibly pray to God.","When we pray, we must cast and commit our needs and the needs of others."],
  prayer:{title:"Optional prayer", text:"Use the ABCDEF pattern to pray about one need on your list. Prayer is always optional.", kidsNote:"You can pray with a parent or a leader, or just think quietly about God."},
  kidsSummary:"Prayer is talking with God. Jesus gave us a pattern to follow."
},
{
  id:6, title:"The Textbook in the Kingdom of God", passage:"2 Timothy 3:14–17",
  theme:["#11243c","#26446b","#d6ad5b"],
  kidsIntro:"The Bible is God's Word. It is God's way of showing us who He is and how to live.",
  intro:"The Bible is God's complete revelation of Himself to humanity. Life in the Kingdom is founded and guided by its constitution, the Bible. This lesson asks why we trust it and how the Holy Spirit helps us understand it.",
  refs:[["2 Timothy 3:14-17","The Bible is God's Word"],["2 Timothy 3:16","Memory verse: God-breathed Scripture"],["Matthew 4:4","Living by every word"],["2 Peter 1:20-21","Carried along by the Spirit"],["Hebrews 4:12","Alive and powerful"],["1 Corinthians 2:14","The Spirit helps us understand"],["John 14:26","The Holy Spirit teaches"],["John 16:13","The Spirit guides"],["John 5:39","The Scriptures point to Jesus"]],
  kidsTeach:["The Bible is God's Word.","Every part of Scripture is useful for teaching and for living.","God breathed out His Word, which means He guided the writers.","The Holy Spirit helps us understand the Bible.","The main message of the Bible is about Jesus."],
  teach:[
    {t:"All Scripture is God-breathed (v.16). The word 'all' matters, not just some (see Matt. 5:18)."},
    {t:"'God-breathed' means inspired. It does not mean dictation, and the writers were not robots. God guided and superintended the writers, so their language and personalities were used to reveal Him (2 Pet. 1:20–21)."},
    {t:"The Bible is alive and powerful (Heb. 4:12). It is also useful for teaching, reproof, correction, and training in righteousness (vv.15–17)."},
    {t:"The study asks whether the Bible is sufficient. Verse 17 speaks of being thoroughly equipped for every good work."},
    {t:"Internal evidence the study lists includes prophecy and its fulfillment (for example Matthew 1:17 and Isaiah 7:14 compared with Matthew), and Jesus' own honor of Scripture (Matt. 5:17–18; 26:53–56)."},
    {t:"External evidence the study lists includes archaeological findings (such as the wall of Jericho, the birthplace of Abraham, Noah's Ark, and the site of the crucifixion), and scientific affirmations such as Isaiah 40:22."},
    {x:true, t:"Additional explanation: many of these external claims are debated among scholars. Some are supported by strong evidence, and others are interpreted differently. Good study means weighing evidence carefully and not overstating it."},
    {t:"A person without the Spirit of God cannot understand God's revelation (1 Cor. 2:14). The Holy Spirit teaches and guides believers (John 14:26; 16:13)."},
    {t:"The central message of the Bible points to Jesus (John 5:39; 3:16)."}
  ],
  discovery:[
    {title:"God-breathed", text:"God-breathed means inspired. God worked through the writers without turning them into machines.", x:"22%", y:"60%"},
    {title:"Evidence with care", text:"The study lists internal and external evidence. Hold evidence with humility and do not overstate it.", x:"52%", y:"40%"},
    {title:"The Spirit teaches", text:"John 14:26 and 16:13 describe the Holy Spirit as teacher and guide.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"In verse 16, all Scripture is said to be what? (Take note of the word 'all'.)", hint:"God-breathed."},
    {q:"What does 'God-breathed' mean? (Matt. 4:4; 2 Pet. 1:20–21; Heb. 4:12)", hint:"Inspired: God guided the writers."},
    {q:"How does Scripture help us? (vv.15–17)", hint:"Teaching, reproof, correction, and training."},
    {q:"Is the Bible sufficient and efficient to help us live our new life? (v.17)", hint:"Yes, thoroughly equipped for every good work."},
    {q:"What are the internal and external evidences that the Bible is the Word of God?", hint:"Prophecy, Jesus' honor of Scripture, archaeology, and scientific affirmations, weighed with care."},
    {q:"Can a person without the Spirit understand God's revelation? (1 Cor. 2:14)", hint:"No, not without the Spirit."},
    {q:"Who will guide and teach us in understanding the Bible? (John 14:26; 16:13)", hint:"The Holy Spirit."},
    {q:"What is the central message of the Bible? (John 5:39; 3:16)", hint:"Jesus."}
  ],
  interactive:[],
  quiz:[
    {q:"In 2 Timothy 3:16, all Scripture is:", opts:["Written by kings","God-breathed","Only for ancient people","Optional"], a:1, why:"The study points to verse 16: all Scripture is God-breathed."},
    {q:"Who helps us understand the Bible?", opts:["Our friends","The Holy Spirit","Only scholars","No one"], a:1, why:"John 14:26 and 16:13 speak of the Holy Spirit teaching and guiding."},
    {q:"The central message of the Bible points to:", opts:["Jesus","Kings","Our own ideas","Rules alone"], a:0, why:"The study notes John 5:39 and John 3:16, which center on Jesus."}
  ],
  memory:{ref:"2 Timothy 3:16", note:"Say it from memory, then check on ESV.org."},
  activity:{title:"Assignment: read the Gospel of John", text:"Read the Gospel of John, at least one chapter a day. Pray and ask the Holy Spirit to guide and illumine you before you read."},
  reflectionTeen:["What would change in your daily life if you treated the Bible as your final authority?"],
  reflectionKids:["Why do you think it is good to pray before you read the Bible?"],
  summary:["God is the Author of the Bible; therefore, it is perfect and trustworthy.","God guides and speaks to us through the Bible.","The Bible is our final authority and guide to live the Christian life."],
  prayer:{title:"Closing prayer", text:"Ask the Holy Spirit to open your eyes to God's Word as you read today.", kidsNote:"Pray with a parent or leader before you read."},
  kidsSummary:"The Bible is God's Word. The Holy Spirit helps us understand it."
},
{
  id:7, title:"Living Victoriously in the Kingdom of God", passage:"Romans 7:15–8:17",
  theme:["#0e2236","#1f3f63","#d4a85a"],
  kidsIntro:"Every Christian struggles with sin sometimes. The Holy Spirit helps us live God's way.",
  intro:"How is your Christian life now: victorious, defeated, or struggling? This lesson looks at the believer's struggle with sin and dependence on the Holy Spirit, and at the three dimensions of salvation.",
  refs:[["Romans 7:15-8:17","The believer's struggle and the Spirit"],["Romans 8:16","Memory verse: the Spirit bears witness"],["Romans 8:1","No condemnation"],["Romans 8:23","Waiting for the body to be changed"],["1 Corinthians 15:51-54","Bodies changed"],["1 Thessalonians 4:16-17","The Lord's return"],["Luke 11:13","God gives the Holy Spirit"],["Colossians 3:16","The word of Christ dwells richly"],["Romans 12:1-2","Living sacrifice and a renewed mind"],["James 1:21-22","Doers of the word"]],
  kidsTeach:["Christians still struggle with sin sometimes. This is normal, and it is not the end.","Jesus saved us from the punishment of sin. This was settled at the cross.","The Holy Spirit helps us every day to live God's way.","One day, Jesus will return, and our bodies will be changed.","We grow by asking God for help, praying and reading His Word."],
  teach:[
    {t:"Paul describes his own struggle in Romans 7 (v.15). The study points to the cause, the power of sin continuing to influence our thinking (vv.17, 20)."},
    {t:"The struggle comes from areas of life the study identifies in vv.22, 23 and 25, the inner conflict between desire for God and the pull of sin."},
    {t:"The scope of salvation has three dimensions in time, as the study teaches. Click each card to see more.", scope:true},
    {t:"Romans 8:1 is about past freedom from condemnation. Romans 8:3 describes God's past action in sending His Son to deal with sin. Romans 8:23 looks forward to the future redemption of our bodies."},
    {t:"Living by the Spirit means letting Him lead and control our mind (vv.4–8). The mind set on the Spirit leads to life and peace (v.6)."},
    {t:"The study asks for four roles of the Spirit from vv.9, 11, 14, 16 and 17: He dwells in believers (v.9), gives life to our bodies (v.11), leads God's children (v.14), bears witness that we are God's children (v.16), and makes us heirs with Christ (v.17)."},
    {t:"Filling and control of the Spirit come through asking God (Luke 11:13), letting the word of Christ dwell richly (Col. 3:16), offering our bodies as living sacrifices (Rom. 12:1), and renewing our minds (Rom. 12:2; James 1:21–22)."},
    {x:true, t:"Additional explanation: the study says inner moral struggles are part of the normal Christian experience. This does not excuse sin. It means growth is ongoing, and believers depend on the Spirit and repent when they fall."}
  ],
  scope:[
    {k:"PAST", t:"Saved from the penalty of sin. This was settled at the cross."},
    {k:"PRESENT", t:"Being saved from the power of sin. This is our present struggle, and the only solution is dependence on and submission to the Holy Spirit."},
    {k:"FUTURE", t:"Saved from the presence of sin. Our bodies will be changed at the return of the Lord Jesus Christ (1 Cor. 15:51–54; 1 Thess. 4:16–17)."}
  ],
  discovery:[
    {title:"Past, present, future", text:"Salvation is settled in the past, lived in the present, and completed in the future.", x:"22%", y:"60%"},
    {title:"The Spirit's work", text:"He dwells in us, gives life, leads, witnesses, and makes us heirs.", x:"52%", y:"40%"},
    {title:"Ongoing sanctification", text:"The present scope of salvation is a continuing process as we submit to the Holy Spirit.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"What can you observe in the life of the Apostle Paul in Romans 7:15? What is the cause of his struggle? (vv.17, 20)", hint:"The power of sin continues to influence our thinking."},
    {q:"Between what areas of life do these struggles come? (vv.22, 23, 25)", hint:"Between the inner person who delights in God's law and the flesh that resists it."},
    {q:"Identify each verse as PAST, PRESENT or FUTURE: Romans 8:1, 8:3, 8:23.", hint:"8:1 and 8:3 are past; 8:23 is future."},
    {q:"How can we overcome this struggle? (8:4)", hint:"By walking according to the Spirit."},
    {q:"What does it mean to live according to the Spirit? (v.6)", hint:"A mind set on the Spirit leads to life and peace."},
    {q:"How do we know our mind is controlled by the Spirit? (vv.7, 8)", hint:"Life and peace, and the Spirit dwelling in us."},
    {q:"Name 4 significant roles of the Spirit in our lives (vv.9, 11, 14, 16, 17).", hint:"Dwells, gives life, leads, witnesses, makes us heirs."},
    {q:"How can we be filled with the Holy Spirit? (Luke 11:13; Col. 3:16; Rom. 12:1–2; James 1:21–22)", hint:"Ask God, let His word dwell in us, offer ourselves, and renew our minds."}
  ],
  interactive:[{type:"scenario"}],
  quiz:[
    {q:"Which phase of salvation is 'saved from the penalty of sin'?", opts:["Past","Present","Future","None of these"], a:0, why:"The study says the penalty was settled at the cross (PAST)."},
    {q:"Present salvation is best described as:", opts:["Being saved from the power of sin through the Spirit","Being saved from the penalty of sin","Bodies changed at Christ's return","Settled forever with no daily struggle"], a:0, why:"The present is an ongoing process of being saved from sin's power as we submit to the Holy Spirit."},
    {q:"The Holy Spirit's role includes:", opts:["Witnessing that we are God's children (Romans 8:16)","Replacing our Bible reading","Making us perfect instantly","Removing all struggle"], a:0, why:"Romans 8:16 is the memory verse, and it describes the Spirit's witness."}
  ],
  memory:{ref:"Romans 8:16", note:"Say it from memory, then check on ESV.org."},
  activity:null,
  reflectionTeen:["Where does your Christian life feel most like a struggle right now, and how could you depend on the Spirit there?"],
  reflectionKids:["What is one way you can ask God for help this week?"],
  summary:["Inner moral struggles are part of the normal Christian experience.","I must ask for the filling and control of the Holy Spirit in my life regularly.","I must spend time in the Lord in prayer and study of His word."],
  prayer:{title:"Closing prayer", text:"Ask the Holy Spirit to lead you today and to help you choose what honors God.", kidsNote:"Pray with a parent or leader if you want to."},
  kidsSummary:"We are still learning to live God's way, and the Holy Spirit helps us."
},
{
  id:8, title:"Worship in the Kingdom of God", passage:"Acts 17:16–31",
  theme:["#132438","#2a4560","#c9a24d"],
  kidsIntro:"God made us to worship Him. True worship is from the heart, and it honors God alone.",
  intro:"Worship comes from the English word 'worthship', meaning to give value, honor, reverence and praise to someone worthy. This lesson looks at what worship is, what idolatry is, and how to worship God in spirit and truth.",
  refs:[["Acts 17:16-31","Paul in Athens"],["Deuteronomy 5:8-10","The command about images"],["Colossians 3:5","Idolatry"],["John 4:23-24","Worship in spirit and truth"],["John 3:5","Born of the Spirit"],["John 14:6","Jesus is the Truth"],["Psalm 115:3-8","Assignment: the Psalm"]],
  kidsTeach:["Worship means giving God honor, love and praise.","God is the Creator and is worthy of worship.","An idol is an image made to be worshiped in place of God.","We worship God by faith and in truth, not through images.","Talk with a trusted leader about questions you have on this topic."],
  teach:[
    {t:"Paul was distressed in Athens because the city was full of idols (v.16). The study asks why, and encourages us to see the situation as an opportunity to tell the truth about God."},
    {t:"The study defines an idol as an image of any kind created by man for religious devotion. Examples include candles, flowers, prayers offered before it, kneeling or kissing it."},
    {t:"Idolatry is giving to something created what belongs to God alone (Col. 3:5). The study connects it with desires that take God's place."},
    {t:"God is the Creator of all things. He is Spirit, and He does not need anything that human hands could supply (Acts 17:24–25)."},
    {t:"God made man and determined the times and places where people would seek Him (vv.26–27). Life and breath come from Him (v.28), which is why worship is important."},
    {t:"God commands all people to repent (v.30). He will judge the world through a man He has appointed, and He has given assurance of this by raising Him from the dead (v.31)."},
    {t:"Since God is Spirit, we worship Him in spirit and in truth (John 4:23–24). The study explains that the truth is Jesus Christ (John 14:6), and that worship is by faith in Him."},
    {x:true, t:"The study teaches that true worship is by faith in Jesus Christ, 'not by sight through images, saints, mediums, religions and rituals.' This is the study's position. Many Christians, including Catholic and Orthodox believers, honor images or saints in ways they say are not worship of the image itself. Please talk with a trusted church leader about these differences."}
  ],
  discovery:[
    {title:"What is worship?", text:"Worship gives value, honor, and praise to the One who is worthy. The study calls it the essence of why God created and saved us.", x:"22%", y:"60%"},
    {title:"What is an idol?", text:"The study defines an idol as an image made for religious devotion.", x:"52%", y:"40%"},
    {title:"Spirit and truth", text:"John 4:23–24 says God seeks true worshipers who worship in spirit and truth.", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"Why do you think the Apostle Paul was distressed in Athens? (v.16)", hint:"The city was full of idols."},
    {q:"What is an idol, and what does the Bible say about having idols? (Deut. 5:8–10)", hint:"An image made for religious devotion; the command forbids bowing to or worshiping images."},
    {q:"What is idolatry? (Col. 3:5)", hint:"Giving to something created what belongs to God alone."},
    {q:"What is God like? (vv.24–25)", hint:"God is the Creator. He is not an image made by human hands."},
    {q:"Why did God make man and determine their times and habitation? (vv.26–27)", hint:"So that people would seek Him."},
    {q:"Why is it important to worship God? (v.28)", hint:"He gives life and breath."},
    {q:"Since God is the Creator, how should we think of Him? (v.29)", hint:"Not as an image made from gold or silver or stone."},
    {q:"What is God's command to all people concerning idol worship? (v.30)", hint:"To repent."},
    {q:"By whom will God judge the world? (v.31)", hint:"Through a man He has appointed."},
    {q:"In John 4:23–24, how should we worship God?", hint:"In spirit and in truth."}
  ],
  interactive:[{type:"choice"}],
  quiz:[
    {q:"Who is the only object of true worship, according to the study's summary?", opts:["Saints","God","Teachers","Nature"], a:1, why:"The study's first summary statement: God is the only object of true worship."},
    {q:"In John 4:24, God is to be worshiped in:", opts:["Images","Spirit and truth","Silence only","Temples only"], a:1, why:"John 4:23–24 says we worship in spirit and truth."},
    {q:"The study defines an idol as:", opts:["Any Bible","An image created for religious devotion","A church building","A song"], a:1, why:"The study's definition of an idol is an image created by man for religious devotion."}
  ],
  memory:null,
  activity:{title:"Assignment: read Psalm 115:3–8", text:"Read Psalm 115:3–8 and think about why the Psalm contrasts the living God with things people make."},
  reflectionTeen:["What things, even good things, could take God's place in your heart?"],
  reflectionKids:["What is one way you like to praise God?"],
  summary:["God is the only object of true worship.","God desires worship.","God is Spirit and He is to be worshiped in spirit and in truth."],
  prayer:{title:"Closing reflection", text:"Thank God for who He is, the Creator who gives life and breath. Ask Him to help your worship come from the heart.", kidsNote:"Thank God for making you, if you want to."},
  kidsSummary:"We worship God because He is worthy, and we worship Him from the heart."
},
{
  id:9, title:"Growing in the Kingdom of God", passage:"Acts 2:41–47",
  theme:["#142a40","#24476b","#e0b865"],
  kidsIntro:"Baptism is a picture of our new life in Christ. It is a step of obedience and a way to belong to God's family.",
  intro:"What do we need in order to grow into a strong Christian? This lesson looks at baptism: what it means, why it matters, and how it marks our identification with Christ and our place in the community of believers.",
  refs:[["Acts 2:41-47","Growing in the early church"],["Matthew 28:19","Memory verse: baptize in the name"],["Acts 8:36-37","The question about baptism"],["Romans 6:3-8","Identification with Christ"],["Matthew 3:13-15","Jesus' baptism"]],
  kidsTeach:["Those who received God's word were baptized (Acts 2:41).","Baptism is a picture of being joined to Jesus.","Going under the water shows the old life ending. Coming up shows a new life.","Jesus was baptized as an example of obeying God.","Talk with your parents or a church leader about baptism."],
  teach:[
    {t:"Those who received God's word were baptized, and they were added to the believers (v.41). Growth in faith includes obedience."},
    {t:"The study asks why a person is baptized after believing. Matthew 28:19 commands baptism, and Acts 8:36–37 shows faith as the basis."},
    {t:"Baptism identifies the believer with Christ. Romans 6:3–8 describes the three aspects the study asks about. The suggested answers are: (a) the old life ends (Rom. 6:3–5), (b) burial with Christ (Rom. 6:4), (c) being raised to new life with Christ (Rom. 6:8).", baptismAspects:true},
    {t:"Jesus was baptized to fulfill all righteousness (Matt. 3:13–15). The study asks why baptism is necessary, and encourages discussion."},
    {t:"The study teaches that the proper time for baptism is after a person receives Christ (the answer to question 5c, with reference to Acts 2:41). Baptism is also initiation into a new life within a new community."},
    {x:true, t:"Additional explanation: many churches baptize infants, and many others baptize only believers. Christians differ on these practices. This study teaches baptism after faith. Talk with your pastor if you have questions about your church's practice."}
  ],
  discovery:[
    {title:"Going under", text:"Immersion pictures the old life ending with Christ (Rom. 6:3–5).", x:"22%", y:"60%"},
    {title:"Coming up", text:"Rising from the water pictures the new life (Rom. 6:8).", x:"52%", y:"40%"},
    {title:"Belonging", text:"Baptism marks us as part of a new community of believers (Acts 2:41–47).", x:"80%", y:"62%"}
  ],
  questions:[
    {q:"What happened to those who received God's word? (v.41)", hint:"They were baptized and added to the believers."},
    {q:"Why do you think a person must be baptized after believing and receiving Christ? (Matt. 28:19; Acts 8:36–37)", hint:"Baptism follows faith and shows obedience."},
    {q:"What is baptism? What are the three aspects of immersion? (Rom. 6:3–8)", hint:"Identification with Christ: death to the old life, burial, and new life."},
    {q:"Why is baptism necessary? (Matt. 3:13–15)", hint:"Jesus was baptized to fulfill righteousness; discuss with your leader."},
    {q:"When do you think a person must be baptized? (Acts 2:41)", hint:"The study's answer: after receiving Christ into his life."},
    {q:"What hinders a person from being baptized?", hint:"Lack of faith, or refusing to obey."}
  ],
  interactive:[{type:"baptism"}],
  quiz:[
    {q:"Baptism identifies the believer with:", opts:["Christ","Their family","Their nation","No one"], a:0, why:"Romans 6:3–8 describes baptism as identification with Christ."},
    {q:"Who was baptized to fulfill all righteousness?", opts:["Paul","Peter","Jesus","Nicodemus"], a:2, why:"Matthew 3:13–15 describes Jesus' baptism."},
    {q:"According to the study, a person is baptized:", opts:["As a baby only","When they become completely holy","After they receive Christ","Never"], a:2, why:"The study teaches that baptism follows receiving Christ (see Acts 2:41)."}
  ],
  memory:{ref:"Matthew 28:19", note:"Say it from memory, then check on ESV.org."},
  activity:null,
  reflectionTeen:["What does it mean to you to belong to a community of believers?"],
  reflectionKids:["Who in your church family could you talk with about baptism?"],
  summary:["Every believer is commanded to be baptized.","Baptism is identification with Christ and initiation to live a new life under a new community."],
  prayer:{title:"Closing prayer", text:"Thank God for joining you to Christ and for the family of believers around you.", kidsNote:"Talk with a parent or leader before you decide anything about baptism."},
  kidsSummary:"Baptism shows that we belong to Jesus and to His family."
}
];

/* ================= Small components ================= */
function Refs({refs}){
  return <div className="refs">{refs.map(([r,n])=>(
    <a key={r} className="refCard" href={esvUrl(r)} target="_blank" rel="noopener noreferrer" aria-label={r+", "+n+". Opens ESV.org in a new tab."}>
      <b>{r}</b><small>{n}</small><span className="open">Open in ESV.org</span>
    </a>))}</div>;
}

function Scene({L, big, onSpot, activeSpot}){
  const ref = useRef(null);
  const [p, setP] = useState(null);
  function onMove(e){
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", ((e.clientX-r.left)/r.width-0.5).toFixed(3));
    ref.current.style.setProperty("--my", ((e.clientY-r.top)/r.height-0.5).toFixed(3));
  }
  const style = {"--c1":L.theme[0], "--c2":L.theme[1], "--c3":L.theme[2]};
  return (
    <div>
      <div className={"scene"+(big?" big":"")} ref={ref} onMouseMove={onMove} style={style} role="region" aria-label={"Lesson "+L.id+" scene: discovery points"}>
        <div className="stars" aria-hidden="true"/>
        <div className="orb" aria-hidden="true"/>
        <div className="layer far" aria-hidden="true"/><div className="layer mid" aria-hidden="true"/><div className="layer near" aria-hidden="true"/>
        <div className="label">
          <span className="eyebrow">Lesson {L.id} of 9</span>
          <h1 style={{fontSize:"clamp(1.8rem,4.5vw,2.6rem)"}}>{L.title}</h1>
          <div className="muted" style={{fontSize:".95rem"}}>{L.passage}</div>
        </div>
        {L.discovery.map((d,i)=>(
          <button key={i} className="spot" style={{left:d.x, top:d.y}} aria-pressed={activeSpot===i} aria-label={"Discovery point: "+d.title} onClick={()=>onSpot(i)}>{i+1}</button>
        ))}
      </div>
    </div>
  );
}

function SpotPanel({L, idx}){
  if(idx===null || idx===undefined) return <div className="spotPanel muted">Tap a glowing point in the scene to discover more.</div>;
  const d = L.discovery[idx];
  return <div className="spotPanel" role="status"><h3>{d.title}</h3><p style={{margin:0}}>{d.text}</p></div>;
}

function Quiz({L, s, set}){
  return <div>{L.quiz.map((q,qi)=>{
    const key = L.id+"-"+qi;
    const picked = s.quiz[key];
    return <div className="qCard" key={qi}>
      <h3 style={{fontSize:"1.1rem", fontFamily:"var(--body)", fontWeight:600}}>{qi+1}. {q.q}</h3>
      <div className="opts">{q.opts.map((o,oi)=>{
        const cls = picked===undefined ? "" : (oi===q.a ? " right" : (oi===picked ? " wrong" : ""));
        return <button key={oi} className={"opt"+cls} aria-disabled={picked!==undefined} onClick={()=>{ if(picked===undefined) set("quiz", key, oi); }}>
          {o}{picked!==undefined && oi===q.a && <span className="sr-only"> (correct answer)</span>}{picked!==undefined && oi===picked && oi!==q.a && <span className="sr-only"> (your answer, incorrect)</span>}
        </button>;
      })}</div>
      {picked!==undefined && <div className="feedback" role="status">{picked===q.a ? "Correct. " : "Not quite. "}{q.why}</div>}
    </div>;
  })}</div>;
}

function Questions({L, s, set}){
  const [open, setOpen] = useState({});
  return <div>{L.questions.map((q,qi)=>{
    const key = L.id+"-q"+qi;
    return <div className="qCard" key={qi}>
      <div style={{fontWeight:600}}>{qi+1}. {q.q}</div>
      <textarea id={"ans-"+key} aria-label={"Your answer to question "+(qi+1)} value={s.notes[key]||""} onChange={e=>set("notes", key, e.target.value)} placeholder="Write your thoughts here. They stay on this device."/>
      <button className="hint" onClick={()=>setOpen(o=>({...o,[qi]:!o[qi]}))} aria-expanded={!!open[qi]}>{open[qi] ? "Hide hint" : "Show hint"}</button>
      {open[qi] && <div className="feedback">{q.hint}</div>}
    </div>;
  })}<p className="note">Your answers are saved only in this browser. Nothing is sent anywhere.</p></div>;
}

function Compare({rows}){
  const [side, setSide] = useState("before");
  return <div>
    <div className="seg" role="group" aria-label="Compare view">
      <button aria-pressed={side==="before"} onClick={()=>setSide("before")}>Before</button>
      <button aria-pressed={side==="after"} onClick={()=>setSide("after")}>After</button>
    </div>
    <div className="compare">{rows.map((r,i)=>(
      <div className="row" key={side+i} style={{animationDelay:(i*0.08)+"s"}}>
        <div className="n">{r.n}</div>
        <div className="side">{side==="before" ? r.before : r.after}</div>
      </div>
    ))}</div>
  </div>;
}

function Builder({L, s, set}){
  const parts = ["Who I was before Christ","What Christ did for me","My invitation to a friend"];
  return <div>
    <p className="muted">Write a short, simple outline you could use to share the Good News. Your notes stay on this device.</p>
    {parts.map((p,i)=>{
      const key = L.id+"-builder-"+i;
      return <div className="qCard" key={i}>
        <label htmlFor={"b-"+key} style={{fontWeight:600}}>{i+1}. {p}</label>
        <textarea id={"b-"+key} value={s.notes[key]||""} onChange={e=>set("notes", key, e.target.value)}/>
      </div>;
    })}
  </div>;
}

function PrayerBuilder({s, update}){
  const letters = [
    {l:"A", w:"Address the Father", d:"Our prayer is addressed to God our Father."},
    {l:"B", w:"Bow to His rule and will", d:"Acknowledge that God's will is the one that matters most."},
    {l:"C", w:"Commit our needs", d:"Name needs specifically and commit them to God."},
    {l:"D", w:"Deal with sin", d:"Confess sin to God and seek forgiveness (1 John 1:9)."},
    {l:"E", w:"Escape evil", d:"Ask God for protection and deliverance."},
    {l:"F", w:"Faith and submission", d:"Trust and submit to God, including His answers, for He is sovereign."}
  ];
  const [sel, setSel] = useState(0);
  const [text, setText] = useState("");
  function add(){ const t=text.trim(); if(!t) return; update(n=>({...n, needs:[...n.needs, t]})); setText(""); }
  function remove(i){ update(n=>({...n, needs:n.needs.filter((_,j)=>j!==i)})); }
  return <div>
    <div className="letters" role="group" aria-label="ABCDEF pattern">
      {letters.map((x,i)=>(<button key={x.l} aria-pressed={sel===i} onClick={()=>setSel(i)}><div className="big">{x.l}</div><div style={{fontSize:".8rem"}}>{x.w}</div></button>))}
    </div>
    <div className="feedback" role="status" style={{marginTop:12}}><b>{letters[sel].l}: {letters[sel].w}.</b> {letters[sel].d}</div>
    <h3 style={{marginTop:22}}>Your prayer needs</h3>
    <p className="muted">Add people and needs you want to pray for, such as family, friends, someone who is ill, or someone who needs to know Christ personally.</p>
    <div className="inputRow">
      <label htmlFor="need-input" className="note" style={{width:"100%"}}>Add a need</label>
      <input id="need-input" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") add();}} placeholder="For example: my grandmother's health"/>
      <button className="btn" onClick={add}>Add</button>
    </div>
    <div className="needs">{s.needs.length===0 && <p className="muted">No needs yet. Add one when you are ready.</p>}
      {s.needs.map((n,i)=>(<div className="item" key={i}><span>{n}</span><button className="ghost" onClick={()=>remove(i)} aria-label={"Remove need: "+n}>Remove</button></div>))}
    </div>
  </div>;
}

function Scenario({L}){
  const sc = [
    {q:"A friend tells you a rumor, and you feel tempted to repeat it.", opts:["Repeat it so you fit in","Pray and change the subject","Add a detail to make it exciting"], a:1, why:"Romans 7 describes a real inner struggle. The study says we depend on the Holy Spirit's control. Asking Him for help is a wise first step."},
    {q:"You want to grow, but you keep skipping time with God.", opts:["Wait until you feel ready","Ask the Holy Spirit for help, and spend time in prayer and God's Word","Give up because you are not perfect"], a:1, why:"The study's summary says we must ask for the Spirit's filling regularly and spend time in prayer and study."},
    {q:"You must decide between an easy plan and a plan that honors God.", opts:["Choose whatever is easiest","Ask God for wisdom, and think about Romans 12:1–2 and offering your life to Him","Let others decide for you"], a:1, why:"Romans 12:1–2 speaks of offering our bodies as living sacrifices and being transformed by a renewed mind."}
  ];
  const [picks, setPicks] = useState({});
  return <div>{sc.map((x,i)=>(
    <div className="qCard" key={i}>
      <div style={{fontWeight:600, marginBottom:8}}>Scenario {i+1}: {x.q}</div>
      <div className="opts">{x.opts.map((o,oi)=>{
        const p = picks[i];
        const cls = p===undefined ? "" : (oi===x.a ? " right" : (oi===p ? " wrong" : ""));
        return <button key={oi} className={"opt"+cls} aria-disabled={p!==undefined} onClick={()=>{ if(p===undefined) setPicks(v=>({...v,[i]:oi})); }}>
          {o}{p!==undefined && oi===x.a && <span className="sr-only"> (best choice)</span>}{p!==undefined && oi===p && oi!==x.a && <span className="sr-only"> (your choice)</span>}
        </button>;
      })}</div>
      {picks[i]!==undefined && <div className="feedback">{x.why}</div>}
    </div>))}
  </div>;
}

function Choice(){
  const items = [
    {t:"Praying sincerely to God and thanking Him for who He is", g:true, why:"Genuine worship is directed to God, in spirit and in truth (John 4:23–24)."},
    {t:"Bowing before a carved figure and asking it for help", g:false, why:"The study teaches that such devotion to an image is misplaced. The command forbids bowing to images (Deut. 5:8–10)."},
    {t:"Singing praise to God, honoring Jesus as the Way, the Truth and the Life", g:true, why:"John 14:6 names Jesus as the truth. Worship by faith in Him is what the study teaches."},
    {t:"Putting money or a career above God in your heart", g:false, why:"Colossians 3:5 connects idolatry with desires that take God's place."},
    {t:"Lighting a candle before a statue to pray to a saint", g:false, contested:true, why:"The study considers this misplaced devotion. Many Christians, including Catholic and Orthodox believers, see such practices differently. Please talk with a trusted church leader."},
    {t:"Trusting Jesus, who is the Way, the Truth and the Life", g:true, why:"The study teaches that worship is by faith in Jesus Christ."}
  ];
  const [picks, setPicks] = useState({});
  return <div>
    <p className="muted">Choose each statement to see whether it is genuine worship or misplaced devotion, according to the study.</p>
    <div className="opts">{items.map((x,i)=>{
      const p = picks[i];
      return <div key={i}>
        <button className="opt" onClick={()=>setPicks(v=>({...v,[i]:true}))} aria-expanded={!!p}>{x.t}</button>
        {p && <div className="feedback"><b>{x.g ? "Genuine worship." : "Misplaced devotion, according to the study."}</b> {x.why}{x.contested && <span className="tag xtag" style={{marginLeft:6}}>Please discuss with your leader</span>}</div>}
      </div>;
    })}</div>
  </div>;
}

function Baptism(){
  const steps = [
    {t:"Going under", d:"The old life ends (Romans 6:3–5)."},
    {t:"Buried with Christ", d:"Burial pictures our union with Christ's death and burial (Romans 6:4)."},
    {t:"Raised to new life", d:"We are raised to walk in new life, believing we will also live with Him (Romans 6:8)."}
  ];
  const [step, setStep] = useState(0);
  const pos = step===0 ? "" : (step===1 ? "down" : "up");
  return <div>
    <div className="water" role="img" aria-label={"Baptism picture, step "+(step+1)+" of 3: "+steps[step].t}>
      <div className="wave" aria-hidden="true"/>
      <div className={"figure "+pos+(step===2?" up":"")} aria-hidden="true"/>
    </div>
    <div className="seg" role="group" aria-label="Baptism steps" style={{marginTop:12}}>
      {steps.map((x,i)=>(<button key={i} aria-pressed={step===i} onClick={()=>setStep(i)}>{i+1}</button>))}
    </div>
    <div className="feedback"><b>{steps[step].t}.</b> {steps[step].d} <br/><span className="note">Suggested answers for the study's three aspects. The study leaves these blank for discussion.</span></div>
  </div>;
}

function Mode({s, update}){
  return <div className="modes" role="group" aria-label="Learning mode">
    <button className="pill" aria-pressed={s.mode==="kids"} onClick={()=>update(n=>({...n,mode:"kids"}))}>Kids Mode</button>
    <button className="pill" aria-pressed={s.mode==="teen"} onClick={()=>update(n=>({...n,mode:"teen"}))}>Teen Mode</button>
  </div>;
}

function Progress({s}){
  const count = Object.keys(s.completed).length;
  const pct = Math.round((count/9)*100);
  return <div className="progressRow">
    <span className="muted">{count} of 9 lessons complete</span>
    <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={9} aria-valuenow={count} aria-label="Lessons complete"><span style={{width:pct+"%"}}/></div>
    <span className="muted">{pct}%</span>
  </div>;
}

function Certificate({onBack}){
  return <div className="certificate" role="region" aria-label="Completion certificate">
    <div className="seal">LK</div>
    <span className="eyebrow">Certificate of Completion</span>
    <h2>Life in the Kingdom</h2>
    <p style={{margin:"0 auto 14px"}}>You completed all nine lessons of the Bible study, from Entering the Kingdom of God through Growing in the Kingdom of God.</p>
    <p className="note" style={{margin:"0 auto"}}>No name is collected, so this certificate is for you to keep in your own words.</p>
    <div style={{marginTop:22, display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap"}}>
      <button className="btn ghostBtn" onClick={onBack}>Back to lessons</button>
    </div>
  </div>;
}

/* ================= Lesson view ================= */
function LessonView({L, s, update, go, home}){
  const set = (kind, key, val) => {
    if(kind==="quiz") update(n=>({...n, quiz:{...n.quiz,[key]:val}}));
    else update(n=>({...n, notes:{...n.notes,[key]:val}}));
  };
  const [spot, setSpot] = useState(null);
  const [mem, setMem] = useState(!!s.memory[L.id]);
  useEffect(()=>{ setSpot(null); setMem(!!s.memory[L.id]); window.scrollTo({top:0,behavior:"auto"}); },[L.id]);
  const kids = s.mode==="kids";
  const done = !!s.completed[L.id];
  const idx = L.id-1;
  const next = idx<8 ? LESSONS[idx+1] : null;
  const prev = idx>0 ? LESSONS[idx-1] : null;
  const [toast, setToast] = useState("");
  function complete(){
    update(n=>({...n, completed:{...n.completed,[L.id]:true}, last: L.id}));
    setToast("Lesson "+L.id+" complete");
    setTimeout(()=>setToast(""), 2200);
  }
  function setMemory(v){ setMem(v); update(n=>({...n, memory:{...n.memory,[L.id]:v}})); }
  return <div className="wrap">
    <div className="topnav">
      <button className="ghost" onClick={home}>Home</button>
      <select aria-label="Choose a lesson" value={L.id} onChange={e=>go(+e.target.value)}>
        {LESSONS.map(x=><option key={x.id} value={x.id}>Lesson {x.id}: {x.title}</option>)}
      </select>
      <Mode s={s} update={update}/>
    </div>

    <Scene L={L} big onSpot={setSpot} activeSpot={spot}/>
    <SpotPanel L={L} idx={spot}/>

    <section className="block" aria-labelledby="read-passage-h">
      <span className="eyebrow">Start here</span>
      <h2 id="read-passage-h">Read the whole passage</h2>
      <p>Before going through this lesson, take time to read the complete Bible passage. Notice what is happening, who is speaking, and what the passage teaches about God.</p>
      <div className="feedback" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,flexWrap:"wrap"}}>
        <div>
          <div className="eyebrow">Lesson {L.id} · Main Bible passage</div>
          <strong style={{fontSize:"1.15rem",color:"var(--gold2)"}}>{L.passage}</strong>
        </div>
        <a className="btn" href={esvUrl(L.passage)} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",textDecoration:"none"}}>Read on ESV.org ↗</a>
      </div>
      <p className="note" style={{marginTop:10}}>Read the entire passage in your Bible or open it on ESV.org. When you are finished, return here and continue with the lesson.</p>
    </section>

    <section className="block" aria-labelledby="intro-h">
      <h2 id="intro-h">Introduction</h2>
      <p>{kids ? L.kidsIntro : L.intro}</p>
    </section>

    <section className="block" aria-labelledby="refs-h">
      <h2 id="refs-h">Scripture references</h2>
      <p className="muted note">Open each reference on ESV.org to read the passage. This study does not reproduce ESV text.</p>
      <Refs refs={L.refs}/>
    </section>

    <section className="block" aria-labelledby="teach-h">
      <h2 id="teach-h">Teaching</h2>
      <div className="teach">
        {(kids ? L.kidsTeach.map(t=>({t})) : L.teach).map((it,i)=>(
          it.scope ? <div key={i} className="teachItem"><p style={{margin:0}}>{it.t}</p>
            <ScopeCards items={L.scope}/></div> :
          <div key={i} className={"teachItem"+(it.x?" x":"")}>
            {it.x && <span className="tag xtag">Additional explanation</span>}
            <p style={{margin:0}}>{it.t}</p>
          </div>
        ))}
      </div>
      {!kids && <p className="note" style={{marginTop:12}}>Teen Mode shows the study's wording. Notes marked "Additional explanation" are added context, not part of the original PDF.</p>}
    </section>

    {L.interactive.length>0 && <section className="block" aria-labelledby="int-h">
      <h2 id="int-h">Interactive study</h2>
      {L.interactive.map((x,i)=>(
        <div key={i} style={{marginBottom:18}}>
          {x.type==="compare" && <><h3>{x.label}</h3><Compare rows={x.rows}/></>}
          {x.type==="builder" && <><h3>Gospel-sharing activity</h3><Builder L={L} s={s} set={set}/></>}
          {x.type==="prayer" && <><h3>Prayer activity</h3><PrayerBuilder s={s} update={update}/></>}
          {x.type==="scenario" && <><h3>Real-life decisions</h3><Scenario L={L}/></>}
          {x.type==="choice" && <><h3>Genuine worship or misplaced devotion?</h3><Choice/></>}
          {x.type==="baptism" && <><h3>Baptism, step by step</h3><Baptism/></>}
        </div>
      ))}
    </section>}

    <section className="block" aria-labelledby="q-h">
      <h2 id="q-h">Study questions</h2>
      <Questions L={L} s={s} set={set}/>
    </section>

    <section className="block" aria-labelledby="quiz-h">
      <h2 id="quiz-h">Quiz</h2>
      <p className="muted">Pick an answer to see whether you are right and why.</p>
      <Quiz L={L} s={s} set={set}/>
    </section>

    {L.memory && <section className="block" aria-labelledby="mem-h">
      <h2 id="mem-h">Memory verse</h2>
      <div className="memory">
        <div style={{flex:"1 1 240px", minWidth:0}}>
          <div className="eyebrow">Memorize</div>
          <div style={{fontFamily:"var(--display)", fontSize:"1.8rem", color:"var(--gold2)"}}>{L.memory.ref}</div>
          <p className="note" style={{margin:"4px 0 0"}}>{L.memory.note}</p>
          <a href={esvUrl(L.memory.ref)} target="_blank" rel="noopener noreferrer" style={{color:"var(--gold2)"}}>Open this verse on ESV.org</a>
        </div>
        <label className="check"><input type="checkbox" checked={mem} onChange={e=>setMemory(e.target.checked)}/> I can say this verse from memory</label>
      </div>
    </section>}

    {L.id===8 && <section className="block" aria-labelledby="nomem-h"><h2 id="nomem-h">Memory verse</h2><p className="muted">This lesson does not specify a memory verse in the study. None has been added.</p></section>}

    {L.activity && <section className="block" aria-labelledby="act-h">
      <h2 id="act-h">{L.activity.title}</h2>
      <p>{L.activity.text}</p>
    </section>}

    <section className="block" aria-labelledby="refl-h">
      <h2 id="refl-h">Reflection</h2>
      <ul>{(kids ? L.reflectionKids : L.reflectionTeen).map((r,i)=><li key={i}>{r}</li>)}</ul>
      <p className="note">Talk through these with a parent, guardian or church leader.</p>
    </section>

    <section className="block" aria-labelledby="sum-h">
      <h2 id="sum-h">Summary statements</h2>
      <ol style={{paddingLeft:"1.3em"}}>{L.summary.map((x,i)=><li key={i} style={{marginBottom:".5em"}}>{x}</li>)}</ol>
    </section>

    {L.prayer && (!L.prayer.teenOnly || !kids) && <section className="block" aria-labelledby="pray-h">
      <h2 id="pray-h">{L.prayer.title}</h2>
      <p className="note">Prayer is always optional.</p>
      {L.prayer.text && (!kids || !L.prayer.teenOnly) && <div className="feedback" style={{fontStyle:"italic"}}>{L.prayer.text}</div>}
      {kids && L.prayer.kidsNote && <p className="muted">{L.prayer.kidsNote}</p>}
      {!kids && L.prayer.kidsNote && <p className="note">{L.prayer.kidsNote}</p>}
      <p className="note">If you have questions about faith or prayer, talk with a trusted parent, guardian or church leader.</p>
    </section>}

    <section className="block" aria-labelledby="done-h">
      <h2 id="done-h">Finish this lesson</h2>
      <p className="muted">{done ? "You have completed this lesson." : "When you are ready, mark the lesson complete."}</p>
      <div style={{display:"flex", gap:10, flexWrap:"wrap", alignItems:"center"}}>
        <button className="btn" onClick={complete} disabled={done}>{done ? "Completed" : "Mark lesson complete"}</button>
        {prev && <button className="btn ghostBtn" onClick={()=>go(prev.id)}>Previous: Lesson {prev.id}</button>}
        {next && <button className="btn ghostBtn" onClick={()=>go(next.id)}>Next: Lesson {next.id}</button>}
      </div>
      {!next && done && Object.keys(s.completed).length===9 && <p className="muted" style={{marginTop:14}}>All nine lessons complete. Open your certificate from the home page.</p>}
    </section>
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

function ScopeCards({items}){
  return <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10, marginTop:12}}>
    {items.map((x,i)=>(<div key={i} style={{background:"var(--navy)", borderRadius:14, padding:"12px 14px", border:"1px solid rgba(217,171,85,.3)", minWidth:0}}>
      <div className="eyebrow">{x.k}</div><p style={{margin:"4px 0 0", fontSize:".95rem"}}>{x.t}</p>
    </div>))}
  </div>;
}

/* ================= Home ================= */
function Home({s, update, startOrResume, openLesson, restart, armed, setArmed, openCert}){
  const count = Object.keys(s.completed).length;
  const allDone = count===9;
  return <div className="wrap">
    <section className="hero" aria-labelledby="title">
      <span className="eyebrow">An interactive Bible study and discipleship journey</span>
      <h1 id="title">Life in the Kingdom</h1>
      <div className="tagline">Discover. Learn. Believe. Grow.</div>
      <p style={{maxWidth:"60ch"}}>Nine lessons from the study "Bible Study Lesson 1–9". Each lesson keeps the original questions, memory verses, summaries and activities. Kids Mode uses simple language. Teen Mode shows the study's wording and deeper context.</p>
      <div className="actions">
        <button className="btn" onClick={startOrResume}>{s.started ? "Resume learning" : "Start learning"}</button>
        {count>0 && <button className="btn ghostBtn" onClick={()=>openLesson(s.last||1)}>Continue Lesson {s.last||1}</button>}
        {allDone && <button className="btn ghostBtn" onClick={openCert}>View certificate</button>}
      </div>
    </section>

    <div className="progressRow" style={{marginTop:26}}>
      <Mode s={s} update={update}/>
      <Progress s={s}/>
    </div>

    <ul className="cards" style={{listStyle:"none", padding:0, margin:"24px 0 0"}} aria-label="Lessons">
      {LESSONS.map(L=>(
        <li key={L.id} style={{minWidth:0}}>
        <button className="card" style={{width:"100%"}} onClick={()=>openLesson(L.id)} aria-label={"Lesson "+L.id+": "+L.title+(s.completed[L.id]?", completed":"")}>
          {s.completed[L.id] && <span className="ok">Done</span>}
          <div className="num">{L.id}</div>
          <div className="ttl">{L.title}</div>
          <div className="muted" style={{fontSize:".9rem"}}>{L.passage}</div>
          <div className="muted" style={{fontSize:".88rem", marginTop:8}}>{s.mode==="kids" ? L.kidsSummary : L.summary[0]}</div>
        </button>
        </li>
      ))}
    </ul>

    <div style={{marginTop:36, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center"}}>
      {!armed
        ? <button className="ghost danger" onClick={()=>setArmed(true)}>Restart the study</button>
        : <><span className="note">This clears all progress and notes on this device.</span>
            <button className="ghost danger" onClick={restart}>Yes, restart</button>
            <button className="ghost" onClick={()=>setArmed(false)}>Cancel</button></>}
    </div>
    <p className="note" style={{marginTop:24}}>Progress is saved in this browser only. No names, emails or personal information are collected. Prayers are always optional. Talk through spiritual questions with a parent, guardian or church leader.</p>
  </div>;
}

/* ================= App ================= */
function App(){
  const [s, setS] = useState(load);
  const [view, setView] = useState("home");
  const [cur, setCur] = useState(1);
  const [armed, setArmed] = useState(false);
  useEffect(()=>{ save(s); }, [s]);
  const update = (fn) => setS(p => fn({...p}));
  function openLesson(id){ setCur(id); setView("lesson"); update(n=>({...n, started:true, last:id})); }
  function startOrResume(){ openLesson(s.last||1); }
  function restart(){ setS({...DEFAULT}); setArmed(false); setView("home"); setCur(1); }
  if(view==="lesson") return <LessonView L={LESSONS[cur-1]} s={s} update={update} go={openLesson} home={()=>setView("home")}/>;
  if(view==="cert") return <div className="wrap"><Certificate onBack={()=>setView("home")}/></div>;
  return <Home s={s} update={update} startOrResume={startOrResume} openLesson={openLesson} restart={restart} armed={armed} setArmed={setArmed} openCert={()=>setView("cert")}/>;
}

class Boundary extends React.Component{
  constructor(p){ super(p); this.state={err:false}; }
  static getDerivedStateFromError(){ return {err:true}; }
  render(){
    if(this.state.err) return <div className="wrap"><h2>Something went wrong</h2><p className="muted">The page could not load this view. Reload the page to try again. Your progress is saved in this browser.</p></div>;
    return this.props.children;
  }
}

export default function Root(){
  return <Boundary><App/></Boundary>;
}
