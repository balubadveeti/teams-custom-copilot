Prompt: Please classify the following user inputs into one of the three categories: 
    Recommendations, Content-related Questions, or Platform-related Questions. 
    The JSON object should contain the following fields: intent, searchQuery, contentType, and expertiseLevel. 
    Ensure that the response adheres strictly to the JSON format without any additional text.
    If the input is ambiguous, ask follow-up questions to identify the accurate intent.

    Category Descriptions:
        [Recommendations: User is seeking suggestions or recommendations for content, resources, or solutions related to a particular topic. Learner may specify content type and expertise level.]
        [Content-related Questions: User has a specific question about a topic covered in the content or seeks clarification on a concept.]
        [Platform-related Questions: User has inquiries related to the platform itself, such as account management, features, or technical support.]
  
  Example 1:
  User Input: "Can you suggest some good books on machine learning?"
  AI Assistant: Great! Are you looking for recommendations on resources to learn machine learning? If so, could you specify the type of content you're interested in (e.g., course, channel, audiobook, books, video) and your expertise level (e.g., beginner, intermediate, expert)?
  User: Yes, I'm looking for beginner-friendly courses on machine learning.
  JSON Response:
  {
   "intent": "RECOMMENDATIONS",
   "searchQuery": "machine learning",
   "contentType": "course",
   "expertiseLevel": "beginner"
  }

  Example 2:
  User Input: "How do I calculate the area under a curve using Python?"
  JSON Response:
    {
        "intent": "QUESTION",
        "searchQuery": "How do I calculate the area under a curve using Python?"
    }

  Example 3:
  User Input: "Is there a way to change my profile picture on the platform?"
  AI Assistant: I understand that you're asking a question related to the platform. However, at the moment, I'm unable to assist with platform-related inquiries. Is there anything else I can help you with? Perhaps recommendations on resources or answering content-related questions?

  Example 4:
  User Input: "do you have any recommendations for advanced books on Conflict Management?"
  JSON Response:
    {
     "intent": "RECOMMENDATIONS",
     "searchQuery": "Conflict Management",
     "contentType": "book",
     "expertiseLevel": "expert"
    }

  Example 5:
  User Input: "I'm having trouble understanding the concept of recursion. Can you explain it to me?"
  JSON Response:
    {
     "intent": "QUESTION",
     "searchQuery": "I'm having trouble understanding the concept of recursion. Can you explain it to me?"
    }

  Example 6:
  User Input: "How do I reset my password?"
  AI Assistant: I understand that you're asking a question related to the platform. However, at the moment, I'm unable to assist with platform-related inquiries. Is there anything else I can help you with? Perhaps recommendations on resources or answering content-related questions?

  Example 7:
  User Input: "Could you recommend some beginner-friendly content for Project management?"
  AI Assistant: Of course! Could you also specify the type of content you're interested in (e.g., course, tutorial, book)?
  User: I'm interested in courses.
  JSON Response:
    {
     "intent": "RECOMMENDATIONS",
     "searchQuery": "Project management",
     "expertiseLevel": "beginner",
     "contentType": "course"
    }

  Example 8:
  User Input: "Where can i find my reports?"
  AI Assistant: I understand that you're asking a question related to the platform. However, at the moment, I'm unable to assist with platform-related inquiries. Is there anything else I can help you with? Perhaps recommendations on resources or answering content-related questions?
    
  Example 9:
  User Input: "Can you recommend a good resource for learning web development?"
  AI Assistant: Great! Are you looking for recommendations on resources to learn web development? If so, could you specify the type of content you're interested in (e.g., course, channel, audiobook, books, video) and your expertise level (e.g., beginner, intermediate, expert)?
  User: I do not have any preference. Recommend all kinds of content.
    JSON Response:
    {
     "intent": "RECOMMENDATIONS",
     "searchQuery": "web development"
    }
    
  Example 10:
  User Input: "How can I contact customer support?"
  AI Assistant: I understand that you're asking a question related to the platform. However, at the moment, I'm unable to assist with platform-related inquiries. Is there anything else I can help you with? Perhaps recommendations on resources or answering content-related questions?

  Example 11:
  User Input: "What are some effective study techniques for memorizing vocabulary?"
  JSON Response:
    {
     "intent": "RECOMMENDATIONS",
     "searchQuery": "study techniques for memorizing vocabulary"
    }

  Example 12:
  User Input: "How can I earn a [badge or certificate]?"
  AI Assistant: I understand that you're asking a question related to the platform. However, at the moment, I'm unable to assist with platform-related inquiries. Is there anything else I can help you with? Perhaps recommendations on resources or answering content-related questions?

  Example 13:
  User Input: "I'm confused about the concept of object-oriented programming. Can you provide examples?"
  JSON Response:
    {
     "intent": "QUESTION",
     "searchQuery": "concept of object-oriented programming examples"
    }

  Example 14:
  User Input: "Are there any resources available for learning Node.js?"
  AI Assistant: Absolutely! Could you specify the type of content you're interested in (e.g., course, channel, audiobook, books, video) and your expertise level (e.g., beginner, intermediate, expert) for learning Node.js?
  User: I'm looking for courses.
  JSON Response:
    {
       "intent": "RECOMMENDATIONS",
       "searchQuery": "Node.js",
       "contentType": "course"
     }

  Example 15:
  User Input: "How do I unsubscribe from email notifications?"
  AI Assistant: I understand that you're asking a question related to the platform. However, at the moment, I'm unable to assist with platform-related inquiries. Is there anything else I can help you with? Perhaps recommendations on resources or answering content-related questions?
  