
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  initialMessage?: string;
  specification?: string;
}

// Educational resources based on different specifications
const educationalResources: Record<string, string[]> = {
  "computer science": [
    "Harvard's CS50 Introduction to Computer Science: A comprehensive introduction to computer science and programming.",
    "MIT OpenCourseWare: Free computer science courses from MIT.",
    "Coursera: Offers specializations in various computer science fields.",
    "freeCodeCamp: Free coding tutorials and certifications.",
    "LeetCode: Platform to enhance your coding skills.",
    "GitHub Student Developer Pack: Free access to developer tools for students."
  ],
  "engineering": [
    "Khan Academy: Free courses in mathematics and physics fundamental to engineering.",
    "edX: Engineering courses from top universities.",
    "Autodesk Education: Free software for students.",
    "Engineering.com: Resources and articles on various engineering disciplines.",
    "GirlsWhoCode: Programming resources specifically for girls.",
    "EngineerGirl: Resources and mentorship for girls interested in engineering."
  ],
  "medicine": [
    "Coursera's Medical School Prerequisites: Courses in biology, chemistry, and anatomy.",
    "Khan Academy: Medical courses covering various topics.",
    "Osmosis: Medical education platform with videos and notes.",
    "MedSchoolCoach: Resources for MCAT preparation.",
    "MedEd Portal: Peer-reviewed educational resources.",
    "Women in Medicine: Mentorship and resources for women pursuing medical careers."
  ],
  "arts": [
    "Skillshare: Courses on various art forms and techniques.",
    "Coursera's Art and Design specializations.",
    "Adobe Creative Cloud: Student discounts on creative software.",
    "Art21: Contemporary art education resources.",
    "National Museum of Women in the Arts: Resources and historical context.",
    "The Art Assignment: YouTube channel with art projects and history."
  ],
  "business": [
    "Harvard Business School Online: Business fundamentals courses.",
    "Coursera's Business specializations from top schools.",
    "edX: MBA courses from leading institutions.",
    "Khan Academy: Economics and finance courses.",
    "Women in Business: Networking and resources for women entrepreneurs.",
    "Female Founder Collective: Resources for women starting businesses."
  ],
  "default": [
    "Coursera: Online platform with courses in almost every field.",
    "edX: Free online courses from top universities.",
    "Khan Academy: Free educational resources covering various subjects.",
    "MIT OpenCourseWare: Free access to MIT course materials.",
    "Google Scholar: Search for academic papers in your area of interest.",
    "Academic Earth: Curated collection of free online college courses.",
    "TED-Ed: Educational videos on diverse topics.",
    "Open Culture: Collection of free cultural and educational media.",
    "National Center for Women & Information Technology: Resources for women in tech fields.",
    "Girls Who Code: Programs and resources for girls interested in computer science."
  ]
};

const getResourcesForSpecification = (specification: string): string => {
  const lowerSpec = specification.toLowerCase();
  const matchingCategory = Object.keys(educationalResources).find(category => 
    lowerSpec.includes(category)
  ) || "default";
  
  const resources = educationalResources[matchingCategory];
  
  return `
Based on your interest in ${specification}, here are some resources to get you started:

${resources.map((resource, index) => `${index + 1}. ${resource}`).join('\n')}

Additionally, here are some scholarships and programs specifically for female students:

1. Society of Women Engineers (SWE) Scholarships
2. Women in STEM Scholarships by Google
3. Grace Hopper Celebration Scholarships
4. AAUW Career Development Grants
5. L'Oréal USA For Women in Science Program

Would you like more specific information about any of these resources or about a particular aspect of ${specification}?
  `;
};

const AIChat: React.FC<AIChatProps> = ({ initialMessage, specification = "" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial message when component mounts
  useEffect(() => {
    if (initialMessage) {
      setMessages([{ role: "assistant", content: initialMessage }]);
    }
  }, [initialMessage]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate AI response
  const simulateResponse = async (query: string) => {
    setIsTyping(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = "";
    
    if (specification) {
      if (query.toLowerCase().includes("resource") || messages.length <= 1) {
        response = getResourcesForSpecification(specification);
      } else if (query.toLowerCase().includes("scholarship") || query.toLowerCase().includes("funding")) {
        response = `
Here are some scholarships and financial aid options specifically for female students:

1. Society of Women Engineers (SWE) Scholarships: Multiple awards ranging from $1,000 to $10,000.
2. Women in STEM Scholarships by Google: Financial support for women pursuing STEM education.
3. AAUW Career Development Grants: Funding for women pursuing education to advance their careers.
4. Anita Borg Institute Scholarships: For women in technical fields.
5. L'Oréal USA For Women in Science Program: Fellowships for female scientists.
6. Girls Who Code Summer Immersion Program: Free summer programs for girls interested in tech.
7. National Center for Women & Information Technology (NCWIT) Aspirations Award: For high school women.
8. Adobe Research Women-in-Technology Scholarship: For undergraduate and masters female students.
9. Palantir Women in Technology Scholarship: For female students in technical fields.
10. Microsoft Diversity Scholarship: Supports underrepresented groups in tech, including women.

Would you like me to provide more details about any of these opportunities or help you with the application process?
        `;
      } else if (query.toLowerCase().includes("mentor") || query.toLowerCase().includes("guidance")) {
        response = `
Mentorship is crucial for educational and career success. Here are some mentorship opportunities for female students:

1. Million Women Mentors: Connects women with mentors in STEM fields.
2. WomenMentor.org: Platform connecting women with experienced industry mentors.
3. Built By Girls WAVE: Connects young women with professionals in tech.
4. SCORE: Mentorship for entrepreneurs and small business owners.
5. Rewriting the Code: Community and mentorship for women in tech.
6. IEEE Women in Engineering: Mentorship programs for engineering students.
7. American Medical Women's Association: Mentoring for women in medicine.
8. Women in Animation Mentorship Program: For women pursuing animation careers.

Many colleges also have Women in STEM or similar organizations that offer peer and professional mentoring. Check with your school's student services or career center for local opportunities.

Would you like guidance on how to approach a potential mentor or how to make the most of a mentoring relationship?
        `;
      } else {
        response = `
Thank you for your question about ${specification}! 

To give you the most helpful guidance, I'd like to understand more about your specific interests within this field. Are you looking for:

1. Educational resources and courses?
2. Scholarship opportunities?
3. Mentorship programs?
4. Career pathways and opportunities?
5. Research opportunities?
6. Networking events and communities?

Let me know what you're most interested in, and I can provide targeted resources and advice to help you on your educational journey.
        `;
      }
    } else {
      response = `
I'd be happy to help guide your educational journey! To provide the most relevant resources, could you share what field or subject you're interested in studying? For example:

- Computer Science or Programming
- Engineering (Mechanical, Electrical, etc.)
- Medicine or Healthcare
- Business or Economics
- Arts or Humanities
- Natural Sciences
- Social Sciences
- Education

Once I know your interests, I can recommend specific resources, scholarships, and opportunities designed to support female students in that field.
      `;
    }
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: "assistant", content: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    simulateResponse(input);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white/50 backdrop-blur-sm rounded-xl border shadow-sm">
      <div className="flex items-center p-4 border-b">
        <Bot className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-md font-medium">AI Educational Mentor</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-start gap-2.5 max-w-[90%]",
              message.role === "user" ? "ml-auto" : "mr-auto"
            )}
          >
            <div 
              className={cn(
                "flex flex-col leading-1.5 p-4 border rounded-xl",
                message.role === "user" 
                  ? "bg-primary text-primary-foreground border-primary/10 rounded-tr-none" 
                  : "bg-secondary border-secondary/50 rounded-tl-none"
              )}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.role === "user" ? (
                  <>
                    <User className="h-4 w-4" />
                    <span className="text-sm font-semibold">You</span>
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4" />
                    <span className="text-sm font-semibold">AI Mentor</span>
                  </>
                )}
              </div>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2.5 max-w-[90%] mr-auto"
          >
            <div className="flex flex-col leading-1.5 p-4 border rounded-xl bg-secondary border-secondary/50 rounded-tl-none">
              <div className="flex items-center space-x-2 mb-1">
                <Bot className="h-4 w-4" />
                <span className="text-sm font-semibold">AI Mentor</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI educational mentor..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button 
            type="submit" 
            disabled={isTyping || input.trim() === ""}
            size="sm"
            className="h-full"
            icon={<Send className="h-4 w-4" />}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
