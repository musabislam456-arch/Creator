export const CORE_TOOLS = [
  {
    id: 'viral-hook-generator',
    title: 'Viral Hook Generator',
    description: 'Generate scroll-stopping hooks for your short-form videos.',
    icon: 'FishHook',
    category: 'Shorts & Reels',
    promptTemplate: 'Generate 5 highly engaging, viral hooks for a short-form video about: "{input}". The hooks should be designed to grab attention in the first 3 seconds. Make them punchy, intriguing, and tailored for TikTok/Reels/Shorts. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'shorts-script-generator',
    title: 'YouTube Shorts Script',
    description: 'Write engaging 30-60 second scripts for YouTube Shorts.',
    icon: 'FileText',
    category: 'Shorts & Reels',
    promptTemplate: 'Write a highly engaging, fast-paced 60-second YouTube Shorts script about: "{input}". Include visual cues [in brackets], a strong hook, concise valuable body content, and a clear call to action at the end. Keep sentences short. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'caption-generator',
    title: 'Caption Generator',
    description: 'Create engaging captions for Instagram and TikTok.',
    icon: 'Type',
    category: 'Social Media',
    promptTemplate: 'Write an engaging, trendy, and relatable caption for an Instagram/TikTok post about: "{input}". Include a hook, the main message, a call to action (like "save this" or "comment below"), and relevant emojis. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'hashtag-generator',
    title: 'Smart Hashtag Generator',
    description: 'Find the best niche hashtags for maximum reach.',
    icon: 'Hash',
    category: 'SEO & Discovery',
    promptTemplate: 'Generate a strategic list of 30 hashtags for a social media post about: "{input}". Group them into: 1) Broad/Popular (10), 2) Niche/Specific (15), and 3) Trending/Community (5). Do not use banned hashtags. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'video-idea-generator',
    title: 'Video Idea Generator',
    description: 'Never run out of content ideas for your channel.',
    icon: 'Lightbulb',
    category: 'Ideation',
    promptTemplate: 'Brainstorm 10 highly clickable and viral video ideas for a YouTube channel in the niche: "{input}". For each idea, provide a catchy title and a 1-sentence summary of the video concept. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'seo-title-generator',
    title: 'SEO Title Generator',
    description: 'Generate high-CTR, search-optimized YouTube titles.',
    icon: 'Search',
    category: 'SEO & Discovery',
    promptTemplate: 'Generate 10 highly clickable, high-CTR YouTube titles for a video about: "{input}". The titles should evoke curiosity, urgency, or extreme value. Keep them under 60 characters for optimal display. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'ai-rewrite-tool',
    title: 'AI Rewrite Tool',
    description: 'Rewrite your scripts or descriptions to be more engaging.',
    icon: 'PenTool',
    category: 'Writing',
    promptTemplate: 'Rewrite the following text to make it highly engaging, persuasive, and optimized for a social media audience. Improve the flow, fix any grammar issues, and make it sound natural and exciting: "{input}". Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'faceless-video-script',
    title: 'Faceless Video Script',
    description: 'Generate scripts perfectly formatted for faceless channels.',
    icon: 'Ghost',
    category: 'YouTube Long-form',
    promptTemplate: 'Write a script for a faceless YouTube video about: "{input}". Format it with two columns (or clear sections): "Visual/B-Roll" and "Voiceover". Ensure the pacing is good for a 5-8 minute video, with a strong intro and engaging storytelling. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'bio-generator',
    title: 'Social Media Bio Generator',
    description: 'Create a professional, optimized bio for your profiles.',
    icon: 'UserCircle',
    category: 'Social Media',
    promptTemplate: 'Write 3 different options for a social media bio (Instagram/TikTok/Twitter) for a creator focused on: "{input}". Option 1: Professional & Clean. Option 2: Fun & Emoji-heavy. Option 3: Short & Punchy. Include a placeholder for a link. Please provide the output in {language}.',
    supportsLanguage: true
  },
  {
    id: 'comment-reply-generator',
    title: 'Comment Reply Generator',
    description: 'Generate smart, engaging replies to your audience.',
    icon: 'MessageSquare',
    category: 'Community',
    promptTemplate: 'Generate 3 different engaging and polite replies to the following comment from a viewer: "{input}". Option 1: Appreciative and warm. Option 2: Funny/Witty. Option 3: Asking a follow-up question to boost engagement. Please provide the output in {language}.',
    supportsLanguage: true
  }
];

export const ADVANCED_TOOLS = [
  {
    id: 'thumbnail-ab-testing',
    title: 'Thumbnail A/B Testing',
    description: 'AI analyzes your thumbnails and predicts the best performer.',
    icon: 'Image',
    category: 'Advanced',
    supportsLanguage: true
  },
  {
    id: 'competitor-analysis',
    title: 'Competitor Analyzer',
    description: 'Analyze competitor content strategy and find content gaps.',
    icon: 'Target',
    category: 'Advanced',
    supportsLanguage: true
  },
  {
    id: 'channel-analyzer',
    title: 'Channel Analyzer',
    description: 'Analyze your channel stats or URL and get improvement suggestions.',
    icon: 'BarChart2',
    category: 'Advanced',
    supportsLanguage: true
  },
  {
    id: 'metadata-generator',
    title: 'Full Metadata Generator',
    description: 'Generate Title, Description, Tags, and Thumbnail ideas in one click.',
    icon: 'Layers',
    category: 'Advanced',
    supportsLanguage: true
  },
  {
    id: 'script-to-visuals',
    title: 'Script to Visuals',
    description: 'Turn your script into visual prompts with voiceover.',
    icon: 'Video',
    category: 'Advanced',
    supportsLanguage: true
  },
  {
    id: 'advanced-script-writer',
    title: 'Pro Script Writer',
    description: 'Generate highly engaging scripts with custom categories, types, and exact durations.',
    icon: 'PenTool',
    category: 'Advanced',
    supportsLanguage: true
  }
];
