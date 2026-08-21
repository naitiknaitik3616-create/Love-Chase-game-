const DARE_POOL = [
  "Send Manav a romantic message right now.",
  "Write 5 things you absolutely love about Manav.",
  "Record a short voice message (10-30 seconds) expressing your feelings.",
  "Share a cute selfie or photo with Manav.",
  "Dedicate a romantic song to Manav and explain why it's special.",
  "Write a beautiful 4-line love note for Manav.",
  "Share your funniest memory with Manav in detail.",
  "Record a short video (under 1 minute) of you doing a silly dance.",
  "Give Manav 5 genuine compliments—be specific!",
  "Write a detailed answer: Why did you choose Manav?",
  "Share your absolute favorite memory together.",
  "Create a cute nickname for Manav and explain it.",
  "Write a tiny romantic poem about Manav (4-6 lines).",
  "Describe your perfect date with Manav in vivid detail.",
  "Write a sweet virtual love letter to Manav.",
  "Share one thing Manav does that always makes you smile.",
  "Write about a future adventure you want to have with Manav.",
  "Record a 10-15 second voice note: 'I really love...' (complete the thought).",
  "Share a funny or embarrassing story involving Manav.",
  "Write a surprise romantic message Manav won't expect.",
  "Pick a song that represents your relationship and explain why.",
  "Write 3 specific reasons Manav makes you genuinely happy.",
  "Create a cute 2-line relationship slogan for you two.",
  "Share one dream you want to achieve together with Manav.",
  "Write a mini appreciation letter thanking Manav for something special.",
  "Share a photo of something that reminds you of Manav.",
  "Write about what you love most about Manav's personality.",
  "Record yourself singing or humming a song dedicated to Manav.",
  "Write a heartfelt message about why Manav is your favorite person.",
  "Share something Manav taught you that changed your perspective.",
  "Write a detailed description of your ideal future with Manav.",
  "Create a cute list: 10 reasons to choose Manav every day.",
  "Record a voice message: Share your favorite inside joke with Manav.",
  "Write about the moment you knew Manav was special.",
  "Share a romantic photo or create romantic art for Manav.",
  "Write a playful dare for Manav to complete next time you play.",
  "Describe Manav using only positive words (create a word cloud or list).",
  "Record yourself saying 'I love you' in a creative or funny way.",
  "Write about your favorite quality in Manav and why it matters.",
  "Share a screenshot or quote that reminds you of your relationship.",
  "Write a mini love story about you and Manav (3-5 paragraphs).",
  "Record a message: What's one thing you want Manav to know about you?",
  "Write a detailed list of all the ways Manav makes your life better.",
  "Share a creative selfie or photo with a romantic caption for Manav.",
  "Write about a challenge you faced together and how it brought you closer.",
  "Create a playlist of songs that represent your relationship (write the list).",
  "Record yourself reciting a romantic poem or quote for Manav.",
  "Write about your favorite laugh you've shared with Manav.",
  "Share a message: If you could tell Manav one thing, what would it be?",
  "Write a romantic bucket list for you and Manav (10+ items)."
];

export class DareManager {
  constructor() {
    this.darePool = DARE_POOL;
    this.usedDares = new Set();
  }

  generateDare(id) {
    // Get random dare that hasn't been used recently
    let dare;
    let attempts = 0;
    do {
      dare = this.darePool[Math.floor(Math.random() * this.darePool.length)];
      attempts++;
    } while (this.usedDares.has(dare) && attempts < 10);

    if (attempts >= 10) {
      this.usedDares.clear(); // Reset if we've used too many
    }

    this.usedDares.add(dare);
    return {
      id,
      text: dare,
      createdAt: Date.now()
    };
  }
}
