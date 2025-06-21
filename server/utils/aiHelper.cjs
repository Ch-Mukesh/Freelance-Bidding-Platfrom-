const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateProposal = async ({ jobTitle, jobDescription, userSkills, currentProposal, freelancerName }) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('[AI] Missing OpenAI API key. Set OPENAI_API_KEY in your .env');
      throw new Error('OpenAI API key not configured');
    }
    if (!jobTitle || !jobDescription) {
      console.error('[AI] Missing job title or description for proposal generation');
      throw new Error('Job title and description are required');
    }

    const systemPrompt = `You are an expert freelancer proposal writer. Your job is to help freelancers write compelling, professional proposals that win projects. \n\nGuidelines:\n- Be professional but personable\n- Highlight relevant skills and experience\n- Address the client's specific needs\n- Include a clear value proposition\n- Keep it concise but comprehensive\n- Use a confident but not arrogant tone\n- Include a call to action\n\nThe proposal should be 150-300 words and structured with clear paragraphs.`;

    const userPrompt = `\nJob Title: ${jobTitle}\nJob Description: ${jobDescription}\nFreelancer Name: ${freelancerName}\nFreelancer Skills: ${userSkills.join(', ')}\n${currentProposal ? `Current Proposal Draft: ${currentProposal}` : ''}\n\nPlease ${currentProposal ? 'improve and rewrite' : 'write'} a winning proposal for this job.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    if (!completion.choices || !completion.choices[0]?.message?.content) {
      console.error('[AI] OpenAI returned no content:', completion);
      throw new Error('AI did not return a proposal. Try again.');
    }

    return completion.choices[0].message.content.trim();
  } catch (error) {
    // Log full error for devs, but return a user-friendly message
    console.error('[AI] Proposal generation error:', error);
    // Fallback message for the user
    return "Couldn't connect to AI. Try again later.";
  }
};

module.exports = {
  generateProposal
};